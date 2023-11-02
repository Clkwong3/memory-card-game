import { useState, useEffect } from "react";
import Grid from "./components/Grid";
import './App.css';

// An array of Halloween emojis, each repeated twice for matching pairs
const halloweenEmojis = [
  "🎃",
  "🎃",
  "👻",
  "👻",
  "🦇",
  "🦇",
  "🕷️",
  "🕷️",
  "🕸️",
  "🕸️",
  "🍬",
  "🍬",
  "🕯️",
  "🕯️",
  "🧙‍♀️",
  "🧙‍♀️",
  "🧛‍♂️",
  "🧛‍♂️",
  "🧟‍♂️",
  "🧟‍♂️",
  "🦴",
  "🦴",
  "🎭",
  "🎭",
  "🍁",
  "🍁",
  "🌙",
  "🌙",
];

// Create initial game cards from the emojis
const initialCards = halloweenEmojis.map((emoji, index) => ({
  id: index,
  emoji,
  isFlipped: false,
  isMatched: false,
}));

function App() {
  // Define game state using React's useState hook
  const [cards, setCards] = useState(initialCards); // Cards and their state
  const [moves, setMoves] = useState(0); // Number of moves made

  // Function to shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cards]; // Create a copy to avoid changing the original

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ]; // Swap elements randomly
    }

    // Update the state with the shuffled cards
    setCards(shuffledCards);

    // Return the shuffled cards (not needed but can be useful)
    return shuffledCards;
  };

  // Initialize the game when the component loads
  useEffect(() => {
    shuffleCards(); // Shuffle the cards
  }, []);

  // Check if two flipped cards match
  const checkMatching = (updatedCards) => {
    const flippedCards = updatedCards.filter(
      (card) => card.isFlipped && !card.isMatched
    );

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;

      if (card1.emoji === card2.emoji) {
        // Cards match, mark them as matched
        card1.isMatched = true;
        card2.isMatched = true;
      } else {
        // Cards don't match, flip them back after a delay
        setTimeout(() => {
          const idx1 = updatedCards.findIndex((card) => card.id === card1.id);
          const idx2 = updatedCards.findIndex((card) => card.id === card2.id);

          // Update the state to flip cards back
          cards[idx1] = {
            ...updatedCards[idx1],
            isFlipped: false,
          };
          cards[idx2] = {
            ...updatedCards[idx2],
            isFlipped: false,
          };

          setCards(cards); // Update the state with the flipped cards
          setMoves(moves + 1); // Increase the moves count
        }, 1000); // Wait for 1 second (1000 milliseconds)
      }
    }
  };

  // Check if the game is won
  const isGameWon = (updatedCards) => {
    return updatedCards.every((card) => card.isMatched);
  };

  // Handle card click
  const handleCardClick = (index) => {
    // Check if the game is already won before allowing card clicks
    // Check if the game is already won or if two cards are already flipped
    if (
      isGameWon(cards) ||
      cards.filter((card) => card.isFlipped && !card.isMatched).length >= 2
    ) {
      return;
    }

    const updatedCards = [...cards];
    const clickedCard = updatedCards[index];

    // Check if the clicked card is already matched or flipped
    if (clickedCard.isMatched || clickedCard.isFlipped) {
      return;
    }

    // Flip the clicked card
    clickedCard.isFlipped = true;

    // Update the state with the changed card
    setCards(updatedCards);

    // Check if two cards are now flipped for matching
    const flippedCards = updatedCards.filter(
      (card) => card.isFlipped && !card.isMatched
    );

    if (flippedCards.length === 2) {
      // Check for matching cards and update game state
      checkMatching(updatedCards);
    }

    setMoves(moves + 1); // Increase the moves count

    // Check if all cards are matched after the current move
    if (isGameWon(updatedCards)) {
      // Show the victory alert after all cards are matched
      setTimeout(() => {
        alert("You win!");
      }, 1000); // Wait for 1 second (1000 milliseconds)
    }
  };

  // Reset the game
  const resetGame = (shuffledCards) => {
    // Reset all cards to their initial state
    shuffledCards.forEach((card) => {
      card.isFlipped = false;
      card.isMatched = false;
    });
  };

  // Handle game restart
  const handleRestart = () => {
    const shuffledCards = shuffleCards([...cards]); // Reshuffle the cards
    resetGame(shuffledCards); // Reset the game state
    setCards(shuffledCards); // Update the state with shuffled cards
    setMoves(0); // Reset the moves count
  };

  // Render the game interface
  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <Grid cards={cards} onCardClick={handleCardClick} />
      <p>Moves: {moves}</p>
      <button className="reset" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}

export default App;

