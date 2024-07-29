const prismaClient = require("../application/database");
const getLevelService = async () => {
	return await prismaClient.level.findMany();
};

module.exports = { getLevelService };
