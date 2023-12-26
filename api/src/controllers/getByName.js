const { Recipe, DietsTypes } = require("../db");
const Sequelize = require("sequelize");
const { Op, Association } = require("sequelize");

module.exports = async (req, res) => {
  const name = req.params.name;
  try {
    if (!name) return res.status(401).send("Not a valid name");
    if (name) {
      const dieta = await DietsTypes.findOne({
        where: {
          name: name,
        },
      });
      if (dieta) {
        let recipes = await Recipe.findAll();
        let byDiets = recipes.filter((el) => el.diets.includes(dieta.name));
        recipes.map(async (el) => {
          await el.addDietsTypes(dieta.id);
        });
        if (byDiets) {
          return res.status(200).json(byDiets);
        }
      } else if (name) {
        const recipe = await Recipe.findAll({
          where: {
            name: { [Op.iLike]: `%${name}%` },
          },
        });
        if (recipe.length > 0) {
          return res.status(200).json(recipe);
        } else {
          return res.status(300).send("Try with another product!");
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(405).json(error);
  }
};
