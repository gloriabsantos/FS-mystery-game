
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameState, GameStatus, Puzzle } from '../types/game';
import { loadGameState, saveGameState } from '../utils/storage';
import { MOCK_PUZZLES } from '../utils/gameHelpers';

interface GameContextProps {
  gameState: GameState;
  currentPuzzle: Puzzle | null;
  revealNextClue: () => void;
  checkGuess: (guess: string) => boolean;
  startGame: () => void;
  resetGame: () => void;
  availablePuzzles: Puzzle[];
}

const defaultGameState: GameState = {
  currentPuzzleId: null,
  status: 'intro',
  revealedClues: 0,
  puzzlesCompleted: [],
  score: 0,
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [availablePuzzles, setAvailablePuzzles] = useState<Puzzle[]>(MOCK_PUZZLES);

  // Load saved game state from localStorage on initial render
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setGameState(savedState);
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Get the current puzzle
  const currentPuzzle = gameState.currentPuzzleId !== null 
    ? availablePuzzles.find(p => p.id === gameState.currentPuzzleId) || null
    : null;

  // Start a new game
  const startGame = () => {
    // Find a puzzle that hasn't been completed yet
    const uncompletedPuzzles = availablePuzzles.filter(
      puzzle => !gameState.puzzlesCompleted.includes(puzzle.id)
    );

    if (uncompletedPuzzles.length === 0) {
      setGameState(prev => ({
        ...prev,
        status: 'no-puzzles',
        currentPuzzleId: null,
      }));
      return;
    }

    // Take the first uncompleted puzzle
    const nextPuzzle = uncompletedPuzzles[0];

    setGameState(prev => ({
      ...prev,
      currentPuzzleId: nextPuzzle.id,
      status: 'playing',
      revealedClues: 0,
    }));
  };

  // Reveal the next clue
  const revealNextClue = () => {
    if (!currentPuzzle) return;
    
    const newRevealedClues = gameState.revealedClues + 1;
    
    // Check if all clues are revealed
    if (newRevealedClues >= currentPuzzle.clues.length) {
      setGameState(prev => ({
        ...prev,
        revealedClues: newRevealedClues,
        status: 'lost',
        puzzlesCompleted: [...prev.puzzlesCompleted, currentPuzzle.id],
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        revealedClues: newRevealedClues,
      }));
    }
  };

  // Check if a guess is correct
  const checkGuess = (guess: string): boolean => {
    if (!currentPuzzle) return false;

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedAnswer = currentPuzzle.title.toLowerCase();

    if (normalizedGuess === normalizedAnswer) {
      // Correct guess
      const newScore = gameState.score + (4 - gameState.revealedClues);
      
      setGameState(prev => ({
        ...prev,
        status: 'won',
        score: newScore,
        puzzlesCompleted: [...prev.puzzlesCompleted, currentPuzzle.id],
      }));
      
      return true;
    }
    
    return false;
  };

  // Reset the game state
  const resetGame = () => {
    setGameState(defaultGameState);
  };

  return (
    <GameContext.Provider value={{
      gameState,
      currentPuzzle,
      revealNextClue,
      checkGuess,
      startGame,
      resetGame,
      availablePuzzles,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
