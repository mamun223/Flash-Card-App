import React, { useEffect } from "react";
import { useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { readCard, updateCard, readDeck } from "../utils/api";
import AddEditCard from "./AddEditCard";

function EditCardScreen() {
  const { cardId, deckId } = useParams();
  const history = useHistory();

  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    readCard(cardId, abortController.signal)
      .then((card) => {
        console.log("after read card");
        setCard(card);
      })
      .catch((error) => {
        setError(error);
      });
    return () => abortController.abort();
  }, [cardId]);

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
      })
      .catch((error) => {
        setError(error);
      });
    return () => abortController.abort();
  }, [deckId]);

  const handleCardUpdate = () => {
    const abortController = new AbortController();
    updateCard(card, abortController.signal)
      .then((card) => {
        setCard(card)
        console.log("after update card");
      })
      .catch((error) => {
        setError(error);
      });
    return () => abortController.abort();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("after change card");
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleSubmitClick = () => {
    history.push(`/decks/${deckId}`);
    handleCardUpdate();
    setCard((prev) => prev)
  };

  const deckName = deck.name;
  const screenName = "Edit Card";
  console.log("deck name in EditCardScreen: ", deckName);

  return (
    <AddEditCard
      screenName={screenName}
      deckName={deckName}
      deckId={deckId}
      card={card}
      handleChange={handleChange}
      handleSubmitClick={handleSubmitClick}
    />
    // <>
    //   <nav aria-label="breadcrumb">
    //     <ol class="breadcrumb">
    //       <li class="breadcrumb-item">
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li class="breadcrumb-item">
    //         <Link to={`/decks/${deckId}`}>{card.name}</Link>
    //       </li>
    //       <li class="breadcrumb-item active" aria-current="page">
    //         Edit Card
    //       </li>
    //     </ol>
    //     <h1>Edit Card</h1>
    //   </nav>
    //   <div class="mb-3">
    //     <label for="exampleFormControlTextarea1" class="form-label">
    //       Front
    //     </label>
    //     <textarea
    //       name="front"
    //       value={ card.front }
    //       onChange={handleChange}
    //       class="form-control"
    //       id="exampleFormControlTextarea1"
    //       rows="3"
    //     ></textarea>
    //   </div>
    //   <div class="mb-3">
    //     <label for="exampleFormControlTextarea1" class="form-label">
    //       Back
    //     </label>
    //     <textarea
    //       name="back"
    //       value={ card.back }
    //       onChange={handleChange}
    //       class="form-control"
    //       id="exampleFormControlTextarea1"
    //       rows="3"
    //     ></textarea>
    //   </div>

    //   <Link to={`/decks/${deckId}`} type="button" class="btn btn-secondary">
    //     Cancel
    //   </Link>
    //   <button onClick={handleSubmitClick} type="button" class="btn btn-primary">
    //     Submit
    //   </button>
    // </>
  );
}

export default EditCardScreen;
