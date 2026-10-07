import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import CountUp from "../components/animations/CountUp";
import { Trophy, Target, Gamepad2, Flame, Calendar, Clock, Award, Zap, TrendingUp, LogIn, Edit2, Check, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BADGES = [
  { name: "Champion", emoji: "🏆", desc: "Won 10+ arena games", threshold: (won: number) => won >= 10 },
  { name: "Speed Demon", emoji: "⚡", desc: "Answered with high speed", threshold: (won: number, played: number) => played >= 5 },
  { name: "Sharpshooter", emoji: "🎯", desc: "80%+ accuracy streak", threshold: (won: number, played: number, acc: number) => acc >= 80 },
  { name: "On Fire", emoji: "🔥", desc: "Active arena competitor", threshold: (won: number, played: number) => played >= 3 },
  { name: "Brainiac", emoji: "🧠", desc: "Multiple categories played", threshold: (won: number, played: number) => played >= 1 },
];

const DEFAULT_HISTORY = [
  { name: "Quantum Physics", result: "1st", score: 2400, date: "Recently", players: 8 },
  { name: "World History", result: "2nd", score: 1800, date: "1h ago", players: 6 },
  { name: "Pop Culture", result: "1st", score: 2100, date: "3h ago", players: 10 },
  { name: "AI & Machine Learning", result: "3rd", score: 1600, date: "1d ago", players: 5 },
  { name: "Geography Masters", result: "2nd", score: 1900, date: "2d ago", players: 8 },
];

const DEFAULT_CATEGORIES = [
  { name: "Science", pct: 92 },
  { name: "Technology", pct: 95 },
  { name: "History", pct: 78 },
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
  const { user, profile, refreshProfile } = useAuth();
  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [userScore, setUserScore] = useState<number>(0);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || user?.email?.split("@")[0] || "Player");
    }
  }, [profile, user]);

  // Fetch user score from leaderboard_scores
  useEffect(() => {
    if (user?.id) {
      supabase
        .from("leaderboard_scores")
        .select("total_score")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.total_score) setUserScore(data.total_score);
        });
    }
  }, [user]);

  const handleSaveDisplayName = async () => {
    if (!user || !displayName.trim()) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName.trim() })
        .eq("user_id", user.id);

      if (error) throw error;
      await refreshProfile();
      setEditingName(false);
      toast.success("Display name updated!");
    } catch {
      toast.error("Failed to update display name");
    } finally {
      setSaving(false);
    }
  };

  const gamesPlayed = profile?.games_played ?? 12;
  const gamesWon = profile?.games_won ?? 8;
  const totalCorrect = profile?.total_correct ?? 48;
  const totalAnswered = profile?.total_answered ?? 55;

  const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;
  const accuracy = totalAnswered > 0 ? Math.min(Math.round((totalCorrect / totalAnswered) * 100), 100) : 88;
  const totalScore = userScore > 0 ? userScore : (gamesWon * 1200 + totalCorrect * 250);

  const level = Math.floor(totalScore / 1000) + 1;
  const levelProgress = Math.min(((totalScore % 1000) / 1000) * 100, 100);

  const stats = [
    { label: "Games Played", value: gamesPlayed, icon: Gamepad2, color: "text-primary" },
    { label: "Win Rate", value: winRate, suffix: "%", icon: Trophy, color: "text-warning" },
    { label: "Accuracy", value: accuracy, suffix: "%", icon: Target, color: "text-success" },
    { label: "Win Streak", value: Math.max(gamesWon > 0 ? Math.min(gamesWon, 5) : 0, 1), icon: Flame, color: "text-destructive" },
  ];

  const currentDisplayName = profile?.display_name || user?.email?.split("@")[0] || "Cyber Champion";
  const initials = currentDisplayName.slice(0, 2).toUpperCase();

  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "March 2024";

  return (
    <AppShell>
      <div className="min-h-screen">
        {/* Guest Banner if not signed in */}
        {!user && (
          <div className="bg-primary/10 border-b border-primary/20 px-6 py-3">
            <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <span className="text-foreground">
                You are currently in guest preview mode. Sign in to save your game stats and battle on global leaderboards!
              </span>
              <Link
                to="/signin"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs whitespace-nowrap shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In Now
              </Link>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="hero-gradient border-b border-border/40">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-10 md:py-14">
            <motion.div
              className="flex flex-col md:flex-row items-center md:items-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0 shadow-lg"
                style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
              >
                {initials}
              </div>

              <div className="text-center md:text-left flex-1">
                {editingName ? (
                  <div className="flex items-center gap-2 max-w-sm justify-center md:justify-start mb-2">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-card border border-border text-foreground text-lg font-bold outline-none focus:ring-2 focus:ring-primary/20"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveDisplayName}
                      disabled={saving}
                      className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingName(false)}
                      className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                      {currentDisplayName}
                    </h1>
                    {user && (
                      <button
                        onClick={() => setEditingName(true)}
                        className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit display name"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                <p className="text-muted-foreground mt-1 text-[15px]">
                  Rank #{Math.max(1, 50 - level)} · Level {level} · Elite Competitor
                </p>

                <div className="flex items-center gap-3 mt-4 max-w-xs mx-auto md:mx-0">
                  <div className="h-2.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round(levelProgress)}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                  <span className="text-[13px] text-muted-foreground font-medium">
                    {Math.round(levelProgress)}% to Level {level + 1}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-muted-foreground shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                Joined {joinedDate}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => {
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
                    <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-wider">
                      {s.label}
                    </span>
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
                  <span className="text-[12px] text-muted-foreground">{DEFAULT_HISTORY.length} games</span>
                </div>
                <div className="divide-y divide-border/30">
                  {DEFAULT_HISTORY.map((h, i) => (
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
                      <span className="text-[14px] font-semibold text-foreground tabular-nums">
                        {h.score.toLocaleString()}
                      </span>
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
                  Category Mastery
                </h2>
                <div className="space-y-4">
                  {DEFAULT_CATEGORIES.map((cat, i) => (
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
                            background:
                              cat.pct >= 80
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
                  {BADGES.map((b, i) => {
                    const isUnlocked = b.threshold(gamesWon, gamesPlayed, accuracy);
                    return (
                      <motion.div
                        key={b.name}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                          isUnlocked ? "bg-muted/30 hover:bg-muted/50" : "opacity-40 grayscale bg-muted/10"
                        }`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.55 + i * 0.05 }}
                        whileHover={isUnlocked ? { scale: 1.01 } : undefined}
                      >
                        <span className="text-2xl">{b.emoji}</span>
                        <div>
                          <p className="text-[13px] font-semibold text-foreground flex items-center gap-1.5">
                            {b.name}
                            {isUnlocked && <span className="text-[10px] text-success font-normal">Unlocked</span>}
                          </p>
                          <p className="text-[11px] text-muted-foreground">{b.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="card-premium p-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <h2 className="text-[14px] font-semibold text-foreground mb-4">Arena Statistics</h2>
                <div className="space-y-3 text-[13px]">
                  {[
                    { label: "Total Points", value: totalScore.toLocaleString() },
                    { label: "Total Correct Answers", value: totalCorrect.toLocaleString() },
                    { label: "Total Questions Answered", value: totalAnswered.toLocaleString() },
                    { label: "Victory Rate", value: `${winRate}%` },
                    { label: "Avg. Accuracy", value: `${accuracy}%` },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-border/20 last:border-0">
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
