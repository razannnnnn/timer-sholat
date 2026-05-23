/**
 * Mengubah string "HH:MM" menjadi total menit sejak tengah malam
 */
export function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Format sisa detik menjadi MM:SS atau HH:MM:SS
 */
export function formatCountdown(totalSeconds, includeHours = true) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  if (includeHours && h > 0) return `${pad(h)}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

const PRAYER_KEYS = ["subuh", "dzuhur", "ashar", "maghrib", "isya"];
const PRAYER_LABEL = {
  subuh: "Subuh",
  dzuhur: "Dzuhur",
  ashar: "Ashar",
  maghrib: "Maghrib",
  isya: "Isya'",
};

/**
 * Menghitung status sholat saat ini:
 * phase: 'countdown' | 'iqomah' | 'active'
 */
export function getPrayerStatus(now, prayers, iqomah) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowSeconds = nowMinutes * 60 + now.getSeconds();

  // Cari sholat berikutnya
  let nextKey = null;
  for (const key of PRAYER_KEYS) {
    const t = timeToMinutes(prayers[key]);
    if (nowMinutes < t) {
      nextKey = key;
      break;
    }
  }

  // Sudah lewat semua → target Subuh besok
  if (!nextKey) {
    const subuhTomorrow = timeToMinutes(prayers.subuh) + 24 * 60;
    const diff = (subuhTomorrow - nowMinutes) * 60 - now.getSeconds();
    return {
      next: "subuh",
      label: "Subuh",
      phase: "countdown",
      countdown: Math.max(0, diff),
    };
  }

  const nextMinutes = timeToMinutes(prayers[nextKey]);
  const diffSeconds = (nextMinutes - nowMinutes) * 60 - now.getSeconds();

  // Cek apakah kita sedang di window iqomah sholat sebelumnya
  const idx = PRAYER_KEYS.indexOf(nextKey);
  if (idx > 0) {
    const prevKey = PRAYER_KEYS[idx - 1];
    const prevMinutes = timeToMinutes(prayers[prevKey]);
    const iqomahDur = (iqomah[prevKey] ?? 10) * 60;
    const iqomahStart = prevMinutes * 60;
    const iqomahEnd = iqomahStart + iqomahDur;

    if (nowSeconds >= iqomahStart && nowSeconds < iqomahEnd) {
      const rem = iqomahEnd - nowSeconds;
      return {
        next: prevKey,
        label: PRAYER_LABEL[prevKey],
        phase: "iqomah",
        countdown: rem,
      };
    }
    // Setelah iqomah selesai tapi sebelum adzan berikutnya → active
    if (nowSeconds >= iqomahEnd && nowSeconds < nextMinutes * 60) {
      return {
        next: prevKey,
        label: PRAYER_LABEL[prevKey],
        phase: "active",
        countdown: 0,
      };
    }
  } else {
    // Sebelum Subuh — cek iqomah Isya
    const isyaMinutes = timeToMinutes(prayers.isya);
    const iqomahDur = (iqomah.isya ?? 10) * 60;
    const iqomahEnd = isyaMinutes * 60 + iqomahDur;
    if (nowSeconds >= isyaMinutes * 60 && nowSeconds < iqomahEnd) {
      const rem = iqomahEnd - nowSeconds;
      return {
        next: "isya",
        label: "Isya'",
        phase: "iqomah",
        countdown: rem,
      };
    }
  }

  return {
    next: nextKey,
    label: PRAYER_LABEL[nextKey],
    phase: "countdown",
    countdown: Math.max(0, diffSeconds),
  };
}

export function getHijriDate() {
  // Estimasi sederhana — untuk production gunakan library hijri-date atau API
  return "29 Dzul Qa'dah 1447 H";
}

export const PRAYER_ARABIC = {
  subuh: "الفجر",
  dzuhur: "الظهر",
  ashar: "العصر",
  maghrib: "المغرب",
  isya: "العشاء",
};

export function addMinutesToTime(timeStr, mins) {
  const [h, m] = timeStr.split(":").map(Number);
  const total = h * 60 + m + mins;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}
