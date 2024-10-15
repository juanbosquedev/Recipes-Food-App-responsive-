const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CookingStep = sequelize.define(
    "CookingStep",
    {
      stepNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stepDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return CookingStep;
};
