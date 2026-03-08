import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: number;
}

const EMOJIS = ["🔥", "🎯", "💀", "😂", "👏", "💯"];

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", user: "NeonKnight", text: "Let's go! 🔥", timestamp: Date.now() - 5000 },
    { id: "2", user: "CyberQueen", text: "Easy question lol", timestamp: Date.now() - 3000 },
    { id: "3", user: "PixelMaster", text: "I'm on a streak!", timestamp: Date.now() - 1000 },
  ]);
  const [input, setInput] = useState("");
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; x: number }[]>([]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), user: "You", text: input, timestamp: Date.now() },
    ]);
    setInput("");
  };

  const sendEmoji = (emoji: string) => {
    const id = Date.now();
    setFloatingEmojis((prev) => [...prev, { id, emoji, x: 20 + Math.random() * 60 }]);
    setTimeout(() => setFloatingEmojis((prev) => prev.filter((e) => e.id !== id)), 2000);
    setMessages((prev) => [
      ...prev,
      { id: id.toString(), user: "You", text: emoji, timestamp: Date.now() },
    ]);
  };

  return (
    <div className="glass-strong flex flex-col h-full max-h-[500px]">
      <div className="p-3 border-b border-border/30">
        <h3 className="font-heading text-sm font-semibold text-foreground">Live Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 relative">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm"
            >
              <span className="font-heading text-primary font-medium">{msg.user}</span>
              <span className="text-muted-foreground ml-1">{msg.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Floating emojis */}
        <AnimatePresence>
          {floatingEmojis.map((fe) => (
            <motion.span
              key={fe.id}
              className="absolute text-2xl pointer-events-none"
              style={{ left: `${fe.x}%` }}
              initial={{ bottom: 0, opacity: 1, scale: 0.5 }}
              animate={{ bottom: "100%", opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {fe.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Emoji bar */}
      <div className="px-3 py-1 flex gap-1 border-t border-border/20">
        {EMOJIS.map((emoji) => (
          <motion.button
            key={emoji}
            onClick={() => sendEmoji(emoji)}
            className="text-lg hover:scale-125 transition-transform p-1"
            whileTap={{ scale: 0.8 }}
          >
            {emoji}
          </motion.button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/30 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-muted/40 text-foreground text-sm rounded-lg px-3 py-2 outline-none border border-border/30 focus:border-primary/50 transition-colors placeholder:text-muted-foreground"
        />
        <motion.button
          onClick={sendMessage}
          className="p-2 rounded-lg bg-primary/20 text-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatPanel;
