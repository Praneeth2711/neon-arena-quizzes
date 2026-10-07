import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { GameManager } from './gameManager';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';

// Middleware
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

// Socket.io initialization
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const gameManager = new GameManager(io);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Neon Arena Quizzes Node.js Game Server',
    uptime: process.uptime(),
    activeRooms: gameManager.getRoomsSummary().length,
    timestamp: new Date().toISOString(),
  });
});

// Rooms endpoint
app.get('/api/rooms', (_req, res) => {
  res.json({
    rooms: gameManager.getRoomsSummary(),
  });
});

// Quick Matchmaking endpoint
app.post('/api/matchmake', (req, res) => {
  const { category, difficulty } = req.body;
  const rooms = gameManager.getRoomsSummary();
  const available = rooms.find(
    (r) =>
      r.status === 'waiting' &&
      r.playerCount < r.maxPlayers &&
      (!category || r.category === category) &&
      (!difficulty || r.difficulty === difficulty)
  );

  if (available) {
    res.json({ matchFound: true, roomId: available.id });
  } else {
    // Generate a new quick room ID
    const newRoomId = `quick-${Date.now().toString(36)}`;
    res.json({ matchFound: false, suggestedRoomId: newRoomId });
  }
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log(`[Socket] Connected: ${socket.id}`);

  // Join Room
  socket.on('join_room', (data) => {
    console.log(`[Socket] join_room:`, data.roomId, data.name);
    gameManager.joinRoom(socket, data);
  });

  // Start Game
  socket.on('start_game', (data) => {
    console.log(`[Socket] start_game:`, data.roomId);
    gameManager.startGame(data.roomId, data.userId);
  });

  // Submit Answer
  socket.on('submit_answer', (data) => {
    gameManager.submitAnswer(socket, data);
  });

  // Chat message
  socket.on('send_chat', (data) => {
    gameManager.sendChat(data.roomId, data);
  });

  // Leave room
  socket.on('leave_room', (data) => {
    gameManager.leaveRoom(socket, data.roomId, data.userId);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`[Socket] Disconnected: ${socket.id}`);
    gameManager.handleDisconnect(socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Neon Arena Node.js Game Server running on http://localhost:${PORT}`);
  console.log(`📡 Socket.IO listening for real-time multiplayer connections`);
});
