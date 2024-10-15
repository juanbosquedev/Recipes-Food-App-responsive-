const { Recipe, DietsTypes, CookingStep } = require("../database/connection");

module.exports = async (req, res) => {
  try {
    
    if (!Recipe || !DietsTypes || !CookingStep) {
      throw new Error('Database connection error');
    }

    const recipes = await Recipe.findAll({
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

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    return res.status(200).json(recipes);

  } catch (error) {

    console.error('Error fetching recipes:', error.stack);

    if (error.message.includes('Database connection error')) {
      return res.status(500).json({ message: 'Internal server error: Could not connect to database', error: error.message });
    }

    return res.status(500).json({
      message: 'An error occurred while fetching recipes',
      error: error.message,
    });
  }
};
