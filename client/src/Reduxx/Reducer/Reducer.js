import {
  GET_DETAILS,
  GET_RECIPE,
  CREATE_RECIPE,
  GET_DIETS,
  SHOW_RECIPES_CREATED,
  DIETS_FILTER,
  SCORE_ORDER_A,
  SCORE_ORDER_D,
  NAME_ORDER_A,
  NAME_ORDER_D,
} from "../Actions/actions";

const initialState = {
  recipes: [],
  details: [],
  diets: [],
  created: [],
  msg:{},
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
      };
    }

    case GET_DETAILS: {
    
      return {
        ...state,
        details: action.payload,
      };
    }
    case CREATE_RECIPE: {
     
      return {
        ...state,
        msg: "creada con exito!",
      };
    }
    case GET_DIETS: {
      return {
        ...state,
        diets: action.payload,
      };
    }

    case NAME_ORDER_A: {
      let orders;
         orders = order([...state.recipes], 'name');
      return {
        ...state,
        recipes: orders,
      };
    }

    case NAME_ORDER_D: {
      let orders;
         orders = order([...state.recipes], 'name').reverse();
      return {
        ...state,
        recipes: orders,
      };
    }

    case SCORE_ORDER_A: {
      let orders;
         orders = order([...state.recipes], 'healthScore');
      return {
        ...state,
        recipes: orders,
      };
    }

    case SCORE_ORDER_D: {
      let orders;
         orders = order([...state.recipes], 'healthScore').reverse();
      return {
        ...state,
        recipes: orders,
      };
    }

    case SHOW_RECIPES_CREATED: {
      return {
        ...state,
        created: state.created.concat(action.payload),
      };
    }
    case DIETS_FILTER: {
      let filter = state.recipes.filter((el) => el.diets.includes(action.payload));

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
