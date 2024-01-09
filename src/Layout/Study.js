// import { useState, useEffect } from "react";
// import { readDeck, readCard } from "../utils/api";
// import Cards from "./Card";
// import Deck from "./Deck";
// import {
//   Route,
//   Switch,
//   useParams,
//   useRouteMatch,
//   useHistory,
//   Link
// } from "react-router-dom";
// import Next from "./Next";

// function Study() {
//   const [deck, setDeck] = useState({});
//   const cardIndex = 0;
//   const history = useHistory();
//   const [error, setError] = useState(undefined);

//   const { deckId } = useParams();

//   console.log("deck id and card id in study: ", deckId);

//   useEffect(() => {
//     const abortController = new AbortController();
//     readDeck(deckId).then(setDeck).catch(setError);

//     return () => abortController.abort();
//   }, [deckId]);

//   const { cards } = deck;
//   console.log("cards in Study: ", cards);

//   const handleNextClick = () => {
//     // Redirect to another component when the button is clicked
//     return (
//         <Route path="/decks/:deckId/cards/:cardId">
//         <Next />
//       </Route>
//     )
// }

//   if (deck && deck.cards) {
//     const cardLength = cards.length;

//     const cardFront = cards[cardIndex].front;
//     const cardBack = cards[cardIndex].back;

//     return (
//       <Cards
//         cardLength={cardLength}
//         handleNextClick={handleNextClick}
//         cardFront={cardFront}
//         cardBack={cardBack}
//       />
//     );
//   } else {
//     return <p>loading</p>;
//   }
// }

// export default Study;
