import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { Users, ArrowRight, Search, Plus, Clock, Zap, Globe, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { DEFAULT_ROOMS, CATEGORY_QUESTIONS, DefaultRoom } from "@/lib/quizData";
import { toast } from "sonner";

const FILTERS = ["All", "Live", "Waiting"];

const difficultyConfig: Record<string, { color: string; bg: string }> = {
  Easy: { color: "text-success", bg: "bg-success/8" },
  Medium: { color: "text-warning", bg: "bg-warning/8" },
  Hard: { color: "text-primary", bg: "bg-primary/8" },
  Expert: { color: "text-destructive", bg: "bg-destructive/8" },
};

const categoryIcons: Record<string, string> = {
  Science: "🔬",
  History: "📜",
  Entertainment: "🎬",
  Technology: "💻",
  Geography: "🌍",
  Sports: "⚽",
  Books: "📚",
};

const CATEGORIES = ["Science", "Technology", "History", "Entertainment", "Geography", "Sports", "Books"];
const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

const Lobby = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [rooms, setRooms] = useState<DefaultRoom[]>(DEFAULT_ROOMS);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);

  // New room form state
  const [newRoomName, setNewRoomName] = useState("");
  const [newCategory, setNewCategory] = useState("Technology");
  const [newDifficulty, setNewDifficulty] = useState<"Easy" | "Medium" | "Hard" | "Expert">("Medium");
  const [newMaxPlayers, setNewMaxPlayers] = useState(8);

  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const { data: dbRooms, error } = await supabase
        .from("quiz_rooms")
        .select("id, name, category, difficulty, max_players, status, created_at, host_id")
        .order("created_at", { ascending: false });

      if (!error && dbRooms && dbRooms.length > 0) {
        // Fetch host display names & player counts
        const hostIds = [...new Set(dbRooms.map((r) => r.host_id))];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, display_name")
          .in("user_id", hostIds);

        const hostMap = new Map(profiles?.map((p) => [p.user_id, p.display_name]) ?? []);

        // Fetch player counts per room
        const { data: players } = await supabase
          .from("room_players")
          .select("room_id");

        const countMap = new Map<string, number>();
        players?.forEach((p) => {
          countMap.set(p.room_id, (countMap.get(p.room_id) || 0) + 1);
        });

        const mappedRooms: DefaultRoom[] = dbRooms.map((r) => ({
          id: r.id,
          name: r.name,
          category: r.category,
          difficulty: (r.difficulty as DefaultRoom["difficulty"]) || "Medium",
          max: r.max_players,
          players: countMap.get(r.id) || 1,
          status: (r.status as DefaultRoom["status"]) || "waiting",
          host: hostMap.get(r.host_id) || "Host",
          started: "Active now",
        }));

        // Merge custom database rooms with default catalogue
        setRooms([...mappedRooms, ...DEFAULT_ROOMS.filter(d => !mappedRooms.some(m => m.id === d.id))]);
      } else {
        setRooms(DEFAULT_ROOMS);
      }
    } catch {
      setRooms(DEFAULT_ROOMS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();

    // Subscribe to realtime quiz room changes
    const channel = supabase
      .channel("public:quiz_rooms")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "quiz_rooms" },
        () => {
          fetchRooms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchRooms]);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) {
      toast.error("Please enter a room name");
      return;
    }

    if (!user) {
      toast.error("Please sign in to create a custom room");
      navigate("/signin");
      return;
    }

    try {
      setCreating(true);
      const { data: newRoom, error: roomError } = await supabase
        .from("quiz_rooms")
        .insert({
          name: newRoomName.trim(),
          category: newCategory,
          difficulty: newDifficulty,
          max_players: newMaxPlayers,
          status: "waiting",
          host_id: user.id,
        })
        .select()
        .single();

      if (roomError || !newRoom) {
        throw new Error(roomError?.message || "Failed to create room");
      }

      // Seed questions for this room from category questions
      const categoryQuestions = CATEGORY_QUESTIONS[newCategory] || CATEGORY_QUESTIONS.Science;
      const questionRows = categoryQuestions.map((q, idx) => ({
        room_id: newRoom.id,
        question_text: q.question,
        options: q.options,
        correct_answer: q.correct,
        question_order: idx,
        time_limit: q.timeLimit || 20,
      }));

      await supabase.from("quiz_questions").insert(questionRows);

      // Join the created room as host
      await supabase.from("room_players").insert({
        room_id: newRoom.id,
        user_id: user.id,
        score: 0,
      });

      toast.success("Room created successfully!");
      setShowCreateModal(false);
      navigate(`/room/${newRoom.id}`);
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Could not create room");
    } finally {
      setCreating(false);
    }
  };

  const filtered = rooms
    .filter((r) => {
      if (filter === "Live") return r.status === "live";
      if (filter === "Waiting") return r.status === "waiting";
      return true;
    })
    .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()));

  const liveCount = rooms.filter((r) => r.status === "live").length;
  const totalPlayers = rooms.reduce((sum, r) => sum + r.players, 0);

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
                  Join an active arena or create your own challenge. Compete with players worldwide in real-time.
                </p>
              </div>

              <motion.button
                onClick={() => {
                  if (!user) {
                    toast.info("Sign in to host custom rooms");
                    navigate("/signin");
                  } else {
                    setShowCreateModal(true);
                  }
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-semibold text-primary-foreground shrink-0 cursor-pointer shadow-md"
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
                  placeholder="Search rooms or categories..."
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
              {rooms.length} rooms available
            </span>
            <span className="flex items-center gap-1.5 shrink-0">
              <Users className="w-3.5 h-3.5" />
              {totalPlayers} active competitors
            </span>
            <span className="flex items-center gap-1.5 shrink-0">
              <Zap className="w-3.5 h-3.5" />
              {liveCount} live arenas
            </span>
          </motion.div>
        </div>

        {/* Room Grid */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-8">
          {loading && rooms.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((room, i) => {
                const isFull = room.players >= room.max;
                const fillPct = Math.min((room.players / room.max) * 100, 100);
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
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                            room.status === "live"
                              ? "bg-success/10 text-success"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
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
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            difficultyConfig[room.difficulty]?.bg || "bg-muted"
                          } ${difficultyConfig[room.difficulty]?.color || "text-foreground"}`}
                        >
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
                        onClick={() => navigate(`/room/${room.id}`)}
                        disabled={isFull}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                          isFull
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "text-primary-foreground"
                        }`}
                        style={!isFull ? { background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" } : undefined}
                        whileHover={!isFull ? { scale: 1.01, boxShadow: "0 4px 16px hsl(245 58% 51% / 0.2)" } : {}}
                        whileTap={!isFull ? { scale: 0.99 } : {}}
                      >
                        {isFull ? "Room Full" : "Enter Arena"}
                        {!isFull && <ArrowRight className="w-3.5 h-3.5" />}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {filtered.length === 0 && !loading && (
            <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-muted-foreground text-[15px]">No rooms found matching your search.</p>
            </motion.div>
          )}
        </div>

        {/* Create Room Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
              <motion.div
                className="card-premium p-6 w-full max-w-lg relative bg-card shadow-2xl"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
              >
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="absolute right-4 top-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">Create a Quiz Arena</h2>
                  <p className="text-sm text-muted-foreground mt-1">Configure your room and invite competitors.</p>
                </div>

                <form onSubmit={handleCreateRoom} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Arena Name</label>
                    <input
                      type="text"
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      placeholder="e.g. Master Minds Clash"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {categoryIcons[cat] || "📝"} {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Difficulty</label>
                      <select
                        value={newDifficulty}
                        onChange={(e) => setNewDifficulty(e.target.value as DefaultRoom["difficulty"])}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                      >
                        {DIFFICULTIES.map((diff) => (
                          <option key={diff} value={diff}>
                            {diff}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Max Players ({newMaxPlayers})</label>
                    <input
                      type="range"
                      min={2}
                      max={16}
                      value={newMaxPlayers}
                      onChange={(e) => setNewMaxPlayers(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={creating}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-50"
                      style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Launch Room"}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
};

export default Lobby;
