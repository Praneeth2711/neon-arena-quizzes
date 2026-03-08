import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "../components/animations/CountUp";
import { useNavigate } from "react-router-dom";
import { Users, Trophy, Zap, ArrowRight, Play, Globe, Shield, Clock, MessageCircle, Award, Timer, Star, TrendingUp, Check } from "lucide-react";
import { useRef } from "react";

const FEATURES = [
  { icon: Zap, title: "Real-Time Multiplayer", desc: "Compete live against players worldwide with sub-second latency and instant score updates." },
  { icon: Trophy, title: "Live Leaderboards", desc: "Watch rankings shift in real-time as you climb to the top of the global standings." },
  { icon: Globe, title: "20+ Categories", desc: "From science to pop culture — find your niche and master it across thousands of questions." },
  { icon: Shield, title: "Global Rankings", desc: "A fair, ELO-based ranking system that rewards consistent performance and skill." },
];

const STATS = [
  { value: 50000, suffix: "+", label: "Active Players" },
  { value: 1000000, suffix: "+", label: "Games Played" },
  { value: 20, suffix: "+", label: "Categories" },
  { value: 99, suffix: ".9%", label: "Uptime" },
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
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-[15px] font-semibold text-foreground tracking-tight">QuizArena</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How it works", "Pricing"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
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
              {/* Badge */}
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

              {/* Trust indicators */}
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
              {/* Glow behind cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(245 70% 60% / 0.08) 0%, transparent 70%)" }} />

              {/* Leaderboard Panel */}
              <motion.div
                className="absolute top-4 left-0 w-[260px] card-elevated p-5 z-10"
                initial={{ opacity: 0, x: -40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
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
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-primary-foreground" style={{ background: p.color }}>
                        {p.name[0]}
                      </div>
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
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-medium text-muted-foreground">Question 3/10</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-8 rounded-full border-[2.5px] border-warning flex items-center justify-center">
                        <span className="text-[11px] font-bold text-warning">15</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] font-semibold text-foreground mb-4 leading-snug">
                    What is the speed of light in a vacuum?
                  </p>
                  <div className="space-y-2">
                    {["299,792 km/s", "150,000 km/s", "3,000,000 km/s", "1,080,000 km/h"].map((opt, i) => (
                      <div
                        key={opt}
                        className={`p-3 rounded-xl border text-[13px] font-medium transition-all ${
                          i === 0
                            ? "border-primary/40 bg-primary/[0.06] text-primary"
                            : "border-border text-foreground hover:border-border/80"
                        }`}
                      >
                        <span className="inline-flex w-5 h-5 rounded-md bg-muted text-[11px] font-bold items-center justify-center mr-2.5 text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Player Avatars */}
              <motion.div
                className="absolute bottom-24 left-8 card-elevated px-4 py-3 z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.7 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {["#6366f1", "#8b5cf6", "#3b82f6", "#ec4899", "#10b981"].map((c, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary-foreground"
                          style={{ background: c }}
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-[12px] text-muted-foreground font-medium ml-1">+12,843 playing</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Chat Bubble */}
              <motion.div
                className="absolute bottom-8 right-4 w-[230px] card-elevated p-4 z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.7 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[12px] font-semibold text-foreground">Live Chat</span>
                  </div>
                  {[
                    { user: "Sarah", text: "That was fast! 🔥", color: "#6366f1" },
                    { user: "Alex", text: "GG everyone 🎯", color: "#8b5cf6" },
                  ].map((msg, i) => (
                    <div key={i} className="flex items-start gap-2 py-1">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-primary-foreground mt-0.5" style={{ background: msg.color }}>
                        {msg.user[0]}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-foreground">{msg.user}</span>
                        <p className="text-[12px] text-muted-foreground">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Score notification */}
              <motion.div
                className="absolute top-[280px] left-[100px] card-elevated px-4 py-2.5 z-30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-success" />
                    </div>
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

      {/* ===== STATS BAR ===== */}
      <section className="relative py-16 px-6 lg:px-8 border-y border-border/40 bg-card">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[13px] text-muted-foreground mt-1.5 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative py-28 px-6 lg:px-8 section-gradient">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            className="max-w-2xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-[13px] font-semibold text-primary mb-3 tracking-wide uppercase">Features</p>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-[1.15]">
              Everything you need to
              <br />
              <span className="gradient-text">compete and win</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed max-w-lg">
              A complete platform for real-time quiz competitions, designed for both casual players and competitive teams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  className="card-premium p-8 group cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "linear-gradient(135deg, hsl(245 58% 51% / 0.1), hsl(262 83% 58% / 0.08))" }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="relative py-28 px-6 lg:px-8 bg-card border-y border-border/40">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            className="text-center mb-16 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[13px] font-semibold text-primary mb-3 tracking-wide uppercase">How it works</p>
            <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-[1.15]">
              Three steps to <span className="gradient-text">victory</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Join a Room", desc: "Pick your category and jump into a live quiz room with players from around the world.", icon: Zap },
              { step: "02", title: "Answer Fast", desc: "Race the clock — speed and accuracy earn bonus points. Every second counts.", icon: Timer },
              { step: "03", title: "Claim Glory", desc: "Top the leaderboard, earn badges, and build your reputation as a quiz champion.", icon: Award },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "linear-gradient(135deg, hsl(245 58% 51% / 0.1), hsl(262 83% 58% / 0.08))" }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[11px] font-bold text-primary/40 tracking-wider">{item.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">{item.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-28 px-6 lg:px-8 hero-gradient">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-[1.15] mb-5">
            Ready to compete?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            Join thousands of players in the most polished real-time quiz experience. Your arena awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={() => navigate("/lobby")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-primary-foreground"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px hsl(245 58% 51% / 0.35)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Play className="w-[18px] h-[18px]" />
              Start Playing — It's Free
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 px-6 lg:px-8 border-t border-border/40 bg-card">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-[13px] font-semibold text-muted-foreground">QuizArena</span>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
            <span>© 2026 QuizArena</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
