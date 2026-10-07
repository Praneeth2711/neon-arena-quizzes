import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import QuizCard from "../components/game/QuizCard";
import AnimatedLeaderboard from "../components/game/AnimatedLeaderboard";
import ChatPanel from "../components/game/ChatPanel";
import PowerUpBar from "../components/game/PowerUpBar";
import { Users, MessageCircle, Trophy, ChevronDown, RotateCcw, ArrowRight, Award, Zap, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { DEFAULT_ROOMS, getQuestionsForRoom, QuestionItem } from "@/lib/quizData";
import { toast } from "sonner";

interface PlayerState {
  id: string;
  name: string;
  score: number;
}

const QuizRoom = () => {
  const { roomId } = useParams();
  const currentRoomId = roomId ?? "demo-room";
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  // Room & Questions
  const [roomName, setRoomName] = useState("Science Showdown");
  const [roomCategory, setRoomCategory] = useState("Science");
  const [questions, setQuestions] = useState<QuestionItem[]>(() => getQuestionsForRoom("Science"));
  const [loadingRoom, setLoadingRoom] = useState(true);

  // Game state
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [totalTimeLimit, setTotalTimeLimit] = useState(20);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [isDoublePoints, setIsDoublePoints] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Players
  const playerName = profile?.display_name || user?.email?.split("@")[0] || "You";
  const [players, setPlayers] = useState<PlayerState[]>([
    { id: "1", name: "NeonKnight", score: 2400 },
    { id: "2", name: "CyberQueen", score: 2200 },
    { id: "3", name: "PixelMaster", score: 1800 },
    { id: "4", name: "DataWizard", score: 1500 },
    { id: "user", name: playerName, score: 0 },
  ]);

  const [mobilePanel, setMobilePanel] = useState<"quiz" | "leaderboard" | "chat">("quiz");

  // Fetch Room & Question Data
  useEffect(() => {
    let isMounted = true;
    const loadRoomData = async () => {
      setLoadingRoom(true);
      try {
        // 1. Check default catalogue
        const defaultMatch = DEFAULT_ROOMS.find((r) => r.id === currentRoomId);
        if (defaultMatch) {
          if (isMounted) {
            setRoomName(defaultMatch.name);
            setRoomCategory(defaultMatch.category);
            const qList = getQuestionsForRoom(defaultMatch.category);
            setQuestions(qList);
            setTimeLeft(qList[0]?.timeLimit || 20);
            setTotalTimeLimit(qList[0]?.timeLimit || 20);
          }
        }

        // 2. Fetch from Supabase
        if (currentRoomId && currentRoomId !== "demo-room") {
          const { data: dbRoom } = await supabase
            .from("quiz_rooms")
            .select("id, name, category, difficulty")
            .eq("id", currentRoomId)
            .maybeSingle();

          if (dbRoom && isMounted) {
            setRoomName(dbRoom.name);
            setRoomCategory(dbRoom.category);

            // Fetch questions from DB
            const { data: dbQuestions } = await supabase
              .from("quiz_questions")
              .select("id, question_text, options, correct_answer, time_limit")
              .eq("room_id", currentRoomId)
              .order("question_order", { ascending: true });

            if (dbQuestions && dbQuestions.length > 0) {
              const mapped: QuestionItem[] = dbQuestions.map((q) => ({
                id: q.id,
                question: q.question_text,
                options: (Array.isArray(q.options) ? q.options : JSON.parse(String(q.options))) as string[],
                correct: q.correct_answer,
                timeLimit: q.time_limit || 20,
              }));
              setQuestions(mapped);
              setTimeLeft(mapped[0]?.timeLimit || 20);
              setTotalTimeLimit(mapped[0]?.timeLimit || 20);
            } else {
              const fallback = getQuestionsForRoom(dbRoom.category);
              setQuestions(fallback);
              setTimeLeft(fallback[0]?.timeLimit || 20);
              setTotalTimeLimit(fallback[0]?.timeLimit || 20);
            }
          }
        }
      } catch (err) {
        console.warn("Room load notice:", err);
      } finally {
        if (isMounted) setLoadingRoom(false);
      }
    };

    loadRoomData();
    return () => {
      isMounted = false;
    };
  }, [currentRoomId]);

  // Keep player name synced
  useEffect(() => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === "user" ? { ...p, name: playerName } : p))
    );
  }, [playerName]);

  const q = useMemo(() => {
    return questions[qIdx] || questions[0] || {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correct: 1,
      timeLimit: 20,
    };
  }, [questions, qIdx]);

  // Handle Quiz Completion
  const handleQuizFinish = useCallback(async (finalScore: number, finalCorrect: number, totalQ: number) => {
    setIsGameOver(true);
    const won = finalScore >= 2000;

    if (user?.id) {
      try {
        // 1. Try atomic RPC function
        const { error: rpcErr } = await supabase.rpc("record_quiz_completion", {
          p_score: finalScore,
          p_correct: finalCorrect,
          p_total: totalQ,
          p_won: won,
        });

        // 2. Fallback direct update if RPC is missing
        if (rpcErr) {
          await supabase
            .from("profiles")
            .update({
              games_played: (profile?.games_played || 0) + 1,
              games_won: (profile?.games_won || 0) + (won ? 1 : 0),
              total_correct: (profile?.total_correct || 0) + finalCorrect,
              total_answered: (profile?.total_answered || 0) + totalQ,
            })
            .eq("user_id", user.id);

          await supabase
            .from("leaderboard_scores")
            .upsert({
              user_id: user.id,
              total_score: (finalScore || 0),
              games_played: 1,
              wins: won ? 1 : 0,
            }, { onConflict: "user_id" });
        }

        await refreshProfile();
      } catch (err) {
        console.warn("Quiz completion record notice:", err);
      }
    }
  }, [user, profile, refreshProfile]);

  const nextQ = useCallback(() => {
    if (qIdx < questions.length - 1) {
      const nextIndex = qIdx + 1;
      setQIdx(nextIndex);
      setSelected(null);
      setShowCorrect(false);
      setEliminatedOptions([]);
      setIsDoublePoints(false);
      const nextTime = questions[nextIndex]?.timeLimit || 20;
      setTimeLeft(nextTime);
      setTotalTimeLimit(nextTime);
    } else {
      handleQuizFinish(score, correctCount, questions.length);
    }
  }, [qIdx, questions, score, correctCount, handleQuizFinish]);

  // Timer Tick
  useEffect(() => {
    if (isGameOver || timeLeft <= 0 || selected !== null) return;
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, selected, isGameOver]);

  // Auto-advance on time out
  useEffect(() => {
    if (timeLeft === 0 && selected === null && !isGameOver) {
      setSelected(-1);
      setShowCorrect(true);
      const advanceTimer = setTimeout(nextQ, 2000);
      return () => clearTimeout(advanceTimer);
    }
  }, [timeLeft, selected, isGameOver, nextQ]);

  // Answer selection
  const handleAnswer = async (i: number) => {
    if (selected !== null || isGameOver) return;
    setSelected(i);
    setShowCorrect(true);

    const isCorrect = i === q.correct;
    let earnedPoints = 0;

    if (isCorrect) {
      const speedBonus = Math.round((timeLeft / (totalTimeLimit || 20)) * 100);
      earnedPoints = (200 + speedBonus) * (isDoublePoints ? 2 : 1);
      setScore((prev) => prev + earnedPoints);
      setCorrectCount((prev) => prev + 1);

      setPlayers((prev) =>
        prev.map((p) => (p.id === "user" ? { ...p, score: p.score + earnedPoints } : p))
      );
    }

    // Persist answer to Supabase if user logged in and question has ID
    if (user?.id && q.id) {
      try {
        await supabase.from("quiz_answers").upsert({
          question_id: q.id,
          user_id: user.id,
          selected_answer: i,
          is_correct: isCorrect,
        }, { onConflict: "question_id,user_id" });
      } catch (err) {
        console.warn("Answer record notice:", err);
      }
    }

    setTimeout(nextQ, 2000);
  };

  // Power-up handler
  const handlePowerUp = (id: string) => {
    if (id === "5050") {
      // Remove 2 incorrect answers
      const incorrectIndices = q.options
        .map((_, idx) => idx)
        .filter((idx) => idx !== q.correct);
      const toEliminate = incorrectIndices.slice(0, 2);
      setEliminatedOptions(toEliminate);
      toast.info("50/50 Activated: 2 wrong options eliminated!");
    } else if (id === "time") {
      setTimeLeft((prev) => prev + 10);
      toast.success("+10 Seconds added to clock!");
    } else if (id === "double") {
      setIsDoublePoints(true);
      toast.success("2x Multiplier active for this question!");
    }
  };

  const restartQuiz = () => {
    setQIdx(0);
    setSelected(null);
    setShowCorrect(false);
    setScore(0);
    setCorrectCount(0);
    setIsGameOver(false);
    setEliminatedOptions([]);
    setIsDoublePoints(false);
    setTimeLeft(questions[0]?.timeLimit || 20);
    setTotalTimeLimit(questions[0]?.timeLimit || 20);
    setPlayers((prev) => prev.map((p) => (p.id === "user" ? { ...p, score: 0 } : p)));
  };

  // Mask eliminated options
  const displayOptions = useMemo(() => {
    return q.options.map((opt, idx) => (eliminatedOptions.includes(idx) ? "—" : opt));
  }, [q.options, eliminatedOptions]);

  const accuracyPct = Math.round((correctCount / (questions.length || 1)) * 100);

  return (
    <AppShell>
      <div className="min-h-screen">
        {/* Match Header */}
        <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <h1 className="text-[15px] font-semibold text-foreground">{roomName}</h1>
                <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-success font-medium bg-success/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Live Arena
                </span>
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-semibold">
                  {roomCategory}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {players.length} players
                </span>
                <span className="font-semibold text-foreground">
                  Score: <span className="text-primary">{score}</span>
                </span>
                <span className="hidden sm:inline">
                  Q {Math.min(qIdx + 1, questions.length)}/{questions.length}
                </span>
                {/* Progress dots */}
                <div className="hidden md:flex items-center gap-1">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i < qIdx ? "bg-primary" : i === qIdx ? "bg-primary animate-pulse" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="lg:hidden border-b border-border/40">
          <div className="max-w-[1400px] mx-auto px-4 flex">
            {[
              { key: "quiz" as const, label: "Quiz", icon: ChevronDown },
              { key: "leaderboard" as const, label: "Rankings", icon: Trophy },
              { key: "chat" as const, label: "Chat", icon: MessageCircle },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMobilePanel(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                  mobilePanel === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-6">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-[280px_1fr_300px] gap-5 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="sticky top-24">
              <AnimatedLeaderboard players={players} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {isGameOver ? (
                <div className="card-premium p-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-5 shadow-lg">
                    <Trophy className="w-10 h-10" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-foreground mb-2">Arena Completed!</h2>
                  <p className="text-muted-foreground text-[15px] max-w-md mx-auto mb-8">
                    Great performance in the <span className="font-semibold text-foreground">{roomName}</span> arena.
                  </p>

                  <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                    <div className="p-4 rounded-xl bg-muted/40 border border-border">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Final Score</p>
                      <p className="text-2xl font-bold text-primary">{score.toLocaleString()}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/40 border border-border">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Correct</p>
                      <p className="text-2xl font-bold text-success">{correctCount}/{questions.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/40 border border-border">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Accuracy</p>
                      <p className="text-2xl font-bold text-warning">{accuracyPct}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <motion.button
                      onClick={restartQuiz}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-border bg-card hover:bg-muted/50 text-foreground transition-all cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Play Again
                    </motion.button>
                    <motion.button
                      onClick={() => navigate("/lobby")}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground transition-all cursor-pointer shadow-md"
                      style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Explore Lobbies</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <QuizCard
                    question={q.question}
                    options={displayOptions}
                    questionNumber={qIdx + 1}
                    totalQuestions={questions.length}
                    timeLeft={timeLeft}
                    totalTime={totalTimeLimit}
                    selectedAnswer={selected}
                    correctAnswer={showCorrect ? q.correct : undefined}
                    onAnswer={handleAnswer}
                  />
                  <PowerUpBar onActivate={handlePowerUp} />
                </>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="sticky top-24">
              <ChatPanel roomId={currentRoomId} />
            </motion.div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              {mobilePanel === "quiz" && (
                <motion.div key="quiz" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                  {isGameOver ? (
                    <div className="card-premium p-6 text-center">
                      <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-foreground mb-2">Arena Completed!</h2>
                      <p className="text-2xl font-bold text-primary mb-6">Score: {score}</p>
                      <div className="flex flex-col gap-3">
                        <button onClick={restartQuiz} className="py-3 rounded-xl border border-border font-semibold text-sm">
                          Play Again
                        </button>
                        <button onClick={() => navigate("/lobby")} className="py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
                          Back to Lobby
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <QuizCard
                        question={q.question}
                        options={displayOptions}
                        questionNumber={qIdx + 1}
                        totalQuestions={questions.length}
                        timeLeft={timeLeft}
                        totalTime={totalTimeLimit}
                        selectedAnswer={selected}
                        correctAnswer={showCorrect ? q.correct : undefined}
                        onAnswer={handleAnswer}
                      />
                      <PowerUpBar onActivate={handlePowerUp} />
                    </>
                  )}
                </motion.div>
              )}
              {mobilePanel === "leaderboard" && (
                <motion.div key="leaderboard" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
                  <AnimatedLeaderboard players={players} />
                </motion.div>
              )}
              {mobilePanel === "chat" && (
                <motion.div key="chat" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="min-h-[400px]">
                  <ChatPanel roomId={currentRoomId} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default QuizRoom;
