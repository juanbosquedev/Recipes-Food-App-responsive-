const { Recipe } = require("../db");
const { getAllApiInformation } = require("../downloadData/downloading");

module.exports = async (req, res) => {
  try {
    const pruve = await Recipe.findAll();

    if (pruve.length === 0) {
      const recipes = await getAllApiInformation();
      return res.status(200).json(recipes);
    }
    return res.status(200).json(pruve);
  } catch (error) {
    res.status(405).send(error);
  }
};
