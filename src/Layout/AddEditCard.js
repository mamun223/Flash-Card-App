import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function AddEditCard ( { screenName, deckName, deckId, card, handleChange, handleSubmitClick} ) {

    return (
        <>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{deckName}</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {screenName}
              </li>
            </ol>
            <h1>{deckName}: {screenName}</h1>
          </nav>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Front
            </label>
            <textarea
              name="front"
              value={ card.front }
              onChange={handleChange}
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Back
            </label>
            <textarea
              name="back"
              value={ card.back }
              onChange={handleChange}
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
    
          <Link to={`/decks/${deckId}`} type="button" class="btn btn-secondary">
            Cancel
          </Link>
          <button onClick={handleSubmitClick} type="button" class="btn btn-primary">
            Submit
          </button>
        </>
      );

}

export default AddEditCard;