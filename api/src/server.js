const express = require("express");
const router = express.Router();
const app = express();

app.use(express.json());

app.use(router);
require("../routes")(router);

module.exports = app; // exported the server app to be used in the db file
