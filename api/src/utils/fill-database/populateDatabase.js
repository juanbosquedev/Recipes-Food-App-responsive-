const axios = require("axios");
require("dotenv").config();

const { storeRecipes } = require("./normalize-data.js");
const localRecipeData = require("../../../../100recipes.json");
const { Recipe } = require("../../database/connection.js");

const fetchAndStoreApiData = async () => {
  try {
    const recipeCount = await Recipe.count();

    if (recipeCount > 0) {
      const storedRecipes = await Recipe.findAll();
      return storedRecipes;
    } else {
      await storeRecipes(localRecipeData.results);
    }
    
  } catch (error) {
    console.error("Error fetching or storing recipes:", error);
    throw error;
  }
};

module.exports = { fetchAndStoreApiData };
