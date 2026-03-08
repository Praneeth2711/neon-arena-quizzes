import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  user: string;
  text: string;
}

const EMOJIS = ["🔥", "🎯", "💀", "😂", "👏", "💯"];

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", user: "NeonKnight", text: "Let's go! 🔥" },
    { id: "2", user: "CyberQueen", text: "Easy question lol" },
    { id: "3", user: "PixelMaster", text: "I'm on a streak!" },
  ]);
  const [input, setInput] = useState("");
  const [floats, setFloats] = useState<{ id: number; emoji: string; x: number }[]>([]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((p) => [...p, { id: Date.now().toString(), user: "You", text: input }]);
    setInput("");
  };

  const react = (emoji: string) => {
    const id = Date.now();
    setFloats((p) => [...p, { id, emoji, x: 15 + Math.random() * 70 }]);
    setTimeout(() => setFloats((p) => p.filter((e) => e.id !== id)), 2000);
    setMessages((p) => [...p, { id: id.toString(), user: "You", text: emoji }]);
  };

  return (
    <div className="glass-neon hud-corners flex flex-col h-full max-h-[480px]">
      <div className="p-3 border-b border-border/20">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/70 flex items-center gap-2">
          <MessageCircle className="w-3.5 h-3.5" />
          Live Chat
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 relative">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="text-xs"
            >
              <span className="font-mono text-primary font-medium">{msg.user}</span>
              <span className="text-muted-foreground ml-1.5">{msg.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {floats.map((f) => (
            <motion.span
              key={f.id}
              className="absolute text-xl pointer-events-none"
              style={{ left: `${f.x}%` }}
              initial={{ bottom: 0, opacity: 1, scale: 0.5 }}
              animate={{ bottom: "100%", opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              {f.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-3 py-1.5 flex gap-1 border-t border-border/15">
        {EMOJIS.map((e) => (
          <motion.button
            key={e}
            onClick={() => react(e)}
            className="text-sm p-1 hover:scale-125 transition-transform"
            whileTap={{ scale: 0.8 }}
          >
            {e}
          </motion.button>
        ))}
      </div>

      <div className="p-3 border-t border-border/20 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type..."
          className="flex-1 bg-muted/30 text-foreground text-xs rounded-lg px-3 py-2 outline-none border border-border/20 focus:border-primary/40 transition-colors font-mono placeholder:text-muted-foreground"
        />
        <motion.button
          onClick={send}
          className="p-2 rounded-lg bg-primary/15 text-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Send className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatPanel;
