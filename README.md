# Demo Admin

[https://adminshacdn.netlify.app](https://adminshacdn.netlify.app)

# Instalasi

1. Jalankan perintah berikut untuk menginstal dependensi:
   ```bash
   npm i
   ```
2. Buat file JSON di dalam folder `script`. Contoh: `masterBank.json`. Silakan edit dan sesuaikan konfigurasi di dalamnya.
3. Jalankan perintah berikut untuk menghasilkan konfigurasi:
   ```bash
   npm run generate
   ```
4. Masukkan nama file yang telah dibuat (contoh: `masterBank.json`) saat menjalankan perintah di atas.

# Dokumentasi Konfigurasi Halaman Master Bank

File ini berisi konfigurasi untuk halaman "Master Bank" dalam sebuah sistem berbasis web. Konfigurasi ini mencakup pengaturan halaman, form, tabel, dan endpoint terkait.

## Struktur Konfigurasi

### 1. **Konfigurasi Utama**

- **`type`**: Jenis pengguna, diatur sebagai "admin".
- **`page`**: Halaman utama, diatur sebagai "masterData".
- **`subFolder`**: Sub-folder tempat file ini berada, yaitu "masterBank".
- **`namaFile`**: Nama file konfigurasi, yaitu "masterBank".
- **`route`**: Route URL untuk halaman, yaitu "master-bank".
- **`title`**: Judul halaman, yaitu "Master Bank".
- **`endpoin`**: Endpoint API terkait, yaitu "banks".

### 2. **Data Transfer Object (DTO)**

Berisi struktur data untuk request dan response pada API:

#### Request DTO

Request DTO adalah struktur data yang akan dikirimkan ke backend.

- **`_id`**: String, primary key untuk data bank.
- **`nomor_akun`**: String, nomor akun bank.
- **`kode_bank`**: String, kode unik bank.
- **`nama_bank`**: String, nama lengkap bank.

#### Response DTO

Response DTO adalah struktur data yang diterima dari backend.

- **`_id`**: String, primary key untuk data bank.
- **`nomor_akun`**: String, nomor akun bank.
- **`kode_bank`**: String, kode unik bank.
- **`nama_bank`**: String, nama lengkap bank.

### 3. **Konfigurasi Form**

Mengatur tampilan dan validasi form input:

- **`_id`**:

  - Tipe: `hidden`
  - Validasi: Opsional
  - Primary Key: `true`

- **`nomor_akun`**:

  - Tipe: `text`
  - Validasi: Wajib diisi (`required`)
  - Hanya baca saat edit (`readOnly.edit = true`)

- **`kode_bank`**:

  - Tipe: `text`
  - Validasi: Wajib diisi (`required`)
  - Hanya baca saat edit (`readOnly.edit = true`)

- **`nama_bank`**:
  - Tipe: `text`
  - Validasi: Wajib diisi (`required`)

**Penjelasan Properti:**

- **Tipe**: Menentukan tipe input, seperti `hidden`, `text`, atau `select`.
- **Validasi**: Bisa berupa `optional` (tidak wajib diisi) atau `required` (wajib diisi).
- **PrimaryKey**: Digunakan untuk menentukan field utama yang menjadi acuan dalam operasi edit atau delete.
- **ReadOnly**:
  - `readOnly.edit`: Field hanya dapat dibaca saat form dalam mode edit.
  - `readOnly.create`: Field hanya dapat dibaca saat form dalam mode create.

### 4. **Konfigurasi Tabel**

Mengatur tabel untuk menampilkan data bank:

#### Kolom

- **`nomor_akun`**: Ditampilkan sebagai teks.
- **`kode_bank`**: Ditampilkan sebagai teks.
- **`nama_bank`**: Ditampilkan sebagai teks.

#### Opsi

- **`create`**: Data dapat dibuat (`true`).
- **`delete`**: Data dapat dihapus (`true`).
- **`update`**: Data dapat diperbarui (`true`).

#### Ekspor

- **`pdf`**: Data dapat diekspor ke PDF (`true`).
- **`excel`**: Data dapat diekspor ke Excel (`true`).

## Cara Menggunakan

1. **Konfigurasi Endpoint API**
   Pastikan endpoint "banks" telah tersedia di backend dan mendukung request serta response sesuai DTO yang didefinisikan.

2. **Integrasi Form**
   Implementasikan form input sesuai dengan pengaturan dalam bagian "Konfigurasi Form".

3. **Tabel Data**
   Tampilkan data di tabel menggunakan kolom yang didefinisikan, dengan opsi CRUD (Create, Read, Update, Delete) dan ekspor data jika diperlukan.

## Catatan Tambahan

- Properti `readOnly` memastikan beberapa field hanya dapat diisi saat data dibuat, dan tidak dapat diubah saat di-edit.
- Ekspor data ke format PDF dan Excel membantu mempermudah pengelolaan data dalam sistem.
