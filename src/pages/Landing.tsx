import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedButton from "../components/animations/AnimatedButton";
import FloatingParticles from "../components/animations/FloatingParticles";
import Hero3DScene from "../components/animations/Hero3DScene";
import CountUp from "../components/animations/CountUp";
import CustomCursor from "../components/animations/CustomCursor";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Trophy, Zap, ArrowRight, Play, Globe, Shield, ChevronDown, Crosshair, Flame } from "lucide-react";
import { useRef } from "react";

const FEATURES = [
  { icon: Zap, title: "Real-Time Battles", desc: "Compete live against players worldwide in intense quiz showdowns", color: "primary" },
  { icon: Users, title: "Multiplayer Rooms", desc: "Create or join rooms with friends and challenge strangers", color: "secondary" },
  { icon: Trophy, title: "Global Rankings", desc: "Climb the leaderboard and earn your place among the elite", color: "accent" },
  { icon: Sparkles, title: "Power-Ups", desc: "Use strategic abilities to gain the competitive edge", color: "primary" },
  { icon: Globe, title: "10K+ Questions", desc: "Massive question bank across 20+ categories", color: "secondary" },
  { icon: Shield, title: "Fair Play", desc: "Anti-cheat system ensures a level playing field", color: "accent" },
];

const STATS = [
  { value: 50000, suffix: "+", label: "Active Players", icon: Users },
  { value: 1000000, suffix: "+", label: "Games Played", icon: Flame },
  { value: 20, suffix: "+", label: "Categories", icon: Globe },
  { value: 99, suffix: ".9%", label: "Uptime", icon: Zap },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
};

const letterAnim = {
  hidden: { opacity: 0, y: 70, filter: "blur(10px)", rotateX: -60 },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingParticles count={80} />
        <Hero3DScene />

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015] overflow-hidden">
          <div className="w-full h-[2px] bg-primary/50" style={{ animation: "scanline 8s linear infinite" }} />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(hsl(263 70% 58% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(263 70% 58% / 0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Ambient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(263 70% 50% / 0.12) 0%, transparent 60%)" }}
            animate={{ x: [0, 120, -60, 0], y: [0, -100, 60, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[5%] w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(192 95% 50% / 0.1) 0%, transparent 60%)" }}
            animate={{ x: [0, -90, 70, 0], y: [0, 70, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[30%] right-[25%] w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(330 85% 60% / 0.06) 0%, transparent 60%)" }}
            animate={{ scale: [1, 1.5, 0.8, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Nav */}
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50"
          style={{ backdropFilter: "blur(16px)", background: "hsl(235 25% 4% / 0.7)", borderBottom: "1px solid hsl(235 15% 15% / 0.4)" }}
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center relative"
                style={{ background: "linear-gradient(135deg, hsl(263 70% 58%), hsl(330 85% 60%))" }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Crosshair className="w-5 h-5 text-primary-foreground" />
                <div className="absolute inset-0 rounded-lg animate-pulse-ring" />
              </motion.div>
              <span className="font-display text-lg tracking-[0.25em] text-foreground animate-hud-flicker">QUIZARENA</span>
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              {["Features", "Leaderboard", "About"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-heading relative group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <AnimatedButton variant="cyber" size="sm" onClick={() => navigate("/lobby")}>
                  <Zap className="w-4 h-4" />
                  Play Now
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-neon mb-10"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-success"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span className="text-xs font-mono text-muted-foreground tracking-wide">
              <span className="text-success">●</span> 12,847 players in arena
            </span>
          </motion.div>

          {/* Title with letter stagger */}
          <motion.div variants={container} initial="hidden" animate="show" className="mb-8">
            <div className="overflow-hidden mb-2">
              <h1 className="font-display text-4xl sm:text-5xl md:text-[5rem] lg:text-[6.5rem] font-black leading-[0.85] tracking-tight">
                {"THE ULTIMATE".split("").map((char, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    variants={letterAnim}
                    className="inline-block hero-gradient-text"
                    style={{ textShadow: "0 0 40px hsl(263 70% 58% / 0.3)" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="font-display text-4xl sm:text-5xl md:text-[5rem] lg:text-[6.5rem] font-black leading-[0.85] tracking-tight">
                {"QUIZ ARENA".split("").map((char, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    variants={letterAnim}
                    className="inline-block hero-gradient-text-alt"
                    style={{ textShadow: "0 0 40px hsl(192 95% 50% / 0.3)" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </div>
          </motion.div>

          {/* HUD tagline */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
            <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-muted-foreground">
              Real-Time Multiplayer Quiz Platform
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          >
            Enter the neon arena. Battle minds in real-time multiplayer quizzes.
            Outsmart, outspeed, and outlast.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <AnimatedButton variant="primary" size="lg" onClick={() => navigate("/lobby")}>
              <Play className="w-5 h-5" />
              Start Playing
            </AnimatedButton>
            <AnimatedButton variant="cyber" size="lg" onClick={() => navigate("/leaderboard")}>
              View Rankings
              <ArrowRight className="w-4 h-4" />
            </AnimatedButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.6 }}
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="glass-neon hud-corners p-5 text-center group"
                  whileHover={{
                    y: -5,
                    rotateX: 5,
                    rotateY: -3,
                    boxShadow: "0 0 30px hsl(263 70% 58% / 0.15)",
                  }}
                  style={{ transformPerspective: 800 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-4 h-4 text-primary/50 mx-auto mb-2 group-hover:text-primary transition-colors" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 font-mono uppercase tracking-[0.2em]">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-[0.4em]">Scroll</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground/30" />
        </motion.div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative py-32 px-4">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-primary/30" />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/80">Features</span>
              <div className="h-px w-8 bg-primary/30" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              Built for <span className="hero-gradient-text-inline">Competitors</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              const colorMap = {
                primary: { border: "hsl(263 70% 58% / 0.2)", glow: "hsl(263 70% 58% / 0.08)", icon: "text-primary" },
                secondary: { border: "hsl(192 95% 50% / 0.2)", glow: "hsl(192 95% 50% / 0.08)", icon: "text-secondary" },
                accent: { border: "hsl(330 85% 60% / 0.2)", glow: "hsl(330 85% 60% / 0.08)", icon: "text-accent" },
              };
              const c = colorMap[f.color as keyof typeof colorMap];
              return (
                <motion.div
                  key={f.title}
                  className="glass hud-corners p-7 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }}
                  whileHover={{
                    y: -8,
                    rotateX: 3,
                    rotateY: -2,
                    borderColor: c.border,
                    boxShadow: `0 20px 60px ${c.glow}`,
                  }}
                  style={{ transformPerspective: 1000 }}
                >
                  {/* Animated top line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                    style={{ background: `linear-gradient(90deg, hsl(263 70% 58%), hsl(192 95% 50%), hsl(330 85% 60%))` }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5`}
                    style={{ background: c.glow, border: `1px solid ${c.border}` }}
                    whileHover={{ scale: 1.1, rotate: 8 }}
                  >
                    <Icon className={`w-7 h-7 ${c.icon}`} />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative py-32 px-4">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-secondary/30" />
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-secondary/80">How It Works</span>
              <div className="h-px w-8 bg-secondary/30" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              Three Steps to <span className="hero-gradient-text-blue-inline">Victory</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Join a Room", desc: "Pick a category and enter a live quiz room", icon: Zap },
              { step: "02", title: "Answer Fast", desc: "Race the clock — speed earns bonus points", icon: Flame },
              { step: "03", title: "Claim Glory", desc: "Top the leaderboard and earn badges", icon: Trophy },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  className="text-center glass p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 rounded-2xl glass-neon flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                  <span className="font-display text-5xl font-black text-secondary/10 block mb-3">{item.step}</span>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-32 px-4">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <motion.div
          className="max-w-3xl mx-auto glass-neon animated-border-glow p-14 md:p-16 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 rounded-[inherit] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, hsl(263 70% 58% / 0.06), transparent 70%)" }} />
          <div className="relative z-10">
            <motion.div
              className="w-20 h-20 rounded-2xl glass-neon flex items-center justify-center mx-auto mb-8"
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crosshair className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 text-foreground tracking-wider">
              READY TO COMPETE?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
              Join thousands of players in the most immersive real-time quiz experience. Your arena awaits.
            </p>
            <AnimatedButton variant="primary" size="lg" onClick={() => navigate("/lobby")}>
              <Play className="w-5 h-5" />
              Enter the Arena
            </AnimatedButton>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4" style={{ borderTop: "1px solid hsl(235 15% 12% / 0.5)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(263 70% 58%), hsl(330 85% 60%))" }}>
              <Crosshair className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display text-xs tracking-[0.2em] text-muted-foreground">QUIZARENA</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground/40">© 2026 QUIZARENA // ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
