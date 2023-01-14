require("dotenv").config();
const { default: axios } = require("axios");

const { Router } = require("express");
const { Op, Association } = require("sequelize");
const { API_KEY } = process.env;
const {
  getAllApiInformation,
  allDiets,
} = require("../downloadData/downloading");
const { Recipe, DietsTypes } = require("../db");
const { getInfo } = require("../downloadData/reutilizable");

let RecipesLoad = 0;
RecipesLoad === 0 && getAllApiInformation();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  console.log("soy id ", id);
  try {
    // const { data } = await axios.get(
    //   `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    // );//
    const data = await Recipe.findOne({
      where: {
        id: { [Op.eq]: id },
      },
    });
    if (!id) return res.status(400).send("not found");
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).send("error en la busqueda de detalles").json(error);
  }
});

router.get("/recipesCreated", async (req, res) => {
  const created = await Recipe.findAll({
    where: {
      idOriginal: { [Op.eq]: 123 },
    },
  });
  try {
    if (!created) return res.status(400).send(" receta no  creada");
    return res.status(200).json(created);
  } catch (error) {
    console.log(error, " soy error de mostrar recetas creadas");
    return res.status(400).json(error);
  }
});

router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const dieta = await DietsTypes.findOne({
        where: {
          name: name,
        },
      });
      if (dieta) {
        let receta = await Recipe.findAll();
        let junction = receta.filter((el) => el.diets.includes(dieta.name));
        receta.map(async (el) => {
          await el.addDietsTypes(dieta.id);
        });
        if (junction) {
          return res.status(200).json(junction);
        }
      } else if (name) {
        const recetas = await Recipe.findAll({
          where: {
            name: { [Op.iLike]: `%${name}%` },
          },
        });
        if (recetas.length > 0) {
          return res.status(200).json(recetas);
        } else {
          return "try with another product!";
        }
      }
    } else {
      const info = await Recipe.findAll();
      return res.status(200).json(info);
    }
  } catch (error) {
    console.log(error, " soy error de recipes");
    return res.status(400).json(error);
  }
});

router.post("/recipes", async (req, res) => {
  const {
    name,
    summary,
    healthScore,
    steps,
    image,
    diets,
    servings,
    cookingTime,
  } = req.body;

  if (!name || !summary || !steps || !diets)
    return res.status(404).send("Faltan enviar datos obligatorios");
  diets.map(async (el) => {
    const findDiet = await DietsTypes.findOrCreate({
      where: {
        name: el,
      },
    });
  });

  try {
    const receta = await Recipe.create(req.body);
    return res.status(200).json(receta);
  } catch (error) {
    console.log(error, "soy error")
    return res.status(402).json(error);
  }
});

router.get("/diets", async (req, res) => {
  let DietsTypesLoad = 0;
  DietsTypesLoad === 0 && allDiets();

  const diets = await DietsTypes.findAll({
    include: Recipe,
  });
  try {
    return res.status(200).json(diets);
  } catch (error) {
    return res.status(404).json(error);
  }
});

module.exports = router;
