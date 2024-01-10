import React, { useEffect, useState } from "react";
import { readDeck, createCard } from "../utils/api";
import {
  useParams,
  Link,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import AddEditCard from "./AddEditCard";

function ScreenAddCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({})
  const [error, setError] = useState(undefined);

  const { deckId } = useParams();
  const history = useHistory();
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

      
      return () => abortController.abort();
  }, [deckId]);

  const deckName = deck.name
  const screenName = "Add Card"
  console.log("deck name in screen Add card: ",deckName)

//   useEffect(() => {
//     const abortController = new AbortController();
//     createCard(deckId, card, abortController.signal)
//     .then((card) => {
//         setCard(card)
//     })
//     .catch((error) => {
//         setError(error)
//     })
//   }, [deckId, card])

  console.log("card in screenaddcard: ",card)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCard((prevCard) => ({
        ...prevCard, [name]: value
    }))
  }

  console.log("new created card: ", card)

  const handleCreateCard = () => {
    const abortController = new AbortController();
    createCard(deckId, card, abortController.signal)
    .then((card) => {
        setCard(card)
    })
    .catch((error) => {
        setError(error)
    })
    return () => abortController.abort();
  };

  const handleSubmitClick = () => {
    handleCreateCard()
    setCard({
      front: "",
      back: ""
  })
  };

  return (
    <AddEditCard screenName={screenName} deckName={deckName} deckId={deckId} card={card} handleChange={handleChange} handleSubmitClick={handleSubmitClick} />
    // <>
    //   <nav aria-label="breadcrumb">
    //     <ol class="breadcrumb">
    //       <li class="breadcrumb-item">
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li class="breadcrumb-item">
    //         <Link to="">{deck.name}</Link>
    //       </li>
    //       <li class="breadcrumb-item active" aria-current="page">
    //         Add Card
    //       </li>
    //     </ol>
    //   </nav>
    //   <h1>{deck.name}: Add Card</h1>
    //   <div class="mb-3">
    //     <label for="exampleFormControlTextarea1" class="form-label">
    //       Front
    //     </label>
    //     <textarea
    //       name="front"
    //       value={card.name}
    //       onChange={handleChange}
    //       class="form-control"
    //       id="exampleFormControlTextarea1"
    //       rows="3"
    //       placeholder="Front side of card"
    //     ></textarea>
    //   </div>
    //   <div class="mb-3">
    //     <label for="exampleFormControlTextarea1" class="form-label">
    //       Back
    //     </label>
    //     <textarea
    //       name="back"
    //       value={card.name}
    //       onChange={handleChange}
    //       class="form-control"
    //       id="exampleFormControlTextarea1"
    //       rows="3"
    //       placeholder="Back side of card"
    //     ></textarea>
    //   </div>
    //   <Link to={`/decks/${deckId}`} type="button" class="btn btn-secondary">
    //     Done
    //   </Link>
    //   <button onClick={handleSaveClick} type="button" class="btn btn-primary">
    //     Save
    //   </button>
    // </>
  );
}

export default ScreenAddCard;
