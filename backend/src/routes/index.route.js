const express = require("express");
const {
	authenticateToken,
	authorize,
} = require("../middleware/auth.middleware");
const penggunaanRouter = require("./penggunaan.route");
const tagihanRouter = require("./tagihan.route");
const pembayaranRouter = require("./pembayaran.route");
const tarifRouter = require("./tarif.route");
const pelangganRouter = require("./pelanggan.rout");
const userRouter = require("./user.route");
const levelRouter = require("./level.route");
const { getTarifPublicController } = require("../controllers/tarif.controller");
const {
	findTagihanByNomorKwhController,
	bayarTagihanController,
} = require("../controllers/tagihan.controller");
const {
	getPelangganByIdController,
} = require("../controllers/pelanggan.controller");

const router = express.Router();

router.get("/tagihan/nomor_kwh", findTagihanByNomorKwhController);
router.patch("/tagihan/bayar/:id", bayarTagihanController);
router.get("/pelanggan/:id", getPelangganByIdController);

router.get("/tarif/public", getTarifPublicController);
router.use(authenticateToken);
router.use("/penggunaan", authorize(["Admin", "Operator"]), penggunaanRouter);
router.use("/tagihan", authorize(["Admin", "Operator"]), tagihanRouter);
router.use("/pembayaran", authorize(["Admin", "Operator"]), pembayaranRouter);
router.use("/tarif", authorize(["Admin", "Operator"]), tarifRouter);
router.use("/pelanggan", authorize(["Admin", "Operator"]), pelangganRouter);
router.use("/user", authorize(["Admin"]), userRouter);
router.use("/level", authorize(["Admin"]), levelRouter);

module.exports = router;
