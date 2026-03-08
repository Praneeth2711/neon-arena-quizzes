import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

interface Player {
  id: string;
  name: string;
  score: number;
}

const AnimatedLeaderboard = ({ players }: { players: Player[] }) => {
  const sorted = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="glass-neon hud-corners p-4 h-full">
      <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/70 mb-4 flex items-center gap-2">
        <Trophy className="w-3.5 h-3.5" />
        Leaderboard
      </h3>
      <div className="space-y-1.5">
        <AnimatePresence>
          {sorted.map((p, i) => {
            const hue = p.name.charCodeAt(0) * 7 % 360;
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${
                  i === 0 ? "bg-primary/8 border border-primary/15" : "hover:bg-muted/20"
                }`}
              >
                <span className={`font-display text-[10px] w-5 text-center ${
                  i === 0 ? "text-primary text-glow-purple" : "text-muted-foreground"
                }`}>
                  {i + 1}
                </span>
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-display font-bold text-primary-foreground"
                  style={{ background: `linear-gradient(135deg, hsl(${hue}, 70%, 45%), hsl(${(hue + 40) % 360}, 70%, 55%))` }}
                >
                  {p.name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-heading truncate text-foreground">{p.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{p.score.toLocaleString()}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedLeaderboard;
