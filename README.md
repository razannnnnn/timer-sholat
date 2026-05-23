# 🕌 Timer Sholat — Dashboard Masjid Digital

Display jadwal sholat masjid berbasis web yang elegan, dibangun dengan Next.js 16 dan Tailwind CSS. Dirancang untuk ditampilkan di layar besar (TV/monitor) di masjid.

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-EF0278?style=flat-square&logo=framer)

---

## ✨ Fitur

- **Jam Digital Real-time** — Menampilkan jam, menit, detik beserta progress bar
- **Jadwal Sholat 5 Waktu** — Grid lengkap Subuh, Dzuhur, Ashar, Maghrib, Isya + waktu iqomah
- **Kartu Sholat Berikutnya** — Countdown otomatis menuju waktu sholat selanjutnya
- **Banner Iqomah** — Banner animasi yang muncul otomatis saat masuk waktu iqomah
- **Running Text Pengumuman** — Teks berjalan untuk pengumuman masjid
- **Widget Cuaca & Kiblat** — Menampilkan suhu, kelembapan, dan arah kiblat
- **Tanggal Hijriyah** — Ditampilkan di header bersama tanggal Masehi
- **Desain Premium** — Dark navy glassmorphism dengan aksen gold + animasi Framer Motion

---

## 🖥️ Preview

```
┌─────────────────────────────────────────────────────────────┐
│  🕌 MASJID AL-IKHLAS          Sabtu, 24 Mei 2025            │
│     Jl. Merdeka No. 1 · Blitar   29 Dzul Qa'dah 1447 H     │
├──────────────────────┬──────────────────────────────────────┤
│                      │   JADWAL SHOLAT LIMA WAKTU           │
│   11 : 54 : 22       │  ┌──────┬──────┬──────┬──────┬──────┐│
│   ──────────────     │  │Subuh │Dzuhur│Ashar │Maghr.│ Isya ││
│                      │  │04:32 │11:54 │15:18 │17:51 │19:04 ││
│   ┌──────────────┐   │  └──────┴──────┴──────┴──────┴──────┘│
│   │ Dzuhur       │   │                                      │
│   │ 00:01:38     │   │                                      │
│   └──────────────┘   │                                      │
├──────────────────────┴──────────────────────────────────────┤
│  📢 PENGUMUMAN  Mohon luruskan dan rapatkan shaf... ►  29°C │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js 18+
- npm / yarn / pnpm

### Instalasi

```bash
# Clone repository
git clone https://github.com/razannnnnn/timer-sholat.git
cd timer-sholat

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk Produksi

```bash
npm run build
npm run start
```

---

## 📁 Struktur Project

```
timer-sholat/
├── src/
│   ├── app/
│   │   ├── page.js           # Halaman utama display
│   │   ├── layout.js         # Root layout + font config
│   │   └── globals.css       # Custom CSS (glass, ornament, animasi)
│   ├── components/
│   │   └── display/
│   │       ├── MosqueHeader.jsx    # Header: nama masjid + tanggal
│   │       ├── DigitalClock.jsx    # Jam digital + ayat Al-Qur'an
│   │       ├── NextPrayerCard.jsx  # Kartu countdown sholat berikutnya
│   │       ├── PrayerGrid.jsx      # Grid jadwal 5 waktu
│   │       ├── IqomahBanner.jsx    # Banner iqomah animasi
│   │       ├── RunningText.jsx     # Teks berjalan pengumuman
│   │       └── WeatherWidget.jsx   # Widget cuaca & arah kiblat
│   └── lib/
│       └── prayerUtils.js    # Logic: countdown, status sholat, format waktu
├── tailwind.config.js
├── package.json
└── README.md
```

---

## ⚙️ Konfigurasi

Saat ini data menggunakan mock data di `src/app/page.js`. Untuk menyesuaikan:

### Pengaturan Masjid

```js
// src/app/page.js
const MOCK_SETTINGS = {
  mosqueName: "Masjid Al-Ikhlas", // Nama masjid
  shortAddress: "Jl. Merdeka No. 1 · Blitar", // Alamat singkat
  timezone: "Asia/Jakarta",
};
```

### Jadwal Sholat

```js
const MOCK_PRAYER = {
  subuh: "04:32",
  dzuhur: "11:54",
  ashar: "15:18",
  maghrib: "17:51",
  isya: "19:04",
};
```

### Durasi Iqomah (menit)

```js
const MOCK_IQOMAH = {
  subuh: 10,
  dzuhur: 10,
  ashar: 10,
  maghrib: 5,
  isya: 10,
};
```

### Pengumuman

```js
const MOCK_ANNOUNCEMENTS = [
  "Mohon luruskan dan rapatkan shaf.",
  "Kajian rutin ba'da Maghrib setiap malam Jumat.",
];
```

---

## 🔮 Roadmap

- [ ] Integrasi API jadwal sholat otomatis ([Aladhan API](https://aladhan.com/prayer-times-api))
- [ ] Kalkulasi tanggal Hijriyah dinamis
- [ ] Halaman `/admin` untuk mengelola jadwal & pengumuman
- [ ] Fix animasi `sway` (lentera) dan `spin-slow` (kompas kiblat)
- [ ] Dukungan multi-masjid / multi-lokasi
- [ ] Mode landscape untuk TV horizontal

---

## 🛠️ Teknologi

| Teknologi     | Versi  | Kegunaan              |
| ------------- | ------ | --------------------- |
| Next.js       | 16.2.6 | Framework React       |
| React         | 19.2.4 | UI Library            |
| Tailwind CSS  | 3.4    | Styling utility-first |
| Framer Motion | 12.x   | Animasi               |

---

## 📄 Lisensi

Project ini bersifat pribadi. Silakan hubungi pemilik repository untuk penggunaan lebih lanjut.
