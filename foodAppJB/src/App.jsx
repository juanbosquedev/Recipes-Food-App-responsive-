import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Home from "./components/Home/Home.jsx";
import CardDetail from "./components/CardDetail/CardDetail.jsx";
import Welcome from "./components/Welcome/Welcome";
import RecipesCreated from "./components/RecipesCreated/RecipesCreated";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
      </Routes>
      <Nav />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/CardDetail/:id" element={<CardDetail />} />
        <Route path="/RecipesCreated" element={<RecipesCreated />} />
        <Route path="/CreateRecipe" element={<CreateRecipe />} />
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </div>
  );
}

export default App;
