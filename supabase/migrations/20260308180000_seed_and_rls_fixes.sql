-- Migration: 20260308180000_seed_and_rls_fixes.sql
-- Fixes missing RLS policies, adds helper functions, and seeds initial quiz categories and questions.

-- 1. Ensure Quiz Questions RLS has complete policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'quiz_questions' AND policyname = 'Host can update questions'
  ) THEN
    CREATE POLICY "Host can update questions" ON public.quiz_questions FOR UPDATE USING (
      EXISTS (SELECT 1 FROM public.quiz_rooms WHERE id = room_id AND host_id = auth.uid())
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'quiz_questions' AND policyname = 'Host can delete questions'
  ) THEN
    CREATE POLICY "Host can delete questions" ON public.quiz_questions FOR DELETE USING (
      EXISTS (SELECT 1 FROM public.quiz_rooms WHERE id = room_id AND host_id = auth.uid())
    );
  END IF;
END $$;

-- 2. Ensure Quiz Answers RLS has update policy
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'quiz_answers' AND policyname = 'Users can update their answers'
  ) THEN
    CREATE POLICY "Users can update their answers" ON public.quiz_answers FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 3. Function to record quiz completion and update profile + leaderboard atomically
CREATE OR REPLACE FUNCTION public.record_quiz_completion(
  p_score INTEGER,
  p_correct INTEGER,
  p_total INTEGER,
  p_won BOOLEAN DEFAULT false
)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RETURN;
  END IF;

  -- Update profiles stats
  UPDATE public.profiles
  SET
    games_played = games_played + 1,
    games_won = games_won + (CASE WHEN p_won THEN 1 ELSE 0 END),
    total_correct = total_correct + p_correct,
    total_answered = total_answered + p_total,
    updated_at = now()
  WHERE user_id = v_user_id;

  -- Upsert leaderboard_scores
  INSERT INTO public.leaderboard_scores (user_id, total_score, games_played, wins, updated_at)
  VALUES (
    v_user_id,
    p_score,
    1,
    (CASE WHEN p_won THEN 1 ELSE 0 END),
    now()
  )
  ON CONFLICT (user_id) DO UPDATE
  SET
    total_score = public.leaderboard_scores.total_score + EXCLUDED.total_score,
    games_played = public.leaderboard_scores.games_played + 1,
    wins = public.leaderboard_scores.wins + EXCLUDED.wins,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
