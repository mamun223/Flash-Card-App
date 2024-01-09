import React, { useState } from "react";
import { deleteCard } from "../utils/api";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

function CardsInDeck({ cardId, cardFront, cardBack }) {

  const { deckId } = useParams()


  const handleDelete =  async () => {
    const result = window.confirm(
      "Delete this card?\n\n You will not be able to recover it."
    );
    if (result) {
      await deleteCard(cardId);
    }
  }

    return (
      <div class="card w-50">
        <div class="card-body">
          <p class="card-text">
            {cardFront}
          </p>
          <p class="card-text">
            {cardBack}
          </p>
          <Link
            to={`/decks/${deckId}/cards/${cardId}/edit`}
            class="btn btn-primary"
          >
            Edit
          </Link>
          <button type="button" class="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      );
}

export default CardsInDeck;
