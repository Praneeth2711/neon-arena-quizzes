import { motion } from "framer-motion";
import { useState } from "react";
import RoomCard from "../components/game/RoomCard";
import FloatingParticles from "../components/animations/FloatingParticles";
import AppShell from "../components/layout/AppShell";
import { useNavigate } from "react-router-dom";

const ROOMS = [
  { id: "1", name: "Science Showdown", players: 8, maxPlayers: 10, status: "live" as const, category: "Science" },
  { id: "2", name: "History Hunters", players: 3, maxPlayers: 8, status: "waiting" as const, category: "History" },
  { id: "3", name: "Pop Culture Clash", players: 10, maxPlayers: 10, status: "live" as const, category: "Entertainment" },
  { id: "4", name: "Tech Trivia", players: 5, maxPlayers: 8, status: "waiting" as const, category: "Technology" },
  { id: "5", name: "Geography Masters", players: 6, maxPlayers: 10, status: "live" as const, category: "Geography" },
  { id: "6", name: "Sports Arena", players: 2, maxPlayers: 6, status: "waiting" as const, category: "Sports" },
];

const FILTERS = ["All", "Live", "Waiting", "Trending"];

const Lobby = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const filtered = ROOMS.filter((r) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Live") return r.status === "live";
    if (activeFilter === "Waiting") return r.status === "waiting";
    return true;
  });

  return (
    <AppShell>
      <div className="relative min-h-screen py-12 px-4">
        <FloatingParticles count={30} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground text-glow-purple mb-2">
              GAME LOBBY
            </h1>
            <p className="text-muted-foreground">Choose a room and start competing</p>
          </motion.div>

          {/* Filters */}
          <div className="flex gap-2 mb-8">
            {FILTERS.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-heading transition-colors ${activeFilter === f ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted/30 text-muted-foreground border border-border/20 hover:bg-muted/50"}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {f}
              </motion.button>
            ))}
          </div>

          {/* Room grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((room, i) => (
              <RoomCard
                key={room.id}
                name={room.name}
                players={room.players}
                maxPlayers={room.maxPlayers}
                status={room.status}
                category={room.category}
                index={i}
                onJoin={() => navigate("/room")}
              />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Lobby;
