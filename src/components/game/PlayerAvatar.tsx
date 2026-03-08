import { motion } from "framer-motion";

interface PlayerAvatarProps {
  name: string;
  score?: number;
  rank?: number;
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };

const PlayerAvatar = ({ name, score, rank, isActive, size = "md" }: PlayerAvatarProps) => {
  const initials = name.slice(0, 2).toUpperCase();
  const hue = name.charCodeAt(0) * 7 % 360;

  return (
    <motion.div
      className="flex items-center gap-3"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {rank !== undefined && (
        <span className={`font-display text-sm w-6 text-center ${rank <= 3 ? "text-neon-purple text-glow-purple" : "text-muted-foreground"}`}>
          #{rank}
        </span>
      )}
      <motion.div
        className={`${sizeMap[size]} rounded-full flex items-center justify-center font-heading font-bold ${isActive ? "ring-2 ring-primary animate-pulse-glow" : ""}`}
        style={{
          background: `linear-gradient(135deg, hsl(${hue}, 70%, 45%), hsl(${(hue + 40) % 360}, 70%, 55%))`,
        }}
      >
        {initials}
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-heading truncate text-foreground">{name}</p>
        {score !== undefined && (
          <p className="text-xs text-muted-foreground">{score.toLocaleString()} pts</p>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerAvatar;
