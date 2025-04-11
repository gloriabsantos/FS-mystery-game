
import React from 'react';
import { Clue } from '../types/game';

interface ClueCardProps {
  clue: Clue;
  isRevealed: boolean;
  index: number;
}

const ClueCard: React.FC<ClueCardProps> = ({ clue, isRevealed, index }) => {
  const colorClassMap = {
    'yellow': 'clue-card-yellow',
    'blue': 'clue-card-blue',
    'red': 'clue-card-red',
    'green': 'clue-card-green'
  };

  const animationDelay = `${index * 0.2}s`;

  return (
    <div 
      className={`clue-card ${colorClassMap[clue.color]} ${isRevealed ? 'animate-slide-up' : 'opacity-0'}`}
      style={{ animationDelay: isRevealed ? animationDelay : '0s' }}
    >
      <div className="p-6 h-36 flex items-center justify-center">
        {isRevealed ? (
          <p className="text-xl text-center font-medium">{clue.content}</p>
        ) : (
          <span className="text-4xl text-gray-400">?</span>
        )}
      </div>
    </div>
  );
};

export default ClueCard;
