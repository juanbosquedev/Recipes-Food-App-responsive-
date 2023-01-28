import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_Diets, get_recipe } from "../../Reduxx/Actions/actions";
import { useRef } from "react";
import Style from "./Search.module.css";
import { useEffect } from "react";

export default function SearchBar() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.get_recipe);
  const ref = useRef(null);

  function handleChanges(e) {
    e.preventDefault();
  }
  function handleSubmit(e) {
    e.preventDefault();

    const inputValue = ref.current.value;
    dispatch(get_recipe(inputValue));
  }
  useEffect(() => {
    dispatch(get_recipe(" "));
    dispatch(get_Diets());
  }, [recipes]); 
  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          
        }}
      >
        <input
          ref={ref}
          type="text"
          placeholder="Searching..."
          onChange={(e) => handleChanges(e)}
          className={Style.search}
        />
        <input className={Style.button} type="submit" value="Search" />
      </form>
    </div>
  );
}
