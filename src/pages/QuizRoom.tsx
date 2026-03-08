import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import QuizCard from "../components/game/QuizCard";
import AnimatedLeaderboard from "../components/game/AnimatedLeaderboard";
import ChatPanel from "../components/game/ChatPanel";
import { Users, MessageCircle, Trophy, ChevronDown } from "lucide-react";

const QUESTIONS = [
  { question: "What is the speed of light in vacuum?", options: ["299,792 km/s", "150,000 km/s", "3,000,000 km/s", "1,080,000 km/h"], correct: 0 },
  { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correct: 1 },
  { question: "Who created JavaScript?", options: ["Guido van Rossum", "James Gosling", "Brendan Eich", "Tim Berners-Lee"], correct: 2 },
];

const PLAYERS = [
  { id: "1", name: "NeonKnight", score: 2400 },
  { id: "2", name: "CyberQueen", score: 2200 },
  { id: "3", name: "PixelMaster", score: 1800 },
  { id: "4", name: "DataWizard", score: 1500 },
  { id: "5", name: "You", score: 2100 },
];

const QuizRoom = () => {
  const { roomId } = useParams();
  const currentRoomId = roomId ?? "demo-room";
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [players, setPlayers] = useState(PLAYERS);
  const [mobilePanel, setMobilePanel] = useState<"quiz" | "leaderboard" | "chat">("quiz");

  const q = QUESTIONS[qIdx];

  const nextQ = useCallback(() => {
    if (qIdx < QUESTIONS.length - 1) {
      setQIdx((p) => p + 1);
      setSelected(null);
      setShowCorrect(false);
      setTimeLeft(20);
    }
  }, [qIdx]);

  useEffect(() => {
    if (timeLeft <= 0 || selected !== null) return;
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, selected]);

  useEffect(() => {
    if (timeLeft === 0 && selected === null) {
      setSelected(-1);
      setShowCorrect(true);
      setTimeout(nextQ, 2000);
    }
  }, [timeLeft, selected, nextQ]);

  const answer = (i: number) => {
    setSelected(i);
    setShowCorrect(true);
    if (i === q.correct) {
      setPlayers((prev) => prev.map((p) => (p.name === "You" ? { ...p, score: p.score + 300 } : p)));
    }
    setTimeout(nextQ, 2000);
  };

  return (
    <AppShell>
      <div className="min-h-screen">
        {/* Match Header */}
        <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-3">
                <h1 className="text-[15px] font-semibold text-foreground">Science Showdown</h1>
                <span className="hidden sm:flex items-center gap-1.5 text-[12px] text-success font-medium bg-success/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Live
                </span>
              </div>
              <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {PLAYERS.length} players
                </span>
                <span className="hidden sm:inline">
                  Q {qIdx + 1}/{QUESTIONS.length}
                </span>
                {/* Progress dots */}
                <div className="hidden md:flex items-center gap-1">
                  {QUESTIONS.map((_, i) => (
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
          {/* Desktop: 3 columns */}
          <div className="hidden lg:grid lg:grid-cols-[280px_1fr_300px] gap-5 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="sticky top-24"
            >
              <AnimatedLeaderboard players={players} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <QuizCard
                question={q.question}
                options={q.options}
                questionNumber={qIdx + 1}
                totalQuestions={QUESTIONS.length}
                timeLeft={timeLeft}
                totalTime={20}
                selectedAnswer={selected}
                correctAnswer={showCorrect ? q.correct : undefined}
                onAnswer={answer}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <ChatPanel />
            </motion.div>
          </div>

          {/* Mobile/Tablet: Tabbed panels */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              {mobilePanel === "quiz" && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <QuizCard
                    question={q.question}
                    options={q.options}
                    questionNumber={qIdx + 1}
                    totalQuestions={QUESTIONS.length}
                    timeLeft={timeLeft}
                    totalTime={20}
                    selectedAnswer={selected}
                    correctAnswer={showCorrect ? q.correct : undefined}
                    onAnswer={answer}
                  />
                </motion.div>
              )}
              {mobilePanel === "leaderboard" && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedLeaderboard players={players} />
                </motion.div>
              )}
              {mobilePanel === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[400px]"
                >
                  <ChatPanel />
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
