
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const RecipeDiet =sequelize.define('RecipeDiet', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      // type: DataTypes.UUID, 
      // allowNull: false,
      // primaryKey: true,
    },
  }, {

    timestamps: false, 
  });
  return RecipeDiet;
};