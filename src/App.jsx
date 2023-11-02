import { useState, useEffect } from "react";
import Grid from "./Grid";

function App() {
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

  const initialCards = halloweenEmojis.map((emoji) => ({
    emoji,
    isFlipped: false,
    isMatched: false,
  }));

  // Define your game state
  const [cards, setCards] = useState(initialCards);
  const [moves, setMoves] = useState(0);

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
          card1.isFlipped = false;
          card2.isFlipped = false;
          setMoves(moves + 1);
        }, 1000);
      }
    }
  };

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

  const handleCardClick = (index) => {
    // Ensure the game isn't over before allowing card clicks
    if (isGameWon()) {
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

  const handleRestart = () => {
    const shuffledCards = shuffleCards([...cards]); // Reshuffle the cards
    resetGame(shuffledCards); // Reset the game state
    setCards(shuffledCards);
    setMoves(0);
  };

  const resetGame = (shuffledCards) => {
    shuffledCards.forEach((card) => {
      card.isFlipped = false;
      card.isMatched = false;
    });
  };

  const isGameWon = (updatedCards) => {
    return updatedCards.every((card) => card.isMatched);
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
