const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("DietsTypes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique:true,
      primaryKey:true,
      allowNull: false,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps: false,
});
};
