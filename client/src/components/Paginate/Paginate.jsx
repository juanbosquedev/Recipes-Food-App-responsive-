import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_recipe } from "../../Reduxx/Actions/actions";
import Style from "./Paginate.module.css";

export default function Paginate({ paginado, setPaginado }) {
  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  let quantity = 9;
  let total = paginado.length;

  let paginate = Math.ceil(total / quantity);
  const [current, setCurrent] = useState(1);
  const changePage = (current) => {
    if (current > 0 && current < paginate + 1) {
      setPaginado(paginado.slice((current - 1) * quantity, quantity * current));
      setCurrent(current);
    }
  };
  useEffect(() => {
    changePage(1);
    get_recipe();
  }, [recipes]);
  return (
    <div className={Style.body}>
      {/* <span className={Style.btn}> */}
        <button
          // hidden={current === 1 && true}
          id={Style.btn}
          className={`button ${current === 1}`}
          onClick={() => changePage(1)}
        >
          Begin
        </button>
      {/* </span> */}
      <button
        id="btn"
        hidden={current === 1 && true}
        className={`button ${current === 1}`}
        onClick={() => changePage(current - 1)}
      >
        -
      </button>
      <button>{current}</button>
      <button
        hidden={current === paginate && true}
        className={`button ${current === total}`}
        onClick={() => changePage(current + 1)}
      >
        +
      </button>
      {/* <span className={Style.btn}> */}
        <button
          // hidden={current === paginate && true}
          id={Style.btn}

          className={`button ${current === total}`}
          onClick={() => changePage(paginate)}
        >
          End
        </button>
      {/* </span> */}
    </div>
  );
}
