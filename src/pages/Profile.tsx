import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import CountUp from "../components/animations/CountUp";
import { Trophy, Target, Gamepad2, Flame, Shield, Star, Zap } from "lucide-react";

const STATS = [
  { label: "Games Played", value: 247, icon: Gamepad2 },
  { label: "Win Rate", value: 68, suffix: "%", icon: Trophy },
  { label: "Accuracy", value: 87, suffix: "%", icon: Target },
  { label: "Win Streak", value: 12, icon: Flame },
];

const BADGES = [
  { name: "Champion", emoji: "🏆", color: "primary" },
  { name: "Speed Demon", emoji: "⚡", color: "secondary" },
  { name: "Sharpshooter", emoji: "🎯", color: "accent" },
  { name: "On Fire", emoji: "🔥", color: "warning" },
  { name: "Brainiac", emoji: "🧠", color: "primary" },
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
          {/* Avatar */}
          <motion.div
            className="glass-neon hud-corners p-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-24 h-24 rounded-2xl flex items-center justify-center font-display text-2xl font-bold text-primary-foreground mb-5 relative"
              style={{ background: "linear-gradient(135deg, hsl(263 70% 58%), hsl(192 95% 50%), hsl(330 85% 60%))" }}
              animate={{
                boxShadow: [
                  "0 0 20px hsl(263 70% 58% / 0.3)",
                  "0 0 40px hsl(263 70% 58% / 0.5)",
                  "0 0 20px hsl(263 70% 58% / 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              PL
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            </motion.div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Player One</h1>
            <p className="text-xs font-mono text-muted-foreground mt-1">RANK #42 • LEVEL 15 • ELITE</p>
            <div className="flex items-center gap-1 mt-3">
              <div className="h-1.5 w-32 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(263 70% 58%), hsl(192 95% 50%))" }}
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </div>
              <span className="text-[9px] font-mono text-muted-foreground">72% to Lvl 16</span>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  className="glass-neon p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -3, boxShadow: "0 0 20px hsl(263 70% 58% / 0.1)" }}
                >
                  <Icon className="w-4 h-4 text-primary/60 mx-auto mb-2" />
                  <p className="text-xl font-bold text-foreground">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[9px] font-mono text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Badges */}
          <motion.div
            className="glass-neon hud-corners p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-heading text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Badges
            </h2>
            <div className="flex flex-wrap gap-2">
              {BADGES.map((b, i) => (
                <motion.span
                  key={b.name}
                  className="px-3 py-1.5 rounded-lg glass text-xs font-mono text-foreground flex items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  <span>{b.emoji}</span>
                  {b.name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Recent games */}
          <motion.div
            className="glass-neon hud-corners p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="font-heading text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              Recent Matches
            </h2>
            <div className="space-y-2">
              {HISTORY.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg glass"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <div>
                    <p className="text-sm font-heading text-foreground">{h.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{h.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-display font-bold ${h.result === "1st" ? "text-warning" : h.result === "2nd" ? "text-foreground" : "text-muted-foreground"}`}>
                      {h.result}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground">{h.score} pts</p>
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
