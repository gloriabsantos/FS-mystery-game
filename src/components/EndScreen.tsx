
import React from 'react';
import { useGame } from '../context/GameContext';
import { shareResults } from '../utils/gameHelpers';
import { Facebook, Download, Link } from 'lucide-react';

const EndScreen: React.FC = () => {
  const { gameState, currentPuzzle, startGame, availablePuzzles } = useGame();
  const isWon = gameState.status === 'won';
  const isNoPuzzles = gameState.status === 'no-puzzles';
  
  if (isNoPuzzles) {
    return (
      <div className="game-container min-h-screen flex flex-col items-center justify-center py-10">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-4xl font-bold mb-6">See You Next Monday!</h1>
          <p className="text-xl mb-8">
            You've completed all available puzzles. New puzzles are released every Monday.
          </p>
          
          <div className="bg-filmGray rounded-xl p-6">
            <p className="font-semibold text-xl mb-2">Your Score</p>
            <p className="text-5xl font-bold mb-4">{gameState.score}</p>
            <p className="mb-4">{gameState.puzzlesCompleted.length} puzzles completed</p>
            
            <div className="flex justify-center space-x-4 mt-6">
              <button 
                onClick={() => shareResults("All puzzles", gameState.score, availablePuzzles.length)}
                className="btn-secondary flex items-center"
              >
                <Link size={20} className="mr-2" />
                Share Score
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentPuzzle) {
    return <div>Loading puzzle...</div>;
  }

  const quote = isWon ? currentPuzzle.winQuote : currentPuzzle.loseQuote;

  return (
    <div className="game-container min-h-screen flex flex-col items-center justify-center py-10">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          {isWon ? 'Correct!' : 'Game Over'}
        </h1>
        
        <h2 className="text-2xl font-semibold mb-6">
          {currentPuzzle.title}
        </h2>
        
        <div className="bg-filmGray p-6 rounded-xl mb-8">
          <p className="text-lg italic">"{quote}"</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-filmBlue rounded-xl p-6">
            <p className="font-semibold text-lg mb-2">Your Score</p>
            <p className="text-5xl font-bold mb-4">{gameState.score}</p>
            <p>{gameState.puzzlesCompleted.length}/{availablePuzzles.length} puzzles completed</p>
          </div>
          
          <div className="flex flex-col space-y-3 mt-6">
            <div className="flex justify-center space-x-3">
              <button className="btn-secondary flex items-center">
                <Facebook size={20} className="mr-2" />
                Share
              </button>
              <button className="btn-secondary flex items-center">
                <Download size={20} className="mr-2" />
                Save
              </button>
              <button 
                onClick={() => shareResults(currentPuzzle.title, gameState.score, availablePuzzles.length)} 
                className="btn-secondary flex items-center"
              >
                <Link size={20} className="mr-2" />
                Copy
              </button>
            </div>
            <button onClick={startGame} className="btn-primary">
              Next Puzzle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
