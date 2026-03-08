import { motion } from "framer-motion";
import AnimatedButton from "../components/animations/AnimatedButton";
import FloatingParticles from "../components/animations/FloatingParticles";
import Hero3DScene from "../components/animations/Hero3DScene";
import { useNavigate } from "react-router-dom";
import { Sparkles, Users, Trophy, Zap } from "lucide-react";

const letterVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FEATURES = [
  { icon: Zap, title: "Real-Time", desc: "Compete live with players worldwide" },
  { icon: Users, title: "Multiplayer", desc: "Join rooms with friends or strangers" },
  { icon: Trophy, title: "Rankings", desc: "Climb the global leaderboard" },
  { icon: Sparkles, title: "Power-Ups", desc: "Use abilities to gain an edge" },
];

const Landing = () => {
  const navigate = useNavigate();
  const title = "THE ULTIMATE QUIZ ARENA";

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center">
        <FloatingParticles count={60} />
        <Hero3DScene />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]"
          animate={{ x: ["-20%", "20%", "-20%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[80px]"
          animate={{ x: ["20%", "-20%", "20%"], y: ["10%", "-10%", "10%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Title with letter stagger */}
          <motion.div className="mb-6">
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              {title.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-glow-purple"
                  style={{
                    background: "linear-gradient(135deg, hsl(263 70% 58%), hsl(187 94% 43%), hsl(330 81% 60%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: letter === " " ? "transparent" : "transparent",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            Enter the neon arena. Battle minds in real-time multiplayer quizzes.
            Outsmart, outspeed, and outlast your opponents.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <AnimatedButton variant="primary" size="lg" onClick={() => navigate("/lobby")}>
              Enter Arena
            </AnimatedButton>
            <AnimatedButton variant="ghost" size="lg" onClick={() => navigate("/leaderboard")}>
              View Rankings
            </AnimatedButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Players Love{" "}
            <span className="text-primary text-glow-purple">QuizArena</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  className="glass p-6 text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 0 30px hsl(263 70% 58% / 0.2)" }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-4">
        <motion.div
          className="max-w-3xl mx-auto glass-strong p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />
          <div className="relative z-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
              READY TO COMPETE?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of players in the most immersive quiz experience ever built.
            </p>
            <AnimatedButton variant="primary" size="lg" onClick={() => navigate("/lobby")}>
              Start Playing Now
            </AnimatedButton>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-display text-sm text-muted-foreground tracking-wider">QUIZARENA</span>
          <span className="text-xs text-muted-foreground">© 2026 All rights reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
