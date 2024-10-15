const { Recipe, DietsTypes } = require("../database/connection");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { name } = req.params;

  try {
    if (!name) {
      return res.status(400).json({ error: "Invalid request: name is required" });
    }

    // Try to find a diet by the given name
    const diet = await DietsTypes.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    // If the diet is found, fetch all recipes associated with this diet
    if (diet) {
      const recipesByDiet = await Recipe.findAll({
        include: {
          model: DietsTypes,
          where: { id: diet.id }, // Filter recipes that are associated with this diet
        },
      });

      if (recipesByDiet.length > 0) {
        return res.status(200).json(recipesByDiet);
      } else {
        return res.status(404).json({ message: "No recipes found for this diet" });
      }
    }

    // If no diet is found, search for recipes by the given name
    const recipesByName = await Recipe.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }, // Search recipes with partial matching
      },
      include: DietsTypes, // Optionally include diet information for these recipes
    });

    if (recipesByName.length > 0) {
      return res.status(200).json(recipesByName);
    } else {
      return res.status(404).json({ message: "No recipes found with that name" });
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
