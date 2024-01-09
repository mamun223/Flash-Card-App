import React from "react";
import { useState } from "react";
import Next from "./Next";
import { Link, useParams } from "react-router-dom";

function Cards({ cardLength, handleNextClick, currentCardIndex, cardFront, cardBack, cardName }) {
  const [isFront, setIsFront] = useState(true);

  const handleCardFlip = () => {
    setIsFront((prevIsFront) => !prevIsFront);
  };

  const handleNextClickWithFlip = () => {
    handleCardFlip(); // Call the flip function
    handleNextClick(); // Call the next click function
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link href="#">{cardName}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study:
          </li>
        </ol>
      </nav>
      <h1>Study:{cardName}</h1>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"> {} </h5>
            <p class="card-text"> Card {currentCardIndex + 1} of {cardLength}</p>
            <p class="card-text">
              {isFront ? (
                <p>
                  {cardFront}
                  <br/>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={handleCardFlip}
                  >
                    Flip
                  </button>
                </p>
              ) : (
                <p>
                  {cardBack}
                  <br/>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onClick={handleCardFlip}
                  >
                    Flip
                  </button>
                  <button onClick={
                    handleNextClickWithFlip
                    } type="button" class="btn btn-primary">
                    Next
                  </button>
                </p>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
