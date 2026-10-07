import { useEffect, useState, useCallback } from 'react';
import { getGameSocket } from '@/integrations/socket/socket';
import { useAuth } from '@/hooks/useAuth';

export interface RemotePlayer {
  socketId: string;
  userId: string;
  name: string;
  score: number;
  isReady: boolean;
  avatarUrl?: string | null;
}

export interface RemoteRoomState {
  roomId: string;
  name: string;
  category: string;
  difficulty: string;
  status: 'waiting' | 'countdown' | 'in_round' | 'round_summary' | 'game_over';
  players: RemotePlayer[];
  currentQuestionIndex: number;
  totalQuestions: number;
  currentQuestion: {
    id?: string;
    question: string;
    options: string[];
    timeLimit: number;
  } | null;
  timeLeft: number;
  countdown: number;
}

export const useGameSocket = (roomId: string, roomMeta?: any) => {
  const { user, profile } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [roomState, setRoomState] = useState<RemoteRoomState | null>(null);
  const [socketChat, setSocketChat] = useState<any[]>([]);

  const socket = getGameSocket();

  useEffect(() => {
    if (!roomId) return;

    if (!socket.connected) {
      socket.connect();
    }

    const onConnect = () => {
      setIsConnected(true);
      const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Player';
      socket.emit('join_room', {
        roomId,
        userId: user?.id || `guest-${Date.now()}`,
        name: displayName,
        avatarUrl: profile?.avatar_url,
        roomMeta,
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onRoomState = (state: RemoteRoomState) => {
      setRoomState(state);
    };

    const onChatMessage = (msg: any) => {
      setSocketChat((prev) => [...prev, msg]);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('room_state', onRoomState);
    socket.on('chat_message', onChatMessage);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('room_state', onRoomState);
      socket.off('chat_message', onChatMessage);
      if (user?.id) {
        socket.emit('leave_room', { roomId, userId: user.id });
      }
    };
  }, [roomId, user?.id, profile?.display_name, profile?.avatar_url]);

  const startGame = useCallback(() => {
    if (user?.id) {
      socket.emit('start_game', { roomId, userId: user.id });
    }
  }, [roomId, user?.id, socket]);

  const submitAnswer = useCallback(
    (questionIndex: number, selectedAnswer: number, isDoublePoints = false) => {
      if (user?.id) {
        socket.emit('submit_answer', {
          roomId,
          userId: user.id,
          questionIndex,
          selectedAnswer,
          isDoublePoints,
        });
      }
    },
    [roomId, user?.id, socket]
  );

  const sendChat = useCallback(
    (message: string) => {
      const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Player';
      socket.emit('send_chat', {
        roomId,
        userId: user?.id || 'guest',
        name: displayName,
        message,
      });
    },
    [roomId, user?.id, profile?.display_name, socket]
  );

  return {
    isConnected,
    roomState,
    socketChat,
    startGame,
    submitAnswer,
    sendChat,
  };
};
