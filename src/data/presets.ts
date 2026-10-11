import { StudentInfo, UrgencyLevel, ProblemField } from '../types/bk';

export interface PresetCase {
  id: string;
  title: string;
  badgeLabel: string;
  expectedUrgency: UrgencyLevel;
  expectedPrimaryField: ProblemField;
  studentInfo: StudentInfo;
  sourceType: 'Curhatan Siswa' | 'Kuesioner Kebutuhan (AKPD)' | 'Catatan Observasi Guru';
  inputText: string;
  additionalContext?: string;
}

export const PRESET_CASES: PresetCase[] = [
  {
    id: 'case-selfharm-kekerasan',
    title: 'Kasus 1: Tekanan Rumah & Self-Harm (Krisis Mendesak)',
    badgeLabel: 'Urgensi TINGGI • Pribadi & Sosial',
    expectedUrgency: 'TINGGI',
    expectedPrimaryField: 'Pribadi',
    studentInfo: {
      name: 'Rian (Inisial R)',
      classGrade: 'Kelas 8D',
      gender: 'Laki-laki',
      isAnonymous: false,
    },
    sourceType: 'Curhatan Siswa',
    inputText: `Selamat siang Bu Guru BK... Maaf saya lancang kirim pesan lewat kotak curhat ini. Saya beneran sudah gak sanggup lagi. Di rumah, Ayah selalu marah besar kalau nilai saya di bawah 95. Kemarin waktu nilai ulangan matematika saya 70, kepala saya dipukul pakai sabuk dan saya dikurung di kamar mandi tanpa makan. Di sekolah juga teman-teman menjauhi saya karena baju saya sering lusuh. 

Tadi malam waktu Ayah tidur, saya gores-gores lengan kiri pakai jangka matematika berkali-kali. Rasanya sakit tapi kepala saya jadi agak tenang daripada dengar bentakan Ayah. Bu, saya ngerasa mending saya hilang aja dari dunia ini biar Ayah gak malu punya anak bodoh kayak saya... Jangan kasih tau Ayah ya Bu, saya takut dipukul lebih parah.`,
    additionalContext: 'Siswa tampak sering memakai jaket tebal di kelas meski cuaca terik. Menolak menggulung lengan baju saat pelajaran olahraga.',
  },
  {
    id: 'case-bullying-verbal',
    title: 'Kasus 2: Perundungan Verbal & Pengucilan Berulang',
    badgeLabel: 'Urgensi SEDANG • Sosial',
    expectedUrgency: 'SEDANG',
    expectedPrimaryField: 'Sosial',
    studentInfo: {
      name: 'Alya Putri',
      classGrade: 'Kelas 7B',
      gender: 'Perempuan',
      isAnonymous: false,
    },
    sourceType: 'Curhatan Siswa',
    inputText: `Bu BK, saya mau cerita tapi tolong rahasiakan ya... Sejak 3 minggu lalu, teman-teman perempuan di baris belakang kelas selalu ngejek saya. Tiap kali saya maju menjawab pertanyaan guru, mereka bisik-bisik sambil ketawa dan manggil saya 'anak kampung bau apek'. Mereka bahkan bikin grup WhatsApp khusus satu kelas tanpa saya, dan bikin stiker muka saya waktu saya menangis.

Sekarang tiap bel istirahat bunyi, saya cuma diam di bilik toilet sampai bel masuk bunyi lagi karena takut diolok-olok di kantin. Tiap pagi sebelum berangkat sekolah, perut saya sakit melilit dan mual-mual karena takut ketemu mereka. Saya pengen pindah sekolah aja kalau keadaannya terus seperti ini.`,
    additionalContext: 'Laporan wali kelas: Alya sering izin ke UKS saat jam istirahat dan nilai keaktifan menurun.',
  },
  {
    id: 'case-adiksi-game-belajar',
    title: 'Kasus 3: Kecanduan Game Online & Penurunan Nilai Drastis',
    badgeLabel: 'Urgensi SEDANG • Pribadi & Belajar',
    expectedUrgency: 'SEDANG',
    expectedPrimaryField: 'Belajar',
    studentInfo: {
      name: 'Fathir Nugraha',
      classGrade: 'Kelas 8A',
      gender: 'Laki-laki',
      isAnonymous: false,
    },
    sourceType: 'Curhatan Siswa',
    inputText: `Bu, saya bingung sama diri saya sendiri. Dulu waktu kelas 7 nilai saya selalu 10 besar. Tapi sejak dibelikan HP baru sama ortu semester lalu, saya jadi kecanduan main Mobile Legends bareng squad online sampai jam 3 atau 4 subuh setiap hari. Paginya saya susah banget bangun, kepala pusing, dan di kelas jam pelajaran pertama sampai keempat saya sering ketiduran di meja. 

Tugas-tugas kelompok dan PR Matematika serta IPA udah numpuk gak ada yang saya kerjakan selama 3 minggu ini. Nilai PTS kemarin hampir semua mata pelajaran di bawah KKM (merah). Kemarin ibu saya nangis waktu tahu nilai saya, saya ngerasa bersalah banget tapi pas pegang HP tangan saya otomatis buka game lagi dan susah berhenti. Tolong bantu saya Bu...`,
    additionalContext: 'Catatan guru piket: Fathir sudah terlambat masuk sekolah sebanyak 6 kali dalam bulan ini.',
  },
  {
    id: 'case-dilema-karier',
    title: 'Kasus 4: Kebingungan Studi Lanjut SMA vs SMK',
    badgeLabel: 'Urgensi RENDAH • Karier',
    expectedUrgency: 'RENDAH',
    expectedPrimaryField: 'Karier',
    studentInfo: {
      name: 'Dimas Setiawan',
      classGrade: 'Kelas 9C',
      gender: 'Laki-laki',
      isAnonymous: false,
    },
    sourceType: 'Curhatan Siswa',
    inputText: `Halo Ibu Guru BK, saya mau minta bimbingan tentang kelanjutan sekolah setelah lulus SMP nanti. Saya ada kebimbangan yang cukup besar antara kemauan orang tua dan minat saya sendiri. Orang tua saya menyarankan agar saya masuk SMK jurusan Teknik Komputer Jaringan (TKJ) karena katanya biayanya terjangkau dan setelah lulus bisa langsung kerja membantu ekonomi keluarga.

Namun saya sendiri lebih tertarik untuk melanjutkan ke SMA jurusan MIPA, karena cita-cita saya dari kecil ingin kuliah di jurusan Farmasi atau Kimia Murni. Saya suka sekali praktikum IPA di lab sekolah. Saya bingung bagaimana cara berdiskusi yang baik dengan orang tua tanpa terkesan melawan, dan saya ingin tahu tes minat bakat apa yang bisa membantu saya memastikan pilihan ini.`,
    additionalContext: 'Dimas adalah siswa berprestasi di bidang sains SMP, sikap kooperatif dan aktif di kelas.',
  },
  {
    id: 'case-adaptasi-ekskul',
    title: 'Kasus 5: Adaptasi Lingkungan Baru & Pilihan Ekstrakurikuler',
    badgeLabel: 'Urgensi RENDAH • Pribadi & Belajar',
    expectedUrgency: 'RENDAH',
    expectedPrimaryField: 'Pribadi',
    studentInfo: {
      name: 'Siti Rahma',
      classGrade: 'Kelas 7E',
      gender: 'Perempuan',
      isAnonymous: false,
    },
    sourceType: 'Kuesioner Kebutuhan (AKPD)',
    inputText: `Saya siswa baru pindahan dari luar kota. Di sekolah lama suasana belajarnya lebih santai, tapi di SMP ini tugasnya cukup banyak dan ritme belajarnya cepat. Saya masih agak canggung untuk memulai obrolan dengan teman sebangku saya karena beda logat bahasa daerah. 

Selain itu, saya bingung memilih antara ekstrakurikuler Pramuka atau PMR (Palang Merah Remaja) untuk mengisi kegiatan hari Sabtu. Saya ingin aktif berkegiatan tapi takut keteteran dengan tugas-tugas harian sekolah. Mohon saran dan bimbingan dari Bapak/Ibu Guru BK agar saya bisa menyesuaikan diri lebih cepat.`,
    additionalContext: 'Instrumen AKPD bagian pribadi dan sosial terisi dengan skor rata-rata normal.',
  },
];
