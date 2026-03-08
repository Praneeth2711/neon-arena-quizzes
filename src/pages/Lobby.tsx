import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import FloatingParticles from "../components/animations/FloatingParticles";
import AnimatedButton from "../components/animations/AnimatedButton";
import { Users, Zap, Flame, Clock, Star } from "lucide-react";

const ROOMS = [
  { id: "1", name: "Quantum Physics", players: 8, max: 10, status: "live" as const, category: "Science", difficulty: "Hard" },
  { id: "2", name: "World History", players: 3, max: 8, status: "waiting" as const, category: "History", difficulty: "Medium" },
  { id: "3", name: "Pop Culture", players: 10, max: 10, status: "live" as const, category: "Entertainment", difficulty: "Easy" },
  { id: "4", name: "AI & Machine Learning", players: 5, max: 8, status: "waiting" as const, category: "Technology", difficulty: "Expert" },
  { id: "5", name: "Geography Masters", players: 6, max: 10, status: "live" as const, category: "Geography", difficulty: "Medium" },
  { id: "6", name: "Sports Arena", players: 2, max: 6, status: "waiting" as const, category: "Sports", difficulty: "Easy" },
  { id: "7", name: "Crypto & Blockchain", players: 7, max: 8, status: "live" as const, category: "Technology", difficulty: "Hard" },
  { id: "8", name: "Classic Literature", players: 4, max: 8, status: "waiting" as const, category: "Books", difficulty: "Medium" },
];

const FILTERS = ["All", "Live", "Waiting"];

const difficultyColors: Record<string, string> = {
  Easy: "text-success",
  Medium: "text-warning",
  Hard: "text-accent",
  Expert: "text-destructive",
};

const Lobby = () => {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const filtered = ROOMS.filter((r) => {
    if (filter === "Live") return r.status === "live";
    if (filter === "Waiting") return r.status === "waiting";
    return true;
  });

  return (
    <AppShell>
      <div className="relative min-h-screen py-10 px-4">
        <FloatingParticles count={25} />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-6 bg-primary/40" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary/70">Arena</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-wider">
              GAME LOBBY
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-mono">Select a room and enter the arena</p>
          </motion.div>

          {/* Filters */}
          <div className="flex gap-2 mb-8">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  filter === f
                    ? "bg-primary/15 text-primary border border-primary/30 neon-glow-purple"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {f === "Live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-destructive mr-1.5 animate-pulse" />}
                {f}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((room, i) => (
              <motion.div
                key={room.id}
                className="glass-neon hud-corners p-5 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" as const }}
                whileHover={{
                  y: -6,
                  rotateX: 3,
                  rotateY: -2,
                  boxShadow: "0 0 35px hsl(263 70% 58% / 0.15)",
                }}
                style={{ transformPerspective: 800 }}
              >
                {/* Animated top accent */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                  style={{ background: "linear-gradient(90deg, hsl(263 70% 58%), hsl(192 95% 50%))" }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-semibold text-foreground truncate">{room.name}</h3>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{room.category}</p>
                  </div>
                  <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    room.status === "live"
                      ? "border-destructive/30 text-destructive bg-destructive/10"
                      : "border-secondary/30 text-secondary bg-secondary/10"
                  }`}>
                    {room.status === "live" && (
                      <motion.span
                        className="inline-block w-1 h-1 rounded-full bg-destructive mr-1"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                    {room.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {room.players}/{room.max}
                  </span>
                  <span className={difficultyColors[room.difficulty]}>{room.difficulty}</span>
                </div>

                <AnimatedButton variant="primary" size="sm" className="w-full" onClick={() => navigate("/room")}>
                  <Zap className="w-3.5 h-3.5" />
                  Join Arena
                </AnimatedButton>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Lobby;
