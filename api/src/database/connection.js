const { Sequelize } = require("sequelize");
const pg = require("pg");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const { POSTGRESQL_URL, DB_HOST } = process.env;

const sequelize = new Sequelize(`${POSTGRESQL_URL}`, {
  dialectModule: pg,
  host: `${DB_HOST}`,
  dialectOptions: {
    ssl: true,
  },
  logging: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);
const { Recipe, DietsTypes, CookingStep } = sequelize.models;

module.exports = {
  sequelize,
  Recipe,
  DietsTypes,
  CookingStep,
};
