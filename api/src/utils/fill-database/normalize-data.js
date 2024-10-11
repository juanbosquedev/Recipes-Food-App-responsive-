const { sequelize } = require("../../database/connection.js");
const { Recipe, DietsTypes, CookingStep } = sequelize.models;

const storeRecipes = async (recipesFromApi) => {
  try {
    for (const recipeData of recipesFromApi) {
      const [recipe, created] = await Recipe.findOrCreate({
        where: { idOriginal: recipeData.id },
        defaults: {
          idOriginal: recipeData.id,
          name: recipeData.title,
          summary: recipeData.summary,
          healthScore: recipeData.healthScore,
          image: recipeData.image,
          servings: recipeData.servings,
          cookingTime: recipeData.readyInMinutes,
        },
      });
      if (created) {
        for (const instruction of recipeData.analyzedInstructions) {
          for (const stepData of instruction.steps) {
            await CookingStep.create({
              stepNumber: stepData.number,
              stepDescription: stepData.step,
              RecipeId: recipe.id,
            });
          }
        }
      }

      if (recipeData.diets && recipeData.diets.length > 0) {
        const dietPromises = recipeData.diets.map(async (dietName) => {
          const [diet] = await DietsTypes.findOrCreate({
            where: { name: dietName },
          });

          await recipe.addDietsTypes(diet);
        });

        await Promise.all(dietPromises);
      }
    }
  } catch (error) {
    console.error(`Error processing recipe:`, error);
  }
};

module.exports = { storeRecipes };
