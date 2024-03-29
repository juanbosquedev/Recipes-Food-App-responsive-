require("dotenv").config();
const { Router } = require("express");
const { Op, Association } = require("sequelize");
const { Sequelize } = require("sequelize");
const { API_KEY } = process.env;
const { allDiets } = require("../downloadData/downloading");
const { Recipe, DietsTypes } = require("../db");

const controllers = require("../controllers");

const router = Router();
router.get("/recipes/:id", controllers.getById);

router.get("/recipesAll", controllers.firstCall);

router.get("/recipesCreated", async (req, res) => {
  const created = await Recipe.findAll({
    where: {
      idOriginal: { [Op.eq]: 123 },
    },
  });
  try {
    if (!created) return res.status(400).send("there is not recipe created");
    return res.status(200).json(created);
  } catch (error) {
    return res.status(405).json(error);
  }
});

router.get("/recips/:name", controllers.getByName);

router.post("/recipes", async (req, res) => {
  const { name, summary, steps, image, diets } = req.body;

  if (!name || !summary || !steps || !diets) {
    return res.status(404).send("Required field uncompleted");
  }
  if (!image) {
    req.body.image =
      "https://media.istockphoto.com/id/1388791611/photo/teppanyaki-style.jpg?b=1&s=170667a&w=0&k=20&c=o4FL_2iyEO2XQiliXts-JphIFAhXg5BYlxvjxmBbh7E=";
  }
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
    return res.status(400).json(error);
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
    return res.status(400).json(error);
  }
});

module.exports = router;
