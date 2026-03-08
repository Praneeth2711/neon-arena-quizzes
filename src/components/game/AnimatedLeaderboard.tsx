import { motion, AnimatePresence } from "framer-motion";
import PlayerAvatar from "./PlayerAvatar";

interface Player {
  id: string;
  name: string;
  score: number;
}

const AnimatedLeaderboard = ({ players }: { players: Player[] }) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="glass-strong p-4 h-full">
      <h3 className="font-heading text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
        Leaderboard
      </h3>
      <div className="space-y-2">
        <AnimatePresence>
          {sorted.map((player, i) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`p-2 rounded-lg ${i === 0 ? "bg-primary/10 border border-primary/20" : ""}`}
            >
              <PlayerAvatar name={player.name} score={player.score} rank={i + 1} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedLeaderboard;
