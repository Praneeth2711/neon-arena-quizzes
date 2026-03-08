import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import QuizCard from "../components/game/QuizCard";
import AnimatedLeaderboard from "../components/game/AnimatedLeaderboard";
import ChatPanel from "../components/game/ChatPanel";

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
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [players, setPlayers] = useState(PLAYERS);

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
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div>
              <h1 className="text-lg font-semibold text-foreground">Science Showdown</h1>
              <p className="text-sm text-muted-foreground">Live Match • {PLAYERS.length} players</p>
            </div>
            <span className="text-sm text-muted-foreground">
              Question {qIdx + 1}/{QUESTIONS.length}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-5">
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedLeaderboard players={players} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
              className="hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ChatPanel />
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default QuizRoom;
