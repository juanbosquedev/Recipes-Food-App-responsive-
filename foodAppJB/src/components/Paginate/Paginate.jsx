import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { get_recipe } from "../../Reduxx/Actions/actionsCreator";
import Style from "./Paginate.module.css";

export default function Paginate({ setPaginado }) {
  const recipes = useSelector((state) => state.recipes);

  let quantity = 9;
  const total = recipes.length;

  let paginate = Math.ceil(total / quantity);
  const [current, setCurrent] = useState(1);
  const changePage = (current) => {
    if (current > 0 && current < paginate + 1) {
      setPaginado(recipes.slice((current - 1) * quantity, quantity * current));
      setCurrent(current);
    }
  };
  useEffect(() => {
    changePage(1);
    get_recipe();
  }, [recipes]);
  return (
    <div className={Style.body}>
      <button
        id="btnBegin"
        className={`button ${current === 1}`}
        onClick={() => changePage(1)}
      >
        Begin
      </button>

      <button
        id="btnLess"
        hidden={current === 1 && true}
        className={`button ${current === 1}`}
        onClick={() => changePage(current - 1)}
      >
        -
      </button>
      <button>{current}</button>
      <button
        id="btnPlus"
        hidden={current === paginate && true}
        className={`button ${current === total}`}
        onClick={() => changePage(current + 1)}
      >
        +
      </button>

      <button
        id="btnEnd"
        className={`button ${current === total}`}
        onClick={() => changePage(paginate)}
      >
        End
      </button>
    </div>
  );
}
