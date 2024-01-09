import React, { useEffect } from "react";
import { useState } from "react";
import Cards from "./Card";
import { readDeck } from "../utils/api";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";

function Next() {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState({});
  

  const { deckId } = useParams();
  const history = useHistory()



  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
        setCurrentCard(deck.cards[currentCardIndex]);
      })
      .catch((error) => {
        setError(error);
      });

    return () => abortController.abort();
  }, [deckId, currentCardIndex]);

  const { cards } = deck;
  const arrOfCards = deck.cards;
  

  if (deck && deck.cards) {
    const cardLength = cards.length;
    if (cardLength < 3) history.push(`/decks/${deckId}/NotEnoughCards`)

    const handleNextClick = () => {
      // Move to the next card if available
      if (currentCardIndex < cardLength - 1) {
        console.log(setCurrentCardIndex((prevIndex) => prevIndex + 1));
        setCurrentCard(arrOfCards[currentCardIndex]);
      } else {
        // If it's the last card, reset to the first card
        const result = window.confirm(
          "Restart Cards?\n\n click 'cancel' to return to the home page."
        );
        if (result){
        setCurrentCardIndex(0);
        setCurrentCard(arrOfCards[0]);
        } else {
          history.push('/')
        }
      }
    };

    const cardFront = currentCard.front;
    const cardBack = currentCard.back;
    const cardName = deck.name

    
    console.log("cards property from deck in Next: ", cards);
    console.log("length of cards in Next:", cardLength);
    console.log("current card is: ", currentCard);
    console.log("current card front: ", cardFront);
    console.log("current card back: ", cardBack);
    console.log("current card name: ", cardName)
    console.log("deck fetched by the readDeck in Next: ", deck);

    return (
      <Cards
        cardLength={cardLength}
        handleNextClick={handleNextClick}
        currentCardIndex={currentCardIndex}
        cardFront={cardFront}
        cardBack={cardBack}
        cardName={cardName}
      />
    );
  } else {
    return <p>loading</p>;
  }
}

export default Next;
