
import React from 'react';
import { useGame } from '../context/GameContext';
import IntroPage from '../components/IntroPage';
import PuzzleScreen from '../components/PuzzleScreen';
import EndScreen from '../components/EndScreen';

const Index = () => {
  const { gameState } = useGame();
  
  // Render different screens based on the game status
  const renderScreen = () => {
    switch (gameState.status) {
      case 'intro':
        return <IntroPage />;
      case 'playing':
        return <PuzzleScreen />;
      case 'won':
      case 'lost':
      case 'no-puzzles':
        return <EndScreen />;
      default:
        return <IntroPage />;
    }
  };

  return (
    <div className="min-h-screen bg-filmOffWhite font-outfit">
      {renderScreen()}
    </div>
  );
};

export default Index;
