const { Recipe } = require("../db");
const Sequelize = require("sequelize");

module.exports = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Recipe not found");
  }

  try {
    const data = await Recipe.findOne({
      where: {
        id: { [Sequelize.Op.eq]: id },
      },
    });

    if (!data) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
