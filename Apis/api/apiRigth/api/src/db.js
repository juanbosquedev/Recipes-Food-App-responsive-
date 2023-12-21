const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  
//   {
//     logging: false,
//     native: false,
//   }
// );
const sequelize = new Sequelize('postgres://zgzngkwa:cqQXmFFZIk6FPx4l5B_mLlIbbHNpZOj9@flora.db.elephantsql.com/zgzngkwa', {
  dialect: 'postgres',
  host: 'flora.db.elephantsql.com',
  dialectOptions: {
    ssl: true,
  },
  logging: true,
});

const getDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log(
      "Connection to the database has been established successfully."
    );
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Recipe, DietsTypes } = sequelize.models;

Recipe.belongsToMany(DietsTypes, { through: "Recipe_DietsTypes" });
DietsTypes.belongsToMany(Recipe, { through: "Recipe_DietsTypes" });

module.exports = {
  ...sequelize.models,
  conn: getDatabaseConnection,
};
