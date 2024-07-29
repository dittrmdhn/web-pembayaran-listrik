const express = require("express");
const {
	createTagihanController,
	getTagihanByIdController,
	getTagihanController,
	deleteTagihanController,
} = require("../controllers/tagihan.controller");
const { updateTagihanService } = require("../services/tagihan.service");
const tagihanRouter = express.Router();

tagihanRouter.post("/", createTagihanController);
tagihanRouter.get("/:id_pelanggan", getTagihanByIdController);
tagihanRouter.get("/", getTagihanController);
tagihanRouter.patch("/:id", updateTagihanService);
tagihanRouter.delete("/:id", deleteTagihanController);

module.exports = tagihanRouter;
