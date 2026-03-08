import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedButton from "../components/animations/AnimatedButton";
import FloatingParticles from "../components/animations/FloatingParticles";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Trophy, Zap, ArrowRight, Play, Globe, Shield, ChevronDown } from "lucide-react";
import { useRef } from "react";

const FEATURES = [
  { icon: Zap, title: "Real-Time Battles", desc: "Compete live against players from around the world in intense quiz showdowns" },
  { icon: Users, title: "Multiplayer Rooms", desc: "Create or join rooms with friends and challenge strangers" },
  { icon: Trophy, title: "Global Rankings", desc: "Climb the leaderboard and earn your place among the elite" },
  { icon: Sparkles, title: "Power-Ups", desc: "Use strategic abilities to gain the competitive edge" },
  { icon: Globe, title: "10K+ Questions", desc: "Massive question bank across 20+ categories" },
  { icon: Shield, title: "Fair Play", desc: "Anti-cheat system ensures a level playing field" },
];

const STATS = [
  { value: "50K+", label: "Active Players" },
  { value: "1M+", label: "Games Played" },
  { value: "20+", label: "Categories" },
  { value: "99.9%", label: "Uptime" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const letterAnim = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  const line1 = "THE ULTIMATE";
  const line2 = "QUIZ ARENA";

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingParticles count={70} />

        {/* Animated gradient background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-[-10%] left-[15%] w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(263 70% 50% / 0.18) 0%, transparent 65%)" }}
            animate={{ x: [0, 100, -50, 0], y: [0, -80, 50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-5%] right-[10%] w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(187 94% 43% / 0.15) 0%, transparent 65%)" }}
            animate={{ x: [0, -80, 60, 0], y: [0, 60, -50, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[40%] right-[30%] w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, hsl(330 81% 60% / 0.1) 0%, transparent 65%)" }}
            animate={{ scale: [1, 1.4, 0.8, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(hsl(263 70% 58% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(263 70% 58% / 0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Nav */}
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50"
          style={{ backdropFilter: "blur(16px)", background: "hsl(240 15% 5% / 0.6)", borderBottom: "1px solid hsl(240 10% 18% / 0.4)" }}
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(263 70% 58%), hsl(330 81% 60%))" }}
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Zap className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="font-display text-lg tracking-[0.2em] text-foreground">QUIZARENA</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {["Features", "Leaderboard", "About"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-heading"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
              <AnimatedButton variant="primary" size="sm" onClick={() => navigate("/lobby")}>
                Play Now
              </AnimatedButton>
            </div>
          </div>
        </motion.nav>

        {/* Hero content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Live badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-10"
            style={{
              background: "hsl(240 15% 8% / 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid hsl(240 10% 25% / 0.3)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-success"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs font-heading text-muted-foreground tracking-wide">12,847 players online now</span>
          </motion.div>

          {/* Title with letter stagger */}
          <motion.div variants={container} initial="hidden" animate="show" className="mb-8">
            {/* Line 1 */}
            <div className="overflow-hidden">
              <h1 className="font-display text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] font-black leading-[0.9] tracking-tight">
                {line1.split("").map((char, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    variants={letterAnim}
                    className="inline-block hero-gradient-text"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </div>
            {/* Line 2 */}
            <div className="overflow-hidden mt-1">
              <h1 className="font-display text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] font-black leading-[0.9] tracking-tight">
                {line2.split("").map((char, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    variants={letterAnim}
                    className="inline-block hero-gradient-text-alt"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-body"
            custom={1.6}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Enter the neon arena. Battle minds in real-time multiplayer quizzes.
            Outsmart, outspeed, and outlast your opponents.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            custom={1.9}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <AnimatedButton variant="primary" size="lg" onClick={() => navigate("/lobby")}>
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Start Playing
              </span>
            </AnimatedButton>
            <AnimatedButton variant="ghost" size="lg" onClick={() => navigate("/leaderboard")}>
              <span className="flex items-center gap-2">
                View Rankings
                <ArrowRight className="w-4 h-4" />
              </span>
            </AnimatedButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-3xl mx-auto"
            custom={2.2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl p-5 text-center"
                style={{
                  background: "hsl(240 15% 8% / 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid hsl(240 10% 20% / 0.3)",
                }}
                whileHover={{
                  y: -4,
                  borderColor: "hsl(263 70% 58% / 0.3)",
                  boxShadow: "0 0 25px hsl(263 70% 58% / 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground mt-1 font-heading uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-heading text-muted-foreground/50 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground/40" />
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
            <motion.span
              className="inline-block text-xs font-heading uppercase tracking-[0.4em] text-primary mb-5 px-4 py-1.5 rounded-full"
              style={{ border: "1px solid hsl(263 70% 58% / 0.2)", background: "hsl(263 70% 58% / 0.05)" }}
            >
              Features
            </motion.span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-4">
              Built for{" "}
              <span className="hero-gradient-text-inline">Competitors</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  className="group relative rounded-xl p-7 overflow-hidden cursor-default"
                  style={{
                    background: "hsl(240 15% 8% / 0.5)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid hsl(240 10% 18% / 0.3)",
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                  whileHover={{
                    y: -6,
                    borderColor: "hsl(263 70% 58% / 0.3)",
                    boxShadow: "0 20px 60px hsl(263 70% 58% / 0.08)",
                  }}
                >
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                    style={{ background: "linear-gradient(90deg, hsl(263 70% 58%), hsl(187 94% 43%), hsl(330 81% 60%))" }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        background: "linear-gradient(135deg, hsl(263 70% 58% / 0.1), hsl(263 70% 58% / 0.05))",
                        border: "1px solid hsl(263 70% 58% / 0.15)",
                      }}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <Icon className="w-7 h-7 text-primary" />
                    </motion.div>
                    <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative py-32 px-4">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block text-xs font-heading uppercase tracking-[0.4em] text-secondary mb-5 px-4 py-1.5 rounded-full"
              style={{ border: "1px solid hsl(187 94% 43% / 0.2)", background: "hsl(187 94% 43% / 0.05)" }}
            >
              How It Works
            </motion.span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-4">
              Three Steps to{" "}
              <span className="hero-gradient-text-blue-inline">Victory</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { step: "01", title: "Join a Room", desc: "Pick a category and enter a live quiz room" },
              { step: "02", title: "Answer Fast", desc: "Race the clock — speed earns bonus points" },
              { step: "03", title: "Claim Glory", desc: "Top the leaderboard and earn badges" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <motion.div
                  className="font-display text-7xl font-black mb-6 leading-none"
                  style={{ color: "hsl(263 70% 58% / 0.08)" }}
                  whileInView={{ opacity: [0, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                >
                  {item.step}
                </motion.div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-32 px-4">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <motion.div
          className="max-w-3xl mx-auto rounded-2xl p-14 md:p-16 text-center relative overflow-hidden"
          style={{
            background: "hsl(240 15% 8% / 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid hsl(240 10% 20% / 0.3)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, hsl(263 70% 58% / 0.08), transparent 70%)" }}
          />
          <div className="relative z-10">
            <motion.span
              className="text-5xl mb-6 block"
              animate={{ y: [0, -6, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ⚡
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 text-foreground tracking-wider">
              READY TO COMPETE?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
              Join thousands of players in the most immersive real-time quiz experience. Your arena awaits.
            </p>
            <AnimatedButton variant="primary" size="lg" onClick={() => navigate("/lobby")}>
              <span className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Enter the Arena
              </span>
            </AnimatedButton>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 px-4" style={{ borderTop: "1px solid hsl(240 10% 15% / 0.5)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(263 70% 58%), hsl(330 81% 60%))" }}
            >
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display text-sm tracking-[0.15em] text-muted-foreground">QUIZARENA</span>
          </div>
          <span className="text-xs text-muted-foreground/60">© 2026 QuizArena. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
