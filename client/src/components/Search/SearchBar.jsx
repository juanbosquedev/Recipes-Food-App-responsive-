import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_Diets, get_recipe } from "../../Reduxx/Actions/actions";
import { useRef, useState } from "react";
import Style from "./Search.module.css";
import { useEffect } from "react";

export default function SearchBar({ cath }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [state, setState] = useState("");

  function handleChanges(e) {
    const inputValue = ref.current.value;
    e.preventDefault();
    setState(inputValue);
  }
  function handleSubmit(e) {
    dispatch(get_recipe(state));
    cath(state);
    setState("");
  }
// is there anything wrong with this form?
  return (
    <div>
      <form
        id="formSearch"
        name="form-search"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <input
          id="searched"
          name="search"
          ref={ref}
          value={state}
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
