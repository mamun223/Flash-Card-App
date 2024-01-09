import React from "react";
import Header from "./Header";
import Home from "./Home"
import NotFound from "./NotFound";
import Next from "./Next"
import DeckScreen from "./DeckScreen";
import { Route, Switch} from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";
import CreateDeck from "./CreateDeck";
import EditDeckScreen from "./EditDeckScreen";
import ScreenAddCard from "./ScreenAddCard";
import EditCardScreen from "./EditCardScreen"



function Layout() {
  

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/decks/:deckId/study">
            <Next />
          </Route>

          <Route path="/decks/:deckId/NotEnoughCards">
            <NotEnoughCards />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeckScreen />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCardScreen />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <ScreenAddCard />
          </Route>

          <Route path="/decks/:deckId">
            <DeckScreen />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
