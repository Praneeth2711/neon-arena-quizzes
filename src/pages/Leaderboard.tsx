import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import CountUp from "../components/animations/CountUp";
import { Crown, Medal, Trophy } from "lucide-react";

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

const podiumOrder = [1, 0, 2];
const podiumHeight = ["h-32", "h-44", "h-28"];

const Leaderboard = () => {
  const top3 = PLAYERS.slice(0, 3);
  const rest = PLAYERS.slice(3);

  return (
    <AppShell>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-primary mb-2">Rankings</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Global Leaderboard</h1>
          </motion.div>

          {/* Podium */}
          <div className="grid grid-cols-3 gap-4 mb-12 items-end max-w-xl mx-auto">
            {podiumOrder.map((idx, pos) => {
              const p = top3[idx];
              const hue = p.name.charCodeAt(0) * 7 % 360;
              return (
                <motion.div
                  key={p.id}
                  className={`card-premium p-5 text-center flex flex-col items-center justify-end ${podiumHeight[pos]}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + pos * 0.15 }}
                  whileHover={{ y: -4 }}
                >
                  {idx === 0 && (
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="w-6 h-6 text-warning mb-2" />
                    </motion.div>
                  )}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground mb-3"
                    style={{ background: `linear-gradient(135deg, hsl(${hue} 60% 50%), hsl(${(hue + 40) % 360} 70% 55%))` }}
                  >
                    {p.name.slice(0, 2)}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <CountUp target={p.score} />
                  </p>
                  <span className="text-lg font-bold text-primary mt-2">#{idx + 1}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Table */}
          <div className="card-premium divide-y divide-border">
            {rest.map((p, i) => {
              const hue = p.name.charCodeAt(0) * 7 % 360;
              return (
                <motion.div
                  key={p.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-muted-foreground w-6 text-center">#{i + 4}</span>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground"
                      style={{ background: `linear-gradient(135deg, hsl(${hue} 60% 50%), hsl(${(hue + 40) % 360} 70% 55%))` }}
                    >
                      {p.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.score.toLocaleString()} pts</p>
                    </div>
                  </div>
                  <div className="flex gap-6 text-xs text-muted-foreground">
                    <span>{p.wins} wins</span>
                    <span>{p.accuracy}% acc</span>
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
