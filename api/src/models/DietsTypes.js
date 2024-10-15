const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const DietsTypes = sequelize.define(
    "DietsTypes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return DietsTypes;
};
