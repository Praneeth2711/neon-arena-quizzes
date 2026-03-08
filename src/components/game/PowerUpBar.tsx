import { motion } from "framer-motion";
import { Zap, Clock, Star } from "lucide-react";
import { useState } from "react";

const POWERUPS = [
  { id: "5050", name: "50/50", icon: Zap, desc: "Remove 2 wrong" },
  { id: "time", name: "+10s", icon: Clock, desc: "Extra time" },
  { id: "double", name: "2x", icon: Star, desc: "Double pts" },
];

const PowerUpBar = ({ onActivate }: { onActivate?: (id: string) => void }) => {
  const [used, setUsed] = useState<Set<string>>(new Set());

  const activate = (id: string) => {
    if (used.has(id)) return;
    setUsed((p) => new Set(p).add(id));
    onActivate?.(id);
  };

  return (
    <div className="flex gap-3 justify-center">
      {POWERUPS.map((pu) => {
        const isUsed = used.has(pu.id);
        const Icon = pu.icon;
        return (
          <motion.button
            key={pu.id}
            onClick={() => activate(pu.id)}
            disabled={isUsed}
            className={`glass-neon p-3 rounded-xl flex flex-col items-center gap-1 min-w-[70px] transition-all ${isUsed ? "opacity-25 cursor-default" : "cursor-pointer"}`}
            whileHover={!isUsed ? { scale: 1.12, boxShadow: "0 0 25px hsl(263 70% 58% / 0.3)" } : {}}
            whileTap={!isUsed ? { scale: 0.9 } : {}}
          >
            <motion.div
              animate={!isUsed ? { filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-[9px] font-mono text-foreground">{pu.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default PowerUpBar;
