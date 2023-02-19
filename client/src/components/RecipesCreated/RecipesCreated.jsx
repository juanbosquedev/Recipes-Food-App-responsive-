import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showRecipesCreated, deleteRecipeCreated } from "../../Reduxx/Actions/actions";
import Card from "../Card/Card";
import Style from "./RecipesCreated.module.css"



export default function RecipesCreated() {
  const dispatch = useDispatch();
  const recetasCreadas = useSelector((state) => state.created);
  useEffect(() => {
    dispatch(showRecipesCreated());
    // dispatch(deleteRecipeCreated());
  }, [dispatch]);
  return (
    <div className={Style.main}>
      {{recetasCreadas
        ? recetasCreadas.map((el) => {
            return (
              <Card
                key={el.id}
                id={el.id}
                name={el.name}
                deleteRecipe={deleteRecipeCreated}
                image={el.image}
                servings={el.servings}
                cookingTime={el.cookingTime}
                diets={el.diets}
              />
            );
          })
        : alert("There is not a recipe create yet")}}
    </div>
  );
}
