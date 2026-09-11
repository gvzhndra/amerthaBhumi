/**
 * Pura Amertha Bhumi GKN I Denpasar
 * Authentication Service (login.html & session guard)
 * Password default: NIP sebagai username dan NIP sebagai password.
 */

const AuthService = (() => {
  // Akun Demo Bawaan Pengurus & Anggota
  const PRESET_USERS = [
    {
      nip: "198501012010121001",
      nama: "I Ketut Sudirga, S.E.",
      role: "admin", // Super Admin Pengurus
      roleLabel: "Ketua Pengurus / Super Admin",
      satker: "Kanwil DJPb Bali",
      jabatan: "Pembina Tingkat I"
    },
    {
      nip: "199203152015021002",
      nama: "Ni Putu Saraswati, S.Kom.",
      role: "secretary", // Sekretaris Pengurus (Broadcast & Kesekretariatan)
      roleLabel: "Pengurus - Sekretaris",
      satker: "KPP Pratama Denpasar Timur (DJP)",
      jabatan: "Penata Madya"
    },
    {
      nip: "199008202014032003",
      nama: "I Wayan Arnawa, S.E., M.Si.",
      role: "finance", // Bendahara Kas Punia
      roleLabel: "Pengurus - Bendahara Kas Punia",
      satker: "KPPBC Denpasar (DJBC)",
      jabatan: "Bendahara Pengeluaran"
    },
    {
      nip: "199804102021022001",
      nama: "Ni Luh Putu Ayu Wardani",
      role: "humas", // Humas & Publikasi (CMS Warta & Galeri)
      roleLabel: "Pengurus - Humas & Publikasi",
      satker: "Balai Diklat Keuangan (BDK) Denpasar",
      jabatan: "Pranata Komputer / Humas"
    },
    {
      nip: "199507112019011004",
      nama: "I Made Wira Dananjaya",
      role: "member", // Anggota Umat Biasa
      roleLabel: "Anggota Umat GKN I Denpasar",
      satker: "KPKNL Denpasar (DJKN)",
      jabatan: "Pelaksana"
    }
  ];

  /**
   * Login dengan NIP dan Password (NIP & NIP)
   */
  function login(nip, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cleanNip = nip.trim();
        const cleanPassword = password.trim();

        if (!cleanNip || !cleanPassword) {
          return reject(new Error("NIP dan Kata Sandi wajib diisi."));
        }

        // Validasi: default password adalah NIP
        if (cleanNip !== cleanPassword) {
          return reject(new Error("Kombinasi NIP dan Kata Sandi tidak sesuai. (Gunakan NIP sebagai kata sandi awal)."));
        }

        // Cek apakah NIP terdaftar di database CRM DATA_UMAT_LOCAL
        const crmList = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
        const foundCrm = crmList.find(u => u.nip === cleanNip);

        // Cek apakah NIP terdaftar di preset pengurus
        let user = PRESET_USERS.find(u => u.nip === cleanNip);

        if (foundCrm) {
          user = {
            nip: foundCrm.nip,
            nama: foundCrm.nama,
            role: foundCrm.role || (user ? user.role : "member"),
            roleLabel: foundCrm.roleLabel || (user ? user.roleLabel : "Anggota Umat GKN I Denpasar"),
            satker: foundCrm.satker || (user ? user.satker : "GKN I Denpasar"),
            jabatan: foundCrm.jabatan || (user ? user.jabatan : "Pegawai")
          };
        } else if (!user) {
          user = {
            nip: cleanNip,
            nama: `Pegawai Umat GKN (${cleanNip.substring(cleanNip.length - 4)})`,
            role: "member",
            roleLabel: "Anggota Umat GKN I Denpasar",
            satker: "Gedung Keuangan Negara I Denpasar",
            jabatan: "Pegawai / Staf"
          };
        }

        // Buat Session Token
        const session = {
          token: "TOKEN_AMERTHABHUMI_" + Math.random().toString(36).substring(2) + Date.now(),
          user: user,
          loginTime: new Date().toISOString()
        };

        localStorage.setItem("AMERTHA_BHUMI_SESSION", JSON.stringify(session));
        resolve(session);
      }, 500);
    });
  }

  /**
   * Mengambil sesi pengguna yang sedang aktif
   */
  function getCurrentUser() {
    const raw = localStorage.getItem("AMERTHA_BHUMI_SESSION");
    if (!raw) return null;
    try {
      const session = JSON.parse(raw);
      // Sinkronkan peran terbaru dari DATA_UMAT_LOCAL jika ada pembaruan oleh Super Admin
      const crmList = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
      const foundCrm = crmList.find(u => u.nip === session.user.nip);
      if (foundCrm && foundCrm.role && foundCrm.role !== session.user.role) {
        session.user.role = foundCrm.role;
        session.user.roleLabel = foundCrm.roleLabel || session.user.roleLabel;
        localStorage.setItem("AMERTHA_BHUMI_SESSION", JSON.stringify(session));
      }
      return session.user;
    } catch (e) {
      return null;
    }
  }

  /**
   * Memeriksa otentikasi di halaman admin/dashboard
   */
  function requireAuth(allowedRoles = []) {
    const user = getCurrentUser();
    if (!user) {
      window.location.href = "login.html";
      return null;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      alert("Akses Terbatas: Anda tidak memiliki hak akses untuk halaman ini.");
      window.location.href = "index.html";
      return null;
    }

    return user;
  }

  /**
   * Keluar dari sesi
   */
  function logout() {
    localStorage.removeItem("AMERTHA_BHUMI_SESSION");
    window.location.href = "login.html";
  }

  return {
    login,
    getCurrentUser,
    requireAuth,
    logout,
    PRESET_USERS
  };
})();
window.AuthService = AuthService;
