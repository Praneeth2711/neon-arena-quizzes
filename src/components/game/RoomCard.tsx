import { motion } from "framer-motion";
import { Users } from "lucide-react";
import AnimatedButton from "../animations/AnimatedButton";

interface RoomCardProps {
  name: string;
  players: number;
  maxPlayers: number;
  status: "live" | "waiting" | "finished";
  category: string;
  onJoin?: () => void;
  index?: number;
}

const statusStyles = {
  live: "bg-destructive/20 text-destructive border-destructive/30",
  waiting: "bg-secondary/20 text-secondary border-secondary/30",
  finished: "bg-muted text-muted-foreground border-border",
};

const RoomCard = ({ name, players, maxPlayers, status, category, onJoin, index = 0 }: RoomCardProps) => {
  return (
    <motion.div
      className="glass p-5 group cursor-pointer relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.03,
        rotateX: 2,
        rotateY: -2,
        boxShadow: "0 0 30px hsl(263 70% 58% / 0.3)",
      }}
      style={{ transformPerspective: 800 }}
    >
      {/* Glow line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{category}</p>
        </div>
        <span className={`text-[10px] font-heading uppercase tracking-wider px-2 py-1 rounded-full border ${statusStyles[status]}`}>
          {status === "live" && (
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full bg-destructive mr-1"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          {status}
        </span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">{players}/{maxPlayers}</span>
        </div>
        <AnimatedButton variant="primary" size="sm" onClick={onJoin}>
          Join
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

export default RoomCard;
