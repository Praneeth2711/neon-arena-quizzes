import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Send, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Message {
  id: string;
  user_id: string;
  display_name: string;
  message: string;
  created_at: string;
}

const EMOJIS = ["🔥", "🎯", "💀", "😂", "👏", "💯"];

interface ChatPanelProps {
  roomId: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: "m1", user_id: "bot-1", display_name: "NeonKnight", message: "Good luck everyone! 🔥", created_at: new Date(Date.now() - 60000).toISOString() },
  { id: "m2", user_id: "bot-2", display_name: "CyberQueen", message: "Ready for the challenge 🎯", created_at: new Date(Date.now() - 30000).toISOString() },
];

const ChatPanel = ({ roomId }: ChatPanelProps) => {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [floats, setFloats] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentDisplayName = profile?.display_name || user?.email?.split("@")[0] || "You";

  // Fetch existing messages + subscribe to new ones
  useEffect(() => {
    if (!roomId) return;

    let isMounted = true;

    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select("id, user_id, message, created_at")
          .eq("room_id", roomId)
          .order("created_at", { ascending: true })
          .limit(100);

        if (!error && data && data.length > 0 && isMounted) {
          const userIds = [...new Set(data.map((m) => m.user_id))];
          const { data: profiles } = await supabase
            .from("profiles")
            .select("user_id, display_name")
            .in("user_id", userIds);

          const nameMap = new Map(profiles?.map((p) => [p.user_id, p.display_name]) ?? []);

          setMessages(
            data.map((m) => ({
              ...m,
              display_name: nameMap.get(m.user_id) ?? "Player",
            }))
          );
        }
      } catch (err) {
        console.warn("Chat messages load notice:", err);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel(`chat:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          const newMsg = payload.new as { id: string; user_id: string; message: string; created_at: string };
          const { data: prof } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("user_id", newMsg.user_id)
            .maybeSingle();

          if (isMounted) {
            setMessages((prev) => [
              ...prev,
              {
                ...newMsg,
                display_name: prof?.display_name ?? "Player",
              },
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg || !roomId) return;
    if (!text) setInput("");

    const tempId = `local-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      user_id: user?.id || "local-guest",
      display_name: currentDisplayName,
      message: msg,
      created_at: new Date().toISOString(),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, optimisticMessage]);

    if (user?.id) {
      setSending(true);
      try {
        await supabase.from("chat_messages").insert({
          room_id: roomId,
          user_id: user.id,
          message: msg,
        });
      } catch (err) {
        console.warn("Chat send notice:", err);
      } finally {
        setSending(false);
      }
    }
  };

  const react = (emoji: string) => {
    const id = Date.now();
    setFloats((p) => [...p, { id, emoji, x: 15 + Math.random() * 70 }]);
    setTimeout(() => setFloats((p) => p.filter((e) => e.id !== id)), 2000);
    send(emoji);
  };

  const isMe = (userId: string) => userId === user?.id || userId === "local-guest";

  return (
    <div className="card-premium flex flex-col h-full max-h-[480px]">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          Live Arena Chat
          <span className="text-xs text-muted-foreground font-normal">({messages.length})</span>
        </h3>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 relative">
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-4">No messages yet. Say hello! 👋</p>
        )}
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm flex flex-wrap items-baseline gap-1.5"
            >
              <span className={`font-semibold text-xs ${isMe(msg.user_id) ? "text-primary" : "text-muted-foreground"}`}>
                {isMe(msg.user_id) ? "You:" : `${msg.display_name}:`}
              </span>
              <span className="text-foreground text-sm">{msg.message}</span>
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
            className="text-sm p-1.5 hover:scale-125 transition-transform cursor-pointer"
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
          placeholder="Send a message..."
          className="flex-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2 outline-none border border-border focus:border-primary/50 transition-colors placeholder:text-muted-foreground"
        />
        <motion.button
          onClick={() => send()}
          disabled={sending || !input.trim()}
          className="p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 cursor-pointer"
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
