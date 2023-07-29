import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [flippedCards, setFlippedCards] = useState([]);

  const onClickHandler = (currentId) => {
    // Check if the current card is already flipped or matched
    const cardIndex = cardList.findIndex((card) => card.id === currentId);
    const card = cardList[cardIndex];

    if (flippedCards.includes(currentId) || card.isMatched) {
      return;
    }

    // Check if two cards are already flipped
    if (flippedCards.length === 2) {
      // Close the two cards after 500ms
      setTimeout(() => {
        setFlippedCards([]);
      }, 500);
    }

    // Update the list of flipped cards
    const newFlippedCards = [...flippedCards, currentId];
    setFlippedCards(newFlippedCards);

    // Check if two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCardIndex = cardList.findIndex(
        (card) => card.id === firstCardId
      );
      const secondCardIndex = cardList.findIndex(
        (card) => card.id === secondCardId
      );

      const firstCard = cardList[firstCardIndex];
      const secondCard = cardList[secondCardIndex];

      // Check if the cards match
      if (firstCard.pic === secondCard.pic) {
        // Cards match, mark them as matched
        cardList[firstCardIndex].isMatched = true;
        cardList[secondCardIndex].isMatched = true;
      }
    }
  };

  useEffect(() => {
    // Check if all cards are matched
    const allMatched = cardList.every((card) => card.isMatched);
    if (allMatched) {
      alert("Congratulations! You have matched all the cards.");
      // You can add more logic here to reset the game or perform any other action.
    }
  }, [cardList]);

  return (
    <div className="card-item-list">
      {cardList.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          image={item.pic}
          onClick={onClickHandler}
          isOpen={flippedCards.includes(item.id) || item.isMatched}
        />
      ))}
    </div>
  );
};
