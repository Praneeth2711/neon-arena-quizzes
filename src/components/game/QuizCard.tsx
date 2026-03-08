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
      if (i === correctAnswer) return "border-success bg-success/5";
      if (i === selectedAnswer && i !== correctAnswer) return "border-destructive bg-destructive/5";
    }
    if (i === selectedAnswer) return "border-primary bg-primary/5";
    return "border-border hover:border-primary/40 hover:bg-muted/30";
  };

  return (
    <motion.div
      className="card-premium p-6 md:p-8"
      animate={timeLeft <= 5 && timeLeft > 0 && selectedAnswer === null ? { x: [0, -2, 2, -1, 1, 0] } : {}}
      transition={{ duration: 0.4, repeat: timeLeft <= 5 ? Infinity : 0, repeatDelay: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-32 h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
              initial={{ width: 0 }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <TimerRing timeLeft={timeLeft} totalTime={totalTime} size={64} />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={question}
          className="text-lg md:text-xl font-semibold text-foreground mb-8 leading-relaxed"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
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
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${getStyle(i)} ${selectedAnswer !== null ? "cursor-default" : "cursor-pointer"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
          >
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
                i === selectedAnswer ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {optionLabels[i]}
              </span>
              <span className="text-sm font-medium text-foreground">{opt}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuizCard;
