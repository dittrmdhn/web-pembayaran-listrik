-- CreateTable
CREATE TABLE `level` (
    `id_level` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_level` VARCHAR(28) NOT NULL,

    PRIMARY KEY (`id_level`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelanggan` (
    `id_pelanggan` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(128) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `nomor_kwh` VARCHAR(24) NOT NULL,
    `nama_pelanggan` VARCHAR(124) NOT NULL,
    `alamat` VARCHAR(256) NOT NULL,
    `id_tarif` INTEGER NOT NULL,

    INDEX `id_tarif`(`id_tarif`),
    PRIMARY KEY (`id_pelanggan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembayaran` (
    `id_pembayaran` INTEGER NOT NULL AUTO_INCREMENT,
    `id_tagihan` INTEGER NOT NULL,
    `id_pelanggan` INTEGER NOT NULL,
    `tanggal_pembayaran` VARCHAR(24) NOT NULL,
    `bulan_bayar` VARCHAR(12) NOT NULL,
    `biaya_admin` INTEGER NOT NULL,
    `total_bayar` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    INDEX `id_tagihan`(`id_tagihan`),
    INDEX `id_pelanggan`(`id_pelanggan`),
    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_pembayaran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `penggunaan` (
    `id_penggunaan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pelanggan` INTEGER NOT NULL,
    `bulan` VARCHAR(64) NOT NULL,
    `tahun` VARCHAR(8) NOT NULL,
    `meter_awal` INTEGER NOT NULL,
    `meter_akhir` INTEGER NOT NULL,

    INDEX `id_pelanggan`(`id_pelanggan`),
    PRIMARY KEY (`id_penggunaan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tagihan` (
    `id_tagihan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_penggunaan` INTEGER NOT NULL,
    `id_pelanggan` INTEGER NOT NULL,
    `bulan` VARCHAR(64) NOT NULL,
    `tahun` VARCHAR(8) NOT NULL,
    `jumlah_meter` INTEGER NOT NULL,
    `status` VARCHAR(64) NOT NULL,

    INDEX `id_penggunaan`(`id_penggunaan`),
    INDEX `id_pelanggan`(`id_pelanggan`),
    PRIMARY KEY (`id_tagihan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tarif` (
    `id_tarif` INTEGER NOT NULL AUTO_INCREMENT,
    `daya` INTEGER NOT NULL,
    `tarifperkwh` INTEGER NOT NULL,

    PRIMARY KEY (`id_tarif`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(128) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `nama_admin` VARCHAR(128) NOT NULL,
    `id_level` INTEGER NOT NULL,

    INDEX `id_level`(`id_level`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pelanggan` ADD CONSTRAINT `pelanggan_ibfk_1` FOREIGN KEY (`id_tarif`) REFERENCES `tarif`(`id_tarif`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`id_tagihan`) REFERENCES `tagihan`(`id_tagihan`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_ibfk_2` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan`(`id_pelanggan`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `penggunaan` ADD CONSTRAINT `penggunaan_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan`(`id_pelanggan`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tagihan` ADD CONSTRAINT `tagihan_ibfk_1` FOREIGN KEY (`id_penggunaan`) REFERENCES `penggunaan`(`id_penggunaan`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tagihan` ADD CONSTRAINT `tagihan_ibfk_2` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan`(`id_pelanggan`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_level`) REFERENCES `level`(`id_level`) ON DELETE RESTRICT ON UPDATE RESTRICT;
