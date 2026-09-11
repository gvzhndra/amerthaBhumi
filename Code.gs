/**
 * ==========================================================================
 * PURA AMERTHA BHUMI - GEDUNG KEUANGAN NEGARA I DENPASAR
 * Google Apps Script Serverless Backend (Code.gs)
 * ==========================================================================
 * 
 * Melayani:
 * 1. Otentikasi Login Pengurus & Umat (NIP & NIP)
 * 2. Registrasi Mandiri Umat Baru (Google Sheets tab 'Data_Umat')
 * 3. Unggah Otomatis Foto Dokumentasi ke Google Drive (DriveApp)
 * 4. CMS Artikel & Warta (Google Sheets tab 'Artikel')
 * 5. Transparansi Kas & Dana Punia (Google Sheets tab 'Kas_Punia')
 * 6. Kalender Agenda & Kegiatan Pura (Google Sheets tab 'Agenda')
 * 7. Audit Log Mutasi Kas & Keuangan (Google Sheets tab 'Audit_Log')
 * 8. Auto-Generate & Format Seluruh Tabel Otomatis (initialSetup)
 */

// ==========================================================================
// KONFIGURASI GOOGLE SPREADSHEET & GOOGLE DRIVE
// ==========================================================================
// Jika script dibuat dari menu Ekstensi > Apps Script di Google Sheets,
// SPREADSHEET_ID tidak wajib diisi karena akan terdeteksi otomatis.
// Namun jika standalone script, masukkan ID Spreadsheet di bawah:
const CONFIG = {
  SPREADSHEET_ID: "MASUKKAN_ID_SPREADSHEET_DI_SINI",
  DRIVE_FOLDER_ID: "MASUKKAN_ID_FOLDER_GOOGLE_DRIVE_DI_SINI",
  SECRET_SALT: "AMERTHA_BHUMI_GKN1_BALI_2026"
};

/**
 * Helper: Ambil instance Spreadsheet baik secara otomatis (bound script)
 * maupun melalui SPREADSHEET_ID (standalone script).
 */
function getSpreadsheet() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active && active.getId()) return active;
  } catch (e) {}

  if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID !== "MASUKKAN_ID_SPREADSHEET_DI_SINI") {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }

  throw new Error(
    "ID Spreadsheet belum terhubung! Silakan buka Code.gs dan masukkan ID Spreadsheet Anda pada CONFIG.SPREADSHEET_ID, atau buat Apps Script langsung melalui menu 'Ekstensi' > 'Apps Script' di dalam Google Spreadsheet Anda."
  );
}

/**
 * Helper: Output JSON dengan header CORS agar bisa diakses dari GitHub Pages / Localhost
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * ROUTER GET (doGet)
 */
function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : "getPublicData";
    const ss = getSpreadsheet();

    // Auto-generate tabel jika sheet masih kosong / hanya ada Sheet1 bawaan
    checkAndAutoSetup(ss);

    switch (action) {
      // 1. Eksekusi Inisialisasi & Generate Tabel Manual via Browser URL:
      // contoh: https://script.google.com/.../exec?action=initSetup
      case "initSetup": {
        const result = initialSetup();
        return createJsonResponse(result);
      }

      // 2. Mengambil data publik untuk portal utama (index.html)
      case "getPublicData":
        return createJsonResponse({
          status: "success",
          articles: getSheetData(ss, "Artikel"),
          gallery: getSheetData(ss, "Galeri"),
          punia: getKasSummary(ss),
          agenda: getSheetData(ss, "Agenda")
        });

      // 3. Mengambil data umat untuk CRM Pengurus
      case "getCrmData":
        return createJsonResponse({
          status: "success",
          data: getSheetData(ss, "Data_Umat")
        });

      // 4. Mengambil data buku kas & ringkasan saldo
      case "getKasData":
        return createJsonResponse({
          status: "success",
          data: getSheetData(ss, "Kas_Punia"),
          summary: getKasSummary(ss)
        });

      // 5. Mengambil data agenda kegiatan pura
      case "getAgendaData":
        return createJsonResponse({
          status: "success",
          data: getSheetData(ss, "Agenda")
        });

      // 6. Mengambil log audit transaksi kas
      case "getAuditLog":
        return createJsonResponse({
          status: "success",
          data: getSheetData(ss, "Audit_Log")
        });

      default:
        return createJsonResponse({ status: "error", message: "Aksi GET '" + action + "' tidak dikenali." });
    }
  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() });
  }
}

/**
 * ROUTER POST (doPost)
 */
function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    }

    const action = payload.action;
    const ss = getSpreadsheet();
    checkAndAutoSetup(ss);

    switch (action) {
      // 1. Otentikasi Login (Default NIP & NIP)
      case "login": {
        const nip = String(payload.nip || "").trim();
        const password = String(payload.password || "").trim();

        if (!nip || !password) {
          return createJsonResponse({ status: "error", message: "NIP dan kata sandi wajib diisi." });
        }

        const users = getSheetData(ss, "Users");
        let user = users.find(u => String(u.nip).trim() === nip);

        // Jika belum ada di database Users, cek apakah password == NIP (default login)
        if (!user) {
          if (nip === password) {
            user = {
              nip: nip,
              nama: "Pegawai Umat GKN",
              role: "member",
              satker: "GKN I Denpasar",
              status: "Aktif"
            };
          } else {
            return createJsonResponse({ status: "error", message: "Kombinasi NIP dan kata sandi salah." });
          }
        } else {
          const validPass = user.password ? String(user.password).trim() : user.nip;
          if (password !== validPass) {
            return createJsonResponse({ status: "error", message: "Kata sandi salah." });
          }
        }

        const token = Utilities.base64EncodeWebSafe(
          Utilities.computeHmacSha256Signature(nip + "_" + Date.now(), CONFIG.SECRET_SALT)
        );

        return createJsonResponse({
          status: "success",
          token: token,
          user: {
            nip: user.nip,
            nama: user.nama,
            role: user.role || "member",
            satker: user.satker || "GKN I Denpasar"
          }
        });
      }

      // 2. Pendaftaran Umat Baru Mandiri dari Portal Publik
      case "registerUmat": {
        const sheet = getOrCreateSheet(ss, "Data_Umat", [
          "ID", "Timestamp", "Nama", "NIP", "Satker", "Jabatan", "WhatsApp", "Alamat", "Status"
        ]);
        const id = "U-" + Utilities.formatDate(new Date(), "Asia/Makassar", "yyyyMMddHHmmss");
        sheet.appendRow([
          id,
          new Date().toISOString(),
          payload.nama || "",
          payload.nip || "",
          payload.satker || "",
          payload.jabatan || "",
          payload.whatsapp || "",
          payload.alamat || "-",
          "Menunggu Verifikasi"
        ]);

        return createJsonResponse({ status: "success", message: "Pendaftaran berhasil dicatat di Google Sheets." });
      }

      // 3. Unggah Foto Otomatis ke Google Drive Pura (Setelah di-resize di client)
      case "uploadPhoto": {
        if (!CONFIG.DRIVE_FOLDER_ID || CONFIG.DRIVE_FOLDER_ID === "MASUKKAN_ID_FOLDER_GOOGLE_DRIVE_DI_SINI") {
          return createJsonResponse({ status: "error", message: "CONFIG.DRIVE_FOLDER_ID belum diatur di Code.gs" });
        }

        const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
        const base64Data = payload.base64.split(",")[1];
        const decoded = Utilities.base64Decode(base64Data);
        const fileName = "DOK_" + Utilities.formatDate(new Date(), "Asia/Makassar", "yyyyMMdd_HHmmss") + ".jpg";
        const blob = Utilities.newBlob(decoded, "image/jpeg", fileName);
        
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        const driveUrl = "https://drive.google.com/uc?id=" + file.getId();

        const sheetGal = getOrCreateSheet(ss, "Galeri", ["ID", "Timestamp", "Judul", "FileID", "ImageUrl", "Ukuran"]);
        sheetGal.appendRow([
          file.getId(),
          new Date().toISOString(),
          payload.title || "Dokumentasi Kegiatan",
          file.getId(),
          driveUrl,
          payload.sizeInfo || "-"
        ]);

        return createJsonResponse({
          status: "success",
          message: "Foto berhasil disimpan ke Google Drive Pura.",
          imageUrl: driveUrl,
          fileId: file.getId()
        });
      }

      // 4. Simpan Artikel CMS Baru / Update
      case "saveArticle": {
        const sheet = getOrCreateSheet(ss, "Artikel", ["ID", "Timestamp", "Judul", "Kategori", "Thumbnail", "Konten", "Status", "IsHero"]);
        const artId = payload.id || ("ART-" + Date.now());
        sheet.appendRow([
          artId,
          new Date().toISOString(),
          payload.title || "",
          payload.category || "Warta",
          payload.image || "",
          payload.content || "",
          payload.status || "Published",
          payload.isHero ? "TRUE" : "FALSE"
        ]);

        return createJsonResponse({ status: "success", message: "Artikel berhasil disimpan di Google Sheets." });
      }

      // 5. Catat Mutasi Kas Punia
      case "saveKas": {
        const sheet = getOrCreateSheet(ss, "Kas_Punia", ["ID", "Tanggal", "Jenis", "Kategori", "Nominal", "Keterangan"]);
        const kasId = payload.id || ("KAS-" + Date.now());
        sheet.appendRow([
          kasId,
          payload.tgl || Utilities.formatDate(new Date(), "Asia/Makassar", "yyyy-MM-dd"),
          payload.jenis || "Masuk",
          payload.kategori || "Dana Punia Umat",
          Number(payload.nominal) || 0,
          payload.ket || ""
        ]);

        return createJsonResponse({ status: "success", message: "Transaksi kas berhasil disimpan di Google Sheets." });
      }

      // 6. Catat Log Audit Transaksi Kas
      case "logAudit": {
        const sheet = getOrCreateSheet(ss, "Audit_Log", ["ID", "Waktu", "Aktor", "NIP", "Aksi", "Detail", "Alasan"]);
        sheet.appendRow([
          payload.id || ("LOG-" + Date.now()),
          payload.waktu || Utilities.formatDate(new Date(), "Asia/Makassar", "yyyy-MM-dd HH:mm:ss") + " WITA",
          payload.aktor || "Pengurus Pura",
          payload.nip || "-",
          payload.aksi || "INFO",
          payload.detail || "-",
          payload.alasan || "-"
        ]);

        return createJsonResponse({ status: "success", message: "Log audit berhasil dicatat." });
      }

      // 7. Update Status Umat (Approval di CRM)
      case "updateUmatStatus": {
        const sheet = ss.getSheetByName("Data_Umat");
        if (!sheet) return createJsonResponse({ status: "error", message: "Sheet Data_Umat tidak ditemukan." });

        const values = sheet.getDataRange().getValues();
        for (let i = 1; i < values.length; i++) {
          if (String(values[i][3]) === String(payload.nip)) {
            sheet.getRange(i + 1, 9).setValue(payload.newStatus || "Aktif");
            return createJsonResponse({ status: "success", message: "Status keanggotaan berhasil diperbarui." });
          }
        }
        return createJsonResponse({ status: "error", message: "NIP tidak ditemukan." });
      }

      default:
        return createJsonResponse({ status: "error", message: "Aksi POST '" + action + "' tidak dikenali." });
    }
  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() });
  }
}

// ==========================================================================
// FITUR AUTO-GENERATE & FORMAT SELURUH TABEL SPREADSHEET OTOMATIS
// ==========================================================================

/**
 * Menjalankan pembuatan seluruh tabel dan penataan header secara otomatis.
 * Anda dapat menjalankan fungsi ini langsung dari editor Apps Script (Run > initialSetup)
 * atau membuka URL Web App dengan parameter '?action=initSetup'.
 */
function initialSetup() {
  const ss = getSpreadsheet();
  const createdSheets = [];

  // Skema Tabel & Header
  const TABLE_SCHEMAS = {
    "Data_Umat": {
      headers: ["ID", "Timestamp", "Nama", "NIP", "Satker", "Jabatan", "WhatsApp", "Alamat", "Status"],
      seed: [
        ["U-001", new Date().toISOString(), "I Ketut Sudirga, S.E.", "198501012010121001", "Kanwil DJPb", "Pembina Tk I", "081234567890", "Denpasar", "Aktif"],
        ["U-002", new Date().toISOString(), "Ni Putu Saraswati, S.Kom.", "199203152015021002", "DJP", "Penata Madya", "081987654321", "Denpasar Timur", "Aktif"],
        ["U-003", new Date().toISOString(), "I Wayan Arnawa, S.E., M.Si.", "199008202014032003", "DJBC", "Bendahara", "081333444555", "Badung", "Aktif"],
        ["U-004", new Date().toISOString(), "I Made Wira Dananjaya", "199507112019011004", "DJKN", "Pelaksana", "085777888999", "Gianyar", "Aktif"],
        ["U-005", new Date().toISOString(), "Ni Luh Putu Ayu Wardani", "199804102021022001", "BDK", "Pranata Komputer", "081234999000", "Renon", "Aktif"]
      ]
    },
    "Users": {
      headers: ["NIP", "Nama", "Role", "Satker", "Password", "Status"],
      seed: [
        ["198501012010121001", "I Ketut Sudirga, S.E.", "admin", "Kanwil DJPb Bali", "198501012010121001", "Aktif"],
        ["199203152015021002", "Ni Putu Saraswati, S.Kom.", "secretary", "KPP Pratama Denpasar Timur", "199203152015021002", "Aktif"],
        ["199008202014032003", "I Wayan Arnawa, S.E., M.Si.", "finance", "KPPBC Denpasar", "199008202014032003", "Aktif"],
        ["199804102021022001", "Ni Luh Putu Ayu Wardani", "humas", "Balai Diklat Keuangan Denpasar", "199804102021022001", "Aktif"],
        ["199507112019011004", "I Made Wira Dananjaya", "member", "KPKNL Denpasar", "199507112019011004", "Aktif"]
      ]
    },
    "Artikel": {
      headers: ["ID", "Timestamp", "Judul", "Kategori", "Thumbnail", "Konten", "Status", "IsHero"],
      seed: [
        ["ART-101", new Date().toISOString(), "Persiapan Upacara Piodalan Pura Amertha Bhumi Sasih Kadasa", "Piodalan & Upakara", "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80", "Pengurus Pura Amertha Bhumi GKN I Denpasar menyelenggarakan koordinasi pembagian tugas ayah-ayahan...", "Published", "TRUE"],
        ["ART-102", new Date().toISOString(), "Persembahyangan Bersama Rahina Purnama di Pura Amertha Bhumi", "Persembahyangan", "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80", "Umat Hindu di lingkungan GKN I Denpasar berkumpul dalam suasana persembahyangan hening...", "Published", "FALSE"],
        ["ART-103", new Date().toISOString(), "Aksi Bersih Pura dan Penataan Taman Mandala", "Gotong Royong", "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80", "Kegiatan mareresik berkala demi menjaga keasrian areal Pura Amertha Bhumi...", "Published", "FALSE"]
      ]
    },
    "Galeri": {
      headers: ["ID", "Timestamp", "Judul", "FileID", "ImageUrl", "Ukuran"],
      seed: [
        ["GAL-001", new Date().toISOString(), "Suasana Persembahyangan Rahina Purnama", "FILE-01", "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80", "280 KB"],
        ["GAL-002", new Date().toISOString(), "Gotong Royong & Ayah-ayahan Kemenkeu", "FILE-02", "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80", "310 KB"]
      ]
    },
    "Kas_Punia": {
      headers: ["ID", "Tanggal", "Jenis", "Kategori", "Nominal", "Keterangan"],
      seed: [
        ["KAS-01", "2026-09-01", "Masuk", "Dana Punia Umat", 15500000, "Punia Rutin Pegawai GKN I Denpasar"],
        ["KAS-02", "2026-09-05", "Keluar", "Banten & Upakara", 3200000, "Pembelian Sarana Upakara Rahina Purnama"],
        ["KAS-03", "2026-09-08", "Masuk", "Donasi Khusus", 5000000, "Punia Renovasi Balai Pawedan"]
      ]
    },
    "Agenda": {
      headers: ["ID", "Nama", "Tanggal", "Waktu", "Lokasi", "Keterangan"],
      seed: [
        ["AGD-001", "Persembahyangan Purnama Kadasa", "Purnama Kadasa (24 Oktober 2026)", "17:00 WITA", "Utama Mandala Pura Amertha Bhumi", "Pakaian Adat Madya, seluruh umat sedharma"],
        ["AGD-002", "Gotong Royong & Mareresik Pura", "Saniscara Kliwon (17 Oktober 2026)", "07:30 WITA", "Lingkungan Pura GKN I", "Pakaian kerja santai, pembersihan sarana pura"]
      ]
    },
    "Audit_Log": {
      headers: ["ID", "Waktu", "Aktor", "NIP", "Aksi", "Detail", "Alasan"],
      seed: [
        ["LOG-INIT", Utilities.formatDate(new Date(), "Asia/Makassar", "yyyy-MM-dd HH:mm:ss") + " WITA", "Sistem Pura", "SYSTEM", "INFO", "Inisialisasi Database Spreadsheet Pura Amertha Bhumi", "Setup awal sistem"]
      ]
    }
  };

  // Buat dan format setiap tabel
  for (const sheetName in TABLE_SCHEMAS) {
    const schema = TABLE_SCHEMAS[sheetName];
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(schema.headers);
      if (schema.seed && schema.seed.length > 0) {
        schema.seed.forEach(row => sheet.appendRow(row));
      }
      createdSheets.push(sheetName);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(schema.headers);
      if (schema.seed && schema.seed.length > 0) {
        schema.seed.forEach(row => sheet.appendRow(row));
      }
      createdSheets.push(sheetName + " (Header diisi ulang)");
    }

    // Terapkan Gaya Header Profesional (Slate Dark + Font Putih Tebal)
    formatSheetHeader(sheet, schema.headers.length);
  }

  // Hapus 'Sheet1' bawaan Google Sheets jika kosong dan sudah ada tabel lain
  const defaultSheet = ss.getSheetByName("Sheet1") || ss.getSheetByName("Halaman1");
  if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() <= 1) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {}
  }

  return {
    status: "success",
    message: "Seluruh tabel Google Spreadsheet Pura Amertha Bhumi berhasil dibuat dan diformat otomatis!",
    sheets: Object.keys(TABLE_SCHEMAS),
    newlyCreated: createdSheets
  };
}

/**
 * Format baris header agar terlihat rapi dan elegan di Google Sheets
 */
function formatSheetHeader(sheet, numColumns) {
  try {
    const headerRange = sheet.getRange(1, 1, 1, numColumns);
    headerRange
      .setBackground("#1E293B") // Slate 800
      .setFontColor("#FFFFFF") // Teks putih
      .setFontWeight("bold")
      .setFontFamily("Arial")
      .setFontSize(10)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");

    sheet.setRowHeight(1, 32);
    sheet.setFrozenRows(1); // Bekukan baris pertama agar tetap terlihat saat scroll

    // Auto resize kolom
    for (let c = 1; c <= numColumns; c++) {
      sheet.autoResizeColumn(c);
    }
  } catch (e) {}
}

/**
 * Cek apakah database butuh setup otomatis saat pertama kali diakses
 */
function checkAndAutoSetup(ss) {
  const essential = ss.getSheetByName("Data_Umat");
  if (!essential) {
    initialSetup();
  }
}

// ==========================================================================
// HELPER DATA RETRIEVAL
// ==========================================================================

function getSheetData(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const headers = rows[0].map(h => String(h).trim().toLowerCase());
  const list = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const item = {};
    headers.forEach((h, colIdx) => {
      item[h] = row[colIdx];
    });
    list.push(item);
  }
  return list;
}

function getOrCreateSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (headers && headers.length > 0) {
      sheet.appendRow(headers);
      formatSheetHeader(sheet, headers.length);
    }
  }
  return sheet;
}

function getKasSummary(ss) {
  const data = getSheetData(ss, "Kas_Punia");
  let totalMasuk = 0;
  let totalKeluar = 0;

  data.forEach(item => {
    const nom = Number(item.nominal) || 0;
    if (String(item.jenis).toLowerCase() === "masuk") {
      totalMasuk += nom;
    } else {
      totalKeluar += nom;
    }
  });

  return {
    totalMasuk: totalMasuk,
    totalKeluar: totalKeluar,
    saldo: totalMasuk - totalKeluar
  };
}
