import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import CountUp from "../components/animations/CountUp";
import { Crown, TrendingUp, TrendingDown, Minus, Trophy, Medal, Award } from "lucide-react";

const PLAYERS = [
  { id: "1", name: "NeonKnight", score: 45200, wins: 128, accuracy: 94, trend: "up" as const, games: 412 },
  { id: "2", name: "CyberQueen", score: 42100, wins: 115, accuracy: 91, trend: "up" as const, games: 389 },
  { id: "3", name: "PixelMaster", score: 38900, wins: 102, accuracy: 89, trend: "down" as const, games: 356 },
  { id: "4", name: "DataWizard", score: 35400, wins: 95, accuracy: 87, trend: "up" as const, games: 320 },
  { id: "5", name: "QuantumAce", score: 32800, wins: 88, accuracy: 85, trend: "same" as const, games: 298 },
  { id: "6", name: "ByteRunner", score: 29300, wins: 76, accuracy: 83, trend: "down" as const, games: 275 },
  { id: "7", name: "GlitchHero", score: 27100, wins: 71, accuracy: 82, trend: "up" as const, games: 260 },
  { id: "8", name: "VoltStrike", score: 24800, wins: 65, accuracy: 80, trend: "same" as const, games: 245 },
  { id: "9", name: "StarForge", score: 22400, wins: 58, accuracy: 78, trend: "down" as const, games: 230 },
  { id: "10", name: "CosmicRay", score: 20100, wins: 52, accuracy: 76, trend: "up" as const, games: 218 },
];

const podiumOrder = [1, 0, 2];
const podiumIcons = [Trophy, Crown, Medal];
const podiumGradients = [
  "linear-gradient(135deg, hsl(215 20% 65%), hsl(215 25% 75%))",
  "linear-gradient(135deg, hsl(38 92% 50%), hsl(45 95% 60%))",
  "linear-gradient(135deg, hsl(25 60% 55%), hsl(30 70% 65%))",
];

const TrendIcon = ({ trend }: { trend: "up" | "down" | "same" }) => {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-success" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-destructive" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

const Leaderboard = () => {
  const top3 = PLAYERS.slice(0, 3);
  const rest = PLAYERS.slice(3);

  return (
    <AppShell>
      <div className="min-h-screen">
        {/* Header */}
        <div className="hero-gradient border-b border-border/40">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 md:py-14">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-[13px] font-semibold text-primary mb-2.5 tracking-wide uppercase">Rankings</p>
              <h1 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-tight">
                Global Leaderboard
              </h1>
              <p className="text-muted-foreground mt-3 text-[15px] max-w-md mx-auto">
                Top performers across all categories. Updated in real-time.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10">
          {/* Podium - Top 3 */}
          <div className="grid grid-cols-3 gap-3 md:gap-5 mb-12 max-w-2xl mx-auto items-end">
            {podiumOrder.map((idx, pos) => {
              const p = top3[idx];
              const hue = p.name.charCodeAt(0) * 7 % 360;
              const isFirst = idx === 0;
              const PodiumIcon = podiumIcons[pos];

              return (
                <motion.div
                  key={p.id}
                  className={`card-premium text-center flex flex-col items-center overflow-hidden ${
                    isFirst ? "pb-6 pt-5" : "pb-5 pt-4"
                  }`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + pos * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  {/* Rank badge */}
                  <div className="w-full h-1 mb-4" style={{ background: podiumGradients[pos] }} />

                  {isFirst && (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="mb-2"
                    >
                      <Crown className="w-6 h-6 text-warning" />
                    </motion.div>
                  )}

                  <div
                    className={`${isFirst ? "w-16 h-16 text-lg" : "w-12 h-12 text-sm"} rounded-full flex items-center justify-center font-bold text-primary-foreground mb-3`}
                    style={{ background: `linear-gradient(135deg, hsl(${hue} 60% 50%), hsl(${(hue + 40) % 360} 70% 55%))` }}
                  >
                    {p.name.slice(0, 2)}
                  </div>

                  <p className={`${isFirst ? "text-[15px]" : "text-[14px]"} font-semibold text-foreground`}>{p.name}</p>
                  <p className="text-[13px] text-muted-foreground mt-0.5 font-medium">
                    <CountUp target={p.score} /> pts
                  </p>

                  <div className="flex items-center gap-1.5 mt-3 text-[12px] text-muted-foreground">
                    <span>{p.wins} wins</span>
                    <span className="text-border">·</span>
                    <span>{p.accuracy}%</span>
                  </div>

                  <span className={`${isFirst ? "text-2xl" : "text-lg"} font-bold text-primary mt-3`}>#{idx + 1}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Rankings Table */}
          <motion.div
            className="card-premium overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Table Header */}
            <div className="grid grid-cols-[3rem_1fr_6rem_5rem_5rem_4rem] md:grid-cols-[3rem_1fr_7rem_6rem_6rem_5rem] items-center px-5 py-3 border-b border-border/60 bg-muted/30 text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Rank</span>
              <span>Player</span>
              <span className="text-right">Score</span>
              <span className="text-right hidden md:block">Wins</span>
              <span className="text-right">Accuracy</span>
              <span className="text-center">Trend</span>
            </div>

            {rest.map((p, i) => {
              const hue = p.name.charCodeAt(0) * 7 % 360;
              const rank = i + 4;
              return (
                <motion.div
                  key={p.id}
                  className="grid grid-cols-[3rem_1fr_6rem_5rem_5rem_4rem] md:grid-cols-[3rem_1fr_7rem_6rem_6rem_5rem] items-center px-5 py-4 border-b border-border/30 hover:bg-muted/20 transition-colors group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.04, duration: 0.35 }}
                >
                  <span className="text-[14px] font-semibold text-muted-foreground">{rank}</span>
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-primary-foreground shrink-0"
                      style={{ background: `linear-gradient(135deg, hsl(${hue} 60% 50%), hsl(${(hue + 40) % 360} 70% 55%))` }}
                    >
                      {p.name.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-[12px] text-muted-foreground">{p.games} games</p>
                    </div>
                  </div>
                  <span className="text-[14px] font-semibold text-foreground text-right tabular-nums">
                    {p.score.toLocaleString()}
                  </span>
                  <span className="text-[13px] text-muted-foreground text-right hidden md:block">{p.wins}</span>
                  <span className="text-[13px] text-muted-foreground text-right">{p.accuracy}%</span>
                  <span className="flex justify-center">
                    <TrendIcon trend={p.trend} />
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
};

export default Leaderboard;
