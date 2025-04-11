
import { GameState } from "../types/game";

const GAME_STATE_KEY = 'filmskool_game_state';

export const saveGameState = (state: GameState): void => {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state to localStorage:', error);
  }
};

export const loadGameState = (): GameState | null => {
  try {
    const savedState = localStorage.getItem(GAME_STATE_KEY);
    
    if (savedState) {
      return JSON.parse(savedState) as GameState;
    }
    return null;
  } catch (error) {
    console.error('Failed to load game state from localStorage:', error);
    return null;
  }
};

export const clearGameState = (): void => {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear game state from localStorage:', error);
  }
};
