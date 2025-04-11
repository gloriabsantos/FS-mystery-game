
import { Puzzle } from "../types/game";

// Mock puzzles for development
export const MOCK_PUZZLES: Puzzle[] = [
  {
    id: 1,
    title: "The Godfather",
    releaseDate: "2023-04-11",
    winQuote: "I'm gonna make him an offer he can't refuse.",
    loseQuote: "Leave the gun. Take the cannoli.",
    clues: [
      { id: 1, content: "Released in 1972", color: "yellow" },
      { id: 2, content: "Directed by Francis Ford Coppola", color: "blue" },
      { id: 3, content: "Features the Corleone family", color: "red" },
      { id: 4, content: "Stars Marlon Brando as Vito", color: "green" }
    ]
  },
  {
    id: 2,
    title: "Pulp Fiction",
    releaseDate: "2023-04-12",
    winQuote: "Say 'what' again. I dare you.",
    loseQuote: "Zed's dead, baby. Zed's dead.",
    clues: [
      { id: 1, content: "Released in 1994", color: "yellow" },
      { id: 2, content: "Directed by Quentin Tarantino", color: "blue" },
      { id: 3, content: "Non-linear storyline with multiple characters", color: "red" },
      { id: 4, content: "Features character Jules Winnfield", color: "green" }
    ]
  },
  {
    id: 3,
    title: "The Shawshank Redemption",
    releaseDate: "2023-04-13",
    winQuote: "Get busy living, or get busy dying.",
    loseQuote: "Hope is a good thing, maybe the best of things, and no good thing ever dies.",
    clues: [
      { id: 1, content: "Released in 1994", color: "yellow" },
      { id: 2, content: "Based on a Stephen King novella", color: "blue" },
      { id: 3, content: "Set in a prison", color: "red" },
      { id: 4, content: "Stars Tim Robbins as Andy Dufresne", color: "green" }
    ]
  }
];

// Helper to format dates
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper to share results
export const shareResults = (puzzleTitle: string, score: number, totalPuzzles: number) => {
  const text = `I just solved "${puzzleTitle}" on Film Skool Mystery Game! My score: ${score}/${totalPuzzles}. Can you beat me?`;
  
  if (navigator.share) {
    navigator
      .share({
        title: 'Film Skool Mystery Game',
        text: text,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
  } else {
    // Fallback
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Results copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy results. Please copy manually.');
      });
  }
};
