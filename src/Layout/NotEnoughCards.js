import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams} from "react-router-dom";
import { readDeck } from "../utils/api";
import ScreenAddCard from "./ScreenAddCard";


function NotEnoughCards () {

  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined)


    const { deckId } = useParams()
    console.log("deck id in Not enough cards", deckId)


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

    const cards = deck.cards || [];
    const cardLength = cards.length || 0;
    console.log(cardLength)

    
    if(deck){
      
      return (
      <>
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <a href="#">{deck.name}: Study</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <div class="card-body">
        <h1>{deck.name}</h1>
            <h5 class="card-title"> Not enough cards </h5>
            <p class="card-text">You need at least 3 cards to study. There are {cardLength} in this deck.</p>
                  <br/>
                  <Link to={`/decks/${deckId}/cards/new`} type="button" class="btn btn-secondary btn-lg"> + Add Cards </Link>
          </div>

      </>
    )
    } else {
      <p>no decks</p>
    }
    
}

export default NotEnoughCards;