const prismaClient = require("../application/database");

const getTarifService = async () => {
	return await prismaClient.tarif.findMany();
};

const checkTarifExist = async (daya, id_tarif) => {
	const existingTarif = await prismaClient.tarif.findFirst({
		where: {
			daya,
		},
	});

	if (existingTarif && existingTarif.id_tarif !== id_tarif) {
		throw new Error("Tarif sudah ada");
	}
};

const createTarifService = async (payload) => {
	const { daya, tarifperkwh } = payload;

	const mustTarifExist = await checkTarifExist(daya);

	if (mustTarifExist) {
		throw new Error("Tarif sudah ada");
	}
	const tarif = await prismaClient.tarif.create({
		data: {
			daya,
			tarifperkwh,
		},
	});
	return tarif;
};

const updateTarifService = async (id_tarif, payload) => {
	await checkTarifExist(payload.daya, id_tarif);

	const tarif = await prismaClient.tarif.update({
		where: {
			id_tarif,
		},
		data: {
			...payload,
		},
	});
	return tarif;
};

const deleteTarifService = async (id_tarif) => {
	const mustTarifExist = await prismaClient.tarif.findUnique({
		where: {
			id_tarif,
		},
	});

	if (!mustTarifExist) {
		throw new Error("Tarif tidak ada");
	}
	const tarif = await prismaClient.tarif.delete({
		where: {
			id_tarif,
		},
	});
	return tarif;
};

module.exports = {
	getTarifService,
	createTarifService,
	updateTarifService,
	deleteTarifService,
};
