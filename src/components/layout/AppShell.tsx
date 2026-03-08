import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Zap, Trophy, User, Home, Crosshair } from "lucide-react";
import CustomCursor from "../../components/animations/CustomCursor";

const NAV = [
  { path: "/", label: "Home", icon: Home },
  { path: "/lobby", label: "Lobby", icon: Zap },
  { path: "/leaderboard", label: "Rankings", icon: Trophy },
  { path: "/profile", label: "Profile", icon: User },
];

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, hsl(263 70% 50% / 0.04) 0%, transparent 60%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, hsl(192 95% 50% / 0.03) 0%, transparent 60%)" }} />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ backdropFilter: "blur(16px)", background: "hsl(235 25% 4% / 0.8)", borderBottom: "1px solid hsl(235 15% 15% / 0.4)" }}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(263 70% 58%), hsl(330 85% 60%))" }}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              <Crosshair className="w-4 h-4 text-primary-foreground" />
            </motion.div>
            <span className="font-display text-sm tracking-[0.25em] text-foreground">QUIZARENA</span>
          </Link>

          <div className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      active
                        ? "bg-primary/15 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-14">{children}</main>
    </div>
  );
};

export default AppShell;
