import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import PlayerAvatar from "../components/game/PlayerAvatar";

const TOP_PLAYERS = [
  { id: "1", name: "NeonKnight", score: 45200, wins: 128, accuracy: 94 },
  { id: "2", name: "CyberQueen", score: 42100, wins: 115, accuracy: 91 },
  { id: "3", name: "PixelMaster", score: 38900, wins: 102, accuracy: 89 },
  { id: "4", name: "DataWizard", score: 35400, wins: 95, accuracy: 87 },
  { id: "5", name: "QuantumAce", score: 32800, wins: 88, accuracy: 85 },
  { id: "6", name: "ByteRunner", score: 29300, wins: 76, accuracy: 83 },
  { id: "7", name: "GlitchHero", score: 27100, wins: 71, accuracy: 82 },
  { id: "8", name: "VoltStrike", score: 24800, wins: 65, accuracy: 80 },
];

const podiumColors = [
  "from-yellow-400/20 to-yellow-600/5 border-yellow-500/30",
  "from-gray-300/20 to-gray-500/5 border-gray-400/30",
  "from-amber-600/20 to-amber-800/5 border-amber-600/30",
];

const Leaderboard = () => {
  const top3 = TOP_PLAYERS.slice(0, 3);
  const rest = TOP_PLAYERS.slice(3);

  return (
    <AppShell>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="font-display text-3xl md:text-4xl font-bold text-foreground text-glow-purple mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            GLOBAL RANKINGS
          </motion.h1>

          {/* Podium */}
          <div className="grid grid-cols-3 gap-4 mb-12 items-end">
            {[1, 0, 2].map((idx) => {
              const p = top3[idx];
              const heights = ["h-40", "h-52", "h-32"];
              return (
                <motion.div
                  key={p.id}
                  className={`glass bg-gradient-to-t ${podiumColors[idx]} p-4 text-center flex flex-col items-center justify-end ${heights[idx]}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.15 }}
                >
                  {idx === 0 && (
                    <motion.span
                      className="text-2xl mb-2"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      👑
                    </motion.span>
                  )}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-display text-sm font-bold text-primary-foreground mb-2">
                    {p.name.slice(0, 2)}
                  </div>
                  <p className="font-heading text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.score.toLocaleString()} pts</p>
                  <span className="font-display text-lg text-primary mt-1">#{idx + 1}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Rest */}
          <div className="glass-strong p-4 space-y-2">
            {rest.map((p, i) => (
              <motion.div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
              >
                <PlayerAvatar name={p.name} score={p.score} rank={i + 4} />
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{p.wins}W</span>
                  <span>{p.accuracy}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Leaderboard;
