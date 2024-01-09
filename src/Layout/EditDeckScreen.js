import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, updateDeck } from "../utils/api";


function EditDeckScreen () {

    const [deck, setDeck] = useState({})
    // const [updatedDeck, setUpdatedDeck] = useState({})
    const [error, setError] = useState(undefined)

    const {deckId} = useParams()
    const history = useHistory()

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then((deck) => {
            setDeck(deck)
        })
        .catch((error) => {
            setError(error)
        })
        return () => abortController.abort();
    }, [deckId])

    const handleDeckUpdate = () => {
        const abortController = new AbortController()
        updateDeck(deck, abortController.signal)
        .then((deck) => {
            // setDeck({ ...deck, ...deck })
            setDeck(deck)
        })
        .catch((error) => {
            setError(error)
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setDeck((prevUpdatedDeck) => ({
            ...prevUpdatedDeck,
            [name]: value,
          }));
    }

    const handleSubmitClick = () => {
      handleDeckUpdate()
      if(deck){
        history.push(`/decks/${deckId}`)
      }  
    }

    return (
        <>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Edit Deck
              </li>
            </ol>
            <h1>Edit Deck</h1>
          </nav>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Name
            </label>
            <input
              type="name"
              name="name"
              value={ deck.name || ""}
              onChange={handleChange}
              class="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Description
            </label>
            <textarea
              name="description"
              value={ deck.description || ""}
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

export default EditDeckScreen;