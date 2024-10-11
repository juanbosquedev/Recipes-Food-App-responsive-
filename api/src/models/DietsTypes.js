
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const DietsTypes = sequelize.define("DietsTypes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      // type: DataTypes.UUID,
      // defaultValue: DataTypes.UUIDV4,
      // unique: true,
      // primaryKey: true,
      // allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });


  return DietsTypes;
};

