import { useState, useEffect } from "react";
import Grid from "./components/Grid";

const halloweenEmojis = [
  // An array of Halloween emojis, each repeated twice for matching pairs
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

const initialCards = halloweenEmojis.map((emoji, index) => ({
  id: index,
  emoji,
  isFlipped: false,
  isMatched: false,
}));

function App() {
  // Define your game state
  const [cards, setCards] = useState(initialCards);
  const [moves, setMoves] = useState(0);

  const shuffleCards = () => {
    // Create a copy of the cards array to avoid mutating the original state
    const shuffledCards = [...cards];

    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ]; // Swap elements randomly
    }

    // Update the state with the shuffled cards
    setCards(shuffledCards);
  };

  useEffect(() => {
    // Game initialization logic
    shuffleCards(); // Shuffle the cards
  }, []);

  // Function to check if two flipped cards match
  const checkMatching = (updatedCards) => {
    const flippedCards = updatedCards.filter(
      (card) => card.isFlipped && !card.isMatched
    );

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;

      if (card1.emoji === card2.emoji) {
        // Cards match
        card1.isMatched = true;
        card2.isMatched = true;
      } else {
        // Cards don't match, flip them back after a delay
        setTimeout(() => {
          const idx1 = updatedCards.findIndex((card) => card.id === card1.id);
          const idx2 = updatedCards.findIndex((card) => card.id === card2.id);

          cards[idx1] = {
            ...updatedCards[idx1],
            isFlipped: false,
          };
          cards[idx2] = {
            ...updatedCards[idx2],
            isFlipped: false,
          };
          setCards(cards);
          setMoves(moves + 1);
        }, 1000);
      }
    }
  };

  const isGameWon = (updatedCards) => {
    return updatedCards.every((card) => card.isMatched);
  };

  const handleCardClick = (index) => {
    // Ensure the game isn't over before allowing card clicks
    if (isGameWon(cards)) {
      return;
    }

    const updatedCards = [...cards];
    const clickedCard = updatedCards[index];
    // Check if the clicked card is already matched or flipped
    if (clickedCard.isMatched || clickedCard.isFlipped) {
      return;
    }

    // Flip the card
    clickedCard.isFlipped = true;

    // Check for matching cards and update game state
    checkMatching(updatedCards);

    if (isGameWon(updatedCards)) {
      alert("You win!");
    }

    setCards(updatedCards);
    setMoves(moves + 1);
  };

  const resetGame = (shuffledCards) => {
    shuffledCards.forEach((card) => {
      card.isFlipped = false;
      card.isMatched = false;
    });
  };

  const handleRestart = () => {
    const shuffledCards = shuffleCards([...cards]); // Reshuffle the cards
    resetGame(shuffledCards); // Reset the game state
    setCards(shuffledCards);
    setMoves(0);
  };

  return (
    <div className="app">
      <h1>Memory Card Game</h1>
      <Grid cards={cards} onCardClick={handleCardClick} />
      <p>Moves: {moves}</p>
      <button onClick={handleRestart}>Restart Game</button>
    </div>
  );
}

export default App;
