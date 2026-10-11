export default async function handler(req, res) {
  // 1. Izinkan header CORS jika dipanggil dari domain frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Tangani preflight request browser
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Hanya proses metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Gunakan metode POST.' });
  }

  // 2. Ambil Gemini API Key dari Environment Variable Vercel
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Konfigurasi belum lengkap: GEMINI_API_KEY belum diisi di Environment Variables Vercel.'
    });
  }

  try {
    // 3. Ekstrak data curhatan atau kuesioner dari request body
    const body = req.body || {};
    const nama = body.nama || body.inIsial || 'Siswa (Anonim)';
    const kelas = body.kelas || 'SMP';
    const jenisKelamin = body.jenisKelamin || '-';
    const curhatan = body.curhatan || body.prompt || body.text || (typeof body === 'string' ? body : JSON.stringify(body));

    // 4. Instruksi Konselor BK & Format JSON Terstruktur
    const systemInstruction = `Kamu adalah Konselor AI Spesialis Bimbingan dan Konseling (BK) jenjang SMP.
Tugasmu adalah menganalisis curhatan atau hasil asesmen masalah siswa secara mendalam, objektif, dan solutif.

Klasifikasikan ke dalam 4 bidang utama BK:
- Pribadi (emosi, stres, kepercayaan diri, kecanduan gadget/game, kesepian)
- Sosial (pertemanan, bullying verbal/fisik/cyber, perundungan, relasi teman sekelas/keluarga)
- Belajar (kesulitan konsentrasi, tugas menumpuk, motivasi rendah, nilai merosot)
- Karier (kebingungan minat bakat, kebingungan peminatan SMA/SMK)

Nilai Tingkat Urgensi Risiko:
- TINGGI: Ada indikasi melukai diri (self-harm), kekerasan fisik, ancaman bahaya, depresi berat, atau bullying ekstrem.
- SEDANG: Bullying verbal berkelanjutan, stres yang mengganggu belajar, isolasi sosial nyata.
- RENDAH: Masalah adaptasi belajar biasa, bingung memilih kegiatan/ekstrakurikuler.

KEMBALIKAN HANYA JSON VALID (tanpa markdown backtick atau teks pendukung) dengan struktur objek:
{
  "nama": "${nama}",
  "kelas": "${kelas}",
  "bidang": "Pribadi / Sosial / Belajar / Karier",
  "urgensi": "TINGGI" atau "SEDANG" atau "RENDAH",
  "ringkasan": "Deskripsi singkat dan jelas mengenai masalah yang dialami siswa",
  "analisis_faktor": "Faktor pemicu atau akar penyebab yang terdeteksi dari ceritanya",
  "rekomendasi_tindakan": [
    "Langkah 1 tindakan guru BK (misal: konseling individual darurat)",
    "Langkah 2 tindakan pendukung (misal: koordinasi wali kelas/orang tua)",
    "Langkah 3 tindakan lanjutan"
  ],
  "catatan_kritis": "Catatan waspada jika ada potensi risiko lebih lanjut"
}`;

    const promptUser = `Identitas Siswa: ${nama} (${kelas}, ${jenisKelamin})
Curhatan / Respon Masalah:
"${curhatan}"`;

    // 5. Kirim request ke Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\n${promptUser}` }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error?.message || 'Terjadi kesalahan pada Gemini API';
      return res.status(response.status).json({ error: errorMsg });
    }

    // 6. Ambil respons teks JSON dari Gemini
    const rawAiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawAiResponse) {
      return res.status(500).json({ error: 'Gemini tidak mengembalikan teks respon yang valid.' });
    }

    // Bersihkan karakter markdown jika model menyertakan ```json
    const cleanedJson = rawAiResponse
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsedJson = JSON.parse(cleanedJson);

    // 7. Kembalikan respons berhasil ke frontend
    return res.status(200).json(parsedJson);

  } catch (error) {
    console.error('API Analyze Error:', error);
    return res.status(500).json({
      error: 'Gagal memproses data konseling: ' + error.message
    });
  }
}
