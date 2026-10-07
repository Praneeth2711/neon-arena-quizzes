import { describe, it, expect } from 'vitest';
import { GameManager } from '../../server/gameManager';
import { Server as SocketIOServer } from 'socket.io';

describe('Node.js Game Server & GameManager', () => {
  const fakeIo = {
    to: () => ({
      emit: () => {},
    }),
    emit: () => {},
  } as unknown as SocketIOServer;

  it('1. should initialize GameManager and create room', () => {
    const manager = new GameManager(fakeIo);
    const room = manager.getOrCreateRoom('test-room-1', {
      name: 'Cyber Duel',
      category: 'Technology',
      difficulty: 'Hard',
      maxPlayers: 4,
    });

    expect(room).toBeDefined();
    expect(room.id).toBe('test-room-1');
    expect(room.name).toBe('Cyber Duel');
    expect(room.players.size).toBe(0);
    expect(room.status).toBe('waiting');
  });

  it('2. should join player to room and manage state', () => {
    const manager = new GameManager(fakeIo);
    const fakeSocket = {
      id: 'socket-user-1',
      join: () => {},
      emit: () => {},
    } as any;

    manager.joinRoom(fakeSocket, {
      roomId: 'test-room-2',
      userId: 'user-abc-123',
      name: 'Gladiator_1',
    });

    const room = manager.getOrCreateRoom('test-room-2');
    expect(room.players.size).toBe(1);
    expect(room.players.get('user-abc-123')?.name).toBe('Gladiator_1');
  });

  it('3. should list active room summaries', () => {
    const manager = new GameManager(fakeIo);
    manager.getOrCreateRoom('room-alpha', { name: 'Alpha Arena', category: 'Science' });
    manager.getOrCreateRoom('room-beta', { name: 'Beta Arena', category: 'History' });

    const summary = manager.getRoomsSummary();
    expect(summary.length).toBe(2);
    expect(summary.some((r) => r.name === 'Alpha Arena')).toBe(true);
    expect(summary.some((r) => r.name === 'Beta Arena')).toBe(true);
  });
});
