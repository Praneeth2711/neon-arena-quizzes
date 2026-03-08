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
    <div className="card-premium p-4 h-full">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Trophy className="w-4 h-4 text-primary" />
        Leaderboard
      </h3>
      <div className="space-y-1">
        <AnimatePresence>
          {sorted.map((p, i) => {
            const hue = p.name.charCodeAt(0) * 7 % 360;
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                  i === 0 ? "bg-primary/5" : "hover:bg-muted/50"
                }`}
              >
                <span className={`text-xs font-semibold w-5 text-center ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                  {i + 1}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
                  style={{ background: `linear-gradient(135deg, hsl(${hue} 60% 50%), hsl(${(hue + 40) % 360} 70% 55%))` }}
                >
                  {p.name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.score.toLocaleString()}</p>
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
