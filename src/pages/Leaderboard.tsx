import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import CountUp from "../components/animations/CountUp";
import { Crown, Medal, Award } from "lucide-react";

const PLAYERS = [
  { id: "1", name: "NeonKnight", score: 45200, wins: 128, accuracy: 94 },
  { id: "2", name: "CyberQueen", score: 42100, wins: 115, accuracy: 91 },
  { id: "3", name: "PixelMaster", score: 38900, wins: 102, accuracy: 89 },
  { id: "4", name: "DataWizard", score: 35400, wins: 95, accuracy: 87 },
  { id: "5", name: "QuantumAce", score: 32800, wins: 88, accuracy: 85 },
  { id: "6", name: "ByteRunner", score: 29300, wins: 76, accuracy: 83 },
  { id: "7", name: "GlitchHero", score: 27100, wins: 71, accuracy: 82 },
  { id: "8", name: "VoltStrike", score: 24800, wins: 65, accuracy: 80 },
];

const podiumOrder = [1, 0, 2]; // Silver, Gold, Bronze positions
const podiumHeight = ["h-36", "h-48", "h-28"];
const podiumIcons = [Crown, Crown, Medal];
const podiumColors = [
  "from-yellow-400/20 to-yellow-600/5 border-yellow-500/30",
  "from-gray-300/15 to-gray-500/5 border-gray-400/25",
  "from-amber-600/15 to-amber-800/5 border-amber-600/25",
];

const Leaderboard = () => {
  const top3 = PLAYERS.slice(0, 3);
  const rest = PLAYERS.slice(3);

  return (
    <AppShell>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary/30" />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/70">Rankings</span>
              <div className="h-px w-8 bg-primary/30" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-wider">GLOBAL LEADERBOARD</h1>
          </motion.div>

          {/* Podium */}
          <div className="grid grid-cols-3 gap-4 mb-12 items-end max-w-2xl mx-auto">
            {podiumOrder.map((idx, pos) => {
              const p = top3[idx];
              const Icon = podiumIcons[idx];
              const hue = p.name.charCodeAt(0) * 7 % 360;
              return (
                <motion.div
                  key={p.id}
                  className={`glass-neon animated-border-glow bg-gradient-to-t ${podiumColors[idx]} p-5 text-center flex flex-col items-center justify-end ${podiumHeight[pos]}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + pos * 0.15, duration: 0.6 }}
                >
                  {idx === 0 && (
                    <motion.div
                      animate={{ y: [0, -6, 0], rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Crown className="w-7 h-7 text-yellow-400 mb-2" />
                    </motion.div>
                  )}
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-display text-sm font-bold text-primary-foreground mb-3"
                    style={{ background: `linear-gradient(135deg, hsl(${hue}, 70%, 45%), hsl(${(hue + 40) % 360}, 70%, 55%))` }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {p.name.slice(0, 2)}
                  </motion.div>
                  <p className="font-heading text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    <CountUp target={p.score} />
                  </p>
                  <span className="font-display text-lg text-primary mt-2">#{idx + 1}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Rest */}
          <div className="glass-neon hud-corners p-4 space-y-1.5">
            {rest.map((p, i) => {
              const hue = p.name.charCodeAt(0) * 7 % 360;
              return (
                <motion.div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-lg glass group hover:bg-primary/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs w-6 text-center text-muted-foreground">#{i + 4}</span>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-heading text-xs font-bold text-primary-foreground"
                      style={{ background: `linear-gradient(135deg, hsl(${hue}, 70%, 45%), hsl(${(hue + 40) % 360}, 70%, 55%))` }}
                    >
                      {p.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-heading text-foreground">{p.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">{p.score.toLocaleString()} pts</p>
                    </div>
                  </div>
                  <div className="flex gap-4 text-[10px] font-mono text-muted-foreground">
                    <span>{p.wins}W</span>
                    <span>{p.accuracy}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Leaderboard;
