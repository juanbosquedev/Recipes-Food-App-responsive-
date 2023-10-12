const { Recipe } = require("../db");
const Sequelize = require("sequelize");
const {getRcipesAPI} = require("../downloadData/downloading")



module.exports = async (req, res) => {

try{
    const recipes = await Recipe.findAll();
    if (recipes.length === 0) {
      // La tabla de recetas está vacía, llama a la función para llenarla
      await getRcipesAPI();
      // Después de llenar la tabla, vuelve a buscar las recetas
      const updatedRecipes = await Recipe.findAll();
      return res.status(200).json(updatedRecipes);
    } else {
      return res.status(200).json(recipes);
    }
    
  }
  catch(error){
    console.log(error, " soy error")
    res.status(400).send(error);
  }
};
