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
 */

// ==========================================================================
// KONFIGURASI GOOGLE SPREADSHEET & GOOGLE DRIVE
// ==========================================================================
// Masukkan ID Spreadsheet dan ID Folder Google Drive Pura Anda di bawah ini:
const CONFIG = {
  SPREADSHEET_ID: "MASUKKAN_ID_SPREADSHEET_DI_SINI",
  DRIVE_FOLDER_ID: "MASUKKAN_ID_FOLDER_GOOGLE_DRIVE_DI_SINI",
  SECRET_SALT: "AMERTHA_BHUMI_GKN1_BALI_2026"
};

/**
 * Helper: Output JSON dengan header CORS agar bisa diakses dari GitHub Pages
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
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

    switch (action) {
      case "getPublicData":
        return createJsonResponse({
          status: "success",
          articles: getSheetData(ss, "Artikel"),
          gallery: getSheetData(ss, "Galeri"),
          punia: getKasSummary(ss)
        });

      case "getCrmData":
        // Mengambil seluruh data umat untuk Dashboard Pengurus
        return createJsonResponse({
          status: "success",
          data: getSheetData(ss, "Data_Umat")
        });

      case "getKasData":
        return createJsonResponse({
          status: "success",
          data: getSheetData(ss, "Kas_Punia"),
          summary: getKasSummary(ss)
        });

      default:
        return createJsonResponse({ status: "error", message: "Aksi GET tidak dikenali." });
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
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

    switch (action) {
      // 1. Otentikasi Login (Default NIP & NIP)
      case "login": {
        const nip = String(payload.nip || "").trim();
        const password = String(payload.password || "").trim();

        if (!nip || !password) {
          return createJsonResponse({ status: "error", message: "NIP dan kata sandi wajib diisi." });
        }

        const sheetUsers = ss.getSheetByName("Users");
        const users = sheetUsers ? getSheetData(ss, "Users") : [];
        let user = users.find(u => String(u.nip).trim() === nip);

        // Jika belum ada di database Users, cek apakah password == NIP
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
          // Validasi kata sandi terdaftar (atau default NIP)
          const validPass = user.password ? String(user.password).trim() : user.nip;
          if (password !== validPass) {
            return createJsonResponse({ status: "error", message: "Kata sandi salah." });
          }
        }

        // Buat session token sederhana
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
          payload.nama,
          payload.nip,
          payload.satker,
          payload.jabatan,
          payload.whatsapp,
          payload.alamat || "-",
          "Menunggu Verifikasi"
        ]);

        return createJsonResponse({ status: "success", message: "Pendaftaran berhasil dicatat." });
      }

      // 3. Unggah Foto Otomatis ke Google Drive Pura (Setelah di-resize di client)
      case "uploadPhoto": {
        const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
        const base64Data = payload.base64.split(",")[1];
        const decoded = Utilities.base64Decode(base64Data);
        const fileName = "DOK_" + Utilities.formatDate(new Date(), "Asia/Makassar", "yyyyMMdd_HHmmss") + ".jpg";
        const blob = Utilities.newBlob(decoded, "image/jpeg", fileName);
        
        // Simpan berkas ke Google Drive
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        const driveUrl = "https://drive.google.com/uc?id=" + file.getId();

        // Catat ke Sheet Galeri
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

      // 4. Simpan Artikel CMS Baru
      case "saveArticle": {
        const sheet = getOrCreateSheet(ss, "Artikel", ["ID", "Timestamp", "Judul", "Kategori", "Thumbnail", "Konten", "Status"]);
        const artId = "ART-" + Date.now();
        sheet.appendRow([
          artId,
          new Date().toISOString(),
          payload.title,
          payload.category,
          payload.image || "",
          payload.content,
          payload.status || "Published"
        ]);

        return createJsonResponse({ status: "success", message: "Artikel berhasil disimpan." });
      }

      // 5. Catat Mutasi Kas Punia
      case "saveKas": {
        const sheet = getOrCreateSheet(ss, "Kas_Punia", ["ID", "Tanggal", "Jenis", "Kategori", "Nominal", "Keterangan"]);
        const kasId = "KAS-" + Date.now();
        sheet.appendRow([
          kasId,
          payload.tgl || Utilities.formatDate(new Date(), "Asia/Makassar", "yyyy-MM-dd"),
          payload.jenis,
          payload.kategori,
          Number(payload.nominal),
          payload.ket
        ]);

        return createJsonResponse({ status: "success", message: "Transaksi kas berhasil disimpan." });
      }

      // 6. Update Status Umat (Approval di CRM)
      case "updateUmatStatus": {
        const sheet = ss.getSheetByName("Data_Umat");
        if (!sheet) return createJsonResponse({ status: "error", message: "Sheet Data_Umat tidak ditemukan." });

        const values = sheet.getDataRange().getValues();
        for (let i = 1; i < values.length; i++) {
          if (String(values[i][3]) === String(payload.nip)) { // Kolom NIP (index 3)
            sheet.getRange(i + 1, 9).setValue(payload.newStatus || "Aktif"); // Kolom Status (index 9)
            return createJsonResponse({ status: "success", message: "Status keanggotaan berhasil diperbarui." });
          }
        }
        return createJsonResponse({ status: "error", message: "NIP tidak ditemukan." });
      }

      default:
        return createJsonResponse({ status: "error", message: "Aksi POST tidak dikenali." });
    }
  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() });
  }
}

// ==========================================================================
// HELPER FUNCTIONS
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
