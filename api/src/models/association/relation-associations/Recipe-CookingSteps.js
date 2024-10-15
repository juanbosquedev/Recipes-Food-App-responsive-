const { sequelize } = require("../../../database/connection");

const { Recipe, CookingStep } = sequelize.models;

Recipe.hasMany(CookingStep);

CookingStep.belongsTo(Recipe);
