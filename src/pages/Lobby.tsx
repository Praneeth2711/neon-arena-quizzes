import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { Users, ArrowRight, Search, Filter, Plus, Clock, Zap, Globe } from "lucide-react";

const ROOMS = [
  { id: "1", name: "Quantum Physics", players: 8, max: 10, status: "live" as const, category: "Science", difficulty: "Hard", host: "NeonKnight", started: "2m ago" },
  { id: "2", name: "World History", players: 3, max: 8, status: "waiting" as const, category: "History", difficulty: "Medium", host: "CyberQueen", started: "Just now" },
  { id: "3", name: "Pop Culture", players: 10, max: 10, status: "live" as const, category: "Entertainment", difficulty: "Easy", host: "PixelMaster", started: "5m ago" },
  { id: "4", name: "AI & Machine Learning", players: 5, max: 8, status: "waiting" as const, category: "Technology", difficulty: "Expert", host: "DataWizard", started: "1m ago" },
  { id: "5", name: "Geography Masters", players: 6, max: 10, status: "live" as const, category: "Geography", difficulty: "Medium", host: "GlitchHero", started: "8m ago" },
  { id: "6", name: "Sports Arena", players: 2, max: 6, status: "waiting" as const, category: "Sports", difficulty: "Easy", host: "VoltStrike", started: "Just now" },
  { id: "7", name: "Crypto & Blockchain", players: 7, max: 8, status: "live" as const, category: "Technology", difficulty: "Hard", host: "ByteRunner", started: "3m ago" },
  { id: "8", name: "Classic Literature", players: 4, max: 8, status: "waiting" as const, category: "Books", difficulty: "Medium", host: "QuantumAce", started: "30s ago" },
];

const FILTERS = ["All", "Live", "Waiting"];

const difficultyConfig: Record<string, { color: string; bg: string }> = {
  Easy: { color: "text-success", bg: "bg-success/8" },
  Medium: { color: "text-warning", bg: "bg-warning/8" },
  Hard: { color: "text-primary", bg: "bg-primary/8" },
  Expert: { color: "text-destructive", bg: "bg-destructive/8" },
};

const categoryIcons: Record<string, string> = {
  Science: "🔬", History: "📜", Entertainment: "🎬", Technology: "💻",
  Geography: "🌍", Sports: "⚽", Books: "📚",
};

const Lobby = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = ROOMS.filter((r) => {
    if (filter === "Live") return r.status === "live";
    if (filter === "Waiting") return r.status === "waiting";
    return true;
  }).filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const liveCount = ROOMS.filter((r) => r.status === "live").length;
  const totalPlayers = ROOMS.reduce((sum, r) => sum + r.players, 0);

  return (
    <AppShell>
      <div className="min-h-screen">
        {/* Page header with gradient */}
        <div className="hero-gradient border-b border-border/40">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10 md:py-14">
            <motion.div
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Game Lobby</h1>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-[12px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    {liveCount} live
                  </span>
                </div>
                <p className="text-muted-foreground text-[15px] max-w-md">
                  Join a room or create your own. {totalPlayers} players currently competing across {ROOMS.length} rooms.
                </p>
              </div>

              <motion.button
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-semibold text-primary-foreground shrink-0"
                style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 24px hsl(245 58% 51% / 0.25)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                Create Room
              </motion.button>
            </motion.div>

            {/* Search + Filters */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search rooms..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div className="flex gap-1.5">
                {FILTERS.map((f) => (
                  <motion.button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                      filter === f
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {f === "Live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />}
                    {f}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            className="flex items-center gap-6 py-5 border-b border-border/40 text-[13px] text-muted-foreground overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <span className="flex items-center gap-1.5 shrink-0">
              <Globe className="w-3.5 h-3.5" />
              {ROOMS.length} rooms
            </span>
            <span className="flex items-center gap-1.5 shrink-0">
              <Users className="w-3.5 h-3.5" />
              {totalPlayers} players online
            </span>
            <span className="flex items-center gap-1.5 shrink-0">
              <Zap className="w-3.5 h-3.5" />
              {liveCount} active matches
            </span>
          </motion.div>
        </div>

        {/* Room Grid */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((room, i) => {
              const isFull = room.players >= room.max;
              const fillPct = (room.players / room.max) * 100;
              return (
                <motion.div
                  key={room.id}
                  className="card-premium p-0 overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  {/* Card header with category indicator */}
                  <div className="p-5 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{categoryIcons[room.category] || "📝"}</span>
                        <div>
                          <h3 className="text-[15px] font-semibold text-foreground leading-tight">{room.name}</h3>
                          <p className="text-[12px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
                            <span>{room.category}</span>
                            <span className="text-border">·</span>
                            <span>by {room.host}</span>
                          </p>
                        </div>
                      </div>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        room.status === "live"
                          ? "bg-success/10 text-success"
                          : "bg-primary/10 text-primary"
                      }`}>
                        {room.status === "live" && (
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-current"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                          />
                        )}
                        {room.status === "live" ? "Live" : "Waiting"}
                      </span>
                    </div>

                    {/* Metadata row */}
                    <div className="flex items-center gap-3 text-[13px] text-muted-foreground mt-4">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {room.players}/{room.max}
                      </span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${difficultyConfig[room.difficulty]?.bg} ${difficultyConfig[room.difficulty]?.color}`}>
                        {room.difficulty}
                      </span>
                      <span className="flex items-center gap-1 ml-auto text-[12px]">
                        <Clock className="w-3 h-3" />
                        {room.started}
                      </span>
                    </div>

                    {/* Capacity bar */}
                    <div className="mt-4">
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: isFull
                              ? "hsl(var(--destructive))"
                              : "linear-gradient(90deg, hsl(245 58% 51%), hsl(262 83% 58%))",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${fillPct}%` }}
                          transition={{ delay: 0.2 + i * 0.04, duration: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card action footer */}
                  <div className="px-5 py-3.5 border-t border-border/40 bg-muted/20">
                    <motion.button
                      onClick={() => navigate("/room")}
                      disabled={isFull}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                        isFull
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "text-primary-foreground"
                      }`}
                      style={!isFull ? { background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" } : undefined}
                      whileHover={!isFull ? { scale: 1.01, boxShadow: "0 4px 16px hsl(245 58% 51% / 0.2)" } : {}}
                      whileTap={!isFull ? { scale: 0.99 } : {}}
                    >
                      {isFull ? "Room Full" : "Join Room"}
                      {!isFull && <ArrowRight className="w-3.5 h-3.5" />}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground text-[15px]">No rooms found. Try a different filter.</p>
            </motion.div>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default Lobby;
