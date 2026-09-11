# Panduan Penyiapan Google Sheets & Google Drive Backend
## Website Pura Amertha Bhumi GKN I Denpasar

Dokumen ini menjelaskan langkah-langkah mudah untuk menghubungkan website di GitHub Pages dengan Google Spreadsheet dan Google Drive sebagai backend database dan penyimpanan foto otomatis secara gratis.

---

### Langkah 1: Buat Folder Google Drive untuk Dokumentasi Foto
1. Buka [Google Drive](https://drive.google.com/).
2. Buat folder baru dengan nama: `Dokumentasi Pura Amertha Bhumi GKN I`.
3. Klik kanan pada folder tersebut > pilih **Bagikan (Share)** > ubah akses menjadi **Siapa saja yang memiliki link dapat melihat (Viewer)**.
4. Salin **ID Folder** dari tautan di browser:
   * Contoh URL: `https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ`
   * ID Folder adalah: `1aBcDeFgHiJkLmNoPqRsTuVwXyZ`.

---

### Langkah 2: Buat Google Spreadsheet untuk Database
1. Buka [Google Sheets](https://sheets.new) dan buat spreadsheet baru dengan nama: `Database Pura Amertha Bhumi GKN I`.
2. Salin **ID Spreadsheet** dari URL di bilah peramban:
   * Contoh URL: `https://docs.google.com/spreadsheets/d/1XyZaBcDeFgHiJkLmNoPqRsTuVw/edit`
   * ID Spreadsheet adalah: `1XyZaBcDeFgHiJkLmNoPqRsTuVw`.
3. *(Opsional)* Buat sheet-sheet kosong berikut (skrip otomatis membuatnya jika belum ada):
   * `Data_Umat`
   * `Artikel`
   * `Galeri`
   * `Kas_Punia`
   * `Users`

---

### Langkah 3: Pasang Kode Google Apps Script (`Code.gs`)
1. Di dalam Google Spreadsheet tadi, klik menu **Ekstensi (Extensions)** > **Apps Script**.
2. Hapus semua kode default di editor, lalu salin seluruh isi file [`Code.gs`](file:///Users/putuharjaya/Desktop/repo/amerthaBhumi/Code.gs).
3. Di bagian paling atas file, ganti nilai konfigurasi:
   ```javascript
   const CONFIG = {
     SPREADSHEET_ID: "TEMPELKAN_ID_SPREADSHEET_ANDA_DI_SINI",
     DRIVE_FOLDER_ID: "TEMPELKAN_ID_FOLDER_GOOGLE_DRIVE_ANDA_DI_SINI",
     SECRET_SALT: "AMERTHA_BHUMI_GKN1_BALI_2026"
   };
   ```
4. Klik ikon **Simpan (Save)** 💾 di editor.

---

### Langkah 4: Terapkan (Deploy) Sebagai Web App
1. Di pojok kanan atas Apps Script, klik tombol biru **Terapkan (Deploy)** > **Penerapan Baru (New Deployment)**.
2. Klik ikon gerigi di sebelah kiri > pilih jenis **Aplikasi Web (Web App)**.
3. Atur konfigurasi berikut:
   * **Deskripsi**: `API Amertha Bhumi v1`
   * **Jalankan sebagai (Execute as)**: `Saya (email Anda)`
   * **Siapa yang memiliki akses (Who has access)**: **`Siapa saja (Anyone)`** *(PENTING agar bisa diakses dari GitHub Pages tanpa batasan akun)*.
4. Klik **Terapkan (Deploy)**.
5. Salin **URL Aplikasi Web** yang dihasilkan (berakhiran `/exec`).

---

### Langkah 5: Hubungkan ke Frontend Website
Buka file [`js/app.js`](file:///Users/putuharjaya/Desktop/repo/amerthaBhumi/js/app.js) dan [`js/admin.js`](file:///Users/putuharjaya/Desktop/repo/amerthaBhumi/js/admin.js), lalu masukkan URL Web App yang disalin dari Langkah 4 ke variabel `API_ENDPOINT`.

> **Catatan:** Selama URL Google Apps Script belum dimasukkan, website tetap **100% berfungsi normal** dengan mode local-storage cerdas sehingga pengurus bisa mendemokan seluruh alur pendaftaran, kompresi gambar, dan login tanpa hambatan!
