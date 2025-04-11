
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import ClueCard from './ClueCard';
import GuessInput from './GuessInput';
import InfoModal from './InfoModal';
import { Clapperboard } from 'lucide-react';

const PuzzleScreen: React.FC = () => {
  const { currentPuzzle, gameState } = useGame();
  const [showInfo, setShowInfo] = useState(false);
  
  if (!currentPuzzle) {
    return <div>Loading puzzle...</div>;
  }

  return (
    <div className="game-container min-h-screen flex flex-col py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Film Skool</h1>
        <button 
          onClick={() => setShowInfo(true)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Information"
        >
          <Clapperboard size={24} />
        </button>
      </div>

      <div className="flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentPuzzle.clues.map((clue, index) => (
            <ClueCard 
              key={clue.id} 
              clue={clue} 
              isRevealed={index < gameState.revealedClues} 
              index={index}
            />
          ))}
        </div>

        <GuessInput />
      </div>

      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
};

export default PuzzleScreen;
