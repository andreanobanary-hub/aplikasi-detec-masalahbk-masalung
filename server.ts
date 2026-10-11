import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY tidak ditemukan pada environment variables.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const BK_SYSTEM_INSTRUCTION = `Kamu adalah asisten AI konselor Bimbingan dan Konseling (BK) SMP (Sekolah Menengah Pertama, siswa usia 12-15 tahun) yang terlatih, empatik, objektif, dan berpegang teguh pada kode etik bimbingan konseling dan psikologi perkembangan remaja.

Tugas utamamu adalah:
1. Menganalisis curhatan, hasil kuesioner, atau catatan observasi siswa secara holistik.
2. Mengidentifikasi bidang masalah sesuai klasifikasi baku BK SMP:
   - Pribadi: Stres, emosi/labil, percaya diri rendah, kecanduan gadget/game, kesepian, krisis identitas diri.
   - Sosial: Masalah pertemanan, bullying/perundungan (verbal, fisik, relasional, siber), konflik keluarga/orang tua, dikucilkan, tekanan teman sebaya.
   - Belajar: Nilai turun drastis, malas/prokrastinasi, tidak fokus/konsentrasi rendah, tugas menumpuk, kesulitan adaptasi belajar.
   - Karier: Kebingungan studi lanjut (SMA vs SMK vs MA), eksplorasi minat & bakat, pemilihan ekstrakurikuler yang relevan dengan masa depan.
3. Menilai tingkat urgensi berdasarkan indikator risiko:
   - TINGGI: Indikasi self-harm, ide bunuh diri, keputusasaan ekstrem, kekerasan fisik, kekerasan seksual/pelecehan, penganiayaan di rumah, ancaman keselamatan jiwa, kabur dari rumah.
   - SEDANG: Bullying verbal berkepanjangan/pengucilan kronis, kecemasan intens/serangan panik, nilai merosot drastis akibat gangguan emosional, adiksi gadget/game parah hingga sering membolos.
   - RENDAH: Masalah adaptasi belajar umum, kebingungan ekstrakurikuler/minat biasa, pertanyaan studi lanjut normatif tanpa distres psikologis.
4. Memberikan rekomendasi tindakan awal yang konkret, operasional, dan aplikatif bagi Guru BK di sekolah, termasuk teknik konseling, skrip pembuka dialog konseling yang ramah dan tidak menghakimi, serta panduan koordinasi lintas pihak.`;

// API: Analisis Curhatan / Kuesioner
app.post('/api/analyze', async (req, res) => {
  try {
    const { text, studentInfo, sourceType, additionalContext } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Teks curhatan atau kuesioner wajib diisi.' });
    }

    const ai = getGeminiClient();

    const prompt = `Analisis data siswa SMP berikut ini:
Jenis Input: ${sourceType || 'Curhatan Siswa'}
Informasi Siswa: ${studentInfo ? JSON.stringify(studentInfo) : 'Anonim / Tidak disebutkan'}
Catatan Konteks Tambahan: ${additionalContext || 'Tidak ada'}

Isi Curhatan / Respon Kuesioner Siswa:
"""
${text}
"""

Lakukan analisis mendalam berdasarkan aturan BK SMP dan kembalikan output strictly dalam format JSON yang valid.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: BK_SYSTEM_INSTRUCTION,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            urgencyLevel: {
              type: Type.STRING,
              description: "Harus salah satu dari: 'TINGGI', 'SEDANG', 'RENDAH'",
            },
            primaryField: {
              type: Type.STRING,
              description: "Harus salah satu dari: 'Pribadi', 'Sosial', 'Belajar', 'Karier'",
            },
            secondaryFields: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Bidang sekunder yang berkaitan jika ada (Pribadi, Sosial, Belajar, Karier)",
            },
            urgencyReasoning: {
              type: Type.STRING,
              description: "Alasan klinis dan logis penentuan tingkat urgensi",
            },
            summary: {
              type: Type.STRING,
              description: "Ringkasan intisari masalah dalam 2-3 kalimat lugas",
            },
            emotionalState: {
              type: Type.OBJECT,
              properties: {
                dominantFeelings: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Emosi dominan (misal: takut, tertekan, cemas, bingung, terisolasi)",
                },
                description: {
                  type: Type.STRING,
                  description: "Deskripsi kondisi emosional dan psikologis siswa usia SMP",
                },
              },
              required: ["dominantFeelings", "description"],
            },
            keyIndications: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  quote: { type: Type.STRING, description: "Kutipan frasa asli dari siswa" },
                  significance: { type: Type.STRING, description: "Makna penting / indikator psikologis dari kutipan tersebut" },
                },
                required: ["quote", "significance"],
              },
              description: "Frasa kunci dan tanda-tanda khusus yang terdeteksi",
            },
            rootCauseHypothesis: {
              type: Type.STRING,
              description: "Hipotesis akar masalah yang mendasari kondisi siswa",
            },
            recommendationAction: {
              type: Type.OBJECT,
              properties: {
                responseTimeframe: {
                  type: Type.STRING,
                  description: "Estimasi waktu tindak lanjut (misal: 'Segera < 2 Jam', '1 x 24 Jam', '1-3 Hari ke depan')",
                },
                immediateStep: {
                  type: Type.STRING,
                  description: "Langkah pertama yang harus diambil Guru BK hari ini",
                },
                counselingApproach: {
                  type: Type.OBJECT,
                  properties: {
                    techniqueName: { type: Type.STRING, description: "Nama teknik konseling (misal: Person-Centered, SFBT, Reality WDEP)" },
                    rationale: { type: Type.STRING, description: "Mengapa teknik ini tepat untuk kasus dan usia SMP ini" },
                    stepGuide: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "Langkah-langkah praktis dalam sesi konseling",
                    },
                  },
                  required: ["techniqueName", "rationale", "stepGuide"],
                },
                openingDialogueScript: {
                  type: Type.STRING,
                  description: "Contoh kalimat percakapan pembuka yang ramah, hangat, dan tidak menghakimi untuk Guru BK",
                },
                collaboration: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      party: { type: Type.STRING, description: "Pihak yang dilibatkan (misal: Wali Kelas, Orang Tua, Kepala Sekolah, Psikolog)" },
                      roleAndApproach: { type: Type.STRING, description: "Peran dan cara berkoordinasi secara etis" },
                    },
                    required: ["party", "roleAndApproach"],
                  },
                  description: "Pihak kolaborator yang relevan",
                },
                ethicalNotice: {
                  type: Type.STRING,
                  description: "Catatan asas kerahasiaan & etika profesi bimbingan konseling yang wajib dijaga",
                },
              },
              required: [
                "responseTimeframe",
                "immediateStep",
                "counselingApproach",
                "openingDialogueScript",
                "collaboration",
                "ethicalNotice",
              ],
            },
          },
          required: [
            "urgencyLevel",
            "primaryField",
            "secondaryFields",
            "urgencyReasoning",
            "summary",
            "emotionalState",
            "keyIndications",
            "rootCauseHypothesis",
            "recommendationAction",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error analyzing BK case:', error);
    return res.status(500).json({
      error: error.message || 'Terjadi kesalahan saat memproses analisis dengan AI.',
    });
  }
});

// API: Konsultasi Lanjutan Guru BK (Counselor Co-Pilot Chat)
app.post('/api/consult', async (req, res) => {
  try {
    const { question, caseContext } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Pertanyaan konsultasi tidak boleh kosong.' });
    }

    const ai = getGeminiClient();

    const prompt = `KONTEKS KASUS SISWA SMP SAAT INI:
${caseContext ? JSON.stringify(caseContext, null, 2) : 'Tidak ada kasus spesifik (pertanyaan umum bimbingan konseling SMP)'}

PERTANYAAN / KEBUTUHAN GURU BK:
"${question}"

Berikan saran profesional konseling bimbingan SMP yang aplikatif, berempati pada psikologi remaja (12-15 tahun), dan menjunjung tinggi asas etika konseling. Format jawaban dengan markdown yang rapi, poin-poin jelas, dan contoh konkret.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: BK_SYSTEM_INSTRUCTION,
        temperature: 0.4,
      },
    });

    return res.json({ success: true, answer: response.text });
  } catch (error: any) {
    console.error('Error in consultant response:', error);
    return res.status(500).json({
      error: error.message || 'Gagal menghasilkan konsultasi Guru BK.',
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server KonselorBK AI berjalan di http://localhost:${PORT}`);
  });
}

startServer();
