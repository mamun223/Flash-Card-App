import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck, readDeck } from "../utils/api";
import Deck from "./Deck";
import Study from "./Study";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Decks() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  const { deckId } = useParams();
  console.log("deck id in Decks1",deckId);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks).catch(setError);

    return () => abortController.abort();
  }, []);

  if (error) return error;

  const list = decks.map((deck) => (
    <Deck
      deckId={deck.id}
      key={deck.id}
      deck={deck}
      handleDelete={async () => {
        const result = window.confirm(
          "Delete this deck?\n\n You will not be able to recover it."
        );
        if (result) {
          await deleteDeck(deck.id);
          setDecks((prevDecks) =>
            prevDecks.filter((prevDeck) => {
              return prevDeck.id !== deck.id;
            })
          );
        }
      }}
    />
  ));

  return <ul>{list}</ul>;
}

export default Decks;
