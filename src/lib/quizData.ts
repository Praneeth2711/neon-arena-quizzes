// Comprehensive Quiz Category & Question Bank

export interface QuestionItem {
  id?: string;
  question: string;
  options: string[];
  correct: number;
  timeLimit?: number;
}

export interface DefaultRoom {
  id: string;
  name: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  max: number;
  players: number;
  status: "live" | "waiting" | "finished";
  host: string;
  started: string;
}

export const CATEGORY_QUESTIONS: Record<string, QuestionItem[]> = {
  Science: [
    {
      question: "What is the speed of light in vacuum?",
      options: ["299,792 km/s", "150,000 km/s", "3,000,000 km/s", "1,080,000 km/h"],
      correct: 0,
      timeLimit: 20,
    },
    {
      question: "Which planet in the Solar System has the highest number of recognized moons?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "What is the chemical symbol for the element Gold?",
      options: ["Ag", "Au", "Fe", "Gd"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "Which particle carries a negative electrical charge in an atom?",
      options: ["Proton", "Neutron", "Electron", "Positron"],
      correct: 2,
      timeLimit: 20,
    },
    {
      question: "What is the powerhouse of the biological eukaryotic cell?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Endoplasmic Reticulum"],
      correct: 2,
      timeLimit: 20,
    },
  ],
  Technology: [
    {
      question: "Who created JavaScript in 1995 while working at Netscape?",
      options: ["Guido van Rossum", "James Gosling", "Brendan Eich", "Tim Berners-Lee"],
      correct: 2,
      timeLimit: 20,
    },
    {
      question: "Which cryptographic consensus mechanism was originally introduced by Bitcoin in 2008?",
      options: ["Proof of Stake", "Proof of Work", "Delegated Proof of Stake", "Proof of Authority"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "What does the 'S' in HTTPS stand for?",
      options: ["Standard", "Secure", "System", "Server"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "Which neural network architecture introduced the Self-Attention mechanism in 'Attention Is All You Need' (2017)?",
      options: ["CNN", "RNN", "LSTM", "Transformer"],
      correct: 3,
      timeLimit: 20,
    },
    {
      question: "What is the time complexity of looking up a key in a balanced Hash Map on average?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 0,
      timeLimit: 20,
    },
  ],
  History: [
    {
      question: "In which year did the Apollo 11 mission land the first humans on the Moon?",
      options: ["1965", "1969", "1972", "1975"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "Who was the first Emperor of a unified China and the founder of the Qin Dynasty?",
      options: ["Qin Shi Huang", "Sun Tzu", "Han Wudi", "Kublai Khan"],
      correct: 0,
      timeLimit: 20,
    },
    {
      question: "Which ancient civilization constructed the magnificent city of Machu Picchu in Peru?",
      options: ["Aztec", "Maya", "Inca", "Olmec"],
      correct: 2,
      timeLimit: 20,
    },
    {
      question: "The Magna Carta was signed in which year at Runnymede, England?",
      options: ["1066", "1215", "1492", "1776"],
      correct: 1,
      timeLimit: 20,
    },
  ],
  Entertainment: [
    {
      question: "Which film won the Academy Award for Best Picture at the 1998 Oscars?",
      options: ["Saving Private Ryan", "Titanic", "Life Is Beautiful", "Shakespeare in Love"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "Who composed the iconic musical score for the Star Wars film franchise?",
      options: ["Hans Zimmer", "Ennio Morricone", "John Williams", "Howard Shore"],
      correct: 2,
      timeLimit: 20,
    },
    {
      question: "In the Marvel Cinematic Universe, what is the fictional metal mined in Wakanda?",
      options: ["Adamantium", "Vibranium", "Mithril", "Uru"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "What is the highest-grossing video game franchise of all time worldwide?",
      options: ["Super Mario", "Pokémon", "Call of Duty", "Grand Theft Auto"],
      correct: 1,
      timeLimit: 20,
    },
  ],
  Geography: [
    {
      question: "Which is the longest river in the world by continuous length?",
      options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "What is the capital city of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      correct: 2,
      timeLimit: 20,
    },
    {
      question: "Which desert is the largest hot desert on Earth?",
      options: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Arabian Desert"],
      correct: 2,
      timeLimit: 20,
    },
    {
      question: "Which strait separates the continents of Asia and North America?",
      options: ["Strait of Gibraltar", "Bering Strait", "Malacca Strait", "Bosphorus Strait"],
      correct: 1,
      timeLimit: 20,
    },
  ],
  Sports: [
    {
      question: "Which nation has won the most FIFA Men's World Cup titles in history?",
      options: ["Germany", "Italy", "Argentina", "Brazil"],
      correct: 3,
      timeLimit: 20,
    },
    {
      question: "How many points is a touchdown worth in American Football (NFL)?",
      options: ["3", "6", "7", "8"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "In tennis, what term denotes a score of 40-40 in a single game?",
      options: ["Advantage", "Break Point", "Deuce", "Tiebreak"],
      correct: 2,
      timeLimit: 20,
    },
  ],
  Books: [
    {
      question: "Who wrote the dystopian novel '1984' published in 1949?",
      options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Philip K. Dick"],
      correct: 1,
      timeLimit: 20,
    },
    {
      question: "In Herman Melville's novel, what type of creature is Moby Dick?",
      options: ["Giant Squid", "Great White Shark", "Albino Sperm Whale", "Kraken"],
      correct: 2,
      timeLimit: 20,
    },
    {
      question: "Which Shakespeare play begins with the line 'If music be the food of love, play on'?",
      options: ["Twelfth Night", "Romeo and Juliet", "Much Ado About Nothing", "Hamlet"],
      correct: 0,
      timeLimit: 20,
    },
  ],
};

export const DEFAULT_ROOMS: DefaultRoom[] = [
  { id: "1", name: "Quantum Physics", players: 8, max: 10, status: "live", category: "Science", difficulty: "Hard", host: "NeonKnight", started: "2m ago" },
  { id: "2", name: "World History", players: 3, max: 8, status: "waiting", category: "History", difficulty: "Medium", host: "CyberQueen", started: "Just now" },
  { id: "3", name: "Pop Culture", players: 10, max: 10, status: "live", category: "Entertainment", difficulty: "Easy", host: "PixelMaster", started: "5m ago" },
  { id: "4", name: "AI & Machine Learning", players: 5, max: 8, status: "waiting", category: "Technology", difficulty: "Expert", host: "DataWizard", started: "1m ago" },
  { id: "5", name: "Geography Masters", players: 6, max: 10, status: "live", category: "Geography", difficulty: "Medium", host: "GlitchHero", started: "8m ago" },
  { id: "6", name: "Sports Arena", players: 2, max: 6, status: "waiting", category: "Sports", difficulty: "Easy", host: "VoltStrike", started: "Just now" },
  { id: "7", name: "Crypto & Blockchain", players: 7, max: 8, status: "live", category: "Technology", difficulty: "Hard", host: "ByteRunner", started: "3m ago" },
  { id: "8", name: "Classic Literature", players: 4, max: 8, status: "waiting", category: "Books", difficulty: "Medium", host: "QuantumAce", started: "30s ago" },
];

export const getQuestionsForRoom = (category?: string): QuestionItem[] => {
  if (category && CATEGORY_QUESTIONS[category]) {
    return CATEGORY_QUESTIONS[category];
  }
  return CATEGORY_QUESTIONS.Science;
};
