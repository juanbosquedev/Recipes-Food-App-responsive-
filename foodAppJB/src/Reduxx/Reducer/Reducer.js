import {
  GET_ALL,
  GET_DETAILS,
  DELETE_RECIPE,
  GET_RECIPE,
  GET_RECIPES,

  CREATE_RECIPE,
  CLEAN_UP_DETAILS,
  GET_DIETS,
  SHOW_RECIPES_CREATED,
  DIETS_FILTER,
  SCORE_ORDER_A,
  SCORE_ORDER_D,
  NAME_ORDER_A,
  NAME_ORDER_D,
  DELETE_RECIPE_CREATED,
} from "../Actions/actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  details: [],
  diets: [],
  created: [],
  msg: {},
};
function order(arr, prop) {
  let result = arr.sort(function (a, b) {
    if (a[prop] < b[prop]) {
      return -1;
    }
    if (a[prop] > b[prop]) {
      return 1;
    }
    return 0;
  });
  return result;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPE: {
      return {
        ...state,
        recipes: action.payload,
        allRecipes:action.payload,
      };
    }
    case GET_RECIPES: {
      console.log(action.payload, " action payload")
      return {
        ...state,
        recipes: action.payload,
        allRecipes:action.payload,
      };
    }
     
  
      case GET_ALL: {
        return {
          ...state,
          recipes: action.payload,
          allRecipes:action.payload,
        };
      }

    case GET_DETAILS: {
      return {
        ...state,
        details: action.payload,
      };
    }

    case CLEAN_UP_DETAILS: {
      return {
        ...state,
        details: [],
      };
    }
    case CREATE_RECIPE: {
      return {
        ...state,
        msg: "successfully created!",
      };
    }
    case GET_DIETS: {
      return {
        ...state,
        diets: action.payload,
      };
    }

    case SHOW_RECIPES_CREATED: {
      return {
        ...state,
        created: action.payload,
      };
    }

      
    case DELETE_RECIPE_CREATED: {
      return {
        ...state,
        created: state.created.filter((receta) => receta.id !== action.payload),
      };
    }

    case DELETE_RECIPE: {
      return {
        ...state,
        recipes: state.recipes.filter((receta) => receta.id !== action.payload),
      };
    }

    case NAME_ORDER_A: {
      let orders;
      orders = order([...state.recipes], "name");
      return {
        ...state,
        recipes: orders,
      };
    }

    case NAME_ORDER_D: {
      let orders;
      orders = order([...state.recipes], "name").reverse();
      return {
        ...state,
        recipes: orders,
      };
    }

    case SCORE_ORDER_A: {
      let orders;
      orders = order([...state.recipes], "healthScore");
      return {
        ...state,
        recipes: orders,
      };
    }

    case SCORE_ORDER_D: {
      let orders;
      orders = order([...state.recipes], "healthScore").reverse();
      return {
        ...state,
        recipes: orders,
      };
    }

    case DIETS_FILTER: {
      let filter = state.allRecipes.filter((el) =>
        el.diets.includes(action.payload)
      );

      return {
        ...state,
        recipes: filter,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;
