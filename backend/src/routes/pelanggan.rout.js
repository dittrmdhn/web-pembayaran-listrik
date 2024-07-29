const express = require("express");
const {
	getPelangganController,
	createPelangganController,
	updatePelangganController,
	deletePelangganController,
	getPelangganByIdController,
} = require("../controllers/pelanggan.controller");

const pelangganRouter = express.Router();

pelangganRouter.get("/", getPelangganController);
pelangganRouter.post("/", createPelangganController);
pelangganRouter.patch("/:id", updatePelangganController);
pelangganRouter.delete("/:id", deletePelangganController);

module.exports = pelangganRouter;
