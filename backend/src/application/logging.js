const winston = require("winston");
const { performance } = require("perf_hooks");

const logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "combined.log" }),
	],
});

const calculateBill = (usage) => {
	const startTime = performance.now();
	// ... logika perhitungan tagihan ...
	const endTime = performance.now();
	const executionTime = endTime - startTime;
	logger.info("calculateBill executed in %dms", executionTime);
	return bill;
};

module.exports = { logger, calculateBill };
