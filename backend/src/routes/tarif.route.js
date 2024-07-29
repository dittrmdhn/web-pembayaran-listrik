const express = require("express");
const {
	getTarifController,
	createTarifController,
	updateTarifController,
	deleteTarifController,
} = require("../controllers/tarif.controller");

const tarifRouter = express.Router();

tarifRouter.get("/", getTarifController);
tarifRouter.post("/", createTarifController);
tarifRouter.patch("/:id", updateTarifController);
tarifRouter.delete("/:id", deleteTarifController);

module.exports = tarifRouter;
