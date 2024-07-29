const express = require("express");
const {
	getUserController,
	createUserController,
	updateUserController,
	deleteUserController,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", getUserController);
userRouter.post("/", createUserController);
userRouter.patch("/:id", updateUserController);
userRouter.delete("/:id", deleteUserController);

module.exports = userRouter;
