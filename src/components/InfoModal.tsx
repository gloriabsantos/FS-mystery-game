
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">About Film Skool</DialogTitle>
          <div className="absolute right-4 top-4">
            <button 
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </DialogHeader>
        <DialogDescription>
          <div className="space-y-4 text-left">
            <p>
              Film Skool is a movie guessing game where you try to identify the movie based on a series of clues.
            </p>
            
            <h3 className="text-lg font-semibold">How to Play</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You'll be shown clues one at a time about a mystery movie</li>
              <li>Type your guess in the input field below the clues</li>
              <li>The fewer clues you need, the higher your score</li>
              <li>New puzzles are released every Monday</li>
            </ul>
            
            <h3 className="text-lg font-semibold">Scoring</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>First clue: 4 points</li>
              <li>Second clue: 3 points</li>
              <li>Third clue: 2 points</li>
              <li>Fourth clue: 1 point</li>
              <li>Wrong guess: 0 points</li>
            </ul>
            
            <p className="text-sm text-gray-600 mt-4">
              Created by Film Skool © 2025
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
