import { motion } from "framer-motion";
import { Zap, Clock, Star } from "lucide-react";
import { useState } from "react";

interface PowerUp {
  id: string;
  name: string;
  icon: typeof Zap;
  description: string;
  uses: number;
}

const POWER_UPS: PowerUp[] = [
  { id: "5050", name: "50/50", icon: Zap, description: "Remove 2 wrong answers", uses: 1 },
  { id: "time", name: "+10s", icon: Clock, description: "Extra time", uses: 1 },
  { id: "double", name: "2x", icon: Star, description: "Double points", uses: 1 },
];

const PowerUpBar = ({ onActivate }: { onActivate?: (id: string) => void }) => {
  const [activated, setActivated] = useState<Set<string>>(new Set());

  const activate = (id: string) => {
    if (activated.has(id)) return;
    setActivated((prev) => new Set(prev).add(id));
    onActivate?.(id);
  };

  return (
    <div className="flex gap-3 justify-center">
      {POWER_UPS.map((pu) => {
        const used = activated.has(pu.id);
        const Icon = pu.icon;
        return (
          <motion.button
            key={pu.id}
            onClick={() => activate(pu.id)}
            disabled={used}
            className={`glass p-3 rounded-xl flex flex-col items-center gap-1 min-w-[70px] transition-all ${used ? "opacity-30 cursor-default" : "cursor-pointer"}`}
            whileHover={!used ? { scale: 1.1, boxShadow: "0 0 25px hsl(263 70% 58% / 0.5)" } : {}}
            whileTap={!used ? { scale: 0.9 } : {}}
          >
            <motion.div
              animate={!used ? { filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-[10px] font-heading text-foreground">{pu.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default PowerUpBar;
