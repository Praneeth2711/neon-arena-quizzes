import { motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "cyber";

const styles: Record<Variant, string> = {
  primary: "bg-primary/90 hover:bg-primary text-primary-foreground neon-glow-purple",
  secondary: "bg-secondary/90 hover:bg-secondary text-secondary-foreground neon-glow-blue",
  accent: "bg-accent/90 hover:bg-accent text-accent-foreground neon-glow-pink",
  ghost: "bg-muted/30 hover:bg-muted/60 text-foreground border border-border/50 hover:border-primary/30",
  cyber: "bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
};

const sizes = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

const AnimatedButton = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  size = "md",
}: {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}) => (
  <motion.button
    onClick={onClick}
    className={`relative overflow-hidden rounded-xl font-heading font-semibold tracking-wide transition-all duration-300 flex items-center justify-center ${styles[variant]} ${sizes[size]} ${className}`}
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
  >
    {/* Shimmer sweep on hover */}
    <motion.span
      className="absolute inset-0 opacity-0 pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
      }}
      whileHover={{
        opacity: 1,
        x: ["-100%", "200%"],
        transition: { duration: 0.7, ease: "easeInOut" },
      }}
    />
    {/* Ripple on press */}
    <span className="relative z-10 flex items-center gap-inherit">{children}</span>
  </motion.button>
);

export default AnimatedButton;
