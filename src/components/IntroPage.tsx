
import React, { useState } from 'react';
import { Clapperboard } from 'lucide-react';
import InfoModal from './InfoModal';
import { useGame } from '../context/GameContext';

const IntroPage: React.FC = () => {
  const { startGame } = useGame();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-filmOffWhite">
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setShowInfo(true)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Information"
        >
          <Clapperboard size={28} />
        </button>
      </div>

      <div className="animate-fade-in flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
          Film Skool
          <span className="block text-2xl md:text-3xl font-normal mt-2">Mystery Game</span>
        </h1>
        
        <div className="my-12 w-64 h-64 bg-filmGray rounded-xl flex items-center justify-center">
          {/* Placeholder for Rive animation */}
          <p className="text-gray-500 text-center">
            Rive Animation<br />Placeholder
          </p>
        </div>

        <button 
          onClick={startGame}
          className="animate-bounce-light btn-primary text-xl md:text-2xl"
        >
          Play Now
        </button>
      </div>

      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
};

export default IntroPage;
