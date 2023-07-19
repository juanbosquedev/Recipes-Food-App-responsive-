import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";
import { useEffect } from "react";
import Paginate from "../Paginate/Paginate";
import Style from "../Home/Home.module.css";
import {
  get_Diets,
  get_recipe,
  dietsFilter,
  ScoreOrderA,
  ScoreOrderD,
  NameOrderA,
  NameOrderD,
  deleteRecipe,
} from "../../Reduxx/Actions/actions";
import SearchBar from "../Search/SearchBar";

import { cleanUpDetails } from "../../Reduxx/Actions/actions";

export default function Home() {
  const recipes = useSelector((state) => state.recipes);
  const details = useSelector((state) => state.details);
  const [input, setInput] = useState("");
  const DietsTypes = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const [paginado, setPaginado] = useState();

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(get_recipe(input));
      dispatch(get_Diets());
    }
  }, [dispatch, input, recipes.length]);

  useEffect(() => {
    if (details.length !== 0) {
      dispatch(cleanUpDetails());
    }
  }, [dispatch, details]);

  function HandlerDietsFilter(e) {
    dispatch(dietsFilter(e.target.value));
  }
  function handleOrderByScore(e) {
    if (e.target.value === "ascendente") {
      dispatch(ScoreOrderA(e.target.value));
    }
    if (e.target.value === "descendente") {
      dispatch(ScoreOrderD(e.target.value));
    }
  }
  function handleOrderByName(e) {
    if (e.target.value === "ascendente") {
      dispatch(NameOrderA(e.target.value));
    }
    if (e.target.value === "descendente") {
      dispatch(NameOrderD(e.target.value));
    }
  }

  return (
    <div className={Style.home}>
      <div className={Style.main}>
        <Paginate
          className={Style.paginate}
          paginado={recipes}
          setPaginado={setPaginado}
        ></Paginate>

        <SearchBar
          id="searcher"
          name="searcher"
          setInput={setInput}
          className={Style.search}
        />
        <span>
          <select
            Style="background-color:#790c0c; border: black solid 2px;"
            defaultValue="default"
            onChange={(e) => HandlerDietsFilter(e)}
            id="dietSelector"
            name="dietsType"
          >
            <option
              Style="padding-bottom:4px"
              id="dietsOrderer"
              name="dietsOrder"
              value="default"
            >
              Diets Order
            </option>
            {DietsTypes &&
              DietsTypes.map((el) => {
                return (
                  <option key={el.id} name={el.name} value={el.name}>
                    {el.name}
                  </option>
                );
              })}
          </select>

          <select
            Style="background-color:#790c0c; border: black solid 2px;"
            defaultValue="default"
            id="dietsByName"
            name="names"
            onChange={(e) => handleOrderByName(e)}
          >
            <option defaultValue="default">A-Z</option>
            <option value="ascendente">Up Ward</option>
            <option value="descendente">Falling</option>
          </select>

          <select
            Style="background-color:#790c0c; border: black solid 2px;"
            defaultValue="default"
            id="dietsByScore"
            name="score"
            onChange={(e) => handleOrderByScore(e)}
          >
            <option defaultValue="default">Score</option>
            <option value="ascendente">Up Ward</option>
            <option value="descendente">Falling</option>
          </select>
        </span>
      </div>
      <div className={Style.cards}>
        {paginado ? (
          paginado.map((el) => {
            return (
              <Card
                key={el.id}
                id={el.id}
                deleteRecipe={deleteRecipe}
                name={el.name}
                idOriginal={el.idOriginal}
                image={el.image}
                servings={el.servings}
                cookingTime={el.cookingTime}
                diets={el.diets}
              />
            );
          })
        ) : (
          <h5 className={Style.loader}>not found</h5>
        )}
      </div>
    </div>
  );
}
