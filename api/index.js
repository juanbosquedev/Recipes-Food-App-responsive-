const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./src/routes/index");
const cors = require("cors");

const { conn } = require("./src/db.js");

const server = express();
server.name = "API";

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Añadimos un middleware para manejar la conexión a la base de datos antes de las rutas
server.use(async (req, res, next) => {
  try {
    const dbConnection = await conn();
    req.dbConnection = dbConnection; // Añadimos la conexión a la solicitud para que esté disponible en las rutas
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

server.use("/", routes);

// Resto del código...

const { PORT } = process.env;

conn().then((dbConnection) => {
  server.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});
