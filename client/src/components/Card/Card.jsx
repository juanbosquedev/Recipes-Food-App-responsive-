import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  
  deleteRecipeCreated,
} from "../../Reduxx/Actions/actions";
import Style from "./Card.module.css";

export default function Card({
  name,
  diets,
  image,
  id,
  cookingTime,
  servings,
  deleteRecipe,
}) {
  const dispatch = useDispatch();

  return (
    <div className={Style.card}>
  
        <button
          className={Style.close}
          onClick={() => dispatch(deleteRecipe(id), deleteRecipeCreated(id))}
        >
          X
        </button>
        <Link Style="text-decoration:none" to={`/CardDetail/${id}`}>
          <h4 className={Style.title}>{name}</h4>
        </Link>
        <div className={Style.image}>
        <img src={image || "../../Images/default-image.png"} alt="" />
      </div>
        <section className={Style.section}>
          <p>CookingTime </p>
          <span>{cookingTime}' </span>
          <p>Servings:</p>
          <span>{servings}</span>
          <p>Diet Type </p>
          <span>{diets}</span>
        </section>
      

     
    </div>
  );
}
