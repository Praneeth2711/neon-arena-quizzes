import { motion } from "framer-motion";

interface TimerRingProps {
  timeLeft: number;
  totalTime: number;
  size?: number;
}

const TimerRing = ({ timeLeft, totalTime, size = 64 }: TimerRingProps) => {
  const progress = timeLeft / totalTime;
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const color = progress > 0.5
    ? "hsl(160, 84%, 39%)"
    : progress > 0.2
      ? "hsl(38, 92%, 50%)"
      : "hsl(0, 84%, 60%)";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="hsl(214, 32%, 91%)" strokeWidth="3"
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transition={{ duration: 0.4 }}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-sm font-bold"
        style={{ color }}
        animate={timeLeft <= 5 && timeLeft > 0 ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.4, repeat: timeLeft <= 5 ? Infinity : 0 }}
      >
        {timeLeft}
      </motion.div>
    </div>
  );
};

export default TimerRing;
