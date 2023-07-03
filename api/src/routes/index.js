require("dotenv").config();
const { Router } = require("express");
const { Op, Association } = require("sequelize");
const { API_KEY } = process.env;
const {
  getAllApiInformation,
  allDiets,
} = require("../downloadData/downloading");
const { Recipe, DietsTypes } = require("../db");

let RecipesLoad = 0;
RecipesLoad === 0 && getAllApiInformation();

const router = Router();

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
<<<<<<< HEAD
  if (!id) return res.status(400).send("recipe not found");
=======
  if (!id) return res.status(400).send("not found");
>>>>>>> 8afe8d3672e6e8ef549a885cb60ac841b2cdfc75
  try {
    const data = await Recipe.findOne({
      where: {
        id: { [Op.eq]: id },
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send("serch details error").json(error);
  }
});

router.get("/recipesCreated", async (req, res) => {
  const created = await Recipe.findAll({
    where: {
      idOriginal: { [Op.eq]: 123 },
    },
  });
  try {
<<<<<<< HEAD
    if (!created) return res.status(400).send("recipe not created");
=======
    if (!created) return res.status(400).send(" recipe not created");
>>>>>>> 8afe8d3672e6e8ef549a885cb60ac841b2cdfc75
    return res.status(200).json(created);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/recipes", async (req, res) => {
  const name = req.query.name;
  try {
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
          return res.status(300).send("try with another product!");
        }
      }
    } else {
      const info = await Recipe.findAll();
      return res.status(200).json(info);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/recipes", async (req, res) => {
  const {
    name,
    summary,
<<<<<<< HEAD
=======
    idOriginal,
    healthScore,
>>>>>>> 8afe8d3672e6e8ef549a885cb60ac841b2cdfc75
    steps,
    image,
    diets,
  } = req.body;

  if (!name || !summary || !steps || !diets)
<<<<<<< HEAD
    return res.status(404).send("Faltan enviar datos obligatorios");
  if (!image)
    req.body.image =
      "https://media.istockphoto.com/id/1388791611/photo/teppanyaki-style.jpg?b=1&s=170667a&w=0&k=20&c=o4FL_2iyEO2XQiliXts-JphIFAhXg5BYlxvjxmBbh7E=";
=======
    return res.status(404).send("some date it is needed to be filled");
   if(!image) req.body.image = "https://media.istockphoto.com/id/1388791611/photo/teppanyaki-style.jpg?b=1&s=170667a&w=0&k=20&c=o4FL_2iyEO2XQiliXts-JphIFAhXg5BYlxvjxmBbh7E="
>>>>>>> 8afe8d3672e6e8ef549a885cb60ac841b2cdfc75
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
