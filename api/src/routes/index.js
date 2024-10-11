const { Router } = require("express");

const router = Router();
const {
  recipesAll,
  getById,
  getByName,
  createRecipe,
  getAllDiets,
} = require("../controllers");

router.get("/", recipesAll);

router.get("/:id", getById);

router.get("/:name", getByName);

router.post("/", createRecipe);

router.get("/diets", getAllDiets);

module.exports = router;
