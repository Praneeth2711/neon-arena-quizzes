import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

const AnimatedPageTransition = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPageTransition;
