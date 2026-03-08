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
    <div className="card-premium flex flex-col h-full max-h-[480px]">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          Live Chat
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 relative">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm"
            >
              <span className="font-medium text-primary">{msg.user}</span>
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

      <div className="px-4 py-2 flex gap-1 border-t border-border">
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

      <div className="p-3 border-t border-border flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="flex-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2 outline-none border border-border focus:border-primary/50 transition-colors placeholder:text-muted-foreground"
        />
        <motion.button
          onClick={send}
          className="p-2 rounded-lg bg-primary text-primary-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatPanel;
