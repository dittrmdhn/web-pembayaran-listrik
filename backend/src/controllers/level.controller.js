const { getLevelService } = require("../services/level.service");

const getLevelController = async (req, res) => {
	try {
		const data = await getLevelService();
		res.status(200).json({ data });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { getLevelController };
