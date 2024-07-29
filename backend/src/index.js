const { configDotenv } = require("dotenv");
const express = require("express");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.route");
const app = express();
configDotenv();
const PORT = process.env.PORT;
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use("/api/auth", authRoutes);
app.use("/api", router);

if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

module.exports = app;
