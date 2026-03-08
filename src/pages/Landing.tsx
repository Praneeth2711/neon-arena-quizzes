import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "../components/animations/CountUp";
import { useNavigate } from "react-router-dom";
import { Users, Trophy, Zap, ArrowRight, Play, Globe, Shield, Clock, MessageCircle, TrendingUp, Check, Timer, Award, BarChart3, Layers, Crown } from "lucide-react";
import { useRef } from "react";

const STATS = [
  { value: 500, suffix: "+", label: "Active Players" },
  { value: 1000, suffix: "+", label: "Games Played" },
  { value: 10, suffix: "+", label: "Categories" },
  { value: 99, suffix: ".9%", label: "Uptime" },
];

const LEADERBOARD_ROWS = [
  { rank: 1, name: "Sarah K.", score: "45,200", wins: 128, avatar: "#6366f1", change: "+2" },
  { rank: 2, name: "Alex M.", score: "42,100", wins: 115, avatar: "#8b5cf6", change: "+1" },
  { rank: 3, name: "Jordan L.", score: "38,900", wins: 102, avatar: "#3b82f6", change: "-1" },
  { rank: 4, name: "Maya R.", score: "35,400", wins: 95, avatar: "#ec4899", change: "+3" },
  { rank: 5, name: "Chris T.", score: "32,800", wins: 88, avatar: "#10b981", change: "0" },
  { rank: 6, name: "Dana W.", score: "29,300", wins: 76, avatar: "#f59e0b", change: "-2" },
];

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const floatY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const floatOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ===== NAV ===== */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-2xl border-b border-border/40"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-[15px] font-semibold text-foreground tracking-tight">QuizArena</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Leaderboard", "Pricing"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              onClick={() => navigate("/lobby")}
              className="px-4 py-2 rounded-lg text-[13px] font-semibold text-primary-foreground transition-all"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.03, boxShadow: "0 4px 16px hsl(245 58% 51% / 0.25)" }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen hero-gradient overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-32 lg:pt-40 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left — Copy */}
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.06] border border-primary/10 mb-7"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <span className="text-[13px] font-medium text-muted-foreground">12,847 players online</span>
              </motion.div>

              <motion.h1
                className="text-[2.75rem] sm:text-[3.25rem] lg:text-[3.75rem] font-extrabold tracking-tight leading-[1.08] text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                The Ultimate
                <br />
                <span className="gradient-text-animated">Quiz Platform</span>
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Challenge friends, compete globally, and master knowledge in real-time.
                Built for speed, designed for delight.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 mb-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <motion.button
                  onClick={() => navigate("/lobby")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-primary-foreground"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 32px hsl(245 58% 51% / 0.35)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Play className="w-[18px] h-[18px]" />
                  Start Playing
                </motion.button>
                <motion.button
                  onClick={() => navigate("/leaderboard")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-foreground bg-card border border-border hover:border-border/80 hover:bg-card/80 transition-all"
                  style={{ boxShadow: "0 1px 3px hsl(0 0% 0% / 0.06), 0 4px 12px hsl(0 0% 0% / 0.04)" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Leaderboard
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 text-[13px] text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {["50K+ players", "99.9% uptime", "Sub-second latency"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-success" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Floating Product Preview */}
            <motion.div
              className="relative h-[520px] lg:h-[600px] hidden md:block"
              style={{ y: floatY, opacity: floatOpacity }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(245 70% 60% / 0.08) 0%, transparent 70%)" }} />

              {/* Leaderboard Panel */}
              <motion.div
                className="absolute top-4 left-0 w-[260px] card-elevated p-5 z-10"
                initial={{ opacity: 0, x: -40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                      <Trophy className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Leaderboard</span>
                    <span className="ml-auto text-[11px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">Live</span>
                  </div>
                  {[
                    { name: "Sarah K.", score: "2,450", rank: 1, color: "#6366f1" },
                    { name: "Alex M.", score: "2,280", rank: 2, color: "#8b5cf6" },
                    { name: "Jordan L.", score: "2,100", rank: 3, color: "#3b82f6" },
                    { name: "You", score: "1,950", rank: 4, color: "#10b981" },
                  ].map((p, i) => (
                    <div key={p.name} className={`flex items-center gap-3 py-2 ${p.name === "You" ? "bg-primary/[0.04] -mx-2 px-2 rounded-lg" : ""}`}>
                      <span className={`text-[11px] font-bold w-4 text-center ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>{p.rank}</span>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-primary-foreground" style={{ background: p.color }}>{p.name[0]}</div>
                      <span className={`text-[13px] flex-1 ${p.name === "You" ? "font-semibold text-foreground" : "text-foreground"}`}>{p.name}</span>
                      <span className="text-[12px] font-medium text-muted-foreground tabular-nums">{p.score}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Quiz Card */}
              <motion.div
                className="absolute top-12 right-0 w-[300px] card-elevated p-5 z-20"
                initial={{ opacity: 0, x: 40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-medium text-muted-foreground">Question 3/10</span>
                    <div className="w-8 h-8 rounded-full border-[2.5px] border-warning flex items-center justify-center">
                      <span className="text-[11px] font-bold text-warning">15</span>
                    </div>
                  </div>
                  <p className="text-[14px] font-semibold text-foreground mb-4 leading-snug">What is the speed of light in a vacuum?</p>
                  <div className="space-y-2">
                    {["299,792 km/s", "150,000 km/s", "3,000,000 km/s", "1,080,000 km/h"].map((opt, i) => (
                      <div key={opt} className={`p-3 rounded-xl border text-[13px] font-medium ${i === 0 ? "border-primary/40 bg-primary/[0.06] text-primary" : "border-border text-foreground"}`}>
                        <span className="inline-flex w-5 h-5 rounded-md bg-muted text-[11px] font-bold items-center justify-center mr-2.5 text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Player Avatars */}
              <motion.div className="absolute bottom-24 left-8 card-elevated px-4 py-3 z-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }}>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {["#6366f1", "#8b5cf6", "#3b82f6", "#ec4899", "#10b981"].map((c, i) => (
                        <div key={i} className="w-7 h-7 rounded-full border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary-foreground" style={{ background: c }}>{String.fromCharCode(65 + i)}</div>
                      ))}
                    </div>
                    <span className="text-[12px] text-muted-foreground font-medium ml-1">+12,843 playing</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Chat Bubble */}
              <motion.div className="absolute bottom-8 right-4 w-[230px] card-elevated p-4 z-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}>
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[12px] font-semibold text-foreground">Live Chat</span>
                  </div>
                  {[{ user: "Sarah", text: "That was fast! 🔥", color: "#6366f1" }, { user: "Alex", text: "GG everyone 🎯", color: "#8b5cf6" }].map((msg, i) => (
                    <div key={i} className="flex items-start gap-2 py-1">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-primary-foreground mt-0.5" style={{ background: msg.color }}>{msg.user[0]}</div>
                      <div>
                        <span className="text-[11px] font-semibold text-foreground">{msg.user}</span>
                        <p className="text-[12px] text-muted-foreground">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Score notification */}
              <motion.div className="absolute top-[280px] left-[100px] card-elevated px-4 py-2.5 z-30" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, duration: 0.5, type: "spring" }}>
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center"><TrendingUp className="w-3 h-3 text-success" /></div>
                    <div>
                      <p className="text-[11px] font-semibold text-foreground">+300 pts</p>
                      <p className="text-[10px] text-muted-foreground">Correct answer!</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 1 — Product Preview (Full-width dashboard)
          ======================================================== */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-card border-y border-border/40">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[13px] font-semibold text-primary mb-3 tracking-wide uppercase">Product</p>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-[1.15] mb-4">
              A complete quiz experience,
              <br />
              <span className="gradient-text">in one interface</span>
            </h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Question cards, live leaderboards, countdown timers, and real-time chat — all in a single, beautifully crafted view.
            </p>
          </motion.div>

          {/* Large Dashboard Preview */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 0 1px hsl(0 0% 0% / 0.03), 0 4px 16px hsl(0 0% 0% / 0.04), 0 24px 64px hsl(0 0% 0% / 0.08)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Gradient bar */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #3b82f6)" }} />
            <div className="bg-background p-6 md:p-8 lg:p-10">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <span className="text-[12px] text-muted-foreground ml-3 font-medium">Science Showdown — Live Match</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-success bg-success/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    5 players
                  </span>
                </div>
              </div>

              {/* Dashboard 3-col */}
              <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-5">
                {/* Leaderboard */}
                <div className="card-premium p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-[13px] font-semibold text-foreground">Rankings</span>
                  </div>
                  {[
                    { n: "Sarah K.", s: "2,450", c: "#6366f1" },
                    { n: "You", s: "2,100", c: "#10b981" },
                    { n: "Alex M.", s: "1,800", c: "#8b5cf6" },
                    { n: "Jordan L.", s: "1,500", c: "#3b82f6" },
                  ].map((p, i) => (
                    <div key={p.n} className={`flex items-center gap-2.5 py-1.5 ${p.n === "You" ? "bg-primary/[0.04] -mx-1.5 px-1.5 rounded-lg" : ""}`}>
                      <span className={`text-[11px] font-bold w-4 ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>{i + 1}</span>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground" style={{ background: p.c }}>{p.n[0]}</div>
                      <span className={`text-[12px] flex-1 truncate ${p.n === "You" ? "font-semibold" : ""} text-foreground`}>{p.n}</span>
                      <span className="text-[11px] text-muted-foreground tabular-nums">{p.s}</span>
                    </div>
                  ))}
                </div>

                {/* Center — Question */}
                <div className="card-premium p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="text-[12px] text-muted-foreground">Question 7 of 10</span>
                      <div className="w-40 h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                        <div className="h-full w-[70%] rounded-full" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border-[3px] border-warning flex items-center justify-center">
                      <span className="text-[14px] font-bold text-warning">12</span>
                    </div>
                  </div>
                  <p className="text-[16px] font-semibold text-foreground mb-6 leading-snug">Which element has the highest melting point?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {["Tungsten", "Iron", "Carbon", "Titanium"].map((opt, i) => (
                      <div key={opt} className={`p-3.5 rounded-xl border text-[13px] font-medium transition-all cursor-pointer ${i === 0 ? "border-primary/40 bg-primary/[0.06] text-primary" : "border-border text-foreground hover:border-primary/20 hover:bg-primary/[0.02]"}`}>
                        <span className="inline-flex w-6 h-6 rounded-lg bg-muted text-[11px] font-bold items-center justify-center mr-2.5 text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat */}
                <div className="card-premium p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="text-[13px] font-semibold text-foreground">Chat</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[
                      { u: "Sarah", t: "Wow that was close!", c: "#6366f1" },
                      { u: "Alex", t: "GG! 🔥", c: "#8b5cf6" },
                      { u: "Jordan", t: "Next one is mine", c: "#3b82f6" },
                    ].map((m, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-primary-foreground mt-0.5" style={{ background: m.c }}>{m.u[0]}</div>
                        <div>
                          <span className="text-[11px] font-semibold text-foreground">{m.u}</span>
                          <p className="text-[11px] text-muted-foreground">{m.t}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border/40">
                    <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                      <span className="text-[12px] text-muted-foreground">Type a message…</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 — Feature Showcase (alternating large blocks)
          ======================================================== */}
      <section id="features" className="relative py-24 lg:py-32 px-6 lg:px-8 section-gradient">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            className="max-w-xl mb-20"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-[13px] font-semibold text-primary mb-3 tracking-wide uppercase">Features</p>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-[1.15]">
              Built for real-time
              <br />
              <span className="gradient-text">competition</span>
            </h2>
          </motion.div>

          {/* Feature 1 — Real-time Multiplayer */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-28"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, hsl(245 58% 51% / 0.12), hsl(262 83% 58% / 0.08))" }}>
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">Real-time multiplayer quizzes</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-md">
                Compete head-to-head with players worldwide. Questions sync instantly, scores update in real-time,
                and every millisecond counts. No lag, no delays.
              </p>
              <div className="space-y-3">
                {["Sub-second question sync", "Live score updates", "Instant answer feedback"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-success" />
                    </div>
                    <span className="text-[14px] text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(245 70% 60% / 0.04), transparent 70%)" }} />
              <div className="card-elevated p-6 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-2">
                    {["#6366f1", "#8b5cf6", "#3b82f6", "#ec4899"].map((c, i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-card flex items-center justify-center text-[11px] font-bold text-primary-foreground"
                        style={{ background: c }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i, type: "spring" }}
                      >
                        {String.fromCharCode(65 + i)}
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-[12px] text-muted-foreground font-medium">4 players competing</span>
                  <span className="ml-auto flex items-center gap-1 text-[11px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Live
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Sarah K.", pts: "+300", time: "0.8s" },
                    { name: "You", pts: "+300", time: "1.2s" },
                    { name: "Alex M.", pts: "+150", time: "3.1s" },
                    { name: "Jordan L.", pts: "+0", time: "—" },
                  ].map((r, i) => (
                    <motion.div
                      key={r.name}
                      className={`flex items-center justify-between p-3 rounded-xl ${r.name === "You" ? "bg-primary/[0.04] border border-primary/10" : "bg-muted/30"}`}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 * i }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-bold text-muted-foreground w-4">{i + 1}</span>
                        <span className={`text-[13px] ${r.name === "You" ? "font-semibold text-foreground" : "text-foreground"}`}>{r.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[12px] text-muted-foreground tabular-nums">{r.time}</span>
                        <span className={`text-[12px] font-semibold tabular-nums ${r.pts === "+0" ? "text-muted-foreground" : "text-success"}`}>{r.pts}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2 — Live Leaderboards (reversed) */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-28"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(262 83% 58% / 0.04), transparent 70%)" }} />
              <div className="card-elevated p-6 relative">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-[13px] font-semibold text-foreground">Global Rankings</span>
                  <span className="ml-auto text-[11px] text-muted-foreground">Updated live</span>
                </div>
                {[
                  { rank: 1, name: "Sarah K.", score: "45,200", delta: "↑ 2", deltaColor: "text-success" },
                  { rank: 2, name: "Alex M.", score: "42,100", delta: "↑ 1", deltaColor: "text-success" },
                  { rank: 3, name: "Jordan L.", score: "38,900", delta: "↓ 1", deltaColor: "text-destructive" },
                  { rank: 4, name: "You", score: "35,400", delta: "↑ 3", deltaColor: "text-success" },
                  { rank: 5, name: "Chris T.", score: "32,800", delta: "—", deltaColor: "text-muted-foreground" },
                ].map((p, i) => (
                  <motion.div
                    key={p.name}
                    className={`flex items-center gap-3 py-2.5 ${i < 4 ? "border-b border-border/30" : ""} ${p.name === "You" ? "bg-primary/[0.03] -mx-2 px-2 rounded-lg" : ""}`}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className={`text-[12px] font-bold w-5 text-center ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>#{p.rank}</span>
                    <span className={`text-[13px] flex-1 ${p.name === "You" ? "font-semibold" : ""} text-foreground`}>{p.name}</span>
                    <span className="text-[12px] font-medium text-muted-foreground tabular-nums">{p.score}</span>
                    <span className={`text-[11px] font-medium ${p.deltaColor} w-8 text-right`}>{p.delta}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, hsl(262 83% 58% / 0.12), hsl(245 58% 51% / 0.08))" }}>
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">Live leaderboard rankings</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-md">
                Watch the global leaderboard shift in real-time. Every correct answer, every speed bonus,
                instantly reflected. See exactly where you stand.
              </p>
              <div className="space-y-3">
                {["ELO-based ranking system", "Real-time position updates", "Historical performance tracking"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center"><Check className="w-3 h-3 text-success" /></div>
                    <span className="text-[14px] text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feature 3 — Categories */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, hsl(217 91% 60% / 0.12), hsl(245 58% 51% / 0.08))" }}>
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">20+ quiz categories</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-md">
                From quantum physics to pop culture trivia. Find your niche, master it, and challenge others
                across a growing library of 10,000+ questions.
              </p>
              <div className="space-y-3">
                {["Curated by experts", "Difficulty levels for all skills", "New questions added weekly"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center"><Check className="w-3 h-3 text-success" /></div>
                    <span className="text-[14px] text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(217 91% 60% / 0.04), transparent 70%)" }} />
              <div className="card-elevated p-6 relative">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Science", count: "2,400", icon: "🔬", color: "hsl(245 58% 51% / 0.06)" },
                    { name: "History", count: "1,800", icon: "📜", color: "hsl(262 83% 58% / 0.06)" },
                    { name: "Technology", count: "2,100", icon: "💻", color: "hsl(217 91% 60% / 0.06)" },
                    { name: "Geography", count: "1,500", icon: "🌍", color: "hsl(160 84% 39% / 0.06)" },
                    { name: "Sports", count: "1,200", icon: "⚽", color: "hsl(38 92% 50% / 0.06)" },
                    { name: "Pop Culture", count: "2,800", icon: "🎬", color: "hsl(330 80% 60% / 0.06)" },
                  ].map((cat, i) => (
                    <motion.div
                      key={cat.name}
                      className="p-4 rounded-xl border border-border/40 hover:border-primary/20 transition-all cursor-default group"
                      style={{ background: cat.color }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -2 }}
                    >
                      <span className="text-2xl mb-2 block">{cat.icon}</span>
                      <p className="text-[13px] font-semibold text-foreground">{cat.name}</p>
                      <p className="text-[11px] text-muted-foreground">{cat.count} questions</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 — Interactive Leaderboard
          ======================================================== */}
      <section id="leaderboard" className="relative py-24 lg:py-32 px-6 lg:px-8 bg-card border-y border-border/40">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-[13px] font-semibold text-primary mb-3 tracking-wide uppercase">Leaderboard</p>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-[1.15] mb-4">
              Climb the <span className="gradient-text">global rankings</span>
            </h2>
            <p className="text-[15px] text-muted-foreground max-w-lg mx-auto">
              Every game counts. Watch your rank rise as you outperform players from around the world.
            </p>
          </motion.div>

          <motion.div
            className="card-elevated overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-primary" />
                <span className="text-[13px] font-semibold text-foreground">Top Players — Season 4</span>
              </div>
              <span className="text-[11px] text-muted-foreground font-medium">Updated in real-time</span>
            </div>

            {/* Column headers */}
            <div className="px-6 py-2.5 border-b border-border/30 grid grid-cols-[40px_1fr_100px_80px_60px] gap-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              <span>Rank</span>
              <span>Player</span>
              <span className="text-right">Score</span>
              <span className="text-right">Wins</span>
              <span className="text-right">Trend</span>
            </div>

            {/* Rows */}
            {LEADERBOARD_ROWS.map((row, i) => (
              <motion.div
                key={row.name}
                className={`px-6 py-3.5 grid grid-cols-[40px_1fr_100px_80px_60px] gap-3 items-center border-b border-border/20 last:border-0 transition-colors hover:bg-muted/20 ${i === 0 ? "bg-primary/[0.02]" : ""}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <span className={`text-[13px] font-bold ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${row.rank}`}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-primary-foreground" style={{ background: row.avatar }}>
                    {row.name[0]}
                  </div>
                  <span className="text-[14px] font-medium text-foreground">{row.name}</span>
                </div>
                <span className="text-[13px] font-semibold text-foreground text-right tabular-nums">{row.score}</span>
                <span className="text-[13px] text-muted-foreground text-right tabular-nums">{row.wins}</span>
                <span className={`text-[12px] font-medium text-right ${row.change.startsWith("+") ? "text-success" : row.change.startsWith("-") ? "text-destructive" : "text-muted-foreground"}`}>
                  {row.change === "0" ? "—" : row.change}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 — Statistics
          ======================================================== */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 hero-gradient">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-[13px] font-semibold text-primary mb-3 tracking-wide uppercase">By the numbers</p>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-[1.15]">
              Trusted by players <span className="gradient-text">worldwide</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="card-elevated p-8 text-center"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <p className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[14px] text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5 — Final CTA
          ======================================================== */}
      <section className="relative py-28 lg:py-36 px-6 lg:px-8 bg-card border-t border-border/40">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(245 70% 60% / 0.04), transparent)" }} />
        <motion.div
          className="max-w-2xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            whileHover={{ rotate: 10, scale: 1.05 }}
          >
            <Zap className="w-7 h-7 text-primary-foreground" />
          </motion.div>
          <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-[1.15] mb-5">
            Ready to start competing?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands of players in the most polished real-time quiz experience. Free to play, built to thrill.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={() => navigate("/lobby")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold text-primary-foreground"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 12px 40px hsl(245 58% 51% / 0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Play className="w-[18px] h-[18px]" />
              Start Playing — It's Free
            </motion.button>
            <motion.button
              onClick={() => navigate("/leaderboard")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold text-foreground bg-card border border-border transition-all"
              style={{ boxShadow: "0 1px 3px hsl(0 0% 0% / 0.06), 0 4px 12px hsl(0 0% 0% / 0.04)" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Leaderboard
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 px-6 lg:px-8 border-t border-border/40">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-[13px] font-semibold text-muted-foreground">QuizArena</span>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#leaderboard" className="hover:text-foreground transition-colors">Leaderboard</a>
            <span>© 2026 QuizArena</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
