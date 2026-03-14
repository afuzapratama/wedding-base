# Wedding Invitation Website 💒✨

Website undangan pernikahan yang elegan dengan animasi indah.

## ✨ Fitur
- 🎬 **Opening Animation** - Animasi pembukaan amplop undangan
- 🌸 **Floating Petals** - Kelopak bunga yang berterbangan
- 📜 **Scroll Animations** - Animasi muncul saat scroll (GSAP + ScrollTrigger)
- ⏰ **Countdown Timer** - Hitung mundur menuju hari H
- 💑 **Profil Mempelai** - Info kedua mempelai
- 💕 **Love Story Timeline** - Cerita perjalanan cinta
- 📸 **Galeri Foto** - Koleksi foto berdua
- 📖 **Ayat Al-Quran** - QS. Ar-Rum: 21
- ✅ **RSVP Form** - Konfirmasi kehadiran
- 💌 **Ucapan & Doa** - Kirim ucapan untuk mempelai
- 🎁 **Amplop Digital** - Rekening untuk hadiah
- 🎵 **Background Music** - Musik latar (opsional)
- 📱 **Responsive** - Tampilan sempurna di semua device
- 🎯 **Guest Name** - Personalisasi nama tamu via URL

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

## 🎯 Personalisasi Nama Tamu

Tambahkan parameter `?to=Nama+Tamu` di URL:
```
https://yoursite.com/?to=Budi+Santoso
```

## 🎵 Menambahkan Musik

Letakkan file musik (MP3) di folder `public/` dengan nama `music.mp3`.

## 🎨 Customisasi

### Mengubah Warna
Edit CSS variables di `src/css/style.css`:
```css
:root {
  --color-primary: #5C003C;     /* Burgundy utama */
  --color-gold: #D4A574;        /* Champagne gold */
  --color-cream: #FFF5F7;       /* Background blush */
  --color-dark: #2D0A1F;        /* Warna gelap */
}
```

### Mengubah Data Pernikahan
Edit langsung di `index.html`:
- Nama mempelai
- Tanggal pernikahan
- Detail acara (waktu & lokasi)
- Love story
- Nomor rekening

### Menambahkan Foto
Ganti placeholder foto di `index.html` dengan tag `<img>`:
```html
<img src="/images/foto-anda.jpg" alt="Foto">
```

## 📁 Struktur Project

```
├── index.html              # Main HTML
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── public/                 # Static assets
│   └── music.mp3           # Background music (optional)
├── src/
│   ├── css/
│   │   └── style.css       # All styles
│   └── js/
│       ├── main.js         # Entry point
│       ├── cover.js        # Opening animation
│       ├── animations.js   # GSAP scroll animations
│       ├── countdown.js    # Countdown timer
│       ├── petals.js       # Floating petals effect
│       ├── navigation.js   # Dot navigation & music
│       └── forms.js        # RSVP & wishes forms
```

## 🛠 Tech Stack
- **Vite** - Build tool
- **GSAP + ScrollTrigger** - Premium animations
- **Lucide Icons** - Beautiful icons
- **Google Fonts** - Playfair Display, Great Vibes, Cormorant Garamond, Montserrat

## 💝 Made with Love
