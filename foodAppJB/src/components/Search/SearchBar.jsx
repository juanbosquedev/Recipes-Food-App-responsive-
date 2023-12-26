import React from "react";
import { useDispatch } from "react-redux";
import { get_recipe } from "../../Reduxx/Actions/actionsCreator";
import { useRef, useState } from "react";
import Style from "./Search.module.css";
import propTypes from "prop-types";

export default function SearchBar({ setInput }) {
  const dispatch = useDispatch();
  const ref = useRef();
  const [state, setState] = useState("");

  function handleChanges() {
    const inputValue = ref.current.value;
    setState(inputValue);
  }
  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(get_recipe(state));
    setInput(state);
    setState("");
  }
  return (
    <div>
      <form id="formSearch" name="form-search" onSubmit={handleSubmit}>
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
        <input className={Style.buttonSearch} type="submit" value="Search" />
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  setInput: propTypes.func.isRequired,
};
