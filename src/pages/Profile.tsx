import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import CountUp from "../components/animations/CountUp";
import { Trophy, Target, Gamepad2, Flame, Shield, Zap, TrendingUp, Calendar, Clock, Award } from "lucide-react";

const STATS = [
  { label: "Games Played", value: 247, icon: Gamepad2, color: "text-primary" },
  { label: "Win Rate", value: 68, suffix: "%", icon: Trophy, color: "text-warning" },
  { label: "Accuracy", value: 87, suffix: "%", icon: Target, color: "text-success" },
  { label: "Win Streak", value: 12, icon: Flame, color: "text-destructive" },
];

const BADGES = [
  { name: "Champion", emoji: "🏆", desc: "Won 100+ games" },
  { name: "Speed Demon", emoji: "⚡", desc: "Answered in < 2s" },
  { name: "Sharpshooter", emoji: "🎯", desc: "95% accuracy streak" },
  { name: "On Fire", emoji: "🔥", desc: "10 win streak" },
  { name: "Brainiac", emoji: "🧠", desc: "All categories mastered" },
];

const HISTORY = [
  { name: "Science Showdown", result: "1st", score: 2400, date: "2m ago", players: 8 },
  { name: "History Masters", result: "3rd", score: 1800, date: "15m ago", players: 6 },
  { name: "Pop Culture", result: "2nd", score: 2100, date: "1h ago", players: 10 },
  { name: "AI & Machine Learning", result: "1st", score: 2600, date: "3h ago", players: 5 },
  { name: "Geography Challenge", result: "4th", score: 1500, date: "5h ago", players: 8 },
];

const CATEGORIES = [
  { name: "Science", pct: 92 },
  { name: "History", pct: 78 },
  { name: "Technology", pct: 95 },
  { name: "Geography", pct: 65 },
  { name: "Sports", pct: 45 },
];

const resultColor = (r: string) => {
  if (r === "1st") return "text-warning bg-warning/10";
  if (r === "2nd") return "text-primary bg-primary/10";
  if (r === "3rd") return "text-accent bg-accent/10";
  return "text-muted-foreground bg-muted";
};

const Profile = () => {
  return (
    <AppShell>
      <div className="min-h-screen">
        {/* Header */}
        <div className="hero-gradient border-b border-border/40">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 md:py-14">
            <motion.div
              className="flex flex-col md:flex-row items-center md:items-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
              >
                PL
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Player One</h1>
                <p className="text-muted-foreground mt-1 text-[15px]">Rank #42 · Level 15 · Elite</p>
                <div className="flex items-center gap-3 mt-4 max-w-xs mx-auto md:mx-0">
                  <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
                      initial={{ width: 0 }}
                      animate={{ width: "72%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                  <span className="text-[13px] text-muted-foreground font-medium">72% to Level 16</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                Joined March 2024
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  className="card-premium p-5"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">{s.label}</span>
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <p className="text-3xl font-bold text-foreground tracking-tight">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            {/* Left column */}
            <div className="space-y-6">
              {/* Recent Matches */}
              <motion.div
                className="card-premium overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between">
                  <h2 className="text-[14px] font-semibold text-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Recent Matches
                  </h2>
                  <span className="text-[12px] text-muted-foreground">{HISTORY.length} games</span>
                </div>
                <div className="divide-y divide-border/30">
                  {HISTORY.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/20 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${resultColor(h.result)}`}>
                          {h.result}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[14px] font-medium text-foreground truncate">{h.name}</p>
                          <p className="text-[12px] text-muted-foreground flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {h.date} · {h.players} players
                          </p>
                        </div>
                      </div>
                      <span className="text-[14px] font-semibold text-foreground tabular-nums">{h.score.toLocaleString()}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Category Performance */}
              <motion.div
                className="card-premium p-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-[14px] font-semibold text-foreground flex items-center gap-2 mb-5">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Category Performance
                </h2>
                <div className="space-y-4">
                  {CATEGORIES.map((cat, i) => (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[13px] font-medium text-foreground">{cat.name}</span>
                        <span className="text-[12px] text-muted-foreground font-medium">{cat.pct}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: cat.pct >= 80
                              ? "linear-gradient(90deg, hsl(245 58% 51%), hsl(262 83% 58%))"
                              : cat.pct >= 60
                                ? "hsl(var(--primary))"
                                : "hsl(var(--muted-foreground) / 0.4)",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.pct}%` }}
                          transition={{ delay: 0.8 + i * 0.05, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Badges */}
              <motion.div
                className="card-premium p-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <h2 className="text-[14px] font-semibold text-foreground flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-primary" />
                  Badges Earned
                </h2>
                <div className="space-y-2">
                  {BADGES.map((b, i) => (
                    <motion.div
                      key={b.name}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 + i * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <span className="text-2xl">{b.emoji}</span>
                      <div>
                        <p className="text-[13px] font-semibold text-foreground">{b.name}</p>
                        <p className="text-[11px] text-muted-foreground">{b.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="card-premium p-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <h2 className="text-[14px] font-semibold text-foreground mb-4">Quick Stats</h2>
                <div className="space-y-3 text-[13px]">
                  {[
                    { label: "Best Score", value: "2,800" },
                    { label: "Avg. Answer Time", value: "4.2s" },
                    { label: "Favorite Category", value: "Technology" },
                    { label: "Total Points", value: "48,200" },
                    { label: "Perfect Games", value: "14" },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Profile;
