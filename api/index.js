const { sequelize } = require("./src/database/connection");
require("dotenv").config();

const server = require("./src/app");
const { PORT } = process.env;

require("./src/models/association/index");


const { fetchAndStoreApiData } = require('./src/utils/fill-database/populateDatabase');

async function initializeServer() {
  try {

    await sequelize.sync({ force: false });
    await fetchAndStoreApiData();

    console.log("Connection to the database established successfully.");


    server.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });

  } catch (error) {
    console.error(`Unable to connect to the database: ${error.message}`);
  }
}

initializeServer();
