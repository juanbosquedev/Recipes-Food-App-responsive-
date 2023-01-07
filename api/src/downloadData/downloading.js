const axios = require("axios");
// const {
//   isElement,
//   findRenderedDOMComponentWithTag,
// } = require("react-dom/test-utils");
const { DataTypes } = require("sequelize");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, DietsTypes } = require("../db");
const { getInfo } = require("../downloadData/reutilizable");

const getAllApiInformation = async () => {
  const verDb = await Recipe.findAll();
  
  if (verDb.length > 0) {
    console.log("base precargada  ", verDb.length);
    return verDb;
  }

  const { data } = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  
  const dataPretended = await data.results.map((el) => {
    return getInfo(el);
  });
  try {
    const db = await Recipe.bulkCreate(dataPretended);
    console.log("cargando db por 1° ", db.length);
    return db;
  } catch (error) {
    console.log( "error db 1°time", error);
    return error;
  }
};


const allDiets = async () => {
 
  const verDbDiets = await DietsTypes.findAll();
  if (verDbDiets.length > 0) {
    console.log("base precargada diets", verDbDiets.length);
    return verDbDiets;
  }
  try {
    const allrecipes = await Recipe.findAll();

    const allDiets = [];
   allrecipes.length && allrecipes.map((el)=>{
     allDiets.push( el.diets)
    })
  const s = allDiets.flat(2)
  s.map((dieta) => {
      DietsTypes.findOrCreate({
        where: { name: dieta },
      });
    });
   
    
  } catch (error) {
    console.log(error, "error catch");
    return error;
  }
};

module.exports = { getAllApiInformation, allDiets}; 
