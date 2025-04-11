
export interface Clue {
  id: number;
  content: string;
  color: 'yellow' | 'blue' | 'red' | 'green';
}

export interface Puzzle {
  id: number;
  title: string; // The correct answer (movie title)
  clues: Clue[];
  releaseDate: string; // ISO date string
  winQuote: string;
  loseQuote: string;
}

export type GameStatus = 'intro' | 'playing' | 'won' | 'lost' | 'no-puzzles';

export interface GameState {
  currentPuzzleId: number | null;
  status: GameStatus;
  revealedClues: number;
  puzzlesCompleted: number[];
  score: number;
}
