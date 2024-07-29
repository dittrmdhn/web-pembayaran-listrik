# Penggunaan API Spec

## Create Penggunaan API

Endpoint : POST /api/penggunaan

Headers :

- Authorization : token

Request Body :

```json
{
	"id_pelanggan": 1,
	"bulan": "Maret",
	"tahun": "2023",
	"meter_awal": 1200,
	"meter_akhir": 1300
}
```

Response Body Success :

```json
{
	"data": {
		"id_pelanggan": 1,
		"bulan": "Maret",
		"tahun": "2023",
		"meter_awal": 1200,
		"meter_akhir": 1300
	}
}
```

Response Body Error :

```json
{
	"errors": "id pelanggan tidak ada"
}
```

## Update Penggunaan API

Endpoint : PATCH /api/penggunaan/:id

Headers :

- Authorization : token

Request Body :

```json
{
	"id_pelanggan": 1,
	"bulan": "Mei",
	"tahun": "2023",
	"meter_awal": 1200,
	"meter_akhir": 1300
}
```

Response Body Success :

```json
{
	"data": {
		"id_pelanggan": 1,
		"bulan": "Mei",
		"tahun": "2023",
		"meter_awal": 1200,
		"meter_akhir": 1300
	}
}
```

Response Body Error :

```json
{
	"errors": "id pelanggan tidak ada"
}
```

## Get Penggunaan API

Endpoint : GET /api/penggunaan

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": {
		"id_pelanggan": 1,
		"bulan": "Mei",
		"tahun": "2023",
		"meter_awal": 1200,
		"meter_akhir": 1300
	}
}
```

## Remove Penggunaan API

Endpoint : DELETE /api/penggunaan/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
	"data": "Data berhasil dihapus"
}
```

Response Body Error :

```json
{
	"errors": "Data terkait di tagihan. Tidak bisa menghapus data penggunaan ini (hapus tagihan terlebih dahulu)."
}
```
