import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "../components/animations/CountUp";
import { useNavigate } from "react-router-dom";
import { Users, Trophy, Zap, ArrowRight, Play, Globe, Shield, Clock, MessageCircle, Award } from "lucide-react";
import { useRef } from "react";

const FEATURES = [
  { icon: Zap, title: "Real-Time Multiplayer", desc: "Compete live against players worldwide with sub-second latency and instant score updates." },
  { icon: Trophy, title: "Live Leaderboards", desc: "Watch rankings change in real-time as you climb to the top of the global standings." },
  { icon: Globe, title: "20+ Categories", desc: "From science to pop culture — find your niche and master it across thousands of questions." },
  { icon: Shield, title: "Global Ranking", desc: "A fair, ELO-based ranking system that rewards consistent performance and skill." },
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
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}>
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold text-foreground tracking-tight">QuizArena</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How it works", "Leaderboard"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              onClick={() => navigate("/lobby")}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center gradient-mesh">
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">12,847 players online now</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span className="text-foreground">The Ultimate</span>
            <br />
            <span className="gradient-text-animated">Quiz Platform</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Challenge friends, compete globally, and master knowledge in real-time.
            Built for speed, designed for delight.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={() => navigate("/lobby")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-primary-foreground text-base font-semibold transition-all"
              style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 30px hsl(245 58% 51% / 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              Start Playing
            </motion.button>
            <motion.button
              onClick={() => navigate("/leaderboard")}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-secondary text-secondary-foreground text-base font-semibold border border-border hover:bg-muted transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View Leaderboard
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FLOATING PREVIEW ===== */}
      <section className="relative py-20 px-4 -mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="card-float p-1 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-muted/30 rounded-xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mini Leaderboard */}
                <motion.div className="card-premium p-5 animate-float" style={{ animationDelay: "0s" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Leaderboard</span>
                  </div>
                  {["NeonKnight", "CyberQueen", "PixelMaster"].map((name, i) => (
                    <div key={name} className="flex items-center gap-3 py-2">
                      <span className="text-xs font-semibold text-muted-foreground w-4">{i + 1}</span>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-primary-foreground" style={{ background: `linear-gradient(135deg, hsl(${200 + i * 40} 60% 50%), hsl(${220 + i * 40} 70% 60%))` }}>
                        {name[0]}
                      </div>
                      <span className="text-sm text-foreground flex-1">{name}</span>
                      <span className="text-xs text-muted-foreground">{(2400 - i * 200).toLocaleString()}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Mini Quiz Card */}
                <motion.div className="card-premium p-5 animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted-foreground">Question 3/10</span>
                    <div className="flex items-center gap-1 text-xs text-warning font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      15s
                    </div>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-4">What is the speed of light?</p>
                  {["299,792 km/s", "150,000 km/s"].map((opt, i) => (
                    <div key={opt} className={`p-2.5 rounded-lg border text-sm mb-2 ${i === 0 ? "border-primary/30 bg-primary/5 text-primary" : "border-border text-foreground"}`}>
                      {opt}
                    </div>
                  ))}
                </motion.div>

                {/* Mini Chat */}
                <motion.div className="card-premium p-5 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Live Chat</span>
                  </div>
                  {[
                    { user: "NeonKnight", text: "Let's go! 🔥" },
                    { user: "CyberQueen", text: "Easy question lol" },
                    { user: "PixelMaster", text: "I'm on a streak!" },
                  ].map((msg, i) => (
                    <div key={i} className="py-1.5 text-sm">
                      <span className="font-medium text-primary">{msg.user}</span>
                      <span className="text-muted-foreground ml-1.5">{msg.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-sm font-medium text-primary mb-3">Features</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Everything you need to <span className="gradient-text">compete</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  className="card-premium p-7 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="relative py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-primary mb-3">How it works</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Three steps to <span className="gradient-text">victory</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Join a Room", desc: "Pick a category and jump into a live quiz room", icon: Zap },
              { step: "02", title: "Answer Fast", desc: "Race the clock — speed earns bonus points", icon: Clock },
              { step: "03", title: "Claim Glory", desc: "Top the leaderboard and earn badges", icon: Award },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-6xl font-bold text-muted/60 block mb-2">{item.step}</span>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center card-premium p-12 md:p-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 gradient-mesh opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground tracking-tight">
              Ready to compete?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join thousands of players in the most polished real-time quiz experience. Your arena awaits.
            </p>
            <motion.button
              onClick={() => navigate("/lobby")}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-primary-foreground text-base font-semibold"
              style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 30px hsl(245 58% 51% / 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              Start Playing
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(245 58% 51%), hsl(262 83% 58%))" }}>
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">QuizArena</span>
          </div>
          <span className="text-sm text-muted-foreground">© 2026 QuizArena. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
