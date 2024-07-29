const express = require("express");
const { getLevelController } = require("../controllers/level.controller");

const levelRouter = express.Router();

levelRouter.get("/", getLevelController);

module.exports = levelRouter;
