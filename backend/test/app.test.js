const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/index");
const prismaClient = require("../src/application/database");
const { logger } = require("../src/application/logging");

let server;
let token;

beforeAll(async () => {
	const user = await prismaClient.user.create({
		data: {
			username: "jahid",
			password: "password",
			nama_admin: "Admin",
			id_level: 2,
		},
	});

	token = jwt.sign(
		{ id_user: user.id_user, level: "Operator" },
		process.env.SECRET_KEY,
		{
			expiresIn: "1h",
		}
	);

	const PORT = process.env.PORT || 3001;
	server = app.listen(PORT, () => {
		console.log(`Test server running on port ${PORT}`);
	});
}, 10000);

afterAll(async () => {
	// Hapus pengguna dari database setelah tes selesai
	await prismaClient.user.deleteMany({
		where: { username: "jahid" },
	});

	// Tutup server
	if (server) {
		await new Promise((resolve) => server.close(resolve));
		console.log("Test server closed");
	}
}, 10000);
describe("GET /api/penggunaan", () => {
	it("should get all data penggunaan and return 200", async () => {
		const response = await request(app)
			.get("/api/penggunaan")
			.set("Authorization", "Bearer " + token)
			.expect(200);

		logger.info(response.body.data);
		expect(response.body).toHaveProperty("data");
		expect(response.body.data).toBeInstanceOf(Array);
	});
});

describe("POST /api/auth/login-user", () => {
	it("should login user and return 200", async () => {
		const response = await request(app)
			.post("/api/auth/login-user")
			.send({ username: "radit", password: "asddsa" })
			.expect(200);

		logger.info(response.body);
		expect(response.body).toHaveProperty("token");
		expect(response.body).toHaveProperty("user");
		expect(response.body.user).toHaveProperty("username");
		expect(response.body.user).toHaveProperty("id_user");
		expect(response.body.user).toHaveProperty("id_level");
		expect(response.body.user).toHaveProperty("nama_admin");
	});
});
