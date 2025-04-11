
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { toast } from 'sonner';

const GuessInput: React.FC = () => {
  const [guess, setGuess] = useState('');
  const { checkGuess, revealNextClue } = useGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (guess.trim() === '') {
      toast.error('Please enter a guess');
      return;
    }
    
    const isCorrect = checkGuess(guess);
    
    if (!isCorrect) {
      // Show the next clue
      revealNextClue();
      toast.error('Incorrect guess. Try again!');
      setGuess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="space-y-4">
        <input
          type="text"
          className="input-guess"
          placeholder="GUESS THE FILM"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          autoComplete="off"
        />
        
        <button 
          type="submit"
          className="btn-primary w-full"
        >
          Submit Guess
        </button>
      </div>
    </form>
  );
};

export default GuessInput;
