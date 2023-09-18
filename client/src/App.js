import  "./App.css";
import {  Route, Switch } from "react-router-dom";
import React from "react";
import Nav from "../src/components/Nav/Nav.jsx";
import Home from "../src/components/Home/Home.jsx";
import CardDetail from "../src/components/CardDetail/CardDetail.jsx";
import Welcome from "./components/Welcome/Welcome";
import RecipesCreated from "./components/RecipesCreated/RecipesCreated";
import CreateRecipe from "../src/components/CreateRecipe/CreateRecipe.jsx";

function App() {
  return (   
      <div >
        <Switch>
            <Route exact path="/" component={Welcome} />
          <React.Fragment>
            <section className="App">
            <Nav />
            <Route exact path="/home" component={Home} />
            <Route path="/CardDetail/:id" component={CardDetail} />
            <Route path="/CreateRecipe" component={CreateRecipe} />
            <Route path="/RecipesCreated" component={RecipesCreated} />
            </section>
          </React.Fragment>
        </Switch>
      </div>
  
  );
}

export default App;
