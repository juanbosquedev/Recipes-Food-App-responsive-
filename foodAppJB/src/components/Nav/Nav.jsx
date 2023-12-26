import React from "react";
import { Link } from "react-router-dom";
import Style from "./Nav.module.css";

function Nav() {
  return (
    <div className={Style.Nav}>
      <span className={Style.components}>
        <Link className={Style.title} to="/Home">
          Home
        </Link>
      </span>
      <span className={Style.components}>
        <Link className={Style.title} to="/RecipesCreated">
          Recipes Created
        </Link>
      </span>
      <span className={Style.components}>
        <Link className={Style.title} to="/CreateRecipe">
          Create a Recipe
        </Link>
      </span>
    </div>
  );
}

export default Nav;
