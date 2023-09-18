export default function validate(state) {
    let errors = {};
    if (!state.name) {
      errors.name = "Name required";
    } 
    if (!state.diets) {
      errors.name = "diets required";
    }
  
    if (!state.dishType) {
      errors.dishType = "dishType required";
    } 
  
    if (!state.summary) {
      errors.summary = "summury is required";
    }
  
    if (!state.steps) {
      errors.steps = "steps is required";
    } 
  
    if (state.healthScore === 0) {
      errors.healthScore = "health Score required";
    } else if (state.healthScore > 100 || state.healthScore < 0) {
      errors.healthScore = "health Score required";
    }
  
    if (!state.servings) {
      errors.servings = "Servings required";
    }
  
    if (!state.cookingTime) {
      errors.cookingTime = "Cooking Time required";
    }
    if (!state.diets.length === 0) {
      errors.diets = "Diets required";
    }
  
    return errors;
  }