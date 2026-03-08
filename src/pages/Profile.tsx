import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import CountUp from "../components/animations/CountUp";
import { Trophy, Target, Gamepad2, Flame, Shield, Zap } from "lucide-react";

const STATS = [
  { label: "Games Played", value: 247, icon: Gamepad2 },
  { label: "Win Rate", value: 68, suffix: "%", icon: Trophy },
  { label: "Accuracy", value: 87, suffix: "%", icon: Target },
  { label: "Win Streak", value: 12, icon: Flame },
];

const BADGES = [
  { name: "Champion", emoji: "🏆" },
  { name: "Speed Demon", emoji: "⚡" },
  { name: "Sharpshooter", emoji: "🎯" },
  { name: "On Fire", emoji: "🔥" },
  { name: "Brainiac", emoji: "🧠" },
];

const HISTORY = [
  { name: "Science Showdown", result: "1st", score: 2400, date: "2m ago" },
  { name: "History Masters", result: "3rd", score: 1800, date: "15m ago" },
  { name: "Pop Culture", result: "2nd", score: 2100, date: "1h ago" },
];

const Profile = () => {
  return (
    <AppShell>
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Avatar Card */}
          <motion.div
            className="card-premium p-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mb-5"
              style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
            >
              PL
            </div>
            <h1 className="text-2xl font-bold text-foreground">Player One</h1>
            <p className="text-sm text-muted-foreground mt-1">Rank #42 • Level 15 • Elite</p>
            <div className="flex items-center gap-2 mt-4 w-48">
              <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
              <span className="text-xs text-muted-foreground">72%</span>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  className="card-premium p-4 text-center"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-4 h-4 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold text-foreground">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Badges */}
          <motion.div
            className="card-premium p-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Badges
            </h2>
            <div className="flex flex-wrap gap-2">
              {BADGES.map((b, i) => (
                <motion.span
                  key={b.name}
                  className="px-3 py-1.5 rounded-lg bg-muted text-sm text-foreground flex items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span>{b.emoji}</span>
                  {b.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Recent Matches */}
          <motion.div
            className="card-premium p-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Recent Matches
            </h2>
            <div className="divide-y divide-border">
              {HISTORY.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between py-3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{h.name}</p>
                    <p className="text-xs text-muted-foreground">{h.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${h.result === "1st" ? "text-warning" : "text-muted-foreground"}`}>
                      {h.result}
                    </p>
                    <p className="text-xs text-muted-foreground">{h.score} pts</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
};

export default Profile;
