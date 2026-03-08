import { motion } from "framer-motion";
import AnimatedButton from "../components/animations/AnimatedButton";
import FloatingParticles from "../components/animations/FloatingParticles";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Trophy, Zap, ArrowRight, Play, Globe, Shield } from "lucide-react";

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

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingParticles count={80} />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(263 70% 58%) 0%, transparent 70%)" }}
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(187 94% 43%) 0%, transparent 70%)" }}
          animate={{
            x: [0, -60, 50, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(330 81% 60%) 0%, transparent 70%)" }}
          animate={{
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(263 70% 58% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(263 70% 58% / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Nav */}
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50 border-b border-border/10"
          style={{ backdropFilter: "blur(20px)", background: "hsl(240 15% 5% / 0.7)" }}
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, hsl(263 70% 58%), hsl(330 81% 60%))" }}
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Zap className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="font-display text-xl tracking-[0.2em] text-foreground">QUIZARENA</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {["Features", "Leaderboard", "About"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-heading"
                  whileHover={{ y: -1 }}
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
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-success"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs font-heading text-muted-foreground">12,847 players online now</span>
          </motion.div>

          {/* Main heading - letter stagger animation */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] mb-6 tracking-tight">
            {["THE ULTIMATE", "QUIZ ARENA"].map((line, lineIdx) => (
              <span key={lineIdx} className="block">
                {line.split("").map((letter, i) => (
                  <motion.span
                    key={`${lineIdx}-${i}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.4 + (lineIdx * line.length + i) * 0.035,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    style={{
                      background: lineIdx === 0
                        ? "linear-gradient(135deg, hsl(263 70% 65%) 0%, hsl(187 94% 55%) 50%, hsl(330 81% 65%) 100%)"
                        : "linear-gradient(135deg, hsl(187 94% 55%) 0%, hsl(330 81% 65%) 50%, hsl(263 70% 65%) 100%)",
                      backgroundSize: "200% 200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "gradient-shift 6s ease infinite",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Enter the neon arena. Battle minds in real-time multiplayer quizzes.
            <br className="hidden sm:block" />
            Outsmart, outspeed, and outlast your opponents.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
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

          {/* Stats bar */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass p-4 text-center"
                whileHover={{ y: -3, boxShadow: "0 0 20px hsl(263 70% 58% / 0.15)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
              >
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-heading">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="relative py-32 px-4">
        {/* Divider glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="text-xs font-heading uppercase tracking-[0.3em] text-primary mb-4 block">Why Play</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              Built for{" "}
              <span className="text-primary text-glow-purple">Competitors</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  className="glass p-8 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6, boxShadow: "0 0 40px hsl(263 70% 58% / 0.15)" }}
                >
                  {/* Hover gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, hsl(263 70% 58% / 0.05), transparent)" }}
                  />
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 relative z-10"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground relative z-10">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative py-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-heading uppercase tracking-[0.3em] text-secondary mb-4 block">How It Works</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              Three Steps to{" "}
              <span className="text-secondary text-glow-blue">Victory</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Join a Room", desc: "Pick a category and join a live quiz room with other players" },
              { step: "02", title: "Answer Fast", desc: "Race against the clock — faster answers earn more points" },
              { step: "03", title: "Claim Glory", desc: "Top the leaderboard and earn badges and bragging rights" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <motion.span
                  className="font-display text-6xl font-bold text-primary/10 block mb-4"
                  whileInView={{ opacity: [0, 1] }}
                  viewport={{ once: true }}
                >
                  {item.step}
                </motion.span>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <motion.div
          className="max-w-3xl mx-auto glass-strong p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at center, hsl(263 70% 58% / 0.15), transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <motion.span
              className="text-5xl mb-6 block"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡
            </motion.span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground tracking-wider">
              READY TO COMPETE?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
              Join thousands of players in the most immersive real-time quiz experience ever built. Your arena awaits.
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
      <footer className="border-t border-border/10 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(263 70% 58%), hsl(330 81% 60%))" }}
            >
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display text-sm tracking-[0.15em] text-muted-foreground">QUIZARENA</span>
          </div>
          <span className="text-xs text-muted-foreground">© 2026 QuizArena. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
