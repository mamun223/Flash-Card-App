import React from "react";
import Decks from "./Decks"
import { Link } from "react-router-dom";
// import { Button } from "bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NotEnoughCards from "./NotEnoughCards";

function Deck ({ deck, handleDelete, handleView, deckId }) {

  const history = useHistory()

  const handleStudyButton = () => {
 if (deck.cards.length < 3) {
  history.push(`/decks/${deckId}/NotEnoughCards`)
 }
  history.push(`/decks/${deckId}/study`)

  }

    return (
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title"> {deck.name} </h5>
              <p class="card-text">{deck.cards.length} cards</p>
              <p class="card-text">{deck.description}</p>
              <Link to={`/decks/${deckId}`} type="button" class="btn btn-secondary" onClick={handleView}>View</Link>
              <button onClick={handleStudyButton} type="button" class="btn btn-primary" >Study</button>
              <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
    )
}

export default Deck;