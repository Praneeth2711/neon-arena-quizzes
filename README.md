# Neon Arena Quizzes

**Neon Arena Quizzes** is a high-octane, real-time multiplayer trivia platform built for competitive knowledge battles. Players can create custom quiz arenas, challenge competitors across science, technology, history, and pop culture, utilize dynamic tactical power-ups, and climb live global leaderboards with speed-weighted scoring.

---

## ✨ Features

- **Player Authentication & Accounts**:
  - Email/Password sign up and sign in powered by Supabase Auth.
  - Automatic profile provisioning with avatar support and statistics tracking via PostgreSQL triggers.
  - **Password Recovery Flow**: Dedicated Forgot Password (`/forgot-password`) and Reset Password (`/reset-password`) screens.
  - **Instant Demo Mode**: Zero-friction guest play and test competitor simulation.

- **Game Lobby & Arena Matchmaking**:
  - Live filterable room browser (Live / Waiting / All categories).
  - Custom arena creator (name, category, difficulty rating, and max player capacity).
  - Real-time capacity indicators and active room member counters.

- **Live Multiplayer Quiz Engine**:
  - Dynamic question delivery with server-authoritative time limits.
  - **Speed-Weighted Scoring**: Correct answers earn bonus points based on remaining time.
  - **Tactical Power-Ups**: *50/50* (eliminates two incorrect options) and *2x Multiplier* (doubles round score).
  - Comprehensive Game Over summary modal with accuracy percentage, round breakdown, and rematch options.

- **Authoritative Node.js Game Server**:
  - Synchronized countdowns (3..2..1) and real-time question clock ticks powered by **Socket.IO** and **Express**.
  - Authoritative room state machines preventing client-side timer manipulation.
  - Live REST endpoints for server health (`/health`) and room matchmaking (`/api/matchmake`).

- **In-Game Live Arena Chat**:
  - Real-time chat messages broadcast to all competitors in the room.
  - System announcements for player join/leave events.

- **Global Leaderboards & Statistics**:
  - Real-time top player rankings with total score, games played, and win rates.
  - Comprehensive player profile page tracking win percentages, question accuracy, and achievements.

- **Secure Data & RLS Architecture**:
  - 100% Row Level Security (RLS) enforcement on all database tables.
  - Atomic stat updates via PostgreSQL RPC function `record_quiz_completion`.

---

## 🛠️ Tech Stack

| Technology | Category | Purpose |
|---|---|---|
| **React 18** | Frontend Framework | Interactive single-page application component hierarchy |
| **TypeScript** | Language | End-to-end static type safety across frontend and server |
| **Vite 5** | Build Tooling | High-performance bundling, development server, and HMR |
| **Supabase** | Backend as a Service | PostgreSQL database, Auth, Storage, and Realtime sync |
| **Node.js + Express** | Game Server | Authoritative HTTP REST API and room management |
| **Socket.IO** | WebSocket Engine | Real-time bi-directional room synchronization and game clock |
| **Tailwind CSS** | Styling System | Neon dark-mode design system with utility classes |
| **Framer Motion** | UI Animations | Fluid page transitions, modal animations, and card states |
| **Radix UI / Lucide** | UI Primitives & Icons | Accessible dialogs, dropdowns, tooltips, and iconography |
| **Vitest** | Testing Suite | Unit and integration test runner for client and server logic |

---

## 🏗️ Architecture

```text
                                  +---------------------------------------+
                                  |         React 18 Frontend UI          |
                                  |    (Vite + Tailwind + Framer Motion)  |
                                  +-------------------+-------------------+
                                                      |
                         +----------------------------+----------------------------+
                         |                                                         |
                         v                                                         v
        +----------------------------------+                     +----------------------------------+
        |     Supabase BaaS (Postgres)     |                     |    Node.js + Express Game Server |
        |    (Persistence & Security)      |                     |      (Authoritative Sockets)     |
        +----------------------------------+                     +----------------------------------+
        | • Supabase Auth (JWT & Sessions) |                     | • Socket.IO Real-Time Engine     |
        | • public.profiles                |                     | • Synchronized Room State Machine|
        | • public.quiz_rooms              |                     | • Centralized Game Clocks & Ticks|
        | • public.quiz_questions          |                     | • Live In-Game Chat Broadcast    |
        | • public.quiz_answers            |                     | • REST /health & /api/matchmake  |
        | • public.leaderboard_scores      |                     +----------------------------------+
        | • public.chat_messages           |
        | • Row Level Security (RLS)       |
        | • RPC record_quiz_completion     |
        +----------------------------------+
```

---

## 📁 Project Structure

```text
neon-arena-quizzes/
├── public/                      # Static assets and favicon
├── server/                      # Node.js Express + Socket.IO game server
│   ├── gameManager.ts           # Authoritative room state machine & timer engine
│   └── index.ts                 # Express REST endpoints & Socket.IO initialization
├── src/
│   ├── components/
│   │   ├── animations/          # Background animations and canvas effects
│   │   ├── game/                # QuizCard, TimerRing, PowerUpBar, ChatPanel, Leaderboard
│   │   ├── layout/              # AppShell, Navigation, Navbar
│   │   └── ui/                  # Radix UI styled primitives (buttons, modals, toasts)
│   ├── hooks/
│   │   ├── useAuth.tsx          # Supabase Auth provider, sessions, password reset
│   │   └── useGameSocket.ts     # Real-time Socket.IO game synchronization hook
│   ├── integrations/
│   │   ├── socket/              # Socket.IO client singleton
│   │   └── supabase/            # Supabase JS client and TypeScript database types
│   ├── lib/
│   │   ├── quizData.ts          # Default catalogue, questions bank, and scoring logic
│   │   └── utils.ts             # Tailwind class merger utilities
│   ├── pages/
│   │   ├── Landing.tsx          # Hero page, feature showcase, rules walkthrough
│   │   ├── Lobby.tsx            # Arena room browser, category filter, create room modal
│   │   ├── QuizRoom.tsx         # Live interactive quiz arena with power-ups & chat
│   │   ├── Leaderboard.tsx      # Global player ranking & win-rate leaderboard
│   │   ├── Profile.tsx          # User career statistics, accuracy, and badge showcase
│   │   ├── SignIn.tsx           # Authentication sign-in form
│   │   ├── SignUp.tsx           # Account registration form
│   │   ├── ForgotPassword.tsx   # Password reset request screen
│   │   └── ResetPassword.tsx    # Password update and confirmation screen
│   ├── test/
│   │   ├── quiz.test.ts         # Scoring calculation & quiz filtering tests
│   │   ├── server.test.ts       # Node.js gameManager unit tests
│   │   └── supabase.integration.test.ts # Supabase database & RLS policy tests
│   ├── App.tsx                  # Client router and context providers
│   └── main.tsx                 # React application entry point
├── supabase/
│   ├── migrations/              # Database migration history
│   └── schema.sql               # Complete PostgreSQL tables, RLS, triggers & RPCs
├── .env.example                 # Safe environment configuration template
├── package.json                 # Dependencies and execution scripts
├── tailwind.config.ts           # Theme colors, gradients, and animation tokens
├── vite.config.ts               # Vite bundler and path alias configuration
└── vitest.config.ts             # Vitest test runner configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- A free [Supabase](https://supabase.com/) project (or local Supabase CLI)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Praneeth2711/neon-arena-quizzes.git
cd neon-arena-quizzes
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env
```

Fill in your Supabase credentials:
```env
# Supabase Project Credentials
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here

# Node.js Game Server URL (defaults to http://localhost:3001)
VITE_GAME_SERVER_URL=http://localhost:3001
PORT=3001
```

### 3. Database Setup (Supabase)
1. Open your Supabase Dashboard and go to the **SQL Editor**.
2. Open [`supabase/schema.sql`](file:///c:/Users/prane/OneDrive/Desktop/neon-arena-quizzes/supabase/schema.sql) in this repository, copy its entire contents, and execute it.
3. *(Optional for local testing)*: In **Authentication $\rightarrow$ Providers $\rightarrow$ Email**, toggle **Confirm email** to **OFF** to enable instant user registrations without email confirmation rate limits.

### 4. Running Locally

#### Start the Frontend:
```bash
npm run dev
```
The application will be live at `http://localhost:5173`.

#### Start the Node.js Game Server:
```bash
npm run server
```
The game server will be live at `http://localhost:3001`.

---

## 🧪 Testing & Quality Assurance

Run the comprehensive Vitest test suite:
```bash
# Run all unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch
```

Verify production bundling and TypeScript type checking:
```bash
# Typecheck
npx tsc --noEmit

# Production Build
npm run build
```

---

## 📄 Database Schema & Security Summary

| Table | Purpose | Security / RLS |
|---|---|---|
| `public.profiles` | User statistics (wins, games played, accuracy, bio) | Public read; owner update only (`auth.uid() = user_id`) |
| `public.quiz_rooms` | Active arena rooms with category and difficulty | Public read; authenticated creation; host update/delete |
| `public.quiz_questions` | Question pool and answer choices per room | Public read; host creation and management |
| `public.room_players` | Live player lobby participants and round scores | Public read; self-join and self-score updates |
| `public.quiz_answers` | Submitted answers per user per question | Public read; user insert (`auth.uid() = user_id`) |
| `public.leaderboard_scores` | Global aggregate scores and total wins | Public read; user insert/update (`auth.uid() = user_id`) |
| `public.chat_messages` | Live in-game arena chat messages | Public read; authenticated insert (`auth.uid() = user_id`) |

### Key Stored Procedures & Triggers
- **`handle_new_user()`**: Triggered `AFTER INSERT` on `auth.users` to automatically populate `public.profiles`.
- **`record_quiz_completion(p_score, p_correct, p_total, p_won)`**: Atomic stored function updating user profile totals and upserting leaderboard scores safely on the database server.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
