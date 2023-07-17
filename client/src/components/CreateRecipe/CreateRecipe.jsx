import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { create_Recipe } from "../../Reduxx/Actions/actions";
import { useSelector } from "react-redux";
import { get_Diets } from "../../Reduxx/Actions/actions";
import Style from "./CreateRecipe.module.css";
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
        <label for="name">Name: </label>
        <input
          id="nameId"
          name="name"
          className={Style.placeHolder}
          type="text"
          value={state.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        {errors.name && <h6 Style="color:white">{errors.name}</h6>}

        <label for="healthScore">Health Score: </label>
        <input
          id="hScoreId"
          className={Style.placeHolder}
          name="healthScore"
          type="number"
          value={state.healthScore}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label for="image">Imagen: </label>
        <input
          className={Style.placeHolder}
          id="imageId"
          name="image"
          type="text"
          value={state.image}
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <label for="firstSelect">Diet Type: </label>
      
        <select
          id="firstSelect"
          name="firstSelect"
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
        {errors.diets && <h6 Style="color:white">{errors.diets}</h6>}

        <label For="servings">Servings: </label>
        <input
          className={Style.placeHolder}
          name="servings"
          id="servingsId"
          type="number"
          value={state.servings}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {errors.servings && <h6 Style="color:white">{errors.servings}</h6>}

        <label for="cookingTime">Cooking Time: </label>
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
          <h6 Style="color:white">{errors.cookingTime}</h6>
        )}
      </div>
   
      <div className={Style.long}>
        <label for="summary">Summary: </label>
        <textarea
          className={Style.placeHolder}
          name="summary"
          id="summuryId"
          type="text"
          value={state.summary}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {errors.summary && <h6 Style="color:white">{errors.summary}</h6>}

        <label for="steps" Style="padding-top:1rem">Step By Step: </label>
        <textarea
          className={Style.placeHolder}
          id="stepsId"
          name="steps"
          type="text"
          value={state.steps}
          onChange={(e) => {
            handleChangeSteps(e);
          }}
        />
      </div>
      {errors.steps && <h6 Style="color:white">{errors.steps}</h6>}
      <div>
        <button className={Style.button} type="submit">
          Create Recipe
        </button>
      </div>
    </form>
  );
}
