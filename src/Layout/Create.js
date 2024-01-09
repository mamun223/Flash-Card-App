import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Create () {

    const history = useHistory()

    const handleCreateClick = () => {
        history.push('/decks/new')
    }
    return <button onClick={handleCreateClick} type="button" class="btn btn-secondary btn-lg"> + Create Deck </button>
}

export default Create;