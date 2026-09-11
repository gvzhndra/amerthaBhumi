/**
 * Pura Amertha Bhumi GKN I Denpasar
 * Authentication Service (login.html & session guard)
 * Password default: NIP sebagai username dan NIP sebagai password.
 */

const AuthService = (() => {
  // Akun Resmi Pengurus Bidang Humas & Informasi (Super Admin - Versi Username)
  const PRESET_USERS = [
    {
      username: "cunda",
      nip: "cunda",
      nama: "Cunda Yokosantha",
      role: "admin",
      roleLabel: "Koordinator Humas & Informasi (Super Admin)",
      satker: "Kanwil DJPB Provinsi Bali",
      jabatan: "Koordinator Bidang Humas dan Informasi"
    },
    {
      username: "hendra",
      nip: "hendra",
      nama: "Putu Agus Hendra Harjaya",
      role: "admin",
      roleLabel: "Humas & Informasi (Super Admin)",
      satker: "KPKNL Denpasar",
      jabatan: "Anggota Bidang Humas dan Informasi"
    },
    {
      username: "ekasuardana",
      nip: "ekasuardana",
      nama: "I Putu Eka Suardana",
      role: "admin",
      roleLabel: "Humas & Informasi (Super Admin)",
      satker: "KPTIK BMN Denpasar",
      jabatan: "Anggota Bidang Humas dan Informasi"
    },
    {
      username: "arini",
      nip: "arini",
      nama: "Ni Luh Nyoman Arini Asri Wijayanti",
      role: "admin",
      roleLabel: "Humas & Informasi (Super Admin)",
      satker: "KPKNL Denpasar",
      jabatan: "Anggota Bidang Humas dan Informasi"
    },
    {
      username: "prawirawijaya",
      nip: "prawirawijaya",
      nama: "I Made Rai Prawirawijaya",
      role: "admin",
      roleLabel: "Humas & Informasi (Super Admin)",
      satker: "KPTIK BMN Denpasar",
      jabatan: "Anggota Bidang Humas dan Informasi"
    },
    {
      username: "tusta",
      nip: "tusta",
      nama: "Putu Tusta Ari Chandana",
      role: "admin",
      roleLabel: "Humas & Informasi (Super Admin)",
      satker: "KPKNL Denpasar",
      jabatan: "Anggota Bidang Humas dan Informasi"
    }
  ];

  /**
   * Login dengan Username dan Password (password default = username atau 'admin')
   */
  function login(usernameInput, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cleanInput = (usernameInput || "").trim().toLowerCase();
        const cleanPassword = (password || "").trim();

        if (!cleanInput || !cleanPassword) {
          return reject(new Error("Username dan Kata Sandi wajib diisi."));
        }

        // Cari di daftar pengurus resmi
        let user = PRESET_USERS.find(
          u => u.username.toLowerCase() === cleanInput || (u.nip && u.nip.toLowerCase() === cleanInput)
        );

        // Cek juga di database CRM lokal jika ada
        const crmList = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
        const foundCrm = crmList.find(u => (u.nip && u.nip.toLowerCase() === cleanInput) || (u.username && u.username.toLowerCase() === cleanInput));

        // Periksa apakah pengguna memiliki kata sandi kustom yang pernah diubah
        const customPasswords = JSON.parse(localStorage.getItem("CUSTOM_PASSWORDS") || "{}");
        const savedPass = customPasswords[cleanInput] || (user && customPasswords[user.username.toLowerCase()]);

        if (user) {
          if (savedPass) {
            if (cleanPassword !== savedPass) {
              return reject(new Error("Kata sandi yang Anda masukkan salah."));
            }
          } else {
            // Password default jika belum diubah
            if (cleanPassword.toLowerCase() !== user.username.toLowerCase() && cleanPassword !== "admin") {
              return reject(new Error(`Kata sandi salah. Gunakan username '${user.username}' atau 'admin' sebagai kata sandi.`));
            }
          }
        } else if (foundCrm) {
          user = {
            username: foundCrm.username || foundCrm.nip,
            nip: foundCrm.nip || foundCrm.username,
            nama: foundCrm.nama,
            role: foundCrm.role || "member",
            roleLabel: foundCrm.roleLabel || "Anggota Umat GKN I Denpasar",
            satker: foundCrm.satker || "GKN I Denpasar",
            jabatan: foundCrm.jabatan || "Pegawai"
          };
          if (savedPass) {
            if (cleanPassword !== savedPass) {
              return reject(new Error("Kata sandi yang Anda masukkan salah."));
            }
          } else {
            if (cleanPassword.toLowerCase() !== (user.username || "").toLowerCase() && cleanPassword !== user.nip && cleanPassword !== "admin") {
              return reject(new Error("Kata sandi salah."));
            }
          }
        } else {
          // Member / Umat Baru fleksibel
          if (savedPass) {
            if (cleanPassword !== savedPass) {
              return reject(new Error("Kata sandi yang Anda masukkan salah."));
            }
          } else {
            if (cleanInput !== cleanPassword.toLowerCase() && cleanPassword !== "admin") {
              return reject(new Error("Kombinasi Username dan Kata Sandi tidak sesuai."));
            }
          }
          user = {
            username: cleanInput,
            nip: cleanInput,
            nama: `Umat GKN (${cleanInput})`,
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
      if (!session || !session.user) return null;

      const rawId = (session.user.username || session.user.nip || "").toLowerCase();
      const rawName = (session.user.nama || "").toLowerCase();

      // Deteksi jika pengguna adalah anggota tim Humas & Informasi (termasuk hendra)
      const matchedHumas = PRESET_USERS.find(u => {
        const uUser = u.username.toLowerCase();
        return uUser === rawId ||
               (u.nip && u.nip.toLowerCase() === rawId) ||
               rawId.includes(uUser) ||
               rawName.includes(uUser) ||
               rawName.includes(u.nama.toLowerCase()) ||
               (uUser === "hendra" && (rawId.includes("ndra") || rawName.includes("ndra") || rawName.includes("harjaya")));
      });

      if (matchedHumas) {
        // Upgrade langsung ke Super Admin resmi dengan nama lengkap asli
        session.user.nama = matchedHumas.nama;
        session.user.username = matchedHumas.username;
        session.user.nip = matchedHumas.username;
        session.user.role = "admin";
        session.user.roleLabel = matchedHumas.roleLabel || "Super Admin (Humas)";
        session.user.satker = matchedHumas.satker;
        session.user.jabatan = matchedHumas.jabatan;
        localStorage.setItem("AMERTHA_BHUMI_SESSION", JSON.stringify(session));
      } else {
        // Hilangkan kata 'Pegawai Umat GKN (...)' jika masih tersisa
        if (session.user.nama && session.user.nama.startsWith("Pegawai Umat GKN")) {
          session.user.nama = session.user.nama.replace(/Pegawai Umat GKN\s*\((.*?)\)/i, "$1").trim() || session.user.username || "Umat GKN";
          localStorage.setItem("AMERTHA_BHUMI_SESSION", JSON.stringify(session));
        }

        // Sinkronkan peran terbaru dari DATA_UMAT_LOCAL jika ada
        const crmList = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
        const foundCrm = crmList.find(u => u.nip === session.user.nip || u.username === session.user.username);
        if (foundCrm && foundCrm.role && foundCrm.role !== session.user.role) {
          session.user.role = foundCrm.role;
          session.user.roleLabel = foundCrm.roleLabel || session.user.roleLabel;
          localStorage.setItem("AMERTHA_BHUMI_SESSION", JSON.stringify(session));
        }
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
