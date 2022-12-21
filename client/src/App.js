import "./App.css";
import React from "react";
import Nav from "../src/components/Nav/Nav.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../src/components/Home/Home.jsx";
import SearchBar from "../src/components/Search/SearchBar.jsx";
import Card from "../src/components/Card/Card.jsx";
import CardDetail from "../src/components/CardDetail/CardDetail.jsx";
import Welcome from "./components/Welcome/Welcome";
import RecipesCreated from "./components/RecipesCreated/RecipesCreated";
import CreateRecipe from "../src/components/CreateRecipe/CreateRecipe.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          
          <Route exact path="/" component={Welcome} />

          <React.Fragment>
            <Nav />
            <Route exact path="/home" component={Home} />
            <Route path="/SearchBar" component={SearchBar} />
            <Route path="/Card" component={Card} />
            <Route path="/CardDetail/:id" component={CardDetail} />
            <Route path="/CreateRecipe" component={CreateRecipe} />
            <Route path="/RecipesCreated" component={RecipesCreated} />
          </React.Fragment>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
