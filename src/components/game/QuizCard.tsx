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

const QuizCard = ({
  question,
  options,
  questionNumber,
  totalQuestions,
  timeLeft,
  totalTime,
  selectedAnswer,
  correctAnswer,
  onAnswer,
}: QuizCardProps) => {
  const getOptionStyle = (index: number) => {
    if (correctAnswer !== undefined) {
      if (index === correctAnswer) return "border-success/60 bg-success/10 neon-glow-purple";
      if (index === selectedAnswer && index !== correctAnswer) return "border-destructive/60 bg-destructive/10";
    }
    if (index === selectedAnswer) return "border-primary/60 bg-primary/10 neon-glow-purple";
    return "border-border/40 hover:border-primary/40 hover:bg-primary/5";
  };

  return (
    <motion.div
      className="glass-strong p-6 md:p-8 max-w-2xl mx-auto"
      animate={timeLeft <= 5 && timeLeft > 0 ? { x: [0, -2, 2, -1, 1, 0] } : {}}
      transition={{ duration: 0.4, repeat: timeLeft <= 5 ? Infinity : 0, repeatDelay: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-heading text-muted-foreground tracking-wider uppercase">
          Question {questionNumber}/{totalQuestions}
        </span>
        <TimerRing timeLeft={timeLeft} totalTime={totalTime} size={64} />
      </div>

      {/* Progress */}
      <div className="w-full h-1 bg-muted rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={question}
          className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-8 leading-relaxed"
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
        {options.map((option, i) => (
          <motion.button
            key={i}
            onClick={() => selectedAnswer === null && onAnswer(i)}
            className={`w-full text-left p-4 rounded-xl border transition-colors glass ${getOptionStyle(i)} ${selectedAnswer !== null ? "cursor-default" : "cursor-pointer"}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={selectedAnswer === null ? { scale: 1.02, y: -2 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-sm font-display text-muted-foreground">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="font-heading text-sm md:text-base text-foreground">{option}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizCard;
