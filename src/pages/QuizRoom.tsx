import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import QuizCard from "../components/game/QuizCard";
import AnimatedLeaderboard from "../components/game/AnimatedLeaderboard";
import ChatPanel from "../components/game/ChatPanel";
import PowerUpBar from "../components/game/PowerUpBar";

const QUESTIONS = [
  {
    question: "What is the speed of light in vacuum?",
    options: ["299,792 km/s", "150,000 km/s", "3,000,000 km/s", "1,080,000 km/h"],
    correct: 0,
  },
  {
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: 1,
  },
  {
    question: "What programming language was created by Brendan Eich?",
    options: ["Python", "Java", "JavaScript", "TypeScript"],
    correct: 2,
  },
];

const PLAYERS = [
  { id: "1", name: "NeonKnight", score: 2400 },
  { id: "2", name: "CyberQueen", score: 2200 },
  { id: "3", name: "PixelMaster", score: 1800 },
  { id: "4", name: "DataWizard", score: 1500 },
  { id: "5", name: "You", score: 2100 },
];

const QuizRoom = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [players, setPlayers] = useState(PLAYERS);

  const q = QUESTIONS[currentQ];

  const nextQuestion = useCallback(() => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowCorrect(false);
      setTimeLeft(20);
    }
  }, [currentQ]);

  useEffect(() => {
    if (timeLeft <= 0 || selectedAnswer !== null) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, selectedAnswer]);

  useEffect(() => {
    if (timeLeft === 0 && selectedAnswer === null) {
      setSelectedAnswer(-1);
      setShowCorrect(true);
      setTimeout(nextQuestion, 2000);
    }
  }, [timeLeft, selectedAnswer, nextQuestion]);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowCorrect(true);

    if (index === q.correct) {
      setPlayers((prev) =>
        prev.map((p) => (p.name === "You" ? { ...p, score: p.score + 300 } : p))
      );
    }

    setTimeout(nextQuestion, 2000);
  };

  return (
    <AppShell>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_280px] gap-6">
            {/* Leaderboard */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatedLeaderboard players={players} />
            </motion.div>

            {/* Quiz */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <QuizCard
                question={q.question}
                options={q.options}
                questionNumber={currentQ + 1}
                totalQuestions={QUESTIONS.length}
                timeLeft={timeLeft}
                totalTime={20}
                selectedAnswer={selectedAnswer}
                correctAnswer={showCorrect ? q.correct : undefined}
                onAnswer={handleAnswer}
              />
              <PowerUpBar />
            </motion.div>

            {/* Chat */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
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
