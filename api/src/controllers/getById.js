const { Recipe, DietsTypes, CookingStep } = require("../database/connection");

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
    const recipe = await Recipe.findByPk(id, {
      include: [
        {
          model: DietsTypes, 
          through: { attributes: [] }, 
        },
        {
          model: CookingStep, 
        },
      ],
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error.message || error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
