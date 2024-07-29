const express = require("express");
const {
	createPembayaranController,
	getPembayaranController,
	updatePembayaranController,
	deletePembayaranController,
	confirmPembayaranController,
	findPembayaranByIdTagihanController,
	checkPembayaranStatusController,
} = require("../controllers/pembayaran.controller");
const {} = require("../services/pembayaran.service");

const pembayaranRouter = express.Router();
pembayaranRouter.post("/", createPembayaranController);
pembayaranRouter.get("/", getPembayaranController);
pembayaranRouter.patch("/:id", updatePembayaranController);
pembayaranRouter.delete("/:id", deletePembayaranController);
pembayaranRouter.post("/konfirmasi/:id_tagihan", confirmPembayaranController);
pembayaranRouter.get("/status/:id_tagihan", checkPembayaranStatusController);

module.exports = pembayaranRouter;
