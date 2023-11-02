function Card({ emoji, isFlipped, onCardClick }) {
  return (
    <div
      className={`emoji-card ${isFlipped ? "card-turn" : ""}`}
      onClick={onCardClick}
    >
      <div className="card-inner">
        <div className="front">
          {/* Front side of the card (when not flipped) */}
        </div>
        <div className="back">
          {isFlipped ? emoji : ""} {/* Display the emoji when flipped */}
        </div>
      </div>
    </div>
  );
}

export default Card;
