import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Trophy, User, Home, Gamepad2, Zap, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const NAV = [
  { path: "/", label: "Home", icon: Home },
  { path: "/lobby", label: "Lobby", icon: Gamepad2 },
  { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { path: "/profile", label: "Profile", icon: User },
];

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-2xl border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%))" }}
            >
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-[15px] font-semibold text-foreground tracking-tight">QuizArena</span>
          </Link>

          <div className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-primary-foreground"
                    style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%))" }}
                  >
                    {(profile?.display_name || user.email || "U").slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[13px] font-medium text-foreground truncate max-w-[120px]">
                    {profile?.display_name || user.email?.split("@")[0]}
                  </span>
                </div>
                <motion.button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                  whileTap={{ scale: 0.97 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Sign Out</span>
                </motion.button>
              </>
            ) : (
              <Link to="/signin">
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold text-primary-foreground"
                  style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%))" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default AppShell;
