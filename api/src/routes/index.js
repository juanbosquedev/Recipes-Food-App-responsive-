const { Router } = require("express");

const {
  recipesAll,
  getById,
  getByName,
  createRecipe,
  getAllDiets,
} = require("../controllers");

const router = Router();

router.get("/", recipesAll);
router.get("/diets", getAllDiets);
router.get("/:id", getById);
router.get("/:name", getByName);
router.post("/", createRecipe);

module.exports = router;
