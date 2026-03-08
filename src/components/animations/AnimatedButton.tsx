import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary/90 hover:bg-primary text-primary-foreground neon-glow-purple",
  secondary: "bg-secondary/90 hover:bg-secondary text-secondary-foreground neon-glow-blue",
  accent: "bg-accent/90 hover:bg-accent text-accent-foreground neon-glow-pink",
  ghost: "bg-muted/40 hover:bg-muted/70 text-foreground border border-border/50",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const AnimatedButton = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  size = "md",
}: AnimatedButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl font-heading font-semibold tracking-wide transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* Shimmer sweep */}
      <motion.span
        className="absolute inset-0 opacity-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
        whileHover={{
          opacity: 1,
          x: ["-100%", "100%"],
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default AnimatedButton;
