import { describe, it, expect } from "vitest";
import { supabase, isSupabaseConfigured } from "../integrations/supabase/client";

describe("Real Supabase Backend Integration & RLS Verification", () => {
  it("1. should have Supabase client initialized and configured", () => {
    expect(isSupabaseConfigured).toBe(true);
    expect(supabase).toBeDefined();
    expect(supabase.from).toBeDefined();
    expect(supabase.auth).toBeDefined();
  });

  it("2. should connect to Supabase and query public.profiles table", async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, user_id, display_name, games_played, games_won, total_correct, total_answered")
      .limit(5);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("3. should query public.quiz_rooms table", async () => {
    const { data, error } = await supabase
      .from("quiz_rooms")
      .select("id, name, category, difficulty, max_players, status, host_id")
      .limit(5);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("4. should query public.quiz_questions table", async () => {
    const { data, error } = await supabase
      .from("quiz_questions")
      .select("id, room_id, question_text, options, correct_answer, time_limit")
      .limit(5);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("5. should query public.room_players table", async () => {
    const { data, error } = await supabase
      .from("room_players")
      .select("id, room_id, user_id, score, joined_at")
      .limit(5);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("6. should query public.quiz_answers table", async () => {
    const { data, error } = await supabase
      .from("quiz_answers")
      .select("id, question_id, user_id, selected_answer, is_correct")
      .limit(5);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("7. should query public.leaderboard_scores table", async () => {
    const { data, error } = await supabase
      .from("leaderboard_scores")
      .select("id, user_id, total_score, games_played, wins")
      .limit(5);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("8. should query public.chat_messages table", async () => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("id, room_id, user_id, message, created_at")
      .limit(5);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("9. should enforce RLS policies preventing unauthenticated writes to quiz_rooms", async () => {
    // Attempt insert without valid user auth JWT
    const fakeUserId = "00000000-0000-0000-0000-000000000000";
    const { error } = await supabase
      .from("quiz_rooms")
      .insert({
        name: "Unauthorized Room",
        category: "General",
        difficulty: "Easy",
        max_players: 4,
        status: "waiting",
        host_id: fakeUserId,
      })
      .select()
      .single();

    // RLS policy should block unauthenticated creation with 42501
    expect(error).toBeDefined();
    expect(error?.code).toBe("42501");
  });

  it("10. should enforce RLS policies preventing unauthenticated writes to leaderboard_scores", async () => {
    const fakeUserId = "00000000-0000-0000-0000-000000000000";
    const { error } = await supabase
      .from("leaderboard_scores")
      .insert({
        user_id: fakeUserId,
        total_score: 99999,
        games_played: 10,
        wins: 10,
      })
      .select()
      .single();

    // RLS policy should block unauthenticated score tampering with 42501
    expect(error).toBeDefined();
    expect(error?.code).toBe("42501");
  });
});
