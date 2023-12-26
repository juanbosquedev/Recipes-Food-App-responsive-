import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { create_Recipe } from "../../Reduxx/Actions/actionsCreator";
import { useSelector } from "react-redux";
import { get_Diets } from "../../Reduxx/Actions/actionsCreator";
import Style from "../CreateRecipe/CreateRecipe.module.css";
import validate from "./validate";

export default function CreateRecipe() {
  const DietsTypes = useSelector((state) => state.diets);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: [],
    dishType: [],
    idOriginal: 123,
    image: "",
    diets: [],
    servings: 0,
    cookingTime: 0,
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...state,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleChangeSteps = (e) => {
    setState({
      ...state,
      steps: [e.target.value],
    });

    setErrors(
      validate({
        ...state,
        steps: [...state.steps, e.target.value],
      })
    );
  };


  const handleChangeDiets = (e) => {
    setState({
      ...state,
      diets: [e.target.value],
    });

    setErrors(
      validate({
        ...state,
        diets: [...state.diets, e.target.value],
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let test = Object.values(errors);
    if (test.length > 0) {
      alert("Fill properly");
    } else {
      if (state.name.length < 3) return alert("Fill all the filds");
       console.log(state, " I am state create recipe component line 85")
      dispatch(create_Recipe(state));
      setState({
        name: "",
        summary: "",
        healthScore: 0,
        steps: [],
        dishType: [],
        idOriginal: 123,
        image: "",
        diets: (document
          .getElementById("firstSelect")
          .getElementsByTagName("option")[0].selected = "selected"),
        servings: 0,
        cookingTime: 0,
      });
      alert("receta creada");
    }
  };

  useEffect(() => {
    dispatch(get_Diets());
  }, [dispatch]);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className={Style.background}
    >
      <div className={Style.short}>
        <label htmlFor="nameId">Name: </label>
        <input
          name="name"
          id="nameId"
          className={Style.placeHolder}
          type="text"
          value={state.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        {errors.name && <h6 style={{color:"white"}}>{errors.name}</h6>}

        <label htmlFor="hScoreId">Health Score: </label>
        <input
          name="healthScore"
          id="hScoreId"
          className={Style.placeHolder}
          type="number"
          value={state.healthScore}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label htmlFor="imageId">Imagen: </label>
        <input
          className={Style.placeHolder}
          name="image"
          id="imageId"
          type="text"
          value={state.image}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label htmlFor="firstSelect">Diet Type: </label>
      
        <select
          name="firstSelected"
          id="firstSelect"
          className={Style.placeHolderDiet}
          defaultValue="default"
          onChange={(e) => handleChangeDiets(e)}
        >
          <option className={Style.placeHolderD}>Diet Types</option>
          {DietsTypes &&
            DietsTypes.map((el) => {
              return (
                <option
                  className={Style.placeHolderP}
                  key={el.id}
                  value={el.name}
                >
                  {el.name}
                </option>
              );
            })}
        </select>
        {errors.diets && <h6 style={{color:"white"}}>{errors.diets}</h6>}

        <label htmlFor="servingsId">Servings: </label>
        <input
          name="servings"
          className={Style.placeHolder}
          id="servingsId"
          type="number"
          value={state.servings}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {errors.servings && <h6 style={{color:"white"}}>{errors.servings}</h6>}

        <label htmlFor="cookingTimeId">Cooking Time: </label>
        <input
          className={Style.placeHolder}
          name="cookingTime"
          id="cookingTimeId"
          type="number"
          value={state.cookingTime}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        {errors.cookingTime && (
          <h6 style={{color:"white"}}>{errors.cookingTime}</h6>
        )}
      </div>
   
      <div className={Style.long}>style
        <label htmlFor="summaryId">Summary: </label>
        <textarea
          className={Style.placeHolder}
          name="summary"
          id="summaryId"
          type="text"
          value={state.summary}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {errors.summary && <h6 style={{color:"white"}}>{errors.summary}</h6>}

        <label htmlFor="stepsId" style={{paddingTop:"1rem"}}>Step By Step: </label>
        <textarea
          className={Style.placeHolder}
          name="steps"
          id="stepsId"
          type="text"
          value={state.steps}
          onChange={(e) => {
            handleChangeSteps(e);
          }}
        />
      </div>
      {errors.steps && <h6 style={{color:"white"}}>{errors.steps}</h6>}
      <div>
        <button className={Style.button} type="submit">
          Create Recipe
        </button>
      </div>
    </form>
  );
}
