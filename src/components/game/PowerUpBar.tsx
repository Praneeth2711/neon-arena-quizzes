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
    <div className="flex gap-3 justify-center mt-4">
      {POWERUPS.map((pu) => {
        const isUsed = used.has(pu.id);
        const Icon = pu.icon;
        return (
          <motion.button
            key={pu.id}
            onClick={() => activate(pu.id)}
            disabled={isUsed}
            className={`card-premium p-3 rounded-xl flex flex-col items-center gap-1 min-w-[70px] transition-all ${isUsed ? "opacity-30 cursor-default" : "cursor-pointer"}`}
            whileHover={!isUsed ? { scale: 1.05, y: -2 } : {}}
            whileTap={!isUsed ? { scale: 0.95 } : {}}
          >
            <Icon className={`w-5 h-5 ${isUsed ? "text-muted-foreground" : "text-primary"}`} />
            <span className="text-xs font-medium text-foreground">{pu.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default PowerUpBar;
