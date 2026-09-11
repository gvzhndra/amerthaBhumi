const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbxvqiwnvJthhvcbRV9ozBU2-QRMVPyQInuK0sr9dVWNVQXJ-TH-cZMUg6KtSyLK5MFx/exec";

/* ==========================================================================
   INITIAL REPOSITORY DATASETS (DECLARED FIRST TO AVOID TDZ ERRORS)
   ========================================================================== */
const INITIAL_UMAT = [
  { id: "cunda", nama: "Cunda Yokosantha", nip: "cunda", satker: "Kanwil DJPb", jabatan: "Koordinator Humas & Informasi", whatsapp: "081234567890", status: "Aktif", role: "admin", roleLabel: "Super Admin (Humas)" },
  { id: "hendra", nama: "Putu Agus Hendra Harjaya", nip: "hendra", satker: "DJKN", jabatan: "Anggota Humas & Informasi", whatsapp: "081987654321", status: "Aktif", role: "admin", roleLabel: "Super Admin (Humas)" },
  { id: "ekasuardana", nama: "I Putu Eka Suardana", nip: "ekasuardana", satker: "Setjen", jabatan: "Anggota Humas & Informasi", whatsapp: "081333444555", status: "Aktif", role: "admin", roleLabel: "Super Admin (Humas)" },
  { id: "arini", nama: "Ni Luh Nyoman Arini Asri Wijayanti", nip: "arini", satker: "DJKN", jabatan: "Anggota Humas & Informasi", whatsapp: "085777888999", status: "Aktif", role: "admin", roleLabel: "Super Admin (Humas)" },
  { id: "prawirawijaya", nama: "I Made Rai Prawirawijaya", nip: "prawirawijaya", satker: "Setjen", jabatan: "Anggota Humas & Informasi", whatsapp: "081234999000", status: "Aktif", role: "admin", roleLabel: "Super Admin (Humas)" },
  { id: "tusta", nama: "Putu Tusta Ari Chandana", nip: "tusta", satker: "DJKN", jabatan: "Anggota Humas & Informasi", whatsapp: "081234567111", status: "Aktif", role: "admin", roleLabel: "Super Admin (Humas)" }
];

const INITIAL_AGENDA = [
  {
    id: "AGD-001",
    nama: "Persembahyangan Purnama Kadasa",
    tanggal: "Purnama Kadasa (24 Oktober 2026)",
    waktu: "17:00 WITA",
    lokasi: "Utama Mandala Pura Amertha Bhumi",
    ket: "Pakaian Adat Madya, persembahyangan bersama seluruh umat"
  },
  {
    id: "AGD-002",
    nama: "Gotong Royong & Mareresik Pura",
    tanggal: "Saniscara Kliwon (17 Oktober 2026)",
    waktu: "07:30 WITA",
    lokasi: "Lingkungan Pura GKN I",
    ket: "Pakaian kerja santai, pembersihan sarana pura jelang purnama"
  },
  {
    id: "AGD-003",
    nama: "Dharma Tula Keumatan",
    tanggal: "Sukra Wage (9 Oktober 2026)",
    waktu: "16:30 WITA",
    lokasi: "Balai Pesandekan Pura",
    ket: "Pakaian semi-formal / dinas, simakrama keumatan & tata kelola pura"
  }
];

const INITIAL_AUDIT_LOG = [
  {
    id: "LOG-1003",
    waktu: "2026-09-08 14:20 WITA",
    aktor: "I Wayan Arnawa (Bendahara)",
    nip: "199008202014032003",
    aksi: "TAMBAH",
    detail: "Donasi Khusus [Masuk] (Rp 5.000.000) - Punia Renovasi Balai Pawedan",
    alasan: "Pencatatan donasi renovasi balai pawedan dari donatur satker GKN"
  },
  {
    id: "LOG-1002",
    waktu: "2026-09-05 11:15 WITA",
    aktor: "I Wayan Arnawa (Bendahara)",
    nip: "199008202014032003",
    aksi: "TAMBAH",
    detail: "Banten & Upakara [Keluar] (Rp 3.200.000) - Pembelian Sarana Upakara Rahina Purnama",
    alasan: "Pembelian sarana upakara & banten suci Rahina Purnama"
  },
  {
    id: "LOG-1001",
    waktu: "2026-09-01 09:30 WITA",
    aktor: "I Wayan Arnawa (Bendahara)",
    nip: "199008202014032003",
    aksi: "TAMBAH",
    detail: "Dana Punia Umat [Masuk] (Rp 15.500.000) - Punia Rutin Pegawai GKN I Denpasar",
    alasan: "Penerimaan punia rutin bulanan pegawai GKN I Denpasar"
  }
];

const INITIAL_PENGUMUMAN = [
  {
    id: "BC-001",
    judul: "Rapat Koordinasi & Jadwal Ngayah Persiapan Piodalan Padmasana Pura Amertha Bhumi",
    kategori: "kegiatan",
    kategoriLabel: "Kegiatan & Ngayah",
    tanggal: "Sabtu, 28 Oktober 2026",
    penulis: "Ketua Pengurus (I Ketut Sudirga, S.E.)",
    pinned: true,
    link: "https://chat.whatsapp.com/sample-group-gkn",
    isi: "Om Swastyastu Semeton Umat Hindu GKN I Denpasar.\n\nMenjelang Pujawali/Piodalan Padmasana Pura Amertha Bhumi yang jatuh pada Purnama Sasih Kelima mendatang, diharapkan perwakilan masing-masing satker untuk dapat menghadiri rapat koordinasi teknis.\n\nJadwal Ngayah: Mulai pukul 08.30 WITA di Pelataran Pura GKN I. Pakaian: Adat Madya Bali. Suksema atas kebersamaan dan pengabdian tulus semeton sekalian."
  },
  {
    id: "BC-002",
    judul: "Persembahyangan Bersama Rahina Purnama Kapat di Pelataran Pura GKN I",
    kategori: "rerahinan",
    kategoriLabel: "Rerahinan & Puja",
    tanggal: "Rabu, 15 Oktober 2026 (Pukul 17.00 WITA)",
    penulis: "Seksi Upakara & Persembahyangan",
    pinned: true,
    link: "",
    isi: "Diberitahukan kepada seluruh pegawai umat Hindu di lingkungan Gedung Keuangan Negara I Denpasar bahwa persembahyangan bersama Rahina Purnama Kapat akan dilaksanakan tepat setelah jam kepulangan kantor (17.00 WITA).\n\nSarana upakara, canang, dupa, dan tirtha telah dipersiapkan oleh tim pengurus pura. Mari bersama-sama memohon kerahayuan dan kelancaran tugas negara."
  },
  {
    id: "BC-003",
    judul: "Pembaruan Rekapitulasi Kas & Dana Punia Sukarela Triwulan Berjalan",
    kategori: "umum",
    kategoriLabel: "Informasi Kas",
    tanggal: "1 Oktober 2026",
    penulis: "Bendahara Pura (I Wayan Arnawa)",
    pinned: false,
    link: "",
    isi: "Om Swastyastu. Laporan kas punia dan perincian dana operasional kebersihan serta upakara pura telah diperbarui di sistem transparansi keuangan pura. Seluruh umat dapat melihat ringkasan mutasi kas secara terbuka. Terima kasih atas partisipasi dan dana punia tulus semeton umat."
  }
];

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
window.escapeHtml = escapeHtml;

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = AuthService.requireAuth();
  if (!currentUser) return;

  try { renderUserProfile(currentUser); } catch (e) { console.error("renderUserProfile error:", e); }
  try { initTabNavigation(currentUser); } catch (e) { console.error("initTabNavigation error:", e); }
  try { initBerandaUmatModule(currentUser); } catch (e) { console.error("initBerandaUmatModule error:", e); }
  try { initCrmModule(currentUser); } catch (e) { console.error("initCrmModule error:", e); }
  try { initCmsArticlesModule(); } catch (e) { console.error("initCmsArticlesModule error:", e); }
  try { initCmsGalleryModule(); } catch (e) { console.error("initCmsGalleryModule error:", e); }
  try { initKasPuniaModule(); } catch (e) { console.error("initKasPuniaModule error:", e); }
  try { initAuditKasModule(currentUser); } catch (e) { console.error("initAuditKasModule error:", e); }
  try { initAgendaModule(currentUser); } catch (e) { console.error("initAgendaModule error:", e); }
  try { initPengumumanModule(currentUser); } catch (e) { console.error("initPengumumanModule error:", e); }
  try { initProfileModule(currentUser); } catch (e) { console.error("initProfileModule error:", e); }
  try { updateOverviewKpi(); } catch (e) { console.error("updateOverviewKpi error:", e); }
});

/* ==========================================================================
   GLOBAL MODAL POPUP & TOAST NOTIFICATION CONTROLLER (SHADCN LIGHT STYLE)
   ========================================================================== */
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconSvg = "";
  if (type === "success") {
    iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else if (type === "error") {
    iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="toast-content">${escapeHtml(message)}</div>
  `;

  container.appendChild(toast);

  const raf = (typeof requestAnimationFrame === "function") ? requestAnimationFrame : (fn) => setTimeout(fn, 16);
  raf(() => {
    toast.classList.add("show");
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

let currentModalOnClose = null;

function showModal({ title, bodyHtml, footerHtml = null, onClose = null }) {
  // Jika ada callback tutup dari modal sebelumnya yang belum tereksekusi, bersihkan dahulu
  if (typeof currentModalOnClose === "function") {
    try { currentModalOnClose(); } catch (e) {}
    currentModalOnClose = null;
  }
  currentModalOnClose = onClose;

  const backdrop = document.getElementById("globalModalBackdrop");
  const titleEl = document.getElementById("modalTitle");
  const bodyEl = document.getElementById("modalBody");
  const footerEl = document.getElementById("modalFooter");
  const closeBtn = document.getElementById("modalCloseBtn");
  const btnClose = document.getElementById("modalBtnClose");

  if (!backdrop) return;

  if (titleEl) titleEl.innerHTML = title;
  if (bodyEl) bodyEl.innerHTML = bodyHtml;
  if (footerEl) {
    if (footerHtml) {
      footerEl.innerHTML = footerHtml;
    } else {
      footerEl.innerHTML = `<button type="button" class="btn btn-secondary" onclick="closeModal()">Tutup</button>`;
    }
  }

  backdrop.classList.add("show");

  function onKeyDown(e) {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", onKeyDown);
    }
  }
  document.addEventListener("keydown", onKeyDown);

  backdrop.onclick = (e) => {
    if (e.target === backdrop) closeModal();
  };
  if (closeBtn) closeBtn.onclick = closeModal;
  if (btnClose) btnClose.onclick = closeModal;
}

function closeModal() {
  if (typeof currentModalOnClose === "function") {
    try {
      currentModalOnClose();
    } catch (err) {
      console.warn("Modal onClose cleanup error:", err);
    }
    currentModalOnClose = null;
  }
  const backdrop = document.getElementById("globalModalBackdrop");
  if (backdrop) backdrop.classList.remove("show");
}
window.closeModal = closeModal;

function showConfirmModal(titleOrOpts, messageHtml, onConfirm, confirmText = "Hapus", isDanger = true) {
  let title = titleOrOpts;
  let body = messageHtml;
  let callback = onConfirm;
  let btnText = confirmText;
  let danger = isDanger;

  if (typeof titleOrOpts === "object" && titleOrOpts !== null) {
    title = titleOrOpts.title;
    body = titleOrOpts.message || titleOrOpts.messageHtml || "";
    callback = titleOrOpts.onConfirm;
    btnText = titleOrOpts.confirmText || "Hapus";
    danger = (titleOrOpts.isDanger !== undefined) ? titleOrOpts.isDanger : true;
  }

  showModal({
    title,
    bodyHtml: `<p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">${body}</p>`,
    footerHtml: `
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Batal</button>
      <button type="button" class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="btnModalConfirmAction" style="${danger ? 'background: #EF4444; border-color: #DC2626; color: white;' : ''}">
        ${btnText}
      </button>
    `
  });

  const confirmBtn = document.getElementById("btnModalConfirmAction");
  if (confirmBtn) {
    confirmBtn.onclick = () => {
      closeModal();
      if (typeof callback === "function") {
        callback();
      }
    };
  }
}
window.showConfirmModal = showConfirmModal;

function getRoleBadge(role) {
  switch (role) {
    case "admin":
      return `<span style="font-weight: 600; color: #B45309;">Super Admin</span>`;
    case "secretary":
      return `<span style="font-weight: 600; color: #1D4ED8;">Sekretaris</span>`;
    case "finance":
      return `<span style="font-weight: 600; color: #047857;">Bendahara</span>`;
    case "humas":
    case "editor":
      return `<span style="font-weight: 600; color: #7C3AED;">Humas</span>`;
    default:
      return `<span style="font-weight: 500; color: var(--text-muted, #64748B);">Anggota</span>`;
  }
}
window.getRoleBadge = getRoleBadge;

const ROLE_LABELS = {
  admin: "Super Admin",
  secretary: "Sekretaris",
  finance: "Bendahara",
  humas: "Humas",
  editor: "Humas",
  member: "Anggota"
};

function showUmatDetailModal(umat) {
  let statusBadge = "";
  if (umat.status === "Aktif") {
    statusBadge = `<span style="font-size: 0.72rem; font-weight: 700; background: #ECFDF5; color: #059669; padding: 0.2rem 0.65rem; border-radius: 99px; border: 1px solid #A7F3D0;">TERVERIFIKASI AKTIF</span>`;
  } else if (umat.status === "Nonaktif") {
    statusBadge = `<span style="font-size: 0.72rem; font-weight: 700; background: #F1F5F9; color: #64748B; padding: 0.2rem 0.65rem; border-radius: 99px; border: 1px solid #CBD5E1;">NONAKTIF (PENSIUN / MUTASI)</span>`;
  } else {
    statusBadge = `<span style="font-size: 0.72rem; font-weight: 700; background: #FEF3C7; color: #B45309; padding: 0.2rem 0.65rem; border-radius: 99px; border: 1px solid #FCD34D;">MENUNGGU VERIFIKASI</span>`;
  }

  const initials = (umat.nama || "Umat").split(" ").map(w => w[0]).slice(0, 2).join("");
  const avatarContent = umat.photoUrl 
    ? `<img src="${umat.photoUrl}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">`
    : initials;
  const currentUser = (window.AuthService && AuthService.getCurrentUser && AuthService.getCurrentUser()) || { role: "admin" };
  const canAssignRole = (currentUser && currentUser.role === "admin");

  const body = `
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem;">
      <div style="width: 56px; height: 56px; border-radius: 99px; background: linear-gradient(135deg, var(--primary-light), #FDE68A); color: var(--primary-dark); font-size: 1.35rem; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid var(--border-focus); flex-shrink: 0; overflow: hidden;">
        ${avatarContent}
      </div>
      <div>
        <h4 style="font-size: 1.12rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">${escapeHtml(umat.nama)}</h4>
        <div style="display: flex; gap: 0.4rem; align-items: center;">
          ${statusBadge}
          ${getRoleBadge(umat.role || 'member')}
        </div>
      </div>
    </div>

    <div class="detail-umat-card">
      <div class="detail-row">
        <span class="detail-label">NIP Kemenkeu</span>
        <span class="detail-value" style="color: var(--primary); font-family: monospace; font-size: 0.95rem;">${escapeHtml(umat.nip)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Peran Akun</span>
        <span class="detail-value">${getRoleBadge(umat.role || 'member')}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Satker / Unit Kerja</span>
        <span class="detail-value">${escapeHtml(umat.satker)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Jabatan / Golongan</span>
        <span class="detail-value">${escapeHtml(umat.jabatan || '-')}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Nomor WhatsApp</span>
        <span class="detail-value">${escapeHtml(umat.whatsapp || '-')}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Status Keanggotaan</span>
        <span class="detail-value">${escapeHtml(umat.status || 'Aktif')}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">ID Registrasi Umat</span>
        <span class="detail-value" style="font-family: monospace; font-size: 0.8rem; color: var(--text-muted);">${umat.id || 'U-001'}</span>
      </div>
    </div>
  `;

  const cleanWa = (umat.whatsapp || "").replace(/\D/g, "");
  const waUrl = cleanWa ? `https://wa.me/${cleanWa.startsWith("0") ? "62" + cleanWa.slice(1) : cleanWa}` : "#";

  let toggleBtn = "";
  if (umat.status === "Aktif") {
    toggleBtn = `<button type="button" class="btn btn-secondary" style="color: var(--status-danger-text); border-color: #FECACA;" onclick="toggleUmatStatus('${umat.nip}', 'Nonaktif')"><svg class="icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg> Nonaktifkan (Pensiun)</button>`;
  } else if (umat.status === "Nonaktif") {
    toggleBtn = `<button type="button" class="btn btn-secondary" style="color: #059669; border-color: #A7F3D0;" onclick="toggleUmatStatus('${umat.nip}', 'Aktif')"><svg class="icon-sm" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Aktifkan Kembali</button>`;
  } else if (umat.status === "Menunggu Verifikasi") {
    toggleBtn = `<button type="button" class="btn btn-primary" onclick="toggleUmatStatus('${umat.nip}', 'Aktif')">Setujui Umat</button>`;
  }

  let roleBtn = "";
  if (canAssignRole) {
    roleBtn = `<button type="button" class="btn btn-secondary" style="color: #7C3AED; border-color: rgba(124, 58, 237, 0.4);" onclick="openRoleModalFromDetail('${umat.nip}')"><svg class="icon-sm" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> Atur Peran</button>`;
  }

  const footer = `
    <button type="button" class="btn btn-secondary" onclick="closeModal()">Tutup</button>
    ${roleBtn}
    ${toggleBtn}
    ${cleanWa ? `<a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="background: #059669 !important; border-color: #047857 !important;"><svg class="icon-sm" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> Hubungi WhatsApp</a>` : ''}
  `;

  showModal({
    title: `<svg class="icon" style="color: var(--primary);" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Detail Data Umat GKN I`,
    bodyHtml: body,
    footerHtml: footer
  });
}

window.openRoleModalFromDetail = function(nip) {
  closeModal();
  setTimeout(() => {
    let list = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
    const found = list.find(u => u.nip === nip);
    if (found) {
      const currentUser = (window.AuthService && AuthService.getCurrentUser && AuthService.getCurrentUser()) || { role: "admin" };
      showManageRoleModal(found, currentUser);
    }
  }, 100);
};

window.showManageRoleModal = function(targetUmat, currentUser) {
  if (!currentUser) {
    currentUser = (window.AuthService && AuthService.getCurrentUser && AuthService.getCurrentUser()) || { role: "admin", nama: "Super Admin", nip: "198501012010121001" };
  }

  const currentRole = targetUmat.role || "member";
  const initials = (targetUmat.nama || "U").split(" ").map(w => w[0]).slice(0, 2).join("");

  const bodyHtml = `
    <div style="background: var(--bg-main, #F8FAFC); border-radius: var(--radius-md, 8px); padding: 1rem; border: 1px solid var(--border-color, #E2E8F0); margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; gap: 0.85rem;">
        <div style="width: 46px; height: 46px; border-radius: 99px; background: linear-gradient(135deg, #E0E7FF, #C7D2FE); color: #4338CA; font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1.5px solid #A5B4FC;">
          ${initials}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 700; font-size: 0.98rem; color: var(--text-main); margin-bottom: 0.15rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(targetUmat.nama)}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span>NIP: <code style="font-family: monospace;">${escapeHtml(targetUmat.nip)}</code></span>
            <span>•</span>
            <span>${escapeHtml(targetUmat.satker || 'GKN I')}</span>
          </div>
        </div>
      </div>
      <div style="margin-top: 0.85rem; padding-top: 0.75rem; border-top: 1px dashed var(--border-color, #E2E8F0); display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem;">
        <span style="color: var(--text-muted);">Peran Saat Ini:</span>
        <div>${getRoleBadge(currentRole)}</div>
      </div>
    </div>

    <form id="formManageRole" onsubmit="return false;">
      <div class="form-group-dash" style="margin-bottom: 1rem;">
        <label style="font-size: 0.84rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">
          Pilih Peran Baru <span style="color: #DC2626;">*</span>
        </label>
        <select id="roleNewSelect" class="form-control-dash" style="width: 100%; padding: 0.55rem 0.75rem; font-size: 0.88rem; font-weight: 500;">
          <option value="admin" ${currentRole === "admin" ? "selected" : ""}>Super Admin (Ketua Pengurus - Akses Penuh Semua Modul)</option>
          <option value="secretary" ${currentRole === "secretary" ? "selected" : ""}>Sekretaris (Agenda, Warta & Siaran Pengumuman)</option>
          <option value="finance" ${currentRole === "finance" ? "selected" : ""}>Bendahara (Pengelolaan Kas Punia & Audit Transaksi)</option>
          <option value="humas" ${currentRole === "humas" || currentRole === "editor" ? "selected" : ""}>Humas (Publikasi Berita Warta & Galeri Foto)</option>
          <option value="member" ${currentRole === "member" ? "selected" : ""}>Anggota Umat (Hak Akses Biasa - Beranda Umat & Portal)</option>
        </select>
        <small style="color: var(--text-muted); font-size: 0.76rem; display: block; margin-top: 0.35rem;">
          Menentukan hak akses modul dashboard, navigasi menu, dan wewenang pencatatan.
        </small>
      </div>

      <div class="form-group-dash" style="margin-bottom: 0.5rem;">
        <label style="font-size: 0.84rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">
          Dasar Penetapan / Catatan SK <span style="font-weight: 400; color: var(--text-muted);">(Opsional)</span>
        </label>
        <input type="text" id="roleChangeReason" class="form-control-dash" placeholder="Contoh: SK Pengurus No. 05/PAB/2026 atau Purna Tugas" style="width: 100%; font-size: 0.85rem; padding: 0.5rem 0.75rem;">
      </div>
    </form>
  `;

  const footerHtml = `
    <button type="button" class="btn btn-secondary" onclick="closeModal()">Batal</button>
    <button type="button" class="btn btn-primary" id="btnSaveRoleChange" style="background: #7C3AED; border-color: #6D28D9;">
      <svg class="icon-sm" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
      Simpan & Terapkan Peran
    </button>
  `;

  showModal({
    title: `<svg class="icon" style="color: #7C3AED;" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><circle cx="12" cy="10" r="3"></circle></svg> Penetapan & Cabut Peran Pengurus`,
    bodyHtml: bodyHtml,
    footerHtml: footerHtml
  });

  const saveBtn = document.getElementById("btnSaveRoleChange");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const newRole = document.getElementById("roleNewSelect").value;
      const reasonInput = document.getElementById("roleChangeReason").value.trim();

      if (newRole === currentRole) {
        showToast("Peran yang dipilih sama dengan peran saat ini.", "info");
        closeModal();
        return;
      }

      // Safe guard: prevent removing the last admin
      let umatList = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
      if (currentRole === "admin" && newRole !== "admin") {
        const adminCount = umatList.filter(u => (u.role || "member") === "admin").length;
        if (adminCount <= 1) {
          showToast("Gagal: Harus ada minimal 1 akun Super Admin di sistem.", "error");
          return;
        }
      }

      const idx = umatList.findIndex(u => u.nip === targetUmat.nip);
      if (idx !== -1) {
        umatList[idx].role = newRole;
        umatList[idx].roleLabel = ROLE_LABELS[newRole] || newRole;
        localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(umatList));
      }

      // Log to AUDIT_LOG_LOCAL
      let auditList = JSON.parse(localStorage.getItem("AUDIT_LOG_LOCAL") || "[]");
      const actorName = (currentUser && currentUser.nama) ? currentUser.nama : "Super Admin";
      const actorRole = (currentUser && currentUser.roleLabel) ? currentUser.roleLabel : "Super Admin";
      const newLog = {
        id: "LOG-" + Date.now().toString().slice(-4),
        waktu: new Date().toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" }) + " WITA",
        aktor: `${actorName} (${actorRole})`,
        nip: (currentUser && currentUser.nip) ? currentUser.nip : "198501012010121001",
        aksi: "UPDATE_PERAN",
        detail: `Ubah Peran: ${targetUmat.nama} (${targetUmat.nip}) [${ROLE_LABELS[currentRole]} -> ${ROLE_LABELS[newRole]}]`,
        alasan: reasonInput || `Penetapan susunan peran pengurus Pura Amertha Bhumi`
      };
      auditList.unshift(newLog);
      localStorage.setItem("AUDIT_LOG_LOCAL", JSON.stringify(auditList));

      // If current user modified their own role, synchronize session and topbar immediately
      if (currentUser && currentUser.nip === targetUmat.nip) {
        currentUser.role = newRole;
        currentUser.roleLabel = ROLE_LABELS[newRole];
        renderUserProfile(currentUser);
      }

      closeModal();
      if (typeof window.refreshCrmTable === "function") {
        window.refreshCrmTable();
      }
      if (typeof window.refreshAuditTable === "function") {
        window.refreshAuditTable();
      }
      showToast(`Peran ${targetUmat.nama} berhasil diubah menjadi ${ROLE_LABELS[newRole]}!`, "success");
    });
  }
};

window.toggleUmatStatus = function(nip, newStatus) {
  let list = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
  const idx = list.findIndex(u => u.nip === nip);
  if (idx !== -1) {
    list[idx].status = newStatus;
    localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(list));
    closeModal();
    if (typeof window.refreshCrmTable === "function") {
      window.refreshCrmTable();
    }
    updateOverviewKpi();
    const label = (newStatus === "Nonaktif") ? "Pensiun / Nonaktif" : "Aktif";
    showToast(`Status umat ${list[idx].nama} berhasil diubah menjadi ${label}.`, "success");
  }
};

/* ==========================================================================
   1. USER PROFILE & ROLE ADJUSTMENT
   ========================================================================== */
function renderUserProfile(user) {
  const nameEl = document.getElementById("topbarUserName");
  const roleEl = document.getElementById("topbarUserRole");
  const avatarEl = document.getElementById("topbarUserAvatar");
  const logoutBtn = document.getElementById("btnLogout");

  const displayName = user.nama || user.name || "Pengguna";
  if (nameEl) nameEl.textContent = displayName;
  if (roleEl) roleEl.textContent = user.roleLabel || user.role;
  if (avatarEl) {
    if (user.photoUrl) {
      avatarEl.innerHTML = `<img src="${user.photoUrl}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else {
      const initials = displayName.split(" ").filter(Boolean).map(w => w[0]).slice(0, 2).join("");
      avatarEl.textContent = initials || "PB";
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => AuthService.logout());
  }

  // Sembunyikan menu berdasarkan peran (Role-Based Access Control)
  const navBerandaUmat = document.getElementById("navBerandaUmat");
  if (user.role === "secretary") {
    // Sekretaris: memiliki akses CRM, Agenda, CMS Warta, Pengumuman (kas punia dikelola Bendahara)
    const navKas = document.querySelector('[data-tab="tab-kas"]');
    const navAudit = document.querySelector('[data-tab="tab-audit-kas"]');
    if (navKas) navKas.style.display = "none";
    if (navAudit) navAudit.style.display = "none";
    if (navBerandaUmat) navBerandaUmat.style.display = "none";
  } else if (user.role === "editor" || user.role === "humas") {
    // Humas: upload warta & galeri, sembunyikan kas
    const navKas = document.querySelector('[data-tab="tab-kas"]');
    const navAudit = document.querySelector('[data-tab="tab-audit-kas"]');
    if (navKas) navKas.style.display = "none";
    if (navAudit) navAudit.style.display = "none";
    if (navBerandaUmat) navBerandaUmat.style.display = "none";
  } else if (user.role === "finance") {
    // Bendahara: akses kas & audit kas, sembunyikan CMS
    const navCmsArt = document.querySelector('[data-tab="tab-artikel"]');
    const navCmsGal = document.querySelector('[data-tab="tab-galeri"]');
    if (navCmsArt) navCmsArt.style.display = "none";
    if (navCmsGal) navCmsGal.style.display = "none";
    if (navBerandaUmat) navBerandaUmat.style.display = "none";
  } else if (user.role === "member") {
    // Anggota biasa: sembunyikan menu manajemen pengurus, tampilkan beranda umat
    document.querySelectorAll(".admin-only-nav").forEach(el => el.style.display = "none");
    if (navBerandaUmat) navBerandaUmat.style.display = "flex";
  } else {
    // Super Admin / Ketua Pengurus: akses semua menu pengurus, sembunyikan beranda member
    if (navBerandaUmat) navBerandaUmat.style.display = "none";
  }

  // Hak siaran broadcast pengumuman: role "secretary" (Sekretaris) atau "admin" (Ketua/Super Admin)
  const broadcastAdminAction = document.getElementById("broadcastAdminAction");
  if (broadcastAdminAction) {
    if (user.role === "secretary" || user.role === "admin") {
      broadcastAdminAction.style.display = "block";
    } else {
      broadcastAdminAction.style.display = "none";
    }
  }
}

/* ==========================================================================
   2. TAB NAVIGATION
   ========================================================================== */
function initTabNavigation(user) {
  const navBtns = document.querySelectorAll(".nav-tab-btn");
  const panes = document.querySelectorAll(".tab-pane");

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      navBtns.forEach(b => b.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // Default active tab based on role
  if (user.role === "member") {
    const berandaBtn = document.getElementById("navBerandaUmat");
    if (berandaBtn) {
      berandaBtn.click();
    } else {
      const pengumumanBtn = document.querySelector('[data-tab="tab-pengumuman"]');
      if (pengumumanBtn) pengumumanBtn.click();
    }
  } else if (user.role === "editor" || user.role === "humas") {
    const artBtn = document.querySelector('[data-tab="tab-artikel"]');
    if (artBtn) artBtn.click();
  }
}

/* ==========================================================================
   3. CRM UMAT MODULE
   ========================================================================== */

function confirmDeleteUmat(nip, currentUser) {
  if (!currentUser) {
    currentUser = (window.AuthService && AuthService.getCurrentUser && AuthService.getCurrentUser()) || { role: "admin" };
  }
  if (currentUser.role !== "admin") {
    showToast("Hanya Super Admin yang berwenang menghapus data akun.", "error");
    return;
  }
  if (currentUser.nip === nip) {
    showToast("Tidak dapat menghapus akun Anda sendiri yang sedang aktif digunakan.", "error");
    return;
  }

  let list = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
  const target = list.find(u => u.nip === nip);
  if (!target) return;

  if (target.role === "admin") {
    const adminCount = list.filter(u => (u.role || "member") === "admin").length;
    if (adminCount <= 1) {
      showToast("Gagal: Harus ada minimal 1 akun Super Admin di sistem.", "error");
      return;
    }
  }

  showConfirmModal({
    title: "Hapus Akun Umat",
    message: `Apakah Anda yakin ingin menghapus data anggota <strong>${escapeHtml(target.nama)}</strong> (NIP: <code>${escapeHtml(target.nip)}</code>)? Tindakan ini akan menghapus akun secara permanen dari sistem.`,
    confirmText: "Hapus Akun",
    confirmBtnClass: "btn-danger",
    onConfirm: () => {
      list = list.filter(u => u.nip !== nip);
      localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(list));

      // Catat ke log audit
      let auditList = JSON.parse(localStorage.getItem("AUDIT_LOG_LOCAL") || "[]");
      const actorName = (currentUser && currentUser.nama) ? currentUser.nama : "Super Admin";
      const actorRole = (currentUser && currentUser.roleLabel) ? currentUser.roleLabel : "Super Admin";
      const newLog = {
        id: "LOG-" + Date.now().toString().slice(-4),
        waktu: new Date().toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" }) + " WITA",
        aktor: `${actorName} (${actorRole})`,
        nip: (currentUser && currentUser.nip) ? currentUser.nip : "-",
        aksi: "HAPUS_UMAT",
        detail: `Hapus Akun: ${target.nama} (NIP: ${target.nip}) - ${target.satker || 'GKN I'}`,
        alasan: "Penghapusan akun data pengujian / purna tugas"
      };
      auditList.unshift(newLog);
      localStorage.setItem("AUDIT_LOG_LOCAL", JSON.stringify(auditList));

      if (typeof window.refreshCrmTable === "function") {
        window.refreshCrmTable();
      }
      if (typeof window.refreshAuditTable === "function") {
        window.refreshAuditTable();
      }
      updateOverviewKpi();
      showToast(`Data akun ${target.nama} berhasil dihapus dari sistem.`, "success");
    }
  });
}
window.confirmDeleteUmat = confirmDeleteUmat;

function showAddUmatModal(currentUser) {
  if (!currentUser) {
    currentUser = (window.AuthService && AuthService.getCurrentUser && AuthService.getCurrentUser()) || { role: "admin" };
  }

  const isSuperAdmin = (currentUser && currentUser.role === "admin");

  const bodyHtml = `
    <form id="formAddUmat" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 0.85rem;">
      <div class="form-group-dash">
        <label style="font-size: 0.84rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">
          Nama Lengkap & Gelar <span style="color: #DC2626;">*</span>
        </label>
        <input type="text" id="addUmatNama" class="form-control-dash" placeholder="Contoh: I Putu Wijaya, S.E., M.M." required style="width: 100%; font-size: 0.88rem; padding: 0.5rem 0.75rem;">
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
        <div class="form-group-dash">
          <label style="font-size: 0.84rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">
            Nomor Induk Pegawai (NIP) <span style="color: #DC2626;">*</span>
          </label>
          <input type="text" id="addUmatNip" class="form-control-dash" placeholder="18 digit NIP Kemenkeu" required maxlength="18" style="width: 100%; font-size: 0.88rem; padding: 0.5rem 0.75rem; font-family: monospace;">
        </div>

        <div class="form-group-dash">
          <label style="font-size: 0.84rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">
            Nomor WhatsApp Aktif
          </label>
          <input type="tel" id="addUmatWa" class="form-control-dash" placeholder="08xxxxxxxxxx" style="width: 100%; font-size: 0.88rem; padding: 0.5rem 0.75rem;">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
        <div class="form-group-dash">
          <label style="font-size: 0.84rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">
            Asal Satker GKN I Denpasar <span style="color: #DC2626;">*</span>
          </label>
          <select id="addUmatSatker" class="form-control-dash" style="width: 100%; font-size: 0.88rem; padding: 0.5rem 0.75rem;">
            <option value="Kanwil DJPb">Kanwil DJPb Provinsi Bali</option>
            <option value="DJP">KPP Pratama Denpasar Timur (DJP)</option>
            <option value="DJP">KPP Pratama Denpasar Barat (DJP)</option>
            <option value="DJBC">KPPBC TMP A Denpasar (DJBC)</option>
            <option value="DJKN">KPKNL Denpasar (DJKN)</option>
            <option value="BDK">Balai Diklat Keuangan (BDK) Denpasar</option>
            <option value="GKN I">Sekretariat Perwakilan Kemenkeu Bali</option>
            <option value="GKN I">Lainnya di Lingkungan GKN I</option>
          </select>
        </div>

        <div class="form-group-dash">
          <label style="font-size: 0.84rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">
            Jabatan / Seksi
          </label>
          <input type="text" id="addUmatJabatan" class="form-control-dash" placeholder="Contoh: Pelaksana / Penata Muda" style="width: 100%; font-size: 0.88rem; padding: 0.5rem 0.75rem;">
        </div>
      </div>

      <div class="form-group-dash">
        <label style="font-size: 0.84rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">
          Peran Akun dalam Sistem <span style="color: #DC2626;">*</span>
        </label>
        <select id="addUmatRole" class="form-control-dash" style="width: 100%; font-size: 0.88rem; padding: 0.5rem 0.75rem;">
          <option value="member" selected>Anggota Umat (Hak Akses Biasa)</option>
          <option value="humas">Humas (Publikasi Berita Warta & Galeri Foto)</option>
          <option value="secretary">Sekretaris (Agenda, Warta & Pengumuman)</option>
          <option value="finance">Bendahara (Pembukuan Kas & Audit Transaksi)</option>
          ${isSuperAdmin ? `<option value="admin">Super Admin (Ketua Pengurus - Akses Penuh)</option>` : ''}
        </select>
      </div>

      <div class="form-group-dash">
        <label style="font-size: 0.84rem; font-weight: 600; color: var(--text-main); display: block; margin-bottom: 0.35rem;">
          Catatan / Dasar SK <span style="font-weight: 400; color: var(--text-muted);">(Opsional)</span>
        </label>
        <input type="text" id="addUmatSk" class="form-control-dash" placeholder="Contoh: Terdaftar di SK Pengurus No. 01/PAB/2026" style="width: 100%; font-size: 0.85rem; padding: 0.5rem 0.75rem;">
      </div>
    </form>
  `;

  const footerHtml = `
    <button type="button" class="btn btn-secondary" onclick="closeModal()">Batal</button>
    <button type="button" class="btn btn-primary" id="btnSubmitAddUmat">
      <svg class="icon-sm" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      Simpan & Daftarkan Anggota
    </button>
  `;

  showModal({
    title: `<svg class="icon" style="color: var(--primary);" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg> Tambah Anggota Umat Baru (Data SK)`,
    bodyHtml: bodyHtml,
    footerHtml: footerHtml
  });

  const submitBtn = document.getElementById("btnSubmitAddUmat");
  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const nama = document.getElementById("addUmatNama").value.trim();
      const nip = document.getElementById("addUmatNip").value.trim().replace(/\s+/g, "");
      const wa = document.getElementById("addUmatWa").value.trim();
      const satker = document.getElementById("addUmatSatker").value;
      const jabatan = document.getElementById("addUmatJabatan").value.trim() || "Pegawai";
      const role = document.getElementById("addUmatRole").value;
      const sk = document.getElementById("addUmatSk").value.trim();

      if (!nama) {
        showToast("Nama lengkap wajib diisi.", "error");
        document.getElementById("addUmatNama").focus();
        return;
      }
      if (!nip) {
        showToast("NIP wajib diisi.", "error");
        document.getElementById("addUmatNip").focus();
        return;
      }

      let list = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
      const exists = list.some(u => u.nip === nip);
      if (exists) {
        showToast(`Gagal: NIP ${nip} sudah terdaftar di sistem!`, "error");
        return;
      }

      const newId = "U-" + String(list.length + 1).padStart(3, "0");
      const newUmat = {
        id: newId,
        nama: nama,
        nip: nip,
        satker: satker,
        jabatan: jabatan,
        whatsapp: wa || "-",
        status: "Aktif",
        role: role,
        roleLabel: ROLE_LABELS[role] || "Anggota"
      };

      list.push(newUmat);
      localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(list));

      // Catat log audit
      let auditList = JSON.parse(localStorage.getItem("AUDIT_LOG_LOCAL") || "[]");
      const actorName = (currentUser && currentUser.nama) ? currentUser.nama : "Pengurus";
      const actorRole = (currentUser && currentUser.roleLabel) ? currentUser.roleLabel : "Sekretaris";
      const newLog = {
        id: "LOG-" + Date.now().toString().slice(-4),
        waktu: new Date().toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" }) + " WITA",
        aktor: `${actorName} (${actorRole})`,
        nip: (currentUser && currentUser.nip) ? currentUser.nip : "-",
        aksi: "TAMBAH_UMAT",
        detail: `Tambah Anggota: ${nama} (NIP: ${nip}) - ${satker} [${ROLE_LABELS[role] || role}]`,
        alasan: sk || "Pendaftaran anggota baru berdasarkan penetapan SK"
      };
      auditList.unshift(newLog);
      localStorage.setItem("AUDIT_LOG_LOCAL", JSON.stringify(auditList));

      closeModal();
      if (typeof window.refreshCrmTable === "function") {
        window.refreshCrmTable();
      }
      if (typeof window.refreshAuditTable === "function") {
        window.refreshAuditTable();
      }
      updateOverviewKpi();
      showToast(`Anggota ${nama} berhasil didaftarkan sebagai anggota aktif!`, "success");
    });
  }
}
window.showAddUmatModal = showAddUmatModal;

function initCrmModule(currentUser) {
  if (!currentUser) {
    currentUser = (window.AuthService && AuthService.getCurrentUser && AuthService.getCurrentUser()) || { role: "admin" };
  }
  const canAssignRole = (currentUser && currentUser.role === "admin");

  const tableBody = document.getElementById("crmTableBody");
  const satkerFilter = document.getElementById("crmSatkerFilter");
  const statusFilter = document.getElementById("crmStatusFilter");
  const roleFilter = document.getElementById("crmRoleFilter");
  const searchInput = document.getElementById("crmSearchInput");
  const exportBtn = document.getElementById("btnExportCrm");
  const addMemberBtn = document.getElementById("btnTambahAnggota");

  if (addMemberBtn) {
    if (currentUser.role === "admin" || currentUser.role === "secretary") {
      addMemberBtn.style.display = "inline-flex";
      addMemberBtn.onclick = () => showAddUmatModal(currentUser);
    } else {
      addMemberBtn.style.display = "none";
    }
  }

  // Load from storage or initial
  let list = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
  if (list.length === 0) {
    list = INITIAL_UMAT;
    localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(list));
  } else {
    // Backwards compatibility for existing records lacking role field
    let updated = false;
    list = list.map(u => {
      if (!u.role) {
        updated = true;
        if (u.nip === "198501012010121001") {
          return { ...u, role: "admin", roleLabel: "Super Admin" };
        } else if (u.nip === "199203152015021002") {
          return { ...u, role: "secretary", roleLabel: "Sekretaris" };
        } else if (u.nip === "199008202014032003") {
          return { ...u, role: "finance", roleLabel: "Bendahara" };
        } else if (u.nip === "199804102021022001") {
          return { ...u, role: "humas", roleLabel: "Humas" };
        } else {
          return { ...u, role: "member", roleLabel: "Anggota" };
        }
      }
      return u;
    });
    if (updated) {
      localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(list));
    }
  }

  function render(data) {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">Tidak ada data umat yang sesuai filter.</td></tr>`;
      return;
    }

    data.forEach((u, i) => {
      const tr = document.createElement("tr");
      const isPending = (u.status === "Menunggu Verifikasi");
      const isAktif = (u.status === "Aktif");
      const isNonaktif = (u.status === "Nonaktif");

      let badgeClass = "active";
      let badgeLabel = u.status;
      if (isPending) {
        badgeClass = "pending";
      } else if (isNonaktif) {
        badgeClass = "inactive";
        badgeLabel = "Pensiun / Mutasi";
      }

      const satkerClass = "satker-" + (u.satker ? u.satker.toLowerCase().replace(/[^a-z]/g, "") : "djp");

      tr.innerHTML = `
        <td>
          <div style="font-weight: 600; color: var(--text-main);">${escapeHtml(u.nama)}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(u.jabatan || 'Pegawai')}</div>
        </td>
        <td><span class="satker-badge ${satkerClass}">${escapeHtml(u.satker || 'GKN I')}</span></td>
        <td>${getRoleBadge(u.role || 'member')}</td>
        <td><a href="https://wa.me/${(u.whatsapp || '').replace(/\D/g, '')}" target="_blank" style="color: #059669; font-weight: 500;">${escapeHtml(u.whatsapp || '-')}</a></td>
        <td>
          <span class="status-badge ${badgeClass}">
            ${badgeLabel}
          </span>
        </td>
        <td style="white-space: nowrap; text-align: center;">
          ${canAssignRole ? `
            <button class="btn-action-sm btn-role" data-nip="${u.nip}" style="color: #7C3AED; border-color: rgba(124, 58, 237, 0.3); background: rgba(124, 58, 237, 0.05); margin-right: 3px;" title="Atur Peran Pengurus">Atur Peran</button>
          ` : ''}
          ${isPending ? `
            <button class="btn-action-sm btn-approve" data-index="${i}" style="background: rgba(16, 185, 129, 0.15); border-color: #10B981; color: #059669; margin-right: 3px;">Setujui</button>
          ` : ''}
          ${isAktif ? `
            <button class="btn-action-sm btn-toggle-status" data-nip="${u.nip}" data-target="Nonaktif" style="color: var(--text-muted); margin-right: 3px;" title="Tandai pensiun atau mutasi">Nonaktifkan</button>
          ` : ''}
          ${isNonaktif ? `
            <button class="btn-action-sm btn-toggle-status" data-nip="${u.nip}" data-target="Aktif" style="color: #059669; border-color: #A7F3D0; margin-right: 3px;" title="Aktifkan kembali">Aktifkan</button>
          ` : ''}
          <button class="btn-action-sm btn-detail" data-nip="${u.nip}" style="margin-right: 3px;">Detail</button>
          ${canAssignRole ? `
            <button class="btn-action-sm btn-delete-umat" data-nip="${u.nip}" style="color: #DC2626; border-color: rgba(220, 38, 38, 0.25);" title="Hapus Data Akun Umat">Hapus</button>
          ` : ''}
        </td>
      `;
      tableBody.appendChild(tr);
    });

    // Role assignment click
    document.querySelectorAll(".btn-role").forEach(btn => {
      btn.addEventListener("click", () => {
        const nip = btn.getAttribute("data-nip");
        const found = list.find(item => item.nip === nip);
        if (found) {
          showManageRoleModal(found, currentUser);
        }
      });
    });

    // Approval click
    document.querySelectorAll(".btn-approve").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");
        data[idx].status = "Aktif";
        localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(list));
        applyFilter();
        updateOverviewKpi();
        showToast(`Umat ${data[idx].nama} telah disetujui sebagai anggota aktif!`, "success");
      });
    });

    // Toggle status (Nonaktifkan / Aktifkan)
    document.querySelectorAll(".btn-toggle-status").forEach(btn => {
      btn.addEventListener("click", () => {
        const nip = btn.getAttribute("data-nip");
        const targetStatus = btn.getAttribute("data-target");
        window.toggleUmatStatus(nip, targetStatus);
      });
    });

    // Detail click
    document.querySelectorAll(".btn-detail").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const targetNip = e.target.getAttribute("data-nip");
        const found = list.find(item => item.nip === targetNip);
        if (found) {
          showUmatDetailModal(found);
        }
      });
    });

    // Delete umat click
    document.querySelectorAll(".btn-delete-umat").forEach(btn => {
      btn.addEventListener("click", () => {
        const nip = btn.getAttribute("data-nip");
        confirmDeleteUmat(nip, currentUser);
      });
    });
  }

  function applyFilter() {
    list = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
    const satker = satkerFilter ? satkerFilter.value : "ALL";
    const statusVal = statusFilter ? statusFilter.value : "ALL";
    const roleVal = roleFilter ? roleFilter.value : "ALL";
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";

    const filtered = list.filter(u => {
      const matchSatker = satker === "ALL" || (u.satker && u.satker.includes(satker));
      const matchStatus = statusVal === "ALL" || u.status === statusVal;
      const matchRole = roleVal === "ALL" || (u.role || "member") === roleVal || (roleVal === "humas" && u.role === "editor");
      const matchKeyword = (u.nama || "").toLowerCase().includes(keyword) || (u.nip || "").includes(keyword);
      return matchSatker && matchStatus && matchRole && matchKeyword;
    });

    render(filtered);
  }

  window.refreshCrmTable = applyFilter;

  if (satkerFilter) satkerFilter.addEventListener("change", applyFilter);
  if (statusFilter) statusFilter.addEventListener("change", applyFilter);
  if (roleFilter) roleFilter.addEventListener("change", applyFilter);
  if (searchInput) searchInput.addEventListener("input", applyFilter);

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      let csv = "ID,Nama,NIP,Satker,Jabatan,Peran,WhatsApp,Status\n";
      list.forEach(u => {
        csv += `"${u.id || ''}","${u.nama}","${u.nip}","${u.satker}","${u.jabatan}","${ROLE_LABELS[u.role] || u.role || 'Anggota'}","${u.whatsapp}","${u.status}"\n`;
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Data_Umat_AmerthaBhumi_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    });
  }

  render(list);
}

/* ==========================================================================
   4. CMS ARTIKEL & WARTA MODULE (HUMAS & PUBLIKASI)
   ========================================================================== */
function initCmsArticlesModule() {
  const form = document.getElementById("formCmsArticle");
  const listContainer = document.getElementById("cmsArticlesTableBody");

  const DEFAULT_ARTICLES = [
    {
      id: "art-piodalan",
      title: "Persiapan Upacara Piodalan Pura Amertha Bhumi Sasih Kadasa",
      category: "Warta Kegiatan",
      date: "10 September 2026",
      isHero: true,
      status: "Published",
      excerpt: "Pengurus Pura Amertha Bhumi GKN I Denpasar menyelenggarakan rapat koordinasi pembagian tugas ayah-ayahan, penataan upakara banten, dan persiapan upacara piodalan pura bersama perwakilan satker.",
      content: "Om Swastyastu,\n\nMenyambut upacara piodalan suci Pura Amertha Bhumi GKN I Denpasar pada Sasih Kadasa mendatang, seksi kepengurusan pura bersama perwakilan pegawai dari seluruh unit vertikal di lingkungan Gedung Keuangan Negara I Denpasar telah melangsungkan rapat koordinasi awal.\n\nBeberapa poin penting hasil koordinasi pengurus:\n1. Jadwal gladi dan gotong royong ngayah pembersihan areal pura akan dilaksanakan secara bertahap.\n2. Pembagian tugas sarana upakara banten dan giliran wiku/pemangku telah disepakati bersama.\n3. Umat yang ingin ngaturang dana punia sukarela maupun sarana upacara dapat menghubungi seksi bendahara atau sekretariat pura.\n\nSemoga seluruh rangkaian upacara persembahyangan bersama ini dapat terlaksana secara lancar, hening, dan membawa kerahayuan serta keberkahan bagi seluruh pegawai di lingkungan GKN I Denpasar.\n\nOm Shanti Shanti Shanti Om.",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "art-dharma",
      title: "Makna Filosofis Yadnya dalam Lingkungan Kerja Pemerintahan",
      category: "Dharma Wacana",
      date: "28 Agustus 2026",
      isHero: false,
      status: "Published",
      excerpt: "Melaksanakan tugas pelayanan publik dengan dedikasi tinggi adalah wujud nyata penerapan Karma Yoga dan pengabdian suci kepada bangsa dan negara.",
      content: "Bekerja dan mengabdi di lingkungan instansi pemerintahan bukanlah sekadar rutinitas profesi, melainkan sarana pelaksanaan ajaran Karma Yoga. Dalam ajaran suci Bhagawadgita, setiap kewajiban yang dilaksanakan dengan ikhlas tanpa keterikatan berlebih pada hasil pribadi merupakan persembahan suci (yadnya) yang tertinggi.\n\nMari kita tingkatkan semangat pengabdian dan integritas demi kemajuan pelayanan publik dan bangsa.",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "art-purnama",
      title: "Persembahyangan Bersama Rahina Purnama di Pura Amertha Bhumi",
      category: "Liputan Upacara",
      date: "15 Agustus 2026",
      isHero: false,
      status: "Published",
      excerpt: "Umat Hindu dari perwakilan seluruh unit eselon II dan instansi vertikal GKN I Denpasar khidmat melangsungkan persembahyangan bersama.",
      content: "Pada perayaan Rahina Purnama yang lalu, keluarga besar umat Hindu GKN I Denpasar berkumpul dalam suasana persembahyangan yang hening dan khidmat. Upacara dipimpin oleh Jero Mangku Pura Amertha Bhumi dan diiringi alunan kidung suci Dewa Yadnya. Usai persembahyangan, kegiatan dilanjutkan dengan dharma santi dan ramah tamah persaudaraan antar pegawai.",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
    }
  ];

  let articles = JSON.parse(localStorage.getItem("CMS_ARTIKEL_LOCAL") || "null");
  if (!Array.isArray(articles) || articles.length === 0) {
    articles = DEFAULT_ARTICLES;
    localStorage.setItem("CMS_ARTIKEL_LOCAL", JSON.stringify(articles));
  }

  function resetArticleEditMode() {
    const editIdxInput = document.getElementById("editArticleIndex");
    if (editIdxInput) editIdxInput.value = "-1";

    if (form) form.reset();

    const heading = document.getElementById("formArticleHeading");
    const badge = document.getElementById("badgeEditMode");
    const banner = document.getElementById("articleEditBanner");
    const submitBtn = document.getElementById("btnSubmitArticleForm");

    if (heading) heading.textContent = "Tulis Artikel Baru";
    if (badge) badge.style.display = "none";
    if (banner) banner.style.display = "none";
    if (submitBtn) submitBtn.textContent = "Simpan & Publikasikan Artikel";
  }

  const btnCancel = document.getElementById("btnCancelEditArticle");
  if (btnCancel) {
    btnCancel.addEventListener("click", () => {
      resetArticleEditMode();
    });
  }

  function render() {
    if (!listContainer) return;
    listContainer.innerHTML = "";

    if (articles.length === 0) {
      listContainer.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #94A3B8; padding: 2rem;">Belum ada artikel yang dibuat.</td></tr>`;
      return;
    }

    articles.forEach((art, index) => {
      const isHero = !!art.isHero;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color: var(--text-main);">${art.title}</strong></td>
        <td><span style="font-size: 0.78rem; color: #D4A024;">${art.category}</span></td>
        <td>${art.date || new Date().toLocaleDateString('id-ID')}</td>
        <td>
          <span class="status-badge ${art.status === 'Published' ? 'active' : 'pending'}">${art.status}</span>
        </td>
        <td>
          ${isHero ? 
            `<span style="display:inline-flex; align-items:center; gap:0.3rem; padding:0.2rem 0.55rem; border-radius:9999px; background:rgba(217, 119, 6, 0.12); color:#B45309; font-weight:700; font-size:0.75rem; border:1px solid rgba(217, 119, 6, 0.3);">
              <svg class="icon-sm" viewBox="0 0 24 24" style="width:12px; height:12px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              Pinned Hero
            </span>` : 
            `<span style="color:#94A3B8; font-size:0.75rem;">Reguler</span>`
          }
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <button class="btn-action-sm btn-edit-art" data-index="${index}" style="background: rgba(59, 130, 246, 0.12); color: #2563EB; border-color: #3B82F6;">Edit</button>
            <button class="btn-action-sm btn-toggle-hero" data-index="${index}" style="background:${isHero ? 'rgba(100, 116, 139, 0.12)' : 'rgba(217, 119, 6, 0.12)'}; color:${isHero ? '#64748B' : '#B45309'}; border-color:${isHero ? '#94A3B8' : '#D97706'};">
              ${isHero ? 'Batal Pin' : '⭐ Jadikan Hero'}
            </button>
            <button class="btn-action-sm btn-delete-art" data-index="${index}" style="background: rgba(239, 68, 68, 0.2); color: #F87171; border-color: #EF4444;">Hapus</button>
          </div>
        </td>
      `;
      listContainer.appendChild(tr);
    });

    // Handle Edit Mode Click
    document.querySelectorAll(".btn-edit-art").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        const art = articles[idx];
        if (!art) return;

        const editIdxInput = document.getElementById("editArticleIndex");
        if (editIdxInput) editIdxInput.value = idx;

        const titleEl = document.getElementById("artTitle");
        const catEl = document.getElementById("artCategory");
        const statusEl = document.getElementById("artStatus");
        const imgEl = document.getElementById("artImage");
        const heroEl = document.getElementById("artIsHero");
        const contentEl = document.getElementById("artContent");

        if (titleEl) titleEl.value = art.title || "";
        if (catEl) catEl.value = art.category || "Warta Kegiatan";
        if (statusEl) statusEl.value = art.status || "Published";
        if (imgEl) imgEl.value = (art.image && !art.image.startsWith("data:")) ? art.image : "";
        if (heroEl) heroEl.checked = !!art.isHero;
        if (contentEl) contentEl.value = art.content || art.excerpt || "";

        const heading = document.getElementById("formArticleHeading");
        const badge = document.getElementById("badgeEditMode");
        const banner = document.getElementById("articleEditBanner");
        const titleText = document.getElementById("articleEditTitleText");
        const submitBtn = document.getElementById("btnSubmitArticleForm");

        if (heading) heading.textContent = "Edit Artikel";
        if (badge) badge.style.display = "inline-block";
        if (banner) banner.style.display = "flex";
        if (titleText) titleText.textContent = art.title;
        if (submitBtn) submitBtn.textContent = "Simpan Perubahan Artikel";

        const card = document.getElementById("articleEditorCard");
        if (card && typeof card.scrollIntoView === "function") {
          card.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Handle Quick Hero Pinning Toggle
    document.querySelectorAll(".btn-toggle-hero").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        const currentHero = !!articles[idx].isHero;
        
        if (currentHero) {
          articles[idx].isHero = false;
          showToast("Status Berita Utama dibatalkan. Artikel kembali ke feed warta reguler.", "info");
        } else {
          // Unset any other hero
          articles.forEach(a => { a.isHero = false; });
          articles[idx].isHero = true;
          showToast(`" ${articles[idx].title} " berhasil disematkan sebagai Berita Utama Front End!`, "success");
        }

        localStorage.setItem("CMS_ARTIKEL_LOCAL", JSON.stringify(articles));
        render();
        updateOverviewKpi();
      });
    });

    document.querySelectorAll(".btn-delete-art").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index"), 10);
        showConfirmModal({
          title: "Hapus Artikel",
          message: `Apakah Anda yakin ingin menghapus artikel "${articles[idx]?.title}" dari CMS publikasi?`,
          onConfirm: () => {
            const editIdx = parseInt(document.getElementById("editArticleIndex")?.value || "-1", 10);
            if (editIdx === idx) resetArticleEditMode();

            articles.splice(idx, 1);
            localStorage.setItem("CMS_ARTIKEL_LOCAL", JSON.stringify(articles));
            render();
            updateOverviewKpi();
            showToast("Artikel berhasil dihapus dari CMS!", "info");
          }
        });
      });
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const editIdx = parseInt(document.getElementById("editArticleIndex")?.value || "-1", 10);
      const titleVal = document.getElementById("artTitle")?.value.trim() || "";
      const catVal = document.getElementById("artCategory")?.value || "Warta Kegiatan";
      const statusVal = document.getElementById("artStatus")?.value || "Published";
      const imgVal = document.getElementById("artImage")?.value.trim() || "";
      const isHero = !!document.getElementById("artIsHero")?.checked;
      const contentVal = document.getElementById("artContent")?.value.trim() || "";

      if (!titleVal || !contentVal) {
        showToast("Judul dan isi artikel wajib diisi.", "error");
        return;
      }

      if (isHero) {
        // Unset previous hero
        articles.forEach(a => { a.isHero = false; });
      }

      if (editIdx >= 0 && articles[editIdx]) {
        // Update existing article
        articles[editIdx].title = titleVal;
        articles[editIdx].category = catVal;
        articles[editIdx].image = imgVal || articles[editIdx].image || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80";
        articles[editIdx].content = contentVal;
        articles[editIdx].excerpt = contentVal.substring(0, 160) + "...";
        articles[editIdx].status = statusVal;
        articles[editIdx].isHero = isHero;

        localStorage.setItem("CMS_ARTIKEL_LOCAL", JSON.stringify(articles));
        resetArticleEditMode();
        render();
        updateOverviewKpi();
        showToast("Perubahan artikel berhasil disimpan dan diperbarui di portal!", "success");
      } else {
        // Add new article
        const newArticle = {
          id: "art-" + Date.now(),
          title: titleVal,
          category: catVal,
          image: imgVal || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
          content: contentVal,
          excerpt: contentVal.substring(0, 160) + "...",
          status: statusVal,
          isHero: isHero,
          date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
        };

        articles.unshift(newArticle);
        localStorage.setItem("CMS_ARTIKEL_LOCAL", JSON.stringify(articles));
        form.reset();
        render();
        updateOverviewKpi();
        showToast(isHero ? "Artikel berhasil disimpan dan disematkan sebagai Berita Utama di Front End!" : "Artikel baru berhasil disimpan ke CMS!", "success");
      }
    });
  }

  render();
}

/* ==========================================================================
   5. CMS GALERI FOTO (WITH SMART CLIENT-SIDE RESIZER)
   ========================================================================== */
function initCmsGalleryModule() {
  const fileInput = document.getElementById("galleryFileInput");
  const dropzone = document.getElementById("galleryDropzone");
  const previewBox = document.getElementById("galleryPreviewBox");
  const previewImg = document.getElementById("galleryPreviewImg");
  const previewStats = document.getElementById("galleryPreviewStats");
  const form = document.getElementById("formCmsGallery");
  const galleryList = document.getElementById("cmsGalleryGrid");

  const DEFAULT_GALLERY = [
    {
      id: "gal-1",
      title: "Persembahyangan Purnama Kadasa",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
      date: "15 Agustus 2026"
    },
    {
      id: "gal-2",
      title: "Gotong Royong & Ngaturang Ayah",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80",
      date: "20 Agustus 2026"
    },
    {
      id: "gal-3",
      title: "Dharma Tula Pegawai Umat Hindu GKN I",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80",
      date: "28 Agustus 2026"
    },
    {
      id: "gal-4",
      title: "Bakti Sosial Peduli Sesama",
      image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600&q=80",
      date: "5 September 2026"
    }
  ];

  let currentCompressed = null;
  let galleryData = JSON.parse(localStorage.getItem("CMS_GALERI_LOCAL") || "null");
  if (!Array.isArray(galleryData) || galleryData.length === 0) {
    galleryData = DEFAULT_GALLERY;
    localStorage.setItem("CMS_GALERI_LOCAL", JSON.stringify(galleryData));
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        dropzone.querySelector(".dropzone-text").textContent = "Mengompresi gambar...";
        // Smart resize ke max 1280px, kualitas 80% JPEG
        currentCompressed = await ImageCompressor.compress(file, 1280, 1280, 0.80);

        // Render preview dan statistik penghematan
        if (previewBox && previewImg && previewStats) {
          previewBox.style.display = "flex";
          previewImg.src = currentCompressed.base64;
          previewStats.innerHTML = `
            <span>Ukuran Asli: <b>${ImageCompressor.formatBytes(currentCompressed.originalSize)}</b></span>
            <span>Ukuran Terkompresi: <b>${ImageCompressor.formatBytes(currentCompressed.compressedSize)}</b></span>
            <span class="highlight">Hemat Tempat Google Drive: ${currentCompressed.savedPercent}%</span>
            <span>Resolusi Optimal: ${currentCompressed.width} x ${currentCompressed.height} px</span>
          `;
        }
        dropzone.querySelector(".dropzone-text").textContent = "Foto siap diunggah!";
      } catch (err) {
        showToast("Gagal mengompresi gambar: " + err.message, "error");
      }
    });
  }

  function renderGallery() {
    if (!galleryList) return;
    galleryList.innerHTML = "";

    if (galleryData.length === 0) {
      galleryList.innerHTML = `<p style="color: #94A3B8;">Belum ada dokumentasi kegiatan diunggah.</p>`;
      return;
    }

    galleryData.forEach((item, index) => {
      const card = document.createElement("div");
      card.style.cssText = "background: #FFFFFF; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);";
      card.innerHTML = `
        <img src="${item.image}" style="width: 100%; height: 130px; object-fit: cover;">
        <div style="padding: 0.75rem;">
          <h4 style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 0.25rem;">${item.title}</h4>
          <span style="font-size: 0.72rem; color: var(--text-muted);">${item.date || 'Kegiatan Pura'}</span>
          <div style="margin-top: 0.5rem; text-align: right;">
            <button class="btn-action-sm btn-del-gal" data-index="${index}" style="color: var(--danger-text);">Hapus</button>
          </div>
        </div>
      `;
      galleryList.appendChild(card);
    });

    document.querySelectorAll(".btn-del-gal").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");
        galleryData.splice(idx, 1);
        localStorage.setItem("CMS_GALERI_LOCAL", JSON.stringify(galleryData));
        renderGallery();
      });
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!currentCompressed && !form.galExternalUrl.value) {
        showToast("Pilih file foto untuk diunggah atau masukkan URL gambar.", "error");
        return;
      }

      const title = form.galTitle.value.trim() || "Dokumentasi Kegiatan Pura";
      const imageSrc = currentCompressed ? currentCompressed.base64 : form.galExternalUrl.value.trim();

      galleryData.unshift({
        title,
        image: imageSrc,
        date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        savedRatio: currentCompressed ? currentCompressed.savedPercent : null
      });

      localStorage.setItem("CMS_GALERI_LOCAL", JSON.stringify(galleryData));
      form.reset();
      if (previewBox) previewBox.style.display = "none";
      currentCompressed = null;
      renderGallery();
      showToast("Foto dokumentasi berhasil disimpan dan siap disinkronkan ke Google Drive!", "success");
    });
  }

  renderGallery();
}

/* ==========================================================================
   6. KAS & DANA PUNIA MODULE (WITH AUDIT TRAIL LOGGING)
   ========================================================================== */

function addAuditLogEntry({ aktor, nip, aksi, detail, alasan }) {
  let logs = JSON.parse(localStorage.getItem("AUDIT_LOG_LOCAL") || "[]");
  if (logs.length === 0) {
    logs = [...INITIAL_AUDIT_LOG];
  }
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toTimeString().slice(0, 5);

  const newEntry = {
    id: "LOG-" + Date.now().toString().slice(-4),
    waktu: `${dateStr} ${timeStr} WITA`,
    aktor: aktor || "Pengurus Pura",
    nip: nip || "-",
    aksi: aksi || "INFO",
    detail: detail || "-",
    alasan: alasan || "-"
  };

  logs.unshift(newEntry);
  localStorage.setItem("AUDIT_LOG_LOCAL", JSON.stringify(logs));
  if (typeof window.refreshAuditLogTable === "function") {
    window.refreshAuditLogTable();
  }
  return newEntry;
}

function initKasPuniaModule() {
  const tableBody = document.getElementById("kasTableBody");
  const saldoDisplay = document.getElementById("dashKasSaldo");
  const btnOpenModal = document.getElementById("btnOpenKasModal");
  const filterJenis = document.getElementById("filterKasJenis");

  let kasList = JSON.parse(localStorage.getItem("KAS_PUNIA_LOCAL") || "[]");
  if (kasList.length === 0) {
    kasList = [
      { id: "K-01", tgl: "2026-09-01", jenis: "Masuk", kategori: "Dana Punia Umat", nominal: 15500000, ket: "Punia Rutin Pegawai GKN I Denpasar" },
      { id: "K-02", tgl: "2026-09-05", jenis: "Keluar", kategori: "Banten & Upakara", nominal: 3200000, ket: "Pembelian Sarana Upakara Rahina Purnama" },
      { id: "K-03", tgl: "2026-09-08", jenis: "Masuk", kategori: "Donasi Khusus", nominal: 5000000, ket: "Punia Renovasi Balai Pawedan" }
    ];
    localStorage.setItem("KAS_PUNIA_LOCAL", JSON.stringify(kasList));
  }

  function openKasModal(item = null) {
    const isEdit = !!item;
    const titleText = isEdit ? "Edit Catatan Transaksi Kas" : "Catat Transaksi Kas Baru";

    let baseKategori = "Dana Punia Umat";
    let customKategori = "";
    if (item) {
      if (item.kategori.startsWith("Lain-lain: ")) {
        baseKategori = "Lain-lain";
        customKategori = item.kategori.replace("Lain-lain: ", "").trim();
      } else if (item.kategori === "Lain-lain") {
        baseKategori = "Lain-lain";
      } else {
        baseKategori = item.kategori;
      }
    }

    const modalBodyHtml = `
      <form id="formModalKas">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label for="kasModalTgl" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Tanggal Transaksi *</label>
            <input type="date" id="kasModalTgl" class="form-control" required value="${item ? item.tgl : new Date().toISOString().slice(0, 10)}">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label for="kasModalJenis" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Jenis Mutasi *</label>
            <select id="kasModalJenis" class="form-control">
              <option value="Masuk" ${item && item.jenis === 'Masuk' ? 'selected' : ''}>Pemasukan (+)</option>
              <option value="Keluar" ${item && item.jenis === 'Keluar' ? 'selected' : ''}>Pengeluaran (-)</option>
            </select>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 1rem;">
          <label for="kasModalKategori" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Kategori Transaksi *</label>
          <select id="kasModalKategori" class="form-control">
            <option value="Dana Punia Umat" ${baseKategori === 'Dana Punia Umat' ? 'selected' : ''}>Dana Punia Umat Rutin</option>
            <option value="Donasi Khusus" ${baseKategori === 'Donasi Khusus' ? 'selected' : ''}>Donasi Khusus / Sukarela</option>
            <option value="Banten & Upakara" ${baseKategori === 'Banten & Upakara' ? 'selected' : ''}>Banten & Sarana Upakara</option>
            <option value="Pemeliharaan Fisik" ${baseKategori === 'Pemeliharaan Fisik' ? 'selected' : ''}>Pemeliharaan & Kebersihan Pura</option>
            <option value="Operasional Piodalan" ${baseKategori === 'Operasional Piodalan' ? 'selected' : ''}>Operasional Acara Piodalan</option>
            <option value="Lain-lain" ${baseKategori === 'Lain-lain' ? 'selected' : ''}>Lain-lain (Sebutkan...)</option>
          </select>
        </div>

        <div class="form-group" id="groupKasModalLain" style="margin-bottom: 1rem; display: ${baseKategori === 'Lain-lain' ? 'block' : 'none'};">
          <label for="kasModalKategoriLain" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Sebutkan Kategori Lain-lain *</label>
          <input type="text" id="kasModalKategoriLain" class="form-control" value="${escapeHtml(customKategori)}" placeholder="Contoh: Sewa Tenda / Konsumsi Ngayah / Honor Pemangku">
        </div>

        <div class="form-group" style="margin-bottom: 1rem;">
          <label for="kasModalNominal" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Nominal (Rupiah) *</label>
          <input type="number" id="kasModalNominal" class="form-control" required min="1" step="1" value="${item ? item.nominal : ''}" placeholder="Contoh: 1500000">
        </div>

        <div class="form-group" style="margin-bottom: ${isEdit ? '1rem' : '0.5rem'};">
          <label for="kasModalKet" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Keterangan / Rincian *</label>
          <input type="text" id="kasModalKet" class="form-control" required value="${item ? escapeHtml(item.ket) : ''}" placeholder="Keterangan transaksi atau nama penyumbang">
        </div>

        ${isEdit ? `
        <div class="form-group" style="margin-bottom: 0.5rem; background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border-left: 3px solid var(--primary);">
          <label for="kasModalReason" style="display: block; font-weight: 600; font-size: 0.82rem; margin-bottom: 0.25rem; color: var(--text-main);">
            Alasan Perubahan / Koreksi (Dicatat ke Log Audit)
          </label>
          <input type="text" id="kasModalReason" class="form-control" style="font-size: 0.82rem;" placeholder="Contoh: Koreksi salah input nominal / ganti pos akun">
        </div>
        ` : ''}
      </form>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Batal</button>
      <button type="button" class="btn btn-primary" id="btnSaveKasModal">
        <svg class="icon-sm" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${isEdit ? 'Simpan Perubahan' : 'Simpan Transaksi Kas'}</span>
      </button>
    `;

    showModal({
      title: `<svg class="icon" style="color: var(--primary);" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> ${titleText}`,
      bodyHtml: modalBodyHtml,
      footerHtml: footerHtml
    });

    const selectKategori = document.getElementById("kasModalKategori");
    const groupLain = document.getElementById("groupKasModalLain");
    const inputLain = document.getElementById("kasModalKategoriLain");

    if (selectKategori) {
      selectKategori.addEventListener("change", () => {
        if (selectKategori.value === "Lain-lain") {
          if (groupLain) groupLain.style.display = "block";
          if (inputLain) inputLain.required = true;
        } else {
          if (groupLain) groupLain.style.display = "none";
          if (inputLain) {
            inputLain.required = false;
            inputLain.value = "";
          }
        }
      });
    }

    const btnSave = document.getElementById("btnSaveKasModal");
    if (btnSave) {
      btnSave.addEventListener("click", () => {
        const formEl = document.getElementById("formModalKas");
        if (!formEl.checkValidity()) {
          formEl.reportValidity();
          return;
        }

        let catVal = selectKategori ? selectKategori.value : "Lain-lain";
        if (catVal === "Lain-lain") {
          const custom = inputLain ? inputLain.value.trim() : "";
          catVal = custom ? `Lain-lain: ${custom}` : "Lain-lain";
        }

        const tglVal = document.getElementById("kasModalTgl").value || new Date().toISOString().slice(0, 10);
        const jenisVal = document.getElementById("kasModalJenis").value;
        const nominalVal = Number(document.getElementById("kasModalNominal").value);
        const ketVal = document.getElementById("kasModalKet").value.trim();
        const reasonInput = document.getElementById("kasModalReason");
        const reasonVal = reasonInput ? reasonInput.value.trim() : "";

        const currUser = AuthService.getUser() || { nama: "Pengurus Pura", roleLabel: "Pengurus" };

        if (isEdit) {
          const oldIndex = kasList.findIndex((k) => k.id === item.id);
          if (oldIndex !== -1) {
            const oldItem = kasList[oldIndex];
            kasList[oldIndex] = {
              ...oldItem,
              tgl: tglVal,
              jenis: jenisVal,
              kategori: catVal,
              nominal: nominalVal,
              ket: ketVal
            };

            addAuditLogEntry({
              aktor: `${currUser.nama} (${currUser.roleLabel || currUser.role})`,
              nip: currUser.nip || "-",
              aksi: "EDIT",
              detail: `Koreksi: ${oldItem.kategori} [${oldItem.jenis}] (Rp ${Number(oldItem.nominal).toLocaleString('id-ID')}) -> ${catVal} [${jenisVal}] (Rp ${nominalVal.toLocaleString('id-ID')})`,
              alasan: reasonVal || "Perubahan / koreksi rincian transaksi kas"
            });
          }
        } else {
          const newKas = {
            id: "K-" + Date.now().toString().slice(-4),
            tgl: tglVal,
            jenis: jenisVal,
            kategori: catVal,
            nominal: nominalVal,
            ket: ketVal
          };

          kasList.unshift(newKas);

          addAuditLogEntry({
            aktor: `${currUser.nama} (${currUser.roleLabel || currUser.role})`,
            nip: currUser.nip || "-",
            aksi: "TAMBAH",
            detail: `${newKas.kategori} [${newKas.jenis}] (Rp ${newKas.nominal.toLocaleString('id-ID')}) - ${newKas.ket}`,
            alasan: "Pencatatan mutasi kas baru"
          });
        }

        localStorage.setItem("KAS_PUNIA_LOCAL", JSON.stringify(kasList));

        // Sinkronisasi asinkron ke Google Sheets via Google Apps Script Web App
        try {
          fetch(API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
              action: "saveKas",
              id: isEdit ? item.id : newKas.id,
              tgl: tglVal,
              jenis: jenisVal,
              kategori: catVal,
              nominal: nominalVal,
              ket: ketVal
            })
          }).catch(err => console.warn("GAS saveKas deferred:", err));
        } catch (e) {}

        closeModal();
        render();
        updateOverviewKpi();
        if (typeof window.refreshBerandaUmat === "function") window.refreshBerandaUmat();
        if (typeof window.refreshAuditLogTable === "function") window.refreshAuditLogTable();

        showToast(
          isEdit ? "Perubahan transaksi kas berhasil disimpan & tercatat di audit!" : "Mutasi kas baru berhasil dicatat & masuk ke audit!",
          "success"
        );
      });
    }
  }

  function render() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    let totalMasuk = 0;
    let totalKeluar = 0;
    kasList.forEach((k) => {
      if (k.jenis === "Masuk") totalMasuk += Number(k.nominal);
      else totalKeluar += Number(k.nominal);
    });

    const saldo = totalMasuk - totalKeluar;
    if (saldoDisplay) saldoDisplay.textContent = `Rp ${saldo.toLocaleString('id-ID')}`;

    const activeFilter = filterJenis ? filterJenis.value : "ALL";
    const filteredList = kasList.filter((k) => {
      if (activeFilter === "ALL") return true;
      return k.jenis === activeFilter;
    });

    if (filteredList.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2.5rem 1rem;">Belum ada catatan transaksi kas${activeFilter !== 'ALL' ? ' untuk filter ini' : ''}.</td></tr>`;
      return;
    }

    filteredList.forEach((k) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="white-space: nowrap; font-weight: 500;">${k.tgl}</td>
        <td><span class="satker-badge ${k.jenis === 'Masuk' ? 'satker-djbc' : 'satker-djp'}">${k.jenis}</span></td>
        <td style="font-weight: 500;">${escapeHtml(k.kategori)}</td>
        <td style="color: var(--text-main);">${escapeHtml(k.ket)}</td>
        <td style="text-align: right; font-weight: 700; white-space: nowrap; color: ${k.jenis === 'Masuk' ? '#059669' : '#DC2626'};">
          ${k.jenis === 'Masuk' ? '+' : '-'} Rp ${Number(k.nominal).toLocaleString('id-ID')}
        </td>
        <td style="text-align: center; white-space: nowrap;">
          <button class="btn-action-sm btn-edit-kas" data-id="${k.id}" style="color: var(--primary); border-color: rgba(217, 119, 6, 0.35); margin-right: 4px;" title="Edit Transaksi">Edit</button>
          <button class="btn-action-sm btn-del-kas" data-id="${k.id}" style="color: var(--status-danger-text); border-color: rgba(239, 68, 68, 0.25);" title="Hapus Catatan Transaksi">Hapus</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    // Event listener Edit transaksi kas
    tableBody.querySelectorAll(".btn-edit-kas").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = kasList.find((k) => k.id === id);
        if (item) {
          openKasModal(item);
        }
      });
    });

    // Event listener Hapus transaksi kas
    tableBody.querySelectorAll(".btn-del-kas").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = kasList.find((k) => k.id === id);
        if (!item) return;

        const nominalFormatted = Number(item.nominal).toLocaleString('id-ID');
        const modalContent = `
          <div style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 1rem;">
            Anda akan menghapus catatan mutasi kas berikut:
            <div style="margin-top: 0.5rem; padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-sm); border-left: 3px solid #EF4444;">
              <div><strong>Kategori:</strong> ${escapeHtml(item.kategori)} (${item.jenis})</div>
              <div><strong>Nominal:</strong> Rp ${nominalFormatted}</div>
              <div><strong>Keterangan:</strong> ${escapeHtml(item.ket)}</div>
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label for="inputKasDeleteReason" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">
              Alasan Penghapusan Transaksi (Wajib diisi untuk catatan audit) <span style="color: #EF4444;">*</span>
            </label>
            <textarea id="inputKasDeleteReason" class="form-control" rows="3" placeholder="Contoh: Salah input nominal upakara / koreksi pos transaksi duplikat..." required></textarea>
          </div>
        `;

        showModal({
          title: `<svg class="icon-sm" style="color: #EF4444;" viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Konfirmasi Hapus Transaksi Kas`,
          bodyHtml: modalContent,
          footerHtml: `
            <button type="button" class="btn btn-secondary" onclick="closeModal()">Batal</button>
            <button type="button" class="btn btn-danger" id="btnSubmitKasDelete" style="background: #EF4444; border-color: #DC2626; color: white;">
              Hapus & Catat ke Log Audit
            </button>
          `
        });

        const submitBtn = document.getElementById("btnSubmitKasDelete");
        if (submitBtn) {
          submitBtn.onclick = () => {
            const reasonInput = document.getElementById("inputKasDeleteReason");
            const reason = reasonInput ? reasonInput.value.trim() : "";
            if (!reason) {
              showToast("Alasan penghapusan wajib diisi untuk transparansi & audit!", "error");
              if (reasonInput) reasonInput.focus();
              return;
            }

            kasList = kasList.filter((k) => k.id !== id);
            localStorage.setItem("KAS_PUNIA_LOCAL", JSON.stringify(kasList));

            const currUser = AuthService.getUser() || { nama: "Pengurus Pura", roleLabel: "Pengurus" };
            addAuditLogEntry({
              aktor: `${currUser.nama} (${currUser.roleLabel || currUser.role})`,
              nip: currUser.nip || "-",
              aksi: "HAPUS",
              detail: `${item.kategori} [${item.jenis}] (Rp ${nominalFormatted}) - ${item.ket}`,
              alasan: reason
            });

            closeModal();
            render();
            updateOverviewKpi();
            if (typeof window.refreshBerandaUmat === "function") window.refreshBerandaUmat();
            if (typeof window.refreshAuditLogTable === "function") window.refreshAuditLogTable();
            showToast("Catatan transaksi kas berhasil dihapus dan tercatat di Log Audit.", "info");
          };
        }
      });
    });
  }

  if (btnOpenModal) {
    btnOpenModal.addEventListener("click", () => openKasModal(null));
  }

  if (filterJenis) {
    filterJenis.addEventListener("change", render);
  }

  render();
}

/* ==========================================================================
   6.1. LOG & AUDIT MUTASI KAS MODULE
   ========================================================================== */
function initAuditKasModule(currentUser) {
  const tableBody = document.getElementById("auditTableBody");
  const filterSelect = document.getElementById("filterAuditAction");
  const countEl = document.getElementById("auditLogCount");
  const exportBtn = document.getElementById("btnExportAuditLog");

  let logs = JSON.parse(localStorage.getItem("AUDIT_LOG_LOCAL") || "[]");
  if (logs.length === 0) {
    logs = [...INITIAL_AUDIT_LOG];
    localStorage.setItem("AUDIT_LOG_LOCAL", JSON.stringify(logs));
  }

  function render() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    const filterVal = filterSelect ? filterSelect.value : "ALL";
    const filtered = logs.filter(item => {
      if (filterVal === "ALL") return true;
      return item.aksi === filterVal;
    });

    if (countEl) countEl.textContent = `Menampilkan ${filtered.length} riwayat aktivitas`;

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">Belum ada catatan log audit untuk filter ini.</td></tr>`;
      return;
    }

    filtered.forEach(log => {
      const tr = document.createElement("tr");
      const badgeClass = log.aksi === "TAMBAH" ? "active" : (log.aksi === "HAPUS" ? "danger" : "pending");
      tr.innerHTML = `
        <td style="color: var(--text-muted); font-size: 0.78rem;"><code>${escapeHtml(log.waktu)}</code></td>
        <td>
          <div style="font-weight: 600; color: var(--text-main);">${escapeHtml(log.aktor)}</div>
          ${log.nip && log.nip !== '-' ? `<div style="font-size: 0.72rem; color: var(--text-muted);">NIP: ${escapeHtml(log.nip)}</div>` : ''}
        </td>
        <td style="text-align: center;">
          <span class="status-badge ${badgeClass}" style="font-size: 0.72rem; font-weight: 700;">
            ${escapeHtml(log.aksi)}
          </span>
        </td>
        <td style="font-weight: 500;">${escapeHtml(log.detail)}</td>
        <td style="color: var(--text-muted); font-style: italic;">${escapeHtml(log.alasan || '-')}</td>
      `;
      tableBody.appendChild(tr);
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener("change", render);
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      let csvContent = "data:text/csv;charset=utf-8,ID,Waktu,Aktor,Aksi,Rincian,Alasan\n";
      logs.forEach(l => {
        csvContent += `"${l.id}","${l.waktu}","${l.aktor}","${l.aksi}","${l.detail.replace(/"/g, '""')}","${(l.alasan || '').replace(/"/g, '""')}"\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `audit_log_kas_amerthabhumi_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Data log audit kas berhasil diekspor ke CSV.", "success");
    });
  }

  render();
  window.refreshAuditLogTable = () => {
    logs = JSON.parse(localStorage.getItem("AUDIT_LOG_LOCAL") || "[]");
    render();
  };
}

/* ==========================================================================
   6.2. BERANDA UMAT MODULE (TRANSPARANSI KAS & AGENDA UNTUK ANGGOTA BIASA)
   ========================================================================== */
function initBerandaUmatModule(currentUser) {
  const greetingEl = document.getElementById("berandaUmatGreeting");
  const saldoEl = document.getElementById("umatKasSaldo");
  const pemasukanEl = document.getElementById("umatKasPemasukan");
  const pengeluaranEl = document.getElementById("umatKasPengeluaran");
  const pengeluaranTableBody = document.getElementById("umatPengeluaranTableBody");
  const agendaListEl = document.getElementById("umatAgendaList");
  const shortcutPengumuman = document.getElementById("btnShortcutPengumuman");

  if (greetingEl && currentUser) {
    greetingEl.textContent = `Om Swastyastu, ${currentUser.nama}`;
  }

  function updateKasSummary() {
    const kasList = JSON.parse(localStorage.getItem("KAS_PUNIA_LOCAL") || "[]");
    let totalMasuk = 0;
    let totalKeluar = 0;
    const pengeluaranList = [];

    kasList.forEach(k => {
      const nom = Number(k.nominal) || 0;
      if (k.jenis === "Masuk") {
        totalMasuk += nom;
      } else {
        totalKeluar += nom;
        pengeluaranList.push(k);
      }
    });

    const saldo = totalMasuk - totalKeluar;
    if (saldoEl) saldoEl.textContent = `Rp ${saldo.toLocaleString('id-ID')}`;
    if (pemasukanEl) pemasukanEl.textContent = `Rp ${totalMasuk.toLocaleString('id-ID')}`;
    if (pengeluaranEl) pengeluaranEl.textContent = `Rp ${totalKeluar.toLocaleString('id-ID')}`;

    if (pengeluaranTableBody) {
      pengeluaranTableBody.innerHTML = "";
      if (pengeluaranList.length === 0) {
        pengeluaranTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Belum ada riwayat alokasi pengeluaran kas.</td></tr>`;
      } else {
        pengeluaranList.slice(0, 5).forEach(item => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${item.tgl}</td>
            <td><span class="satker-badge satker-djp" style="background: #FEF2F2; color: #DC2626; border-color: #FECACA;">${escapeHtml(item.kategori)}</span></td>
            <td>${escapeHtml(item.ket)}</td>
            <td style="text-align: right; font-weight: 700; color: #DC2626;">- Rp ${Number(item.nominal).toLocaleString('id-ID')}</td>
          `;
          pengeluaranTableBody.appendChild(tr);
        });
      }
    }
  }

  function renderUpcomingAgenda() {
    if (!agendaListEl) return;
    const agendaList = JSON.parse(localStorage.getItem("AGENDA_KEGIATAN_LOCAL") || "[]");
    agendaListEl.innerHTML = "";

    const items = (agendaList.length > 0) ? agendaList : INITIAL_AGENDA;

    items.slice(0, 3).forEach(ag => {
      const card = document.createElement("div");
      card.style.cssText = "padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-card); display: flex; flex-direction: column; gap: 0.35rem;";
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--text-main);">${escapeHtml(ag.nama)}</h4>
          <span class="status-badge active" style="font-size: 0.7rem;">Kegiatan Bersama</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--primary); font-weight: 600; display: flex; align-items: center; gap: 0.35rem;">
          <svg class="icon-sm" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          ${escapeHtml(ag.tanggal)}
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span>⏰ ${escapeHtml(ag.waktu || '17:00 WITA - Selesai')}</span>
          <span>📍 ${escapeHtml(ag.lokasi || 'Pura Amertha Bhumi GKN I')}</span>
        </div>
      `;
      agendaListEl.appendChild(card);
    });
  }

  if (shortcutPengumuman) {
    shortcutPengumuman.addEventListener("click", () => {
      const navPengumuman = document.querySelector('[data-tab="tab-pengumuman"]');
      if (navPengumuman) navPengumuman.click();
    });
  }

  updateKasSummary();
  renderUpcomingAgenda();
  window.refreshBerandaUmat = () => {
    updateKasSummary();
    renderUpcomingAgenda();
  };
}

/* ==========================================================================
   6.5. JADWAL KEGIATAN PURA AMERTHA BHUMI (CRUD KEGIATAN PURA)
   ========================================================================== */

function initAgendaModule(user) {
  const tableBody = document.getElementById("agendaTableBody");
  const adminAction = document.getElementById("agendaAdminAction");
  const btnTambah = document.getElementById("btnTambahAgenda");
  const thAksi = document.getElementById("thAgendaAksi");

  // Semua pengurus (Ketua, Sekretaris, Bendahara, Editor) memiliki hak kelola kegiatan
  const canManage = (user.role !== "member");

  if (adminAction) {
    adminAction.style.display = canManage ? "block" : "none";
  }

  if (thAksi && !canManage) {
    thAksi.style.display = "none";
  }

  let cachedAgenda = JSON.parse(localStorage.getItem("AGENDA_KEGIATAN_LOCAL") || "[]");
  if (cachedAgenda.length === 0 || !cachedAgenda[0].ket) {
    cachedAgenda = INITIAL_AGENDA;
    localStorage.setItem("AGENDA_KEGIATAN_LOCAL", JSON.stringify(cachedAgenda));
  }

  function getAgendaList() {
    return JSON.parse(localStorage.getItem("AGENDA_KEGIATAN_LOCAL") || "[]");
  }

  function saveAgendaList(list) {
    localStorage.setItem("AGENDA_KEGIATAN_LOCAL", JSON.stringify(list));
  }

  function renderTable() {
    if (!tableBody) return;
    const list = getAgendaList();

    if (list.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="${canManage ? 6 : 5}" style="text-align: center; color: var(--text-muted); padding: 2rem;">Belum ada jadwal kegiatan pura yang terdaftar.</td></tr>`;
      return;
    }

    tableBody.innerHTML = list.map(item => `
      <tr>
        <td><strong style="color: var(--text-main); font-size: 0.9rem;">${escapeHtml(item.nama)}</strong></td>
        <td><span style="font-weight: 500;">${escapeHtml(item.tanggal)}</span></td>
        <td><span style="font-weight: 600; color: var(--primary);">${escapeHtml(item.waktu)}</span></td>
        <td>${escapeHtml(item.lokasi)}</td>
        <td style="color: var(--text-muted); font-size: 0.8rem;">${escapeHtml(item.ket || 'Pakaian Adat Madya')}</td>
        ${canManage ? `
        <td style="text-align: center;">
          <div style="display: flex; gap: 0.35rem; justify-content: center;">
            <button class="btn-action-sm btn-edit-agenda" data-id="${item.id}" style="color: var(--primary); font-weight: 600;">Edit</button>
            <button class="btn-action-sm btn-del-agenda" data-id="${item.id}" style="color: var(--status-danger-text); border-color: rgba(239, 68, 68, 0.25);">Hapus</button>
          </div>
        </td>` : ''}
      </tr>
    `).join("");

    // Attach edit handlers
    tableBody.querySelectorAll(".btn-edit-agenda").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const found = list.find(x => x.id === id);
        if (found) openAgendaModal(found);
      });
    });

    // Attach delete handlers dengan modal konfirmasi modern
    tableBody.querySelectorAll(".btn-del-agenda").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const found = list.find(x => x.id === id);
        const eventName = found ? found.nama : "kegiatan ini";

        showConfirmModal(
          "Hapus Kegiatan Pura",
          `Apakah Anda yakin ingin menghapus jadwal <strong>${escapeHtml(eventName)}</strong> dari kalender kegiatan pura?`,
          () => {
            const filtered = getAgendaList().filter(x => x.id !== id);
            saveAgendaList(filtered);
            renderTable();
            if (typeof window.refreshBerandaUmat === "function") {
              window.refreshBerandaUmat();
            }
            showToast("Kegiatan pura berhasil dihapus.", "info");
          }
        );
      });
    });
  }

  function openAgendaModal(agenda = null) {
    const isEdit = !!agenda;
    const titleText = isEdit ? "Edit Kegiatan Pura Amertha Bhumi" : "Tambah Kegiatan Pura Baru";

    const modalBodyHtml = `
      <form id="formModalAgenda">
        <div class="form-group" style="margin-bottom: 1rem;">
          <label for="agendaNama" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Nama Kegiatan *</label>
          <input type="text" id="agendaNama" class="form-control" required value="${agenda ? escapeHtml(agenda.nama) : ''}" placeholder="Contoh: Persembahyangan Purnama Kadasa / Dharma Tula">
        </div>

        <div class="form-row" style="margin-bottom: 1rem; display: flex; gap: 1rem;">
          <div class="form-group" style="flex: 1;">
            <label for="agendaTanggal" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Hari / Tanggal *</label>
            <input type="text" id="agendaTanggal" class="form-control" required value="${agenda ? escapeHtml(agenda.tanggal) : ''}" placeholder="Contoh: Purnama Kadasa (24 Oktober 2026)">
          </div>
          <div class="form-group" style="flex: 1;">
            <label for="agendaWaktu" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Waktu Pelaksanaan *</label>
            <input type="text" id="agendaWaktu" class="form-control" required value="${agenda ? escapeHtml(agenda.waktu) : '17:00 WITA'}" placeholder="Contoh: 17:00 WITA - Selesai">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 1rem;">
          <label for="agendaLokasi" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Lokasi Pelaksanaan *</label>
          <input type="text" id="agendaLokasi" class="form-control" required value="${agenda ? escapeHtml(agenda.lokasi) : 'Utama Mandala Pura Amertha Bhumi'}" placeholder="Contoh: Utama Mandala Pura Amertha Bhumi GKN I">
        </div>

        <div class="form-group" style="margin-bottom: 0.5rem;">
          <label for="agendaKet" style="display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.35rem; color: var(--text-main);">Keterangan / Dresscode</label>
          <input type="text" id="agendaKet" class="form-control" value="${agenda ? escapeHtml(agenda.ket || '') : 'Pakaian Adat Madya, seluruh umat sedharma'}" placeholder="Contoh: Pakaian Adat Madya / Pakaian Kerja Bebas">
        </div>
      </form>
    `;

    const footerHtml = `
      <button type="button" class="btn btn-secondary" onclick="closeModal()">Batal</button>
      <button type="button" class="btn btn-primary" id="btnSaveModalAgenda">
        <svg class="icon-sm" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        <span>${isEdit ? 'Simpan Perubahan' : 'Simpan Kegiatan'}</span>
      </button>
    `;

    showModal({
      title: `<svg class="icon" style="color: var(--primary);" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${titleText}`,
      bodyHtml: modalBodyHtml,
      footerHtml: footerHtml
    });

    // Handle modal save
    const btnSave = document.getElementById("btnSaveModalAgenda");
    if (btnSave) {
      btnSave.addEventListener("click", () => {
        const formEl = document.getElementById("formModalAgenda");
        if (!formEl.checkValidity()) {
          formEl.reportValidity();
          return;
        }

        const nama = document.getElementById("agendaNama").value.trim();
        const tanggal = document.getElementById("agendaTanggal").value.trim();
        const waktu = document.getElementById("agendaWaktu").value.trim();
        const lokasi = document.getElementById("agendaLokasi").value.trim();
        const ket = document.getElementById("agendaKet").value.trim();

        const list = getAgendaList();

        if (isEdit) {
          const idx = list.findIndex(x => x.id === agenda.id);
          if (idx !== -1) {
            list[idx].nama = nama;
            list[idx].tanggal = tanggal;
            list[idx].waktu = waktu;
            list[idx].lokasi = lokasi;
            list[idx].ket = ket;
          }
        } else {
          list.unshift({
            id: "AGD-" + Date.now().toString().slice(-4),
            nama,
            tanggal,
            waktu,
            lokasi,
            ket
          });
        }

        saveAgendaList(list);
        closeModal();
        renderTable();
        if (typeof window.refreshBerandaUmat === "function") {
          window.refreshBerandaUmat();
        }
        showToast(isEdit ? "Perubahan kegiatan pura berhasil disimpan!" : "Kegiatan pura baru berhasil ditambahkan!", "success");
      });
    }
  }

  // Pasang listener pada tombol Tambah
  if (btnTambah) {
    btnTambah.addEventListener("click", () => openAgendaModal());
  }

  renderTable();
}

/* ==========================================================================
   7. BROADCAST PENGUMUMAN UMAT MODULE
   ========================================================================== */

function initPengumumanModule(user) {
  const feedList = document.getElementById("broadcastFeedList");
  const creatorBox = document.getElementById("broadcastCreatorBox");
  const toggleBtn = document.getElementById("btnToggleBroadcastForm");
  const cancelBtn = document.getElementById("btnCancelBroadcast");
  const form = document.getElementById("broadcastForm");

  if (!localStorage.getItem("BROADCAST_PENGUMUMAN_LOCAL")) {
    localStorage.setItem("BROADCAST_PENGUMUMAN_LOCAL", JSON.stringify(INITIAL_PENGUMUMAN));
  }

  function getBroadcasts() {
    return JSON.parse(localStorage.getItem("BROADCAST_PENGUMUMAN_LOCAL") || "[]");
  }

  function saveBroadcasts(list) {
    localStorage.setItem("BROADCAST_PENGUMUMAN_LOCAL", JSON.stringify(list));
  }

  function renderFeed() {
    if (!feedList) return;
    const list = getBroadcasts();

    if (list.length === 0) {
      feedList.innerHTML = `
        <div style="background: var(--bg-card); padding: 3rem 1.5rem; text-align: center; border-radius: var(--radius-lg); border: 1px dashed var(--border-color); color: var(--text-muted);">
          <h4 style="color: var(--text-main); margin-bottom: 0.25rem;">Belum Ada Pengumuman Siaran</h4>
          <p style="font-size: 0.85rem;">Semua pengumuman resmi dari Pengurus Pura Amertha Bhumi akan ditampilkan di sini.</p>
        </div>
      `;
      return;
    }

    const sorted = [...list].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

    feedList.innerHTML = sorted.map(item => {
      const badgeClass = item.kategori || "umum";
      const canDelete = (user.role === "secretary" || user.role === "admin");

      return `
        <article class="broadcast-card ${item.pinned ? 'pinned' : ''}">
          <div class="broadcast-card-header">
            <div class="broadcast-badge-group">
              <span class="broadcast-badge ${badgeClass}">${item.kategoriLabel || item.kategori}</span>
              ${item.pinned ? `<span style="font-size: 0.72rem; background: var(--primary-light); color: var(--primary-dark); font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 99px; display: inline-flex; align-items: center; gap: 0.25rem;"><svg class="icon-sm" style="width:12px; height:12px;" viewBox="0 0 24 24"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg> Disematkan</span>` : ''}
            </div>
            <div class="broadcast-meta">
              <svg class="icon-sm" style="width: 14px; height: 14px;" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>${item.tanggal || "Terkini"}</span>
            </div>
          </div>

          <h3 class="broadcast-title">${escapeHtml(item.judul)}</h3>
          <div class="broadcast-body">${escapeHtml(item.isi)}</div>

          <div class="broadcast-footer">
            <div class="broadcast-author">
              <svg class="icon-sm" style="width: 15px; height: 15px; color: var(--primary);" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>Diposting oleh: <strong>${escapeHtml(item.penulis || 'Pengurus Pura GKN I')}</strong></span>
            </div>

            <div class="broadcast-actions">
              ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="min-height: 36px; padding: 0.35rem 0.85rem; font-size: 0.8rem;"><svg class="icon-sm" style="width:14px;height:14px;" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> Tautan</a>` : ''}
              <button type="button" class="btn btn-secondary btn-copy-broadcast" data-id="${item.id}" style="min-height: 36px; padding: 0.35rem 0.85rem; font-size: 0.8rem;">
                <svg class="icon-sm" style="width:14px;height:14px;" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                <span>Salin Pesan</span>
              </button>
              ${canDelete ? `<button type="button" class="btn btn-danger btn-delete-broadcast" data-id="${item.id}" style="min-height: 36px; padding: 0.35rem 0.75rem; font-size: 0.8rem; background: #FEE2E2; color: #DC2626; border: 1px solid #FCA5A5;">Hapus</button>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Salin pesan ke clipboard
    document.querySelectorAll(".btn-copy-broadcast").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const found = list.find(x => x.id === id);
        if (found) {
          const textToCopy = `*PURA AMERTHA BHUMI GKN I DENPASAR*\n*${found.judul}*\n\n${found.isi}\n\nTanggal: ${found.tanggal || '-'}\nDiposting oleh: ${found.penulis || 'Pengurus Pura'}`;
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast("Pesan pengumuman berhasil disalin ke clipboard!", "success");
          });
        }
      });
    });

    // Hapus pesan
    document.querySelectorAll(".btn-delete-broadcast").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Hapus pengumuman siaran ini?")) {
          const filtered = getBroadcasts().filter(x => x.id !== id);
          saveBroadcasts(filtered);
          renderFeed();
          showToast("Pengumuman berhasil dihapus.", "info");
        }
      });
    });
  }

  // Toggle form
  if (toggleBtn && creatorBox) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = (creatorBox.style.display === "none");
      creatorBox.style.display = isHidden ? "block" : "none";
      if (isHidden) {
        creatorBox.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (cancelBtn && creatorBox) {
    cancelBtn.addEventListener("click", () => {
      creatorBox.style.display = "none";
    });
  }

  // Submit form broadcast
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const judul = document.getElementById("broadcastJudul").value.trim();
      const kategori = document.getElementById("broadcastKategori").value;
      const tanggal = document.getElementById("broadcastTanggal").value.trim() || new Date().toLocaleDateString("id-ID", { dateStyle: "full" });
      const link = document.getElementById("broadcastLink").value.trim();
      const pinned = document.getElementById("broadcastPinned").checked;
      const isi = document.getElementById("broadcastIsi").value.trim();

      const labelMap = {
        kegiatan: "Kegiatan & Ngayah",
        penting: "Penting / Mendesak",
        rerahinan: "Rerahinan & Puja",
        umum: "Umum & Warta"
      };

      const newBc = {
        id: "BC-" + Date.now().toString().slice(-4),
        judul,
        kategori,
        kategoriLabel: labelMap[kategori] || "Umum",
        tanggal,
        penulis: `${user.nama} (${user.roleLabel || 'Pengurus'})`,
        pinned,
        link,
        isi
      };

      const list = getBroadcasts();
      list.unshift(newBc);
      saveBroadcasts(list);

      form.reset();
      if (creatorBox) creatorBox.style.display = "none";
      renderFeed();
      showToast("Pengumuman berhasil disiarkan ke seluruh umat!", "success");
    });
  }

  renderFeed();
}

/* ==========================================================================
   8. EDIT PROFIL & AKUN MODULE
   ========================================================================== */
function initProfileModule(user) {
  const avatarEl = document.getElementById("profileAvatarPreview");
  const nameEl = document.getElementById("profileOverviewName");
  const nipEl = document.getElementById("profileOverviewNip");
  const roleEl = document.getElementById("profileOverviewRole");
  const satkerEl = document.getElementById("profileOverviewSatker");
  const jabatanEl = document.getElementById("profileOverviewJabatan");

  const inputNama = document.getElementById("profNama");
  const inputNip = document.getElementById("profNip");
  const inputSatker = document.getElementById("profSatker");
  const inputJabatan = document.getElementById("profJabatan");
  const inputWhatsapp = document.getElementById("profWhatsapp");
  const inputAlamat = document.getElementById("profAlamat");

  const formProfile = document.getElementById("profileForm");
  const formPassword = document.getElementById("passwordForm");

  function populateData(u) {
    if (avatarEl) {
      if (u.photoUrl) {
        avatarEl.innerHTML = `<img src="${u.photoUrl}" alt="Foto Profil" style="width: 100%; height: 100%; object-fit: cover;">`;
      } else {
        const initials = (u.nama || "Umat").split(" ").map(w => w[0]).slice(0, 2).join("");
        avatarEl.textContent = initials || "PB";
      }
    }
    if (nameEl) nameEl.textContent = u.nama || "-";
    if (nipEl) nipEl.textContent = "NIP. " + (u.nip || "-");
    if (roleEl) roleEl.textContent = u.roleLabel || u.role;
    if (satkerEl) satkerEl.textContent = u.satker || "Gedung Keuangan Negara I Denpasar";
    if (jabatanEl) jabatanEl.textContent = u.jabatan || "-";

    if (inputNama) inputNama.value = u.nama || "";
    if (inputNip) inputNip.value = u.nip || "";
    if (inputSatker && u.satker) {
      for (let i = 0; i < inputSatker.options.length; i++) {
        if (inputSatker.options[i].value.toLowerCase().includes(u.satker.toLowerCase()) || 
            u.satker.toLowerCase().includes(inputSatker.options[i].value.toLowerCase())) {
          inputSatker.selectedIndex = i;
          break;
        }
      }
    }
    if (inputJabatan) inputJabatan.value = u.jabatan || "";
    if (inputWhatsapp) inputWhatsapp.value = u.whatsapp || "081234567890";
    if (inputAlamat) inputAlamat.value = u.alamat || "Denpasar, Bali";
  }

  populateData(user);
  setupPhotoCapture(user);

  function setupPhotoCapture(u) {
    const btnWebcam = document.getElementById("btnAmbilFotoWebcam");
    const fileInput = document.getElementById("profFotoFileInput");
    const cameraInput = document.getElementById("profFotoCameraMobile");

    function saveAndApplyPhoto(dataUrl) {
      u.photoUrl = dataUrl;
      const rawSession = localStorage.getItem("AMERTHA_BHUMI_SESSION");
      if (rawSession) {
        try {
          const session = JSON.parse(rawSession);
          session.user.photoUrl = dataUrl;
          localStorage.setItem("AMERTHA_BHUMI_SESSION", JSON.stringify(session));
        } catch (e) {}
      }
      const umatList = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
      const idx = umatList.findIndex(item => item.nip === u.nip);
      if (idx !== -1) {
        umatList[idx].photoUrl = dataUrl;
        localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(umatList));
        if (typeof window.refreshCrmTable === "function") window.refreshCrmTable();
      }
      if (avatarEl) {
        avatarEl.innerHTML = `<img src="${dataUrl}" alt="Foto Profil" style="width: 100%; height: 100%; object-fit: cover;">`;
      }
      const topAvatar = document.getElementById("topbarUserAvatar");
      if (topAvatar) {
        topAvatar.innerHTML = `<img src="${dataUrl}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">`;
      }
      showToast("Foto profil Anda berhasil diperbarui!", "success");
    }

    function handleFile(file) {
      if (!file) return;
      if (!file.type || !file.type.startsWith("image/")) {
        showToast("Pilih berkas berupa gambar atau foto.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const size = Math.min(img.width, img.height);
          canvas.width = 360;
          canvas.height = 360;
          const ctx = canvas.getContext("2d");
          const startX = (img.width - size) / 2;
          const startY = (img.height - size) / 2;
          ctx.drawImage(img, startX, startY, size, size, 0, 0, 360, 360);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          saveAndApplyPhoto(dataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          handleFile(e.target.files[0]);
        }
      });
    }

    if (cameraInput) {
      cameraInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          handleFile(e.target.files[0]);
        }
      });
    }

    if (btnWebcam) {
      btnWebcam.addEventListener("click", () => {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         ('ontouchstart' in window && window.innerWidth <= 768);

        if (isMobile && cameraInput) {
          cameraInput.click();
          return;
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          showToast("Webcam tidak dapat diakses langsung. Membuka pemilih berkas...", "info");
          if (fileInput) fileInput.click();
          return;
        }

        let isModalOpen = true;
        let currentStream = null;

        function stopStream() {
          isModalOpen = false;
          if (currentStream) {
            try {
              currentStream.getTracks().forEach(track => {
                track.stop();
                track.enabled = false;
              });
            } catch (e) {
              console.warn("Error stopping webcam tracks:", e);
            }
            currentStream = null;
          }
          const vid = document.getElementById("webcamVideo");
          if (vid) {
            try {
              vid.pause();
              vid.srcObject = null;
            } catch (e) {}
          }
        }

        const bodyHtml = `
          <div style="text-align: center;">
            <div style="position: relative; width: 100%; max-width: 380px; height: 285px; margin: 0 auto; background: #000; border-radius: var(--radius-md, 8px); overflow: hidden; border: 2px solid var(--border-color, #CBD5E1);">
              <video id="webcamVideo" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1);"></video>
              <div id="webcamLoadingText" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 0.88rem; background: rgba(0,0,0,0.6);">
                Menghubungkan kamera...
              </div>
              <div style="position: absolute; inset: 0; pointer-events: none; border: 2px dashed rgba(255,255,255,0.4); border-radius: 999px; margin: 15px auto; width: 230px; height: 230px;"></div>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.65rem;">
              Posisikan wajah Anda di dalam lingkaran panduan, lalu tekan tombol <strong>Jepret Foto</strong>.
            </p>
          </div>
        `;

        const footerHtml = `
          <button type="button" class="btn btn-secondary" id="btnCancelWebcam">Batal</button>
          <button type="button" class="btn btn-primary" id="btnCaptureWebcam" style="background: #059669; border-color: #047857;">
            <svg class="icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
            Jepret Foto
          </button>
        `;

        showModal({
          title: `<svg class="icon" style="color: #059669;" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> Ambil Foto Profil (Webcam)`,
          bodyHtml: bodyHtml,
          footerHtml: footerHtml,
          onClose: stopStream
        });

        const videoEl = document.getElementById("webcamVideo");
        const loadingText = document.getElementById("webcamLoadingText");
        const captureBtn = document.getElementById("btnCaptureWebcam");
        const cancelBtn = document.getElementById("btnCancelWebcam");

        if (cancelBtn) {
          cancelBtn.addEventListener("click", () => {
            stopStream();
            closeModal();
          });
        }

        navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" } })
          .then(stream => {
            if (!isModalOpen) {
              // Jika popup sudah ditutup sebelum izin kamera diberikan / kamera aktif
              stream.getTracks().forEach(t => {
                t.stop();
                t.enabled = false;
              });
              return;
            }
            currentStream = stream;
            if (videoEl) {
              videoEl.srcObject = stream;
              videoEl.onloadedmetadata = () => {
                if (loadingText) loadingText.style.display = "none";
              };
            }
          })
          .catch(err => {
            console.warn("Webcam access error:", err);
            if (loadingText) {
              loadingText.innerHTML = `<span style="color: #F87171; padding: 1rem; text-align: center;">Kamera tidak diizinkan atau tidak ditemukan.<br><small style="color: #DDD;">Silakan pilih berkas foto dari penyimpanan.</small></span>`;
            }
            if (captureBtn) captureBtn.disabled = true;
          });

        if (captureBtn) {
          captureBtn.addEventListener("click", () => {
            if (!videoEl || videoEl.videoWidth === 0) return;
            const canvas = document.createElement("canvas");
            const size = Math.min(videoEl.videoWidth, videoEl.videoHeight);
            canvas.width = 360;
            canvas.height = 360;
            const ctx = canvas.getContext("2d");
            ctx.translate(360, 0);
            ctx.scale(-1, 1);
            const startX = (videoEl.videoWidth - size) / 2;
            const startY = (videoEl.videoHeight - size) / 2;
            ctx.drawImage(videoEl, startX, startY, size, size, 0, 0, 360, 360);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.85);

            stopStream();
            closeModal();
            saveAndApplyPhoto(dataUrl);
          });
        }
      });
    }
  }

  // Form Submit Profil
  if (formProfile) {
    formProfile.addEventListener("submit", (e) => {
      e.preventDefault();
      const updatedNama = inputNama.value.trim();
      const updatedNip = inputNip ? inputNip.value.trim() : (user.nip || "");
      const updatedSatker = inputSatker.value;
      const updatedJabatan = inputJabatan.value.trim();
      const updatedWa = inputWhatsapp.value.trim();
      const updatedAlamat = inputAlamat.value.trim();

      // Update in active session
      const rawSession = localStorage.getItem("AMERTHA_BHUMI_SESSION");
      if (rawSession) {
        try {
          const session = JSON.parse(rawSession);
          session.user.nama = updatedNama;
          session.user.nip = updatedNip;
          session.user.satker = updatedSatker;
          session.user.jabatan = updatedJabatan;
          session.user.whatsapp = updatedWa;
          session.user.alamat = updatedAlamat;
          localStorage.setItem("AMERTHA_BHUMI_SESSION", JSON.stringify(session));

          // Update topbar display
          const topName = document.getElementById("topbarUserName");
          const topAvatar = document.getElementById("topbarUserAvatar");
          if (topName) topName.textContent = updatedNama;
          if (topAvatar) {
            if (session.user.photoUrl) {
              topAvatar.innerHTML = `<img src="${session.user.photoUrl}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">`;
            } else {
              const initials = updatedNama.split(" ").map(w => w[0]).slice(0, 2).join("");
              topAvatar.textContent = initials || "PB";
            }
          }

          populateData(session.user);
        } catch (err) {
          console.error(err);
        }
      }

      // Update in CRM data umat if present
      const umatList = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
      const idx = umatList.findIndex(u => (u.username && u.username === user.username) || u.nip === user.nip);
      if (idx !== -1) {
        umatList[idx].nama = updatedNama;
        umatList[idx].nip = updatedNip;
        umatList[idx].satker = updatedSatker;
        umatList[idx].jabatan = updatedJabatan;
        umatList[idx].whatsapp = updatedWa;
        localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(umatList));
        if (typeof window.refreshCrmTable === "function") window.refreshCrmTable();
      }

      // Kirim pembaruan profil ke Google Apps Script Web App jika online
      try {
        fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "updateProfile",
            username: user.username || user.nip || "",
            nip: updatedNip,
            nama: updatedNama,
            satker: updatedSatker,
            jabatan: updatedJabatan,
            whatsapp: updatedWa,
            alamat: updatedAlamat
          })
        }).catch(err => console.warn("Sync profile to GAS deferred:", err));
      } catch (e) {}

      showToast("Data profil kepegawaian Anda berhasil disimpan!", "success");
    });
  }

  // Form Ganti Password
  if (formPassword) {
    formPassword.addEventListener("submit", (e) => {
      e.preventDefault();
      const passBaru = document.getElementById("passBaru").value;
      const passKonf = document.getElementById("passKonfirmasi").value;

      if (passBaru.length < 6) {
        showToast("Kata sandi baru minimal 6 karakter.", "error");
        return;
      }

      if (passBaru !== passKonf) {
        showToast("Konfirmasi kata sandi tidak cocok dengan kata sandi baru.", "error");
        return;
      }

      // 1. Simpan kata sandi baru ke CUSTOM_PASSWORDS lokal
      const customPasswords = JSON.parse(localStorage.getItem("CUSTOM_PASSWORDS") || "{}");
      const currentUsername = (user.username || user.nip || "").toLowerCase();
      if (currentUsername) {
        customPasswords[currentUsername] = passBaru;
        localStorage.setItem("CUSTOM_PASSWORDS", JSON.stringify(customPasswords));
      }

      // 2. Kirim sinkronisasi ke Google Sheets Backend (Apps Script)
      try {
        fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "changePassword",
            username: currentUsername,
            nip: user.nip || currentUsername,
            newPassword: passBaru,
            nama: user.nama || "",
            role: user.role || "admin"
          })
        }).then(res => res.json()).then(data => {
          console.log("GAS changePassword response:", data);
        }).catch(err => console.warn("Sync password to GAS deferred:", err));
      } catch (e) {}

      formPassword.reset();
      showToast("Kata sandi Anda berhasil diperbarui dan tersimpan permanen!", "success");
    });
  }
}

/* ==========================================================================
   8. UPDATE OVERVIEW KPI STATS
   ========================================================================== */
function updateOverviewKpi() {
  const kpiUmatEl = document.getElementById("kpiTotalUmat");
  const kpiSaldoEl = document.getElementById("kpiSaldoPunia");
  const kpiArtEl = document.getElementById("kpiTotalArtikel");

  const umatList = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
  const kasList = JSON.parse(localStorage.getItem("KAS_PUNIA_LOCAL") || "[]");
  const artList = JSON.parse(localStorage.getItem("CMS_ARTIKEL_LOCAL") || "[]");

  if (kpiUmatEl) kpiUmatEl.textContent = umatList.length || 0;
  
  if (kpiSaldoEl) {
    let sum = 0;
    kasList.forEach(k => {
      if (k.jenis === "Masuk") sum += Number(k.nominal);
      else sum -= Number(k.nominal);
    });
    kpiSaldoEl.textContent = `Rp ${sum.toLocaleString('id-ID')}`;
  }

  if (kpiArtEl) kpiArtEl.textContent = artList.length || 0;
}
