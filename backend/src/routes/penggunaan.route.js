const express = require("express");
const penggunaanRouter = express.Router();
const {
	createPenggunaanController,
	getPenggunaanController,
	updatePenggunaanController,
	deletePenggunaanController,
} = require("../controllers/pengggunaan.controller");

penggunaanRouter.post("/", createPenggunaanController);
penggunaanRouter.get("/", getPenggunaanController);
penggunaanRouter.patch("/:id", updatePenggunaanController);
penggunaanRouter.delete("/:id", deletePenggunaanController);

module.exports = penggunaanRouter;
