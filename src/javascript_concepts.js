/**
 * ============================================================
 *  NEON ARENA QUIZZES — JavaScript Concepts Reference
 *  FSD Internals — Core JS used in this project
 * ============================================================
 */

// ─────────────────────────────────────────────
// 1. VARIABLES & DATA TYPES
// ─────────────────────────────────────────────
const APP_NAME = "QuizArena";          // string  — immutable reference
let currentScore = 0;                   // number  — mutable
let isGameOver = false;                 // boolean
let selectedAnswer = null;              // null    — no value yet
const playerData = undefined;           // undefined — not yet assigned

console.log(typeof APP_NAME);           // "string"
console.log(typeof currentScore);       // "number"
console.log(typeof isGameOver);         // "boolean"
console.log(typeof selectedAnswer);     // "object"  (quirk of JS)
console.log(typeof playerData);         // "undefined"

// ─────────────────────────────────────────────
// 2. ARRAYS — Used for questions, players, rooms
// ─────────────────────────────────────────────
const QUESTIONS = [
  { question: "What is the speed of light in vacuum?", options: ["299,792 km/s", "150,000 km/s", "3,000,000 km/s", "1,080,000 km/h"], correct: 0 },
  { question: "Which planet has the most moons?",       options: ["Jupiter", "Saturn", "Uranus", "Neptune"],                          correct: 1 },
  { question: "Who created JavaScript?",                options: ["Guido van Rossum", "James Gosling", "Brendan Eich", "Tim Berners-Lee"], correct: 2 },
];

const PLAYERS = [
  { id: "1", name: "NeonKnight", score: 2400 },
  { id: "2", name: "CyberQueen", score: 2200 },
  { id: "3", name: "PixelMaster", score: 1800 },
  { id: "4", name: "DataWizard",  score: 1500 },
  { id: "5", name: "You",         score: 2100 },
];

// ─────────────────────────────────────────────
// 3. ARRAY METHODS — filter, map, reduce, sort, find
// ─────────────────────────────────────────────

// .filter() — used in Lobby.tsx to filter rooms
const ROOMS = [
  { id: "1", name: "Quantum Physics", status: "live",    players: 8,  max: 10 },
  { id: "2", name: "World History",   status: "waiting", players: 3,  max: 8  },
  { id: "3", name: "Pop Culture",     status: "live",    players: 10, max: 10 },
  { id: "4", name: "AI & ML",         status: "waiting", players: 5,  max: 8  },
];

const liveRooms    = ROOMS.filter(room => room.status === "live");
const waitingRooms = ROOMS.filter(room => room.status === "waiting");
console.log("Live rooms:", liveRooms.length);      // 2
console.log("Waiting rooms:", waitingRooms.length); // 2

// .map() — transform an array, used everywhere in JSX rendering
const playerNames = PLAYERS.map(player => player.name);
console.log(playerNames); // ["NeonKnight", "CyberQueen", ...]

const playerScoresDoubled = PLAYERS.map(p => ({ ...p, score: p.score * 2 }));

// .reduce() — used in Lobby.tsx to count total players
const totalPlayers = ROOMS.reduce((sum, room) => sum + room.players, 0);
console.log("Total players:", totalPlayers); // 26

// .find() — find a single element
const you = PLAYERS.find(p => p.name === "You");
console.log("Your score:", you?.score); // 2100 (optional chaining)

// .sort() — sort leaderboard by score descending
const sortedPlayers = [...PLAYERS].sort((a, b) => b.score - a.score);
console.log("Leaderboard:", sortedPlayers.map(p => `${p.name}: ${p.score}`));

// .some() / .every()
const hasFullRoom = ROOMS.some(r => r.players >= r.max);
const allRoomsLive = ROOMS.every(r => r.status === "live");
console.log("Has full room:", hasFullRoom);   // true
console.log("All live:", allRoomsLive);       // false

// ─────────────────────────────────────────────
// 4. OBJECTS & DESTRUCTURING
// ─────────────────────────────────────────────
const player = { id: "5", name: "You", score: 2100, wins: 42 };

// Destructuring (used heavily in React components)
const { id, name, score, wins } = player;
console.log(`${name} has ${score} points and ${wins} wins.`);

// Nested destructuring
const room = { id: "1", meta: { category: "Science", difficulty: "Hard" } };
const { meta: { category, difficulty } } = room;
console.log(category, difficulty); // "Science" "Hard"

// Spread operator — used in QuizRoom.tsx to update player scores
const updatedPlayer = { ...player, score: player.score + 300 };
console.log("Updated score:", updatedPlayer.score); // 2400

// Object shorthand
const displayName = "NeonKnight";
const userScore   = 2400;
const userObj     = { displayName, userScore }; // same as { displayName: displayName }

// ─────────────────────────────────────────────
// 5. FUNCTIONS — Arrow functions, callbacks, default params
// ─────────────────────────────────────────────

// Regular function declaration
function calculatePoints(isCorrect, timeLeft, totalTime = 20) {
  if (!isCorrect) return 0;
  const speedBonus = Math.round((timeLeft / totalTime) * 100);
  return 200 + speedBonus;
}
console.log(calculatePoints(true, 15));  // 275
console.log(calculatePoints(false, 15)); // 0

// Arrow function (used in all React event handlers)
const formatScore = (score) => score.toLocaleString();
console.log(formatScore(45200)); // "45,200"

// Higher-order function — function that returns a function
const createScoreUpdater = (bonus) => (player) => ({ ...player, score: player.score + bonus });
const addCorrectBonus = createScoreUpdater(300);
const updatedNeonKnight = addCorrectBonus(PLAYERS[0]);
console.log(updatedNeonKnight.score); // 2700

// Immediately Invoked Function Expression (IIFE)
const appVersion = (() => {
  const major = 1, minor = 0, patch = 0;
  return `${major}.${minor}.${patch}`;
})();
console.log("App version:", appVersion); // "1.0.0"

// ─────────────────────────────────────────────
// 6. ASYNC / AWAIT & PROMISES — used in useAuth.tsx, Supabase calls
// ─────────────────────────────────────────────

// Simulated async sign-in (mirrors the real Supabase call)
const mockSignIn = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password.length >= 6) {
        resolve({ user: { id: "abc123", email }, session: { token: "jwt-token-here" } });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });

// async/await pattern (used in useAuth.tsx signIn function)
async function signInUser(email, password) {
  try {
    const { user, session } = await mockSignIn(email, password);
    console.log("Signed in:", user.email);
    return { user, session, error: null };
  } catch (err) {
    console.error("Sign-in failed:", err.message);
    return { user: null, session: null, error: err };
  }
}

signInUser("test@example.com", "password123");
signInUser("bad@example.com", "123"); // triggers error

// Promise.all — fetch multiple things simultaneously
async function loadDashboard(userId) {
  const [profileData, leaderboardData, roomsData] = await Promise.all([
    Promise.resolve({ id: userId, name: "You", score: 2100 }),
    Promise.resolve(PLAYERS),
    Promise.resolve(ROOMS),
  ]);
  return { profileData, leaderboardData, roomsData };
}

// ─────────────────────────────────────────────
// 7. CLOSURES — used in timer logic (QuizRoom.tsx)
// ─────────────────────────────────────────────
function createTimer(duration) {
  let timeLeft = duration;
  let intervalId = null;

  return {
    start(onTick, onEnd) {
      intervalId = setInterval(() => {
        timeLeft -= 1;
        onTick(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(intervalId);
          onEnd();
        }
      }, 1000);
    },
    stop() {
      clearInterval(intervalId);
    },
    getTimeLeft() {
      return timeLeft;
    },
  };
}

const quizTimer = createTimer(20);
// quizTimer.start(t => console.log("Time:", t), () => console.log("Time up!"));

// ─────────────────────────────────────────────
// 8. CLASSES — Object-oriented JS
// ─────────────────────────────────────────────
class QuizGame {
  #score = 0;           // private field
  #questionIndex = 0;

  constructor(questions, playerName) {
    this.questions   = questions;
    this.playerName  = playerName;
    this.answers     = [];
  }

  get currentQuestion() {
    return this.questions[this.#questionIndex];
  }

  get score() { return this.#score; }

  answer(optionIndex) {
    const q = this.currentQuestion;
    const isCorrect = optionIndex === q.correct;
    if (isCorrect) this.#score += 300;
    this.answers.push({ question: q.question, chosen: optionIndex, correct: q.correct, isCorrect });
    this.#questionIndex++;
    return isCorrect;
  }

  isFinished() {
    return this.#questionIndex >= this.questions.length;
  }

  getSummary() {
    return {
      player: this.playerName,
      score: this.#score,
      correct: this.answers.filter(a => a.isCorrect).length,
      total: this.questions.length,
    };
  }
}

// Inheritance
class MultiplayerGame extends QuizGame {
  constructor(questions, playerName, roomId) {
    super(questions, playerName);
    this.roomId  = roomId;
    this.players = [];
  }

  addPlayer(name) {
    this.players.push({ name, score: 0 });
  }

  getLeaderboard() {
    return this.players.sort((a, b) => b.score - a.score);
  }
}

const game = new MultiplayerGame(QUESTIONS, "You", "room-42");
game.addPlayer("NeonKnight");
game.addPlayer("CyberQueen");
console.log(game.answer(0)); // true (correct answer for Q1)
console.log(game.getSummary());

// ─────────────────────────────────────────────
// 9. DOM MANIPULATION — Vanilla JS equivalent of the React UI
// ─────────────────────────────────────────────

// These run only in a browser environment
if (typeof document !== "undefined") {
  // Create a quiz card element
  function renderQuizCard(question, options, container) {
    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "quiz-card";

    const questionEl = document.createElement("h2");
    questionEl.textContent = question;
    card.appendChild(questionEl);

    const optionsList = document.createElement("ul");
    options.forEach((opt, i) => {
      const li = document.createElement("li");
      li.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
      li.dataset.index = i;
      li.addEventListener("click", () => handleAnswer(i, li, options.length));
      optionsList.appendChild(li);
    });

    card.appendChild(optionsList);
    container.appendChild(card);
  }

  function handleAnswer(index, element, total) {
    console.log("Answered option:", index);
    element.style.background = "#6366f1";
    element.style.color = "#fff";
  }
}

// ─────────────────────────────────────────────
// 10. LOCAL STORAGE — Persist game state
// ─────────────────────────────────────────────
const Storage = {
  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage error:", e);
    }
  },
  load(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

// Usage (browser only)
// Storage.save("quizScore", { score: 2100, gamesPlayed: 42 });
// const saved = Storage.load("quizScore", { score: 0, gamesPlayed: 0 });

// ─────────────────────────────────────────────
// 11. MODULES — ES Module syntax (used across the whole project)
// ─────────────────────────────────────────────

// Named exports (e.g., utils.js)
export const formatScore = (n) => n.toLocaleString();
export const getInitials = (name) => name.split(" ").map(w => w[0]).join("").toUpperCase();
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
export const lerp = (a, b, t) => a + (b - a) * t;

// Default export
export default class GameEngine {
  constructor(config = {}) {
    this.config = { timePerQuestion: 20, pointsPerCorrect: 300, ...config };
  }

  calcPoints(isCorrect, timeLeft) {
    if (!isCorrect) return 0;
    const { timePerQuestion, pointsPerCorrect } = this.config;
    return pointsPerCorrect + Math.round((timeLeft / timePerQuestion) * 100);
  }
}

// ─────────────────────────────────────────────
// 12. EVENTS & EVENT HANDLING
// ─────────────────────────────────────────────
if (typeof window !== "undefined") {
  // Keyboard navigation for quiz
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "1": case "a": case "A": console.log("Selected option A"); break;
      case "2": case "b": case "B": console.log("Selected option B"); break;
      case "3": case "c": case "C": console.log("Selected option C"); break;
      case "4": case "d": case "D": console.log("Selected option D"); break;
      default: break;
    }
  });

  // Debounce — used for search input in Lobby
  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  const handleSearch = debounce((query) => {
    console.log("Searching for:", query);
  }, 300);

  // Throttle — used for real-time score updates
  function throttle(fn, limit) {
    let lastTime = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastTime >= limit) {
        lastTime = now;
        fn(...args);
      }
    };
  }

  const throttledScoreUpdate = throttle((score) => {
    console.log("Score updated:", score);
  }, 1000);
}

// ─────────────────────────────────────────────
// 13. ERROR HANDLING
// ─────────────────────────────────────────────
function safeDivide(a, b) {
  if (b === 0) throw new RangeError("Cannot divide by zero");
  return a / b;
}

try {
  console.log(safeDivide(10, 2));  // 5
  console.log(safeDivide(10, 0));  // throws
} catch (err) {
  if (err instanceof RangeError) {
    console.error("Math error:", err.message);
  } else {
    throw err; // re-throw unknown errors
  }
} finally {
  console.log("Division attempt complete.");
}

// ─────────────────────────────────────────────
// 14. ADVANCED PATTERNS
// ─────────────────────────────────────────────

// Optional Chaining — used everywhere in the project
const profile = null;
const userName = profile?.displayName ?? "Guest";  // "Guest"
const avatarUrl = profile?.avatar_url ?? "/default-avatar.png";

// Nullish Coalescing
const displayScore = currentScore ?? 0;
const maxPlayers = undefined ?? 10; // 10

// Template Literals
const welcomeMsg = `Welcome back, ${userName}! Your score is ${formatScore(currentScore)}.`;

// Computed Property Names
const key = "score";
const dynObj = { [key]: 9999, [`${key}Label`]: "pts" };
console.log(dynObj); // { score: 9999, scoreLabel: "pts" }

// Array / Object spread in state updates (mirrors React pattern)
const prevPlayers = [...PLAYERS];
const updatedPlayers = prevPlayers.map(p =>
  p.name === "You" ? { ...p, score: p.score + 300 } : p
);

// Symbol — unique keys
const GAME_EVENTS = {
  ANSWER:     Symbol("answer"),
  NEXT_Q:     Symbol("next_q"),
  GAME_OVER:  Symbol("game_over"),
};

// Generator — useful for sequential question delivery
function* questionGenerator(questions) {
  for (const q of questions) {
    yield q;
  }
}

const gen = questionGenerator(QUESTIONS);
console.log(gen.next().value.question); // "What is the speed of light..."
console.log(gen.next().value.question); // "Which planet has the most moons?"

// WeakMap — private data storage without memory leaks
const _private = new WeakMap();
class SecurePlayer {
  constructor(name) {
    _private.set(this, { name, secret: Math.random() });
  }
  getName() { return _private.get(this).name; }
}
