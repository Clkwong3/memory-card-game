import Card from './Card';

function Grid({ cards, onCardClick }) {
  return (
    <div className="card-game">
      {cards.map((card, index) => (
        <Card
          key={index}
          emoji={card.emoji}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onCardClick={() => onCardClick(index)}
        />
      ))}
    </div>
  );
}

export default Grid;
