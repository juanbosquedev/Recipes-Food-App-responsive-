const {
  Recipe,
  DietsTypes,
  CookingStep,
  sequelize,
} = require("../database/connection");

module.exports = async (req, res) => {
  const {
    name,
    summary,
    healthScore,
    image,
    servings,
    cookingTime,
    diets,
    steps,
  } = req.body;

  if (
    !name ||
    !summary ||
    !healthScore ||
    !servings ||
    !cookingTime ||
    !diets ||
    !steps
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const t = await sequelize.transaction();

  try {
    const newRecipe = await Recipe.create(
      { name, summary, healthScore, image, servings, cookingTime },
      { transaction: t }
    );

    if (diets && diets.length > 0) {
      const dietTypes = await DietsTypes.findAll({
        where: { id: diets },
        transaction: t,
      });
      await newRecipe.addDietsTypes(dietTypes, { transaction: t });
    }

    if (steps && steps.length > 0) {
      const stepsToCreate = steps.map((step, index) => ({
        stepNumber: index + 1,
        stepDescription: step,
        RecipeId: newRecipe.id,
      }));

      await CookingStep.bulkCreate(stepsToCreate, { transaction: t });
    }

    await t.commit();
    return res.status(201).json({ message: "Recipe created successfully" });
  } catch (error) {
    await t.rollback();
    console.error("Error creating recipe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
