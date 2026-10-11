# KonselorBK AI - Asisten AI Konselor Bimbingan dan Konseling (BK) SMP

Aplikasi asisten AI cerdas untuk Guru BK tingkat SMP (Sekolah Menengah Pertama) yang dirancang untuk menganalisis curhatan, hasil kuesioner asesmen kebutuhan siswa (AKPD), serta catatan observasi perilaku. Sistem ini secara otomatis mengidentifikasi bidang masalah, menilai tingkat urgensi risiko, dan menyusun rekomendasi tindakan awal operasional yang sesuai dengan kode etik bimbingan konseling dan karakteristik psikologi remaja awal (usia 12–15 tahun).

---

## 🎯 Fitur Utama

1. **Analisis Diagnostik Otomatis (Gemini 3.8 Flash)**:
   - **Klasifikasi 4 Bidang Bimbingan**:
     - **Pribadi**: Stres, kestabilan emosi, percaya diri, kecanduan gadget/game, kesepian, krisis identitas.
     - **Sosial**: Pertemanan, perundungan (*bullying* verbal/fisik/siber), isolasi sosial, dinamika keluarga.
     - **Belajar**: Penurunan nilai akademik, prokrastinasi, kesulitan fokus/konsentrasi, beban tugas.
     - **Karier**: Kebingungan kelanjutan studi (SMA vs SMK vs MA), eksplorasi minat dan bakat.
   - **Penilaian 3 Tingkat Urgensi**:
     - **TINGGI (Darurat)**: Indikasi *self-harm*, keputusasaan ekstrem, kekerasan fisik/seksual, ancaman keselamatan jiwa (waktu tanggap seketika < 1–2 jam dengan protokol krisis).
     - **SEDANG**: Bullying verbal berkepanjangan, kecemasan intens/psikosomatis, nilai merosot drastis (waktu tanggap 1 x 24 jam).
     - **RENDAH**: Penyesuaian belajar umum, kebingungan ekstrakurikuler/minat normatif (layanan mingguan reguler).

2. **Rekomendasi Operasional Guru BK**:
   - Langkah pertama mendesak hari ini (*immediate action*).
   - Pendekatan teknik konseling (*Person-Centered*, *SFBT*, *Reality Therapy WDEP*, *Behavioral Contract*).
   - Skrip pembuka dialog konseling (*opening script*) ramah dan non-menghakimi (dilengkapi tombol salin teks).
   - Panduan kolaborasi etis lintas pihak (Wali Kelas, Orang Tua, Kepala Sekolah, rujukan ahli).
   - Peringatan penegakan asas kerahasiaan ABKIN.

3. **Cetak Lembar RPL Konseling Individual (Format Resmi SMP)**:
   - Export / cetak dokumen Rencana Pelaksanaan Layanan (RPL BK) / Satuan Layanan (Satlan) lengkap dengan kop surat sekolah dan kolom tanda tangan resmi.

4. **Konsultasi Interaktif AI Co-Pilot Guru BK**:
   - Diskusi interaktif untuk merancang strategi konseling lanjutan, draf pesan WhatsApp ke orang tua, atau teknik relaksasi siswa.

5. **Rekam Jejak Kasus (Case Tracker)**:
   - Manajemen status penanganan (*Belum Ditangani*, *Dalam Proses Konseling*, *Selesai*, *Alih Tangan Kasus*) dan pencatatan catatan tindak lanjut guru BK.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Motion
- **Backend**: Node.js, Express, tsx
- **AI Engine**: `@google/genai` (Google Gemini 3.8 Flash)
- **Bundler**: Vite

---

## 🚀 Panduan Instalasi & Menjalankan Lokal

### 1. Prasyarat
- Node.js versi 18 atau lebih tinggi
- NPM / Bun / Yarn
- Google Gemini API Key ([Dapatkan di Google AI Studio](https://aistudio.google.com/))

### 2. Kloning Repositori
```bash
git clone https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git
cd NAMA_REPO_ANDA
```

### 3. Pasang Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Buka file `.env` dan masukkan API Key Gemini Anda:
```env
GEMINI_API_KEY="AIzaSy..."
PORT=3000
```

### 5. Jalankan Aplikasi
```bash
npm run dev
```
Buka peramban di `http://localhost:3000`.

---

## 📤 Cara Mengunggah (Push) ke GitHub

Jika Anda ingin mengunggah repositori ini ke akun GitHub Anda:

1. **Buat Repositori Baru di GitHub**:
   - Buka [https://github.com/new](https://github.com/new)
   - Beri nama repositori (misal: `konselor-bk-smp-ai`)
   - Pilih *Public* atau *Private* (jangan centang *Initialize with README*)
   - Klik **Create repository**

2. **Hubungkan & Push dari Terminal**:
   ```bash
   git remote add origin https://github.com/USERNAME_ANDA/konselor-bk-smp-ai.git
   git branch -M main
   git push -u origin main
   ```

---

## 📜 Lisensi & Etika Profesi

Aplikasi ini ditujukan sebagai alat bantu pendukung keputusan (*decision support tool*) bagi Guru BK profesional dan bukan pengganti diagnosis medis/psikiatris. Seluruh penanganan kasus wajib mengikuti Kode Etik Asosiasi Bimbingan dan Konseling Indonesia (ABKIN).
