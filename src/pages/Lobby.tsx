import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { Users, Clock, ArrowRight } from "lucide-react";

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
  Easy: "text-success bg-success/10",
  Medium: "text-warning bg-warning/10",
  Hard: "text-primary bg-primary/10",
  Expert: "text-destructive bg-destructive/10",
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
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Game Lobby</h1>
            <p className="text-muted-foreground mt-2">Find a room and start playing</p>
          </motion.div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {f === "Live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse" />}
                {f}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((room, i) => (
              <motion.div
                key={room.id}
                className="card-premium p-5 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground truncate">{room.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{room.category}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    room.status === "live"
                      ? "bg-success/10 text-success"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {room.status === "live" && (
                      <motion.span
                        className="inline-block w-1.5 h-1.5 rounded-full bg-success mr-1"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                    {room.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {room.players}/{room.max}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColors[room.difficulty]}`}>
                    {room.difficulty}
                  </span>
                </div>

                <motion.button
                  onClick={() => navigate("/room")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Join Room
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Lobby;
