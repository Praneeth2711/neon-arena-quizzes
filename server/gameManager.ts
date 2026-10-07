import { Server as SocketIOServer, Socket } from 'socket.io';

export interface Player {
  socketId: string;
  userId: string;
  name: string;
  score: number;
  isReady: boolean;
  avatarUrl?: string | null;
  lastAnswerCorrect?: boolean;
}

export interface Question {
  id?: string;
  question: string;
  options: string[];
  correct: number;
  timeLimit: number;
}

export interface GameRoom {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  maxPlayers: number;
  hostId: string;
  status: 'waiting' | 'countdown' | 'in_round' | 'round_summary' | 'game_over';
  players: Map<string, Player>;
  questions: Question[];
  currentQuestionIndex: number;
  timeLeft: number;
  countdown: number;
  timer?: NodeJS.Timeout | null;
}

export class GameManager {
  private io: SocketIOServer;
  private rooms: Map<string, GameRoom> = new Map();

  constructor(io: SocketIOServer) {
    this.io = io;
  }

  public getOrCreateRoom(
    roomId: string,
    meta?: { name?: string; category?: string; difficulty?: string; maxPlayers?: number; hostId?: string; questions?: Question[] }
  ): GameRoom {
    let room = this.rooms.get(roomId);
    if (!room) {
      room = {
        id: roomId,
        name: meta?.name || `Arena Room ${roomId.substring(0, 6)}`,
        category: meta?.category || 'General',
        difficulty: meta?.difficulty || 'Medium',
        maxPlayers: meta?.maxPlayers || 8,
        hostId: meta?.hostId || '',
        status: 'waiting',
        players: new Map(),
        questions: meta?.questions || this.getDefaultQuestions(meta?.category || 'General'),
        currentQuestionIndex: 0,
        timeLeft: 20,
        countdown: 3,
        timer: null,
      };
      this.rooms.set(roomId, room);
    }
    return room;
  }

  public joinRoom(socket: Socket, data: { roomId: string; userId: string; name: string; avatarUrl?: string | null; roomMeta?: any }) {
    const { roomId, userId, name, avatarUrl, roomMeta } = data;
    const room = this.getOrCreateRoom(roomId, roomMeta);

    // If room is already full
    if (room.players.size >= room.maxPlayers && !room.players.has(userId)) {
      socket.emit('error_message', { message: 'This arena is currently full.' });
      return;
    }

    // Register or update player
    const existing = room.players.get(userId);
    const player: Player = {
      socketId: socket.id,
      userId,
      name: name || 'Gladiator',
      score: existing ? existing.score : 0,
      isReady: existing ? existing.isReady : true,
      avatarUrl: avatarUrl ?? null,
    };

    room.players.set(userId, player);
    socket.join(roomId);

    // Broadcast room update
    this.broadcastRoomState(roomId);

    // Announce player joined in chat
    this.io.to(roomId).emit('chat_message', {
      id: `sys-${Date.now()}`,
      room_id: roomId,
      user_id: 'system',
      user_name: 'Arena System',
      message: `${player.name} joined the arena!`,
      created_at: new Date().toISOString(),
      is_system: true,
    });
  }

  public leaveRoom(socket: Socket, roomId: string, userId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.players.delete(userId);
    socket.leave(roomId);

    if (room.players.size === 0) {
      if (room.timer) clearInterval(room.timer);
      this.rooms.delete(roomId);
    } else {
      this.broadcastRoomState(roomId);
    }
  }

  public handleDisconnect(socketId: string) {
    for (const [roomId, room] of this.rooms.entries()) {
      for (const [userId, player] of room.players.entries()) {
        if (player.socketId === socketId) {
          this.leaveRoom({ leave: () => {} } as any, roomId, userId);
          break;
        }
      }
    }
  }

  public startGame(roomId: string, hostUserId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    if (room.status !== 'waiting') return;

    room.status = 'countdown';
    room.countdown = 3;
    room.currentQuestionIndex = 0;

    this.broadcastRoomState(roomId);

    if (room.timer) clearInterval(room.timer);

    room.timer = setInterval(() => {
      if (room.countdown > 0) {
        room.countdown -= 1;
        this.io.to(roomId).emit('game_countdown', { countdown: room.countdown });
      } else {
        if (room.timer) clearInterval(room.timer);
        this.startQuestionRound(roomId);
      }
    }, 1000);
  }

  private startQuestionRound(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const currentQ = room.questions[room.currentQuestionIndex];
    if (!currentQ) {
      this.endGame(roomId);
      return;
    }

    room.status = 'in_round';
    room.timeLeft = currentQ.timeLimit || 20;

    this.broadcastRoomState(roomId);

    if (room.timer) clearInterval(room.timer);

    room.timer = setInterval(() => {
      if (room.timeLeft > 0) {
        room.timeLeft -= 1;
        this.io.to(roomId).emit('timer_tick', { timeLeft: room.timeLeft });
      } else {
        if (room.timer) clearInterval(room.timer);
        this.endQuestionRound(roomId);
      }
    }, 1000);
  }

  private endQuestionRound(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.status = 'round_summary';
    const currentQ = room.questions[room.currentQuestionIndex];

    this.io.to(roomId).emit('round_ended', {
      correctAnswer: currentQ.correct,
      currentQuestionIndex: room.currentQuestionIndex,
    });

    this.broadcastRoomState(roomId);

    // After 3 seconds, advance to next question or end game
    if (room.timer) clearInterval(room.timer);
    room.timer = setTimeout(() => {
      if (room.currentQuestionIndex < room.questions.length - 1) {
        room.currentQuestionIndex += 1;
        this.startQuestionRound(roomId);
      } else {
        this.endGame(roomId);
      }
    }, 3000);
  }

  private endGame(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.status = 'game_over';
    if (room.timer) clearInterval(room.timer);

    const leaderboard = Array.from(room.players.values()).sort((a, b) => b.score - a.score);

    this.io.to(roomId).emit('game_over', {
      leaderboard,
      winner: leaderboard[0] || null,
    });

    this.broadcastRoomState(roomId);
  }

  public submitAnswer(
    socket: Socket,
    data: { roomId: string; userId: string; questionIndex: number; selectedAnswer: number; isDoublePoints?: boolean }
  ) {
    const { roomId, userId, questionIndex, selectedAnswer, isDoublePoints } = data;
    const room = this.rooms.get(roomId);
    if (!room || room.status !== 'in_round') return;
    if (questionIndex !== room.currentQuestionIndex) return;

    const player = room.players.get(userId);
    if (!player) return;

    const currentQ = room.questions[room.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQ.correct;

    if (isCorrect) {
      const speedBonus = Math.round((room.timeLeft / (currentQ.timeLimit || 20)) * 100);
      const points = (200 + speedBonus) * (isDoublePoints ? 2 : 1);
      player.score += points;
      player.lastAnswerCorrect = true;
    } else {
      player.lastAnswerCorrect = false;
    }

    socket.emit('answer_result', {
      isCorrect,
      correctAnswer: currentQ.correct,
      score: player.score,
    });

    this.broadcastRoomState(roomId);
  }

  public sendChat(roomId: string, data: { userId: string; name: string; message: string }) {
    this.io.to(roomId).emit('chat_message', {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      room_id: roomId,
      user_id: data.userId,
      user_name: data.name,
      message: data.message,
      created_at: new Date().toISOString(),
    });
  }

  public broadcastRoomState(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const playersArray = Array.from(room.players.values());
    const currentQ = room.questions[room.currentQuestionIndex];

    this.io.to(roomId).emit('room_state', {
      roomId: room.id,
      name: room.name,
      category: room.category,
      difficulty: room.difficulty,
      status: room.status,
      players: playersArray,
      currentQuestionIndex: room.currentQuestionIndex,
      totalQuestions: room.questions.length,
      currentQuestion: currentQ
        ? {
            id: currentQ.id,
            question: currentQ.question,
            options: currentQ.options,
            timeLimit: currentQ.timeLimit,
          }
        : null,
      timeLeft: room.timeLeft,
      countdown: room.countdown,
    });
  }

  public getRoomsSummary() {
    return Array.from(this.rooms.values()).map((r) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      difficulty: r.difficulty,
      maxPlayers: r.maxPlayers,
      playerCount: r.players.size,
      status: r.status,
    }));
  }

  private getDefaultQuestions(category: string): Question[] {
    return [
      {
        question: `What is the powerhouse of the cell? (${category})`,
        options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Endoplasmic Reticulum'],
        correct: 0,
        timeLimit: 20,
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correct: 1,
        timeLimit: 20,
      },
      {
        question: 'What is the speed of light in vacuum approximately?',
        options: ['300,000 km/s', '150,000 km/s', '1,000,000 km/s', '30,000 km/s'],
        correct: 0,
        timeLimit: 20,
      },
    ];
  }
}
