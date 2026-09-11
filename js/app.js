/**
 * Pura Amertha Bhumi GKN I Denpasar
 * Public Portal Main Logic (index.html)
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initCalendarWidget();
  initKidungPlayer();
  initRegistrationModal();
  initPublicArticles();
  initPublicGallery();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const toggleBtn = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
    });

    // Tutup saat link diklik pada layar mobile
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove("mobile-open");
        }
      });
    });
  }
}

/* ==========================================================================
   2. BALINESE SAKA CALENDAR WIDGET
   ========================================================================== */
function initCalendarWidget() {
  const today = new Date();
  const pawukon = BalineseCalendar.getPawukon(today);
  const moon = BalineseCalendar.getMoonPhase(today);
  const upcoming = BalineseCalendar.getUpcomingRerahinan(30);

  // Populate Today's Badges
  const dayNameEl = document.getElementById("calDayName");
  const gregDateEl = document.getElementById("calGregDate");
  const wukuValEl = document.getElementById("calWukuVal");
  const sasihValEl = document.getElementById("calSasihVal");
  const sakaYearValEl = document.getElementById("calSakaYear");
  const upcomingListEl = document.getElementById("calUpcomingList");

  if (dayNameEl) dayNameEl.textContent = pawukon.fullDayName;
  if (gregDateEl) {
    gregDateEl.textContent = today.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
  if (wukuValEl) wukuValEl.textContent = `Wuku ${pawukon.wukuName}`;
  if (sasihValEl) sasihValEl.textContent = `Sasih ${moon.sasihName}`;
  if (sakaYearValEl) sakaYearValEl.textContent = `Tahun Saka ${moon.sakaYear}`;

  // Populate Upcoming Rerahinan List
  if (upcomingListEl) {
    upcomingListEl.innerHTML = "";
    const itemsToShow = upcoming.slice(0, 5);

    if (itemsToShow.length === 0) {
      upcomingListEl.innerHTML = `<li class="rerahinan-item"><span>Tidak ada rerahinan besar dalam 30 hari ke depan</span></li>`;
    } else {
      itemsToShow.forEach(item => {
        const li = document.createElement("li");
        li.className = `rerahinan-item ${item.type}`;
        
        let daysBadge = item.daysLeft === 0 ? "Hari Ini" : `${item.daysLeft} hari lagi`;
        
        li.innerHTML = `
          <div>
            <div class="name">${item.name}</div>
            <div style="font-size: 0.72rem; color: #94A3B8;">${item.day}, Wuku ${item.wuku}</div>
          </div>
          <div class="date-tag">${daysBadge} (${item.dateString})</div>
        `;
        upcomingListEl.appendChild(li);
      });
    }
  }
}

/* ==========================================================================
   3. KIDUNG DEWA YADNYA PLAYER
   ========================================================================== */
function initKidungPlayer() {
  const playlistContainer = document.getElementById("kidungPlaylist");
  const titleEl = document.getElementById("kidungCurrentTitle");
  const catEl = document.getElementById("kidungCurrentCategory");
  const lyricsEl = document.getElementById("kidungLyrics");
  const audioElement = document.getElementById("kidungAudio");

  if (!playlistContainer || !titleEl || !audioElement) return;

  playlistContainer.innerHTML = "";

  KIDUNG_DATABASE.forEach((kidung, index) => {
    const item = document.createElement("div");
    item.className = `kidung-item ${index === 0 ? "active" : ""}`;
    item.innerHTML = `
      <div class="kidung-item-info">
        <h4>${kidung.title}</h4>
        <p>${kidung.category}</p>
      </div>
      <svg class="icon-sm" viewBox="0 0 24 24" style="color: var(--primary);"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
    `;

    item.addEventListener("click", () => {
      document.querySelectorAll(".kidung-item").forEach(el => el.classList.remove("active"));
      item.classList.add("active");
      loadKidung(kidung);
    });

    playlistContainer.appendChild(item);
  });

  function loadKidung(k) {
    titleEl.textContent = k.title;
    catEl.textContent = k.category;
    lyricsEl.textContent = k.lyrics;
    audioElement.src = k.audioSrc;
  }

  // Load first track
  if (KIDUNG_DATABASE.length > 0) {
    loadKidung(KIDUNG_DATABASE[0]);
  }
}

/* ==========================================================================
   4. PENDAFTARAN UMAT BARU (MODAL & FORM)
   ========================================================================== */
function initRegistrationModal() {
  const openBtns = document.querySelectorAll(".btn-open-register");
  const modal = document.getElementById("registerModal");
  const closeBtn = document.getElementById("closeRegisterModal");
  const form = document.getElementById("formRegisterUmat");
  const alertBox = document.getElementById("registerAlert");

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("show");
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.remove("show"));
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Mengirim Pendaftaran...";

      const dataUmat = {
        nama: form.nama.value.trim(),
        nip: form.nip.value.trim(),
        satker: form.satker.value,
        jabatan: form.jabatan.value.trim(),
        whatsapp: form.whatsapp.value.trim(),
        alamat: form.alamat.value.trim(),
        tanggalDaftar: new Date().toISOString(),
        status: "Menunggu Verifikasi"
      };

      // Simpan ke local database untuk demonstrasi / sinkronisasi GAS
      let list = JSON.parse(localStorage.getItem("DATA_UMAT_LOCAL") || "[]");
      list.unshift(dataUmat);
      localStorage.setItem("DATA_UMAT_LOCAL", JSON.stringify(list));

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Daftar Sekarang";
        if (alertBox) {
          alertBox.style.display = "block";
          alertBox.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10B981; color: #34D399; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
              <strong>Om Swastyastu!</strong> Pendaftaran umat atas nama <b>${dataUmat.nama}</b> berhasil terkirim. Pengurus Pura Amertha Bhumi akan melakukan verifikasi keanggotaan.
            </div>
          `;
        }
        form.reset();
        setTimeout(() => {
          modal.classList.remove("show");
          if (alertBox) alertBox.style.display = "none";
        }, 3000);
      }, 800);
    });
  }
}

/* ==========================================================================
   5. PUBLIC ARTICLES (CMS FEED & PINNED HERO SPOTLIGHT)
   ========================================================================== */
function initPublicArticles() {
  const heroContainer = document.getElementById("heroArticleContainer");
  const regularContainer = document.getElementById("publicArticlesList");

  const defaultArticles = [
    {
      id: "art-piodalan",
      title: "Persiapan Upacara Piodalan Pura Amertha Bhumi Sasih Kadasa",
      category: "Warta Kegiatan",
      date: "10 September 2026",
      isHero: true,
      excerpt: "Pengurus Pura Amertha Bhumi GKN I Denpasar menyelenggarakan rapat koordinasi pembagian tugas ayah-ayahan, penataan upakara banten, dan persiapan upacara piodalan pura bersama perwakilan satker.",
      content: `Om Swastyastu,\n\nMenyambut upacara piodalan suci Pura Amertha Bhumi GKN I Denpasar pada Sasih Kadasa mendatang, seksi kepengurusan pura bersama perwakilan pegawai dari seluruh unit vertikal di lingkungan Gedung Keuangan Negara I Denpasar telah melangsungkan rapat koordinasi awal.\n\nBeberapa poin penting hasil koordinasi pengurus:\n1. Jadwal gladi dan gotong royong ngayah pembersihan areal pura akan dilaksanakan secara bertahap.\n2. Pembagian tugas sarana upakara banten dan giliran wiku/pemangku telah disepakati bersama.\n3. Umat yang ingin ngaturang dana punia sukarela maupun sarana upacara dapat menghubungi seksi bendahara atau sekretariat pura.\n\nSemoga seluruh rangkaian upacara persembahyangan bersama ini dapat terlaksana secara lancar, hening, dan membawa kerahayuan serta keberkahan bagi seluruh pegawai di lingkungan GKN I Denpasar.\n\nOm Shanti Shanti Shanti Om.`,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      status: "Published"
    },
    {
      id: "art-dharma",
      title: "Makna Filosofis Yadnya dalam Lingkungan Kerja Pemerintahan",
      category: "Dharma Wacana",
      date: "28 Agustus 2026",
      isHero: false,
      excerpt: "Melaksanakan tugas pelayanan publik dengan dedikasi tinggi adalah wujud nyata penerapan Karma Yoga dan pengabdian suci kepada bangsa dan negara.",
      content: `Bekerja dan mengabdi di lingkungan instansi pemerintahan bukanlah sekadar rutinitas profesi, melainkan sarana pelaksanaan ajaran Karma Yoga. Dalam ajaran suci Bhagawadgita, setiap kewajiban yang dilaksanakan dengan ikhlas tanpa keterikatan berlebih pada hasil pribadi merupakan persembahan suci (yadnya) yang tertinggi.\n\nMari kita tingkatkan semangat pengabdian dan integritas demi kemajuan pelayanan publik dan bangsa.`,
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      status: "Published"
    },
    {
      id: "art-purnama",
      title: "Persembahyangan Bersama Rahina Purnama di Pura Amertha Bhumi",
      category: "Liputan Upacara",
      date: "15 Agustus 2026",
      isHero: false,
      excerpt: "Umat Hindu dari perwakilan seluruh unit eselon II dan instansi vertikal GKN I Denpasar khidmat melangsungkan persembahyangan bersama.",
      content: `Pada perayaan Rahina Purnama yang lalu, keluarga besar umat Hindu GKN I Denpasar berkumpul dalam suasana persembahyangan yang hening dan khidmat. Upacara dipimpin oleh Jero Mangku Pura Amertha Bhumi dan diiringi alunan kidung suci Dewa Yadnya. Usai persembahyangan, kegiatan dilanjutkan dengan dharma santi dan ramah tamah persaudaraan antar pegawai.`,
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      status: "Published"
    }
  ];

  // Load stored articles from CMS if available
  const stored = JSON.parse(localStorage.getItem("CMS_ARTIKEL_LOCAL") || "[]");
  let articles = stored.length > 0 ? stored.filter(a => a.status === "Published") : defaultArticles;
  if (articles.length === 0) articles = defaultArticles;

  // Find Hero Pinned article
  let heroArticle = articles.find(a => a.isHero);
  if (!heroArticle) {
    heroArticle = articles[0];
  }

  // Render Hero Spotlight
  if (heroContainer && heroArticle) {
    heroContainer.innerHTML = `
      <div class="hero-article-card">
        <div class="hero-article-media">
          <span class="hero-article-badge">
            <svg class="icon-sm" viewBox="0 0 24 24" style="width: 14px; height: 14px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Berita Utama Disematkan
          </span>
          <img src="${heroArticle.image || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'}" class="hero-article-img" alt="${heroArticle.title}">
        </div>
        <div class="hero-article-content">
          <div class="hero-article-category">${heroArticle.category || 'Warta Kegiatan'}</div>
          <h3 class="hero-article-title">${heroArticle.title}</h3>
          <p class="hero-article-excerpt">${heroArticle.excerpt || (heroArticle.content ? heroArticle.content.substring(0, 180) + '...' : '')}</p>
          <div class="hero-article-footer">
            <div class="hero-article-meta">
              <span>📅 ${heroArticle.date || 'Terbaru'}</span>
              <span>• Oleh Humas Pura</span>
            </div>
            <button class="btn btn-primary btn-sm btn-open-article-detail" data-id="${heroArticle.id || heroArticle.title}">
              Baca Selengkapnya →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Render Regular Articles Feed (Excluding Hero Article)
  if (regularContainer) {
    const regularArticles = articles.filter(a => (a.id ? a.id !== heroArticle.id : a.title !== heroArticle.title));
    const displayList = regularArticles.length > 0 ? regularArticles : articles;

    regularContainer.innerHTML = displayList.map(art => `
      <article class="article-card">
        <img src="${art.image || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80'}" class="article-img" alt="${art.title}">
        <div class="article-body">
          <span class="article-category">${art.category}</span>
          <h3>${art.title}</h3>
          <p>${art.excerpt || (art.content ? art.content.substring(0, 120) + '...' : '')}</p>
          <div class="article-meta">
            <span>${art.date || 'Terbaru'}</span>
            <button class="service-link btn-open-article-detail" data-id="${art.id || art.title}" style="background:none; border:none; padding:0; cursor:pointer; font-weight: 600;">
              Baca Selengkapnya →
            </button>
          </div>
        </div>
      </article>
    `).join("");
  }

  // Setup Article Modal Detail
  setupArticleModal(articles);
}

function setupArticleModal(articles) {
  const backdrop = document.getElementById("articleModalBackdrop");
  const closeBtn = document.getElementById("modalArtClose");
  const closeBtnFooter = document.getElementById("modalArtCloseBtn");
  const titleEl = document.getElementById("modalArtTitle");
  const catEl = document.getElementById("modalArtCategory");
  const metaEl = document.getElementById("modalArtMeta");
  const imgEl = document.getElementById("modalArtImage");
  const contentEl = document.getElementById("modalArtContent");

  if (!backdrop) return;

  function closeModal() {
    backdrop.classList.remove("show");
    setTimeout(() => {
      backdrop.style.display = "none";
    }, 200);
  }

  function openArticle(art) {
    if (!art) return;
    if (titleEl) titleEl.textContent = art.title;
    if (catEl) catEl.textContent = art.category || "Warta";
    if (metaEl) metaEl.textContent = `Dipublikasikan pada: ${art.date || 'Terbaru'} • Oleh Humas & Publikasi Pura Amertha Bhumi`;
    
    if (imgEl) {
      if (art.image) {
        imgEl.src = art.image;
        imgEl.style.display = "block";
      } else {
        imgEl.style.display = "none";
      }
    }

    if (contentEl) {
      contentEl.textContent = art.content || art.excerpt || "Tidak ada detail artikel.";
    }

    backdrop.style.display = "flex";
    requestAnimationFrame(() => {
      backdrop.classList.add("show");
    });
  }

  document.querySelectorAll(".btn-open-article-detail").forEach(btn => {
    btn.addEventListener("click", () => {
      const artId = btn.getAttribute("data-id");
      const found = articles.find(a => (a.id && a.id === artId) || a.title === artId);
      if (found) {
        openArticle(found);
      }
    });
  });

  if (closeBtn) closeBtn.onclick = closeModal;
  if (closeBtnFooter) closeBtnFooter.onclick = closeModal;

  backdrop.onclick = (e) => {
    if (e.target === backdrop) closeModal();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("show")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. PUBLIC GALLERY (CMS FEED)
   ========================================================================== */
function initPublicGallery() {
  const container = document.getElementById("publicGalleryList");
  if (!container) return;

  const defaultGallery = [
    {
      title: "Persembahyangan Purnama Kadasa",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Gotong Royong & Ngaturang Ayah",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Dharma Tula Pegawai Umat Hindu GKN I",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Bakti Sosial Peduli Sesama",
      image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const stored = JSON.parse(localStorage.getItem("CMS_GALERI_LOCAL") || "null");
  const gallery = (stored !== null && Array.isArray(stored)) ? stored : defaultGallery;

  if (gallery.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Belum ada foto dokumentasi yang ditampilkan.</p>`;
    return;
  }

  container.innerHTML = gallery.map(item => `
    <div class="gallery-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="gallery-overlay">
        <h4>${item.title}</h4>
      </div>
    </div>
  `).join("");
}
