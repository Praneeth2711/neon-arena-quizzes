-- ============================================================
-- Neon Arena Quizzes — Complete Supabase Schema
-- Run this in your Supabase SQL Editor if setting up a new project.
-- ============================================================

-- 1. Helper function for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  bio TEXT,
  games_played INTEGER NOT NULL DEFAULT 0,
  games_won INTEGER NOT NULL DEFAULT 0,
  total_correct INTEGER NOT NULL DEFAULT 0,
  total_answered INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Profiles are viewable by everyone') THEN
    CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile') THEN
    CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile') THEN
    CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile trigger on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Quiz Rooms Table
CREATE TABLE IF NOT EXISTS public.quiz_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'General',
  difficulty TEXT NOT NULL DEFAULT 'Medium',
  max_players INTEGER NOT NULL DEFAULT 8,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'live', 'finished')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_rooms ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_rooms' AND policyname = 'Rooms are viewable by everyone') THEN
    CREATE POLICY "Rooms are viewable by everyone" ON public.quiz_rooms FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_rooms' AND policyname = 'Authenticated users can create rooms') THEN
    CREATE POLICY "Authenticated users can create rooms" ON public.quiz_rooms FOR INSERT WITH CHECK (auth.uid() = host_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_rooms' AND policyname = 'Host can update their room') THEN
    CREATE POLICY "Host can update their room" ON public.quiz_rooms FOR UPDATE USING (auth.uid() = host_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_rooms' AND policyname = 'Host can delete their room') THEN
    CREATE POLICY "Host can delete their room" ON public.quiz_rooms FOR DELETE USING (auth.uid() = host_id);
  END IF;
END $$;

DROP TRIGGER IF EXISTS update_quiz_rooms_updated_at ON public.quiz_rooms;
CREATE TRIGGER update_quiz_rooms_updated_at BEFORE UPDATE ON public.quiz_rooms
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Room Players Table
CREATE TABLE IF NOT EXISTS public.room_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.quiz_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(room_id, user_id)
);

ALTER TABLE public.room_players ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'room_players' AND policyname = 'Room players are viewable by everyone') THEN
    CREATE POLICY "Room players are viewable by everyone" ON public.room_players FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'room_players' AND policyname = 'Users can join rooms') THEN
    CREATE POLICY "Users can join rooms" ON public.room_players FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'room_players' AND policyname = 'Users can update their own score') THEN
    CREATE POLICY "Users can update their own score" ON public.room_players FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'room_players' AND policyname = 'Users can leave rooms') THEN
    CREATE POLICY "Users can leave rooms" ON public.room_players FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 5. Quiz Questions Table
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.quiz_rooms(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]',
  correct_answer INTEGER NOT NULL,
  question_order INTEGER NOT NULL DEFAULT 0,
  time_limit INTEGER NOT NULL DEFAULT 20,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_questions' AND policyname = 'Questions viewable by everyone') THEN
    CREATE POLICY "Questions viewable by everyone" ON public.quiz_questions FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_questions' AND policyname = 'Host can create questions') THEN
    CREATE POLICY "Host can create questions" ON public.quiz_questions FOR INSERT WITH CHECK (
      EXISTS (SELECT 1 FROM public.quiz_rooms WHERE id = room_id AND host_id = auth.uid())
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_questions' AND policyname = 'Host can update questions') THEN
    CREATE POLICY "Host can update questions" ON public.quiz_questions FOR UPDATE USING (
      EXISTS (SELECT 1 FROM public.quiz_rooms WHERE id = room_id AND host_id = auth.uid())
    );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_questions' AND policyname = 'Host can delete questions') THEN
    CREATE POLICY "Host can delete questions" ON public.quiz_questions FOR DELETE USING (
      EXISTS (SELECT 1 FROM public.quiz_rooms WHERE id = room_id AND host_id = auth.uid())
    );
  END IF;
END $$;

-- 6. Quiz Answers Table
CREATE TABLE IF NOT EXISTS public.quiz_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  selected_answer INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  answered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(question_id, user_id)
);

ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_answers' AND policyname = 'Answers viewable by everyone') THEN
    CREATE POLICY "Answers viewable by everyone" ON public.quiz_answers FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_answers' AND policyname = 'Users can submit answers') THEN
    CREATE POLICY "Users can submit answers" ON public.quiz_answers FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_answers' AND policyname = 'Users can update their answers') THEN
    CREATE POLICY "Users can update their answers" ON public.quiz_answers FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 7. Leaderboard Scores Table
CREATE TABLE IF NOT EXISTS public.leaderboard_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_score INTEGER NOT NULL DEFAULT 0,
  games_played INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.leaderboard_scores ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leaderboard_scores' AND policyname = 'Leaderboard viewable by everyone') THEN
    CREATE POLICY "Leaderboard viewable by everyone" ON public.leaderboard_scores FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leaderboard_scores' AND policyname = 'Users can insert their score') THEN
    CREATE POLICY "Users can insert their score" ON public.leaderboard_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leaderboard_scores' AND policyname = 'Users can update their score') THEN
    CREATE POLICY "Users can update their score" ON public.leaderboard_scores FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- 8. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chat_messages' AND policyname = 'Chat messages viewable by everyone') THEN
    CREATE POLICY "Chat messages viewable by everyone" ON public.chat_messages FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'chat_messages' AND policyname = 'Authenticated users can send messages') THEN
    CREATE POLICY "Authenticated users can send messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- 9. Stats Update RPC Function
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

  UPDATE public.profiles
  SET
    games_played = games_played + 1,
    games_won = games_won + (CASE WHEN p_won THEN 1 ELSE 0 END),
    total_correct = total_correct + p_correct,
    total_answered = total_answered + p_total,
    updated_at = now()
  WHERE user_id = v_user_id;

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

-- 10. Realtime Publications
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.room_players;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard_scores;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.quiz_rooms;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
