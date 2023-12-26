const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    idOriginal:{
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100
      }
    }, 
    dishTypes:{
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image:{
      type: DataTypes.STRING,
    },
    diets:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false,
    },
    servings:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    cookingTime:{
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  },{timestamps: false});
};
