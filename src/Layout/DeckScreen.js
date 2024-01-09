import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, deleteDeck } from "../utils/api";
import CardsInDeck from "./CardsInDeck";

function DeckScreen() {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);

  const { deckId } = useParams();
  const history = useHistory()
  console.log(deckId);
  

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
      })
      .catch((error) => {
        setError(error);
      });
  }, [deckId]);

  const handleDelete =  async () => {
      const result = window.confirm(
        "Delete this deck?\n\n You will not be able to recover it."
      );
      if (result) {
        await deleteDeck(deck.id);
        history.push('/')
      }
    }

  const handleEditClick = () => history.push(`/decks/${deckId}/edit`)
let display;
if (deck) {
  const {cards} = deck
  console.log("cards in DeckScreen", cards)
  if(cards) 
 display = cards.map((card) => <CardsInDeck cardId={card.id} cardFront={card.front} cardBack={card.back} />)
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div class="card-body">
        <h1>{deck.name}</h1>
        <h5 class="card-title"> {deck.name} </h5>
        <p class="card-text">{deck.description}</p>
        <br />
        <button onClick={handleEditClick} type="button" class="btn btn-secondary">
          Edit
        </button>
        <Link to={`/decks/${deckId}/study`} type="button" class="btn btn-primary">
          Study
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} type="button" class="btn btn-primary">
          + Add Card
        </Link>
        <button onClick={handleDelete}  type="button" class="btn btn-danger">
          Delete
        </button>
      </div>
      <h1>Cards</h1>
      <ol>{display}</ol>
    </>
  );
}
}

export default DeckScreen;
