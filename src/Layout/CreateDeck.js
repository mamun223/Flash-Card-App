import React, { useState, useEffect } from "react";
import { createDeck } from "../utils/api";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import DeckScreen from "./DeckScreen";

function CreateDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState(undefined);

    let deckId = 0;

    const handleCreateDeck = () => {
        const abortController = new AbortController();
        createDeck(deck, abortController.signal)
        .then((deck) => {
          setDeck(deck);
          deckId = deck.id
          history.push(`/decks/${deckId}`);
          console.log("deck id in HandleCREATE",deckId)
          console.log("deck in HandleCREATE", deck)
        })
        .catch((error) => {
          setError(error);
        });

        return () => abortController.abort();
    }
    
//   const handleGoToDeckScreen = () => {
//     console.log("deck in handleGoToDeckScreen", deck)
//     history.push(`/decks/:deckId`);
//   };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck({ ...deck, [name]: value });
  };

  

  const handleSubmitClick = (event) => {
    handleCreateDeck()
    // handleGoToDeckScreen();
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Name
        </label>
        <input
          type="name"
          name="name"
          value={deck.name}
          onChange={handleChange}
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Deck Name"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Description
        </label>
        <textarea
          name="description"
          value={deck.description}
          onChange={handleChange}
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Brief description of the deck"
        ></textarea>
      </div>

      <Link to="/" type="button" class="btn btn-secondary">
        Cancel
      </Link>
      <button onClick={handleSubmitClick} type="button" class="btn btn-primary">
        Submit
      </button>
    </>
  );
}

export default CreateDeck;
