import { describe, it, expect } from "vitest";
import { getQuestionsForRoom, DEFAULT_ROOMS, CATEGORY_QUESTIONS } from "../lib/quizData";
import { isSupabaseConfigured } from "../integrations/supabase/client";

describe("Quiz Data & Logic", () => {
  it("should have default quiz rooms available", () => {
    expect(DEFAULT_ROOMS.length).toBeGreaterThan(0);
    const quantumPhysics = DEFAULT_ROOMS.find((r) => r.name === "Quantum Physics");
    expect(quantumPhysics).toBeDefined();
    expect(quantumPhysics?.category).toBe("Science");
  });

  it("should retrieve questions for given category", () => {
    const scienceQuestions = getQuestionsForRoom("Science");
    expect(scienceQuestions.length).toBeGreaterThan(0);
    expect(scienceQuestions[0].options.length).toBe(4);
    expect(typeof scienceQuestions[0].correct).toBe("number");
  });

  it("should fallback to Science questions for unknown category", () => {
    const fallbackQuestions = getQuestionsForRoom("NonExistentCategory");
    expect(fallbackQuestions).toEqual(CATEGORY_QUESTIONS.Science);
  });

  it("should calculate score correctly with speed bonus", () => {
    const calcScore = (isCorrect: boolean, timeLeft: number, totalTime: number, isDouble = false) => {
      if (!isCorrect) return 0;
      const speedBonus = Math.round((timeLeft / totalTime) * 100);
      return (200 + speedBonus) * (isDouble ? 2 : 1);
    };

    // Correct answer with 15s left out of 20s
    expect(calcScore(true, 15, 20)).toBe(275);
    // Correct answer with 0s left
    expect(calcScore(true, 0, 20)).toBe(200);
    // Incorrect answer
    expect(calcScore(false, 15, 20)).toBe(0);
    // Correct answer with 2x multiplier
    expect(calcScore(true, 15, 20, true)).toBe(550);
  });

  it("should calculate accuracy percentage accurately", () => {
    const calcAccuracy = (correct: number, total: number) => {
      if (total <= 0) return 0;
      return Math.round((correct / total) * 100);
    };

    expect(calcAccuracy(4, 5)).toBe(80);
    expect(calcAccuracy(5, 5)).toBe(100);
    expect(calcAccuracy(0, 5)).toBe(0);
  });

  it("should filter rooms by status and search keyword", () => {
    const filterRooms = (rooms: typeof DEFAULT_ROOMS, filter: string, search: string) => {
      return rooms
        .filter((r) => {
          if (filter === "Live") return r.status === "live";
          if (filter === "Waiting") return r.status === "waiting";
          return true;
        })
        .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()));
    };

    const liveRooms = filterRooms(DEFAULT_ROOMS, "Live", "");
    expect(liveRooms.every((r) => r.status === "live")).toBe(true);

    const historyRooms = filterRooms(DEFAULT_ROOMS, "All", "history");
    expect(historyRooms.length).toBeGreaterThan(0);
    expect(historyRooms[0].category).toBe("History");
  });

  it("should report Supabase configuration state safely without throwing", () => {
    expect(typeof isSupabaseConfigured).toBe("boolean");
  });
});
