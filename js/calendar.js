/**
 * Pura Amertha Bhumi GKN I Denpasar
 * Balinese Saka Calendar Engine (Wariga & Rerahinan)
 * 100% Client-Side Pure JavaScript - Zero External Dependency
 */

const BalineseCalendar = (() => {
  // 30 Wuku Bali
  const WUKU_LIST = [
    "Sinta", "Landep", "Ukir", "Kulantir", "Tolu",
    "Gumbreg", "Wariga", "Warigadean", "Julungwangi", "Sungsang",
    "Dungulan", "Kuningan", "Langkir", "Medangsia", "Pujut",
    "Pahang", "Krulut", "Merakih", "Tambir", "Medangkungan",
    "Matal", "Uye", "Menail", "Prangbakat", "Bala",
    "Ugu", "Wayang", "Kelawu", "Dukut", "Watugunung"
  ];

  // Panca Wara (5-day cycle)
  const PANCA_WARA = ["Umanis", "Paing", "Pon", "Wage", "Kliwon"];

  // Sapta Wara (7-day cycle)
  const SAPTA_WARA = ["Redite", "Soma", "Anggara", "Buda", "Wrespati", "Sukra", "Saniscara"];

  // 12 Sasih Bali
  const SASIH_LIST = [
    "Kasa", "Karo", "Katiga", "Kapat", "Kalima", "Kanem",
    "Kapitu", "Kawalu", "Kesanga", "Kedasa", "Jyestha", "Sadha"
  ];

  // Base reference date for Balinese Calendar calculation
  // Benchmark baku Pawukon Bali: 5 April 2026 was Redite (Sunday), Paing, Wuku Sinta (Day 0 of 210-day cycle)
  const REF_DATE = new Date(2026, 3, 5); // April 5, 2026
  const REF_PANCAWARA = 1; // Paing (index 1)
  const REF_DAY_OF_CYCLE = 0; // Day 0 of 210-day cycle (Redite Sinta)

  /**
   * Calculate Balinese Pawukon information for any Gregorian Date
   * @param {Date} date 
   */
  function getPawukon(date = new Date()) {
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = target.getTime() - REF_DATE.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // Normalizing modulo for negative dates if any
    const mod210 = ((diffDays % 210) + 210) % 210;
    const wukuIndex = Math.floor(mod210 / 7);
    const dayInWuku = mod210 % 7; // 0 = Redite, 6 = Saniscara

    // Panca Wara calculation
    const pancaIndex = (((REF_PANCAWARA + diffDays) % 5) + 5) % 5;

    // Sapta Wara
    const saptaIndex = target.getDay(); // 0 is Sunday / Redite

    const wukuName = WUKU_LIST[wukuIndex];
    const pancaName = PANCA_WARA[pancaIndex];
    const saptaName = SAPTA_WARA[saptaIndex];

    return {
      wukuIndex,
      wukuName,
      pancaIndex,
      pancaName,
      saptaIndex,
      saptaName,
      dayInCycle: mod210,
      fullDayName: `${saptaName} ${pancaName}`
    };
  }

  // Synodic month = 29.53058867 days
  // Calibrated to Tilem Sasih Katiga: 11 September 2026 (~14:00 WITA / 06:00 UTC)
  const KNOWN_TILEM = new Date(Date.UTC(2026, 8, 11, 6, 0, 0)).getTime();
  const SYNODIC = 29.53058867;

  /**
   * Calculate Moon Phase (Purnama & Tilem) and Balinese Sasih
   */
  function getMoonPhase(date = new Date()) {
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
    const diffDays = (target.getTime() - KNOWN_TILEM) / (1000 * 60 * 60 * 24);
    const phaseDays = ((diffDays % SYNODIC) + SYNODIC) % SYNODIC;

    // Phase threshold for single-day accuracy
    const isTilem = phaseDays <= 0.6 || phaseDays >= (SYNODIC - 0.6);
    const isPurnama = Math.abs(phaseDays - (SYNODIC / 2)) <= 0.6;

    // Sasih calculation: Sasih Katiga ends on 11 Sep 2026 (Tilem)
    // Starting 12 Sep 2026 advances to Sasih Kapat (index 3)
    let cycles = Math.floor((diffDays - 0.5) / SYNODIC) + 1;
    let sasihIndex = (((2 + cycles) % 12) + 12) % 12;
    const sasihName = SASIH_LIST[sasihIndex];

    // Saka Year (Gregorian year - 78 after Nyepi)
    const sakaYear = date.getFullYear() - 78;

    return {
      phaseDays,
      isPurnama,
      isTilem,
      sasihName,
      sakaYear
    };
  }

  /**
   * Identify special Rerahinan for a specific date
   */
  function checkRerahinan(date = new Date()) {
    const p = getPawukon(date);
    const m = getMoonPhase(date);
    const holidays = [];

    // Purnama / Tilem
    if (m.isPurnama) holidays.push({ name: `Purnama Sasih ${m.sasihName}`, type: "purnama" });
    if (m.isTilem) holidays.push({ name: `Tilem Sasih ${m.sasihName}`, type: "tilem" });

    // Hari Bhatara Sri: Sukra Umanis Wuku Menail
    if (p.saptaName === "Sukra" && p.pancaName === "Umanis" && p.wukuName === "Menail") {
      holidays.push({ name: "Hari Bhatara Sri", type: "special" });
    }

    // Kajeng Kliwon (Tri Wara Kajeng & Panca Wara Kliwon)
    if (p.pancaName === "Kliwon" && (p.dayInCycle % 3 === 2)) {
      holidays.push({ name: "Kajeng Kliwon", type: "kajeng" });
    }

    // Buda Kliwon (Setiap Buda Kliwon di wuku tertentu)
    if (p.saptaName === "Buda" && p.pancaName === "Kliwon") {
      if (p.wukuName === "Sinta") holidays.push({ name: "Hari Raya Pagerwesi", type: "pagerwesi" });
      else if (p.wukuName === "Gumbreg") holidays.push({ name: "Buda Kliwon Gumbreg", type: "special" });
      else if (p.wukuName === "Dungulan") holidays.push({ name: "Hari Raya Galungan", type: "galungan" });
      else if (p.wukuName === "Pahang") holidays.push({ name: "Buda Kliwon Pahang", type: "special" });
      else if (p.wukuName === "Matal") holidays.push({ name: "Buda Kliwon Matal", type: "special" });
      else if (p.wukuName === "Ugu") holidays.push({ name: "Buda Kliwon Ugu", type: "special" });
    }

    // Kuningan (Saniscara Kliwon Kuningan)
    if (p.wukuName === "Kuningan" && p.saptaName === "Saniscara" && p.pancaName === "Kliwon") {
      holidays.push({ name: "Hari Raya Kuningan", type: "kuningan" });
    }

    // Saraswati (Saniscara Umanis Watugunung)
    if (p.wukuName === "Watugunung" && p.saptaName === "Saniscara" && p.pancaName === "Umanis") {
      holidays.push({ name: "Hari Raya Saraswati", type: "saraswati" });
    }

    // Banyu Pinaruh (Redite Paing Sinta)
    if (p.wukuName === "Sinta" && p.saptaName === "Redite" && p.pancaName === "Paing") {
      holidays.push({ name: "Banyu Pinaruh", type: "special" });
    }

    // Tumpek (Saniscara Kliwon)
    if (p.saptaName === "Saniscara" && p.pancaName === "Kliwon") {
      if (p.wukuName === "Landep") holidays.push({ name: "Tumpek Landep", type: "tumpek" });
      else if (p.wukuName === "Wariga") holidays.push({ name: "Tumpek Uduh / Wariga", type: "tumpek" });
      else if (p.wukuName === "Krulut") holidays.push({ name: "Tumpek Krulut", type: "tumpek" });
      else if (p.wukuName === "Uye") holidays.push({ name: "Tumpek Kandang", type: "tumpek" });
      else if (p.wukuName === "Wayang") holidays.push({ name: "Tumpek Wayang", type: "tumpek" });
    }

    return holidays;
  }

  /**
   * Get list of upcoming Rerahinan for the next N days
   */
  function getUpcomingRerahinan(daysAhead = 30) {
    const list = [];
    const today = new Date();
    
    for (let i = 0; i <= daysAhead; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const holidays = checkRerahinan(d);
      
      if (holidays.length > 0) {
        const p = getPawukon(d);
        holidays.forEach(h => {
          list.push({
            date: d,
            dateString: d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
            name: h.name,
            type: h.type,
            wuku: p.wukuName,
            day: p.fullDayName,
            daysLeft: i
          });
        });
      }
    }
    return list;
  }

  return {
    getPawukon,
    getMoonPhase,
    checkRerahinan,
    getUpcomingRerahinan,
    WUKU_LIST,
    SASIH_LIST
  };
})();

if (typeof window !== "undefined") {
  window.BalineseCalendar = BalineseCalendar;
}
