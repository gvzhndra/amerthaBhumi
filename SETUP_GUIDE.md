# Panduan Penyiapan Google Sheets & Google Drive Backend
## Website Pura Amertha Bhumi GKN I Denpasar

Dokumen ini menjelaskan langkah-langkah untuk menghubungkan website di GitHub Pages dengan Google Spreadsheet dan Google Drive sebagai backend database dan penyimpanan foto otomatis secara gratis.

---

### 🌐 Status Web App API Aktif:
URL Endpoint Web App pengurus saat ini:
```
https://script.google.com/macros/s/AKfycbxvqiwnvJthhvcbRV9ozBU2-QRMVPyQInuK0sr9dVWNVQXJ-TH-cZMUg6KtSyLK5MFx/exec
```
*Sudah dikonfigurasikan otomatis ke dalam [`js/app.js`](file:///Users/putuharjaya/Desktop/repo/amerthaBhumi/js/app.js) dan [`js/admin.js`](file:///Users/putuharjaya/Desktop/repo/amerthaBhumi/js/admin.js).*

---

### ✨ Fitur Baru: Auto-Generate Seluruh Tabel Spreadsheet Otomatis!
Pengurus **TIDAK PERLU** membuat dan mengetik kolom sheet satu per satu secara manual. File [`Code.gs`](file:///Users/putuharjaya/Desktop/repo/amerthaBhumi/Code.gs) telah dilengkapi fungsi pembuat tabel otomatis (`initialSetup`) yang akan membuat dan menata 7 sheet sekaligus:
1. `Data_Umat` (ID, Timestamp, Nama, NIP, Satker, Jabatan, WhatsApp, Alamat, Status)
2. `Users` (Akun Super Admin, Sekretaris, Bendahara, Humas, Member)
3. `Artikel` (ID, Timestamp, Judul, Kategori, Thumbnail, Konten, Status, IsHero)
4. `Galeri` (ID, Timestamp, Judul, FileID, ImageUrl, Ukuran)
5. `Kas_Punia` (ID, Tanggal, Jenis, Kategori, Nominal, Keterangan)
6. `Agenda` (ID, Nama, Tanggal, Waktu, Lokasi, Keterangan)
7. `Audit_Log` (ID, Waktu, Aktor, NIP, Aksi, Detail, Alasan)

Semua header tabel otomatis diberi warna **Dark Slate (`#1E293B`)**, teks putih tebal, baris pertama dibekukan (*frozen header*), dan lebar kolom disesuaikan otomatis!

---

### 🚀 Cara Menjalankan Auto-Generate Tabel:

#### Cara 1: Buka Lewat Link Browser (Paling Mudah & Instan)
Pastikan `Code.gs` terbaru sudah disalin ke Apps Script Anda, lalu buka tautan berikut di tab browser baru:
```
https://script.google.com/macros/s/AKfycbxvqiwnvJthhvcbRV9ozBU2-QRMVPyQInuK0sr9dVWNVQXJ-TH-cZMUg6KtSyLK5MFx/exec?action=initSetup
```
Google Apps Script akan langsung membuat ke-7 tabel tersebut secara otomatis dan menampilkan respon sukses dalam hitungan detik.

#### Cara 2: Dari Editor Google Apps Script
1. Buka editor Apps Script.
2. Pada dropdown pilihan fungsi di bilah atas, pilih **`initialSetup`**.
3. Klik tombol **Jalankan (Run)**.
4. Periksa Google Spreadsheet Anda, seluruh tabel langsung terisi dan tertata rapi.

---

### ⚠️ Catatan Penting Mengenai ID Spreadsheet di `Code.gs`:
Bila Apps Script dibuat terpisah (bukan via menu *Ekstensi > Apps Script* di Google Sheets), pastikan variabel `SPREADSHEET_ID` di baris 21 [`Code.gs`](file:///Users/putuharjaya/Desktop/repo/amerthaBhumi/Code.gs) diisi dengan ID Spreadsheet Anda:
* Buka Google Sheets Anda.
* Salin ID dari URL di browser: `https://docs.google.com/spreadsheets/d/`**`[ID_SPREADSHEET_ANDA]`**`/edit`.
* Masukkan ke:
  ```javascript
  const CONFIG = {
    SPREADSHEET_ID: "TEMPELKAN_ID_DI_SINI",
    DRIVE_FOLDER_ID: "TEMPELKAN_ID_FOLDER_GOOGLE_DRIVE_DI_SINI",
    SECRET_SALT: "AMERTHA_BHUMI_GKN1_BALI_2026"
  };
  ```
* Klik **Simpan** 💾 lalu deploy versi baru (**Terapkan > Kelola Penerapan > Edit versi baru > Terapkan**).

---

### 🛡️ Ketersediaan Offline & Local Fallback:
Selama koneksi ke Google Apps Script belum selesai diatur atau saat internet lambat, website tetap **100% berfungsi normal** dengan mode local-storage cerdas sehingga pengurus bisa mendemokan seluruh alur pendaftaran, pencatatan kas modal popup, warta hero, dan login tanpa hambatan!
