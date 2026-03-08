import { motion, AnimatePresence } from "framer-motion";
import TimerRing from "./TimerRing";

interface QuizCardProps {
  question: string;
  options: string[];
  questionNumber: number;
  totalQuestions: number;
  timeLeft: number;
  totalTime: number;
  selectedAnswer: number | null;
  correctAnswer?: number;
  onAnswer: (index: number) => void;
}

const optionLabels = ["A", "B", "C", "D"];

const QuizCard = ({
  question, options, questionNumber, totalQuestions,
  timeLeft, totalTime, selectedAnswer, correctAnswer, onAnswer,
}: QuizCardProps) => {
  const getStyle = (i: number) => {
    if (correctAnswer !== undefined) {
      if (i === correctAnswer) return "border-success/50 bg-success/10 shadow-[0_0_20px_hsl(155_70%_45%/0.15)]";
      if (i === selectedAnswer && i !== correctAnswer) return "border-destructive/50 bg-destructive/10";
    }
    if (i === selectedAnswer) return "border-primary/50 bg-primary/10 neon-glow-purple";
    return "border-border/30 hover:border-primary/30 hover:bg-primary/5";
  };

  return (
    <motion.div
      className="glass-neon hud-corners p-6 md:p-8"
      animate={timeLeft <= 5 && timeLeft > 0 && selectedAnswer === null ? { x: [0, -3, 3, -2, 2, 0] } : {}}
      transition={{ duration: 0.4, repeat: timeLeft <= 5 ? Infinity : 0, repeatDelay: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
            Question {questionNumber}/{totalQuestions}
          </span>
          {/* Progress */}
          <div className="w-32 h-1 bg-muted rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(263 70% 58%), hsl(192 95% 50%), hsl(330 85% 60%))" }}
              initial={{ width: 0 }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <TimerRing timeLeft={timeLeft} totalTime={totalTime} size={68} />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={question}
          className="text-lg md:text-xl font-heading font-semibold text-foreground mb-8 leading-relaxed"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {question}
        </motion.h2>
      </AnimatePresence>

      {/* Options */}
      <div className="grid gap-3">
        {options.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => selectedAnswer === null && onAnswer(i)}
            className={`w-full text-left p-4 rounded-xl border transition-all glass ${getStyle(i)} ${selectedAnswer !== null ? "cursor-default" : "cursor-pointer"}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={selectedAnswer === null ? { scale: 1.02, y: -2, rotateX: 2, rotateY: -1 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
            style={{ transformPerspective: 600 }}
          >
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-display ${
                i === selectedAnswer ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground"
              }`}>
                {optionLabels[i]}
              </span>
              <span className="font-heading text-sm text-foreground">{opt}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizCard;
