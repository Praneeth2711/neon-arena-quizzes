import { motion } from "framer-motion";
import AppShell from "../components/layout/AppShell";
import { Trophy, Target, Gamepad2, Flame } from "lucide-react";

const STATS = [
  { label: "Games Played", value: 247, icon: Gamepad2 },
  { label: "Win Rate", value: "68%", icon: Trophy },
  { label: "Accuracy", value: "87%", icon: Target },
  { label: "Streak", value: 12, icon: Flame },
];

const BADGES = ["🏆 Champion", "⚡ Speed Demon", "🎯 Sharpshooter", "🔥 On Fire", "🧠 Brainiac"];

const Profile = () => {
  return (
    <AppShell>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Avatar + name */}
          <motion.div
            className="glass-strong p-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center font-display text-2xl font-bold text-primary-foreground mb-4"
              animate={{ boxShadow: ["0 0 20px hsl(263 70% 58% / 0.3)", "0 0 40px hsl(263 70% 58% / 0.6)", "0 0 20px hsl(263 70% 58% / 0.3)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              PL
            </motion.div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Player One</h1>
            <p className="text-muted-foreground text-sm">Rank #42 · Level 15</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  className="glass p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Badges */}
          <motion.div
            className="glass-strong p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Badges</h2>
            <div className="flex flex-wrap gap-2">
              {BADGES.map((badge, i) => (
                <motion.span
                  key={badge}
                  className="px-3 py-1.5 rounded-full glass text-sm font-heading text-foreground"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
};

export default Profile;
