import { motion } from "framer-motion";

interface TimerRingProps {
  timeLeft: number;
  totalTime: number;
  size?: number;
}

const TimerRing = ({ timeLeft, totalTime, size = 80 }: TimerRingProps) => {
  const progress = timeLeft / totalTime;
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const getColor = () => {
    if (progress > 0.5) return "hsl(142, 71%, 45%)";
    if (progress > 0.2) return "hsl(38, 92%, 50%)";
    return "hsl(0, 84%, 60%)";
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(240, 10%, 18%)"
          strokeWidth="4"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: `drop-shadow(0 0 8px ${getColor()})`,
          }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold"
        style={{ color: getColor() }}
        animate={timeLeft <= 5 ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
      >
        {timeLeft}
      </motion.div>
    </div>
  );
};

export default TimerRing;
