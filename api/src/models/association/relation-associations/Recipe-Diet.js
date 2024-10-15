const { sequelize } = require("../../../database/connection");

const { Recipe, DietsTypes, RecipeDiet } = sequelize.models;

Recipe.belongsToMany(DietsTypes, { through: RecipeDiet  });

DietsTypes.belongsToMany(Recipe, { through: RecipeDiet  });