const { Recipe, DietsTypes } = require("../db");
const Sequelize = require("sequelize");
const { Op, Association } = require("sequelize");



module.exports = async (req, res) => {
    let DietsTypesLoad = 0;
  
    DietsTypesLoad === 0 && allDiets();
  
    const diets = await DietsTypes.findAll({
      include: Recipe,
    });
    try {
      return res.status(200).json(diets);
    } catch (error) {
      return res.status(400).json(error);
    }
  };