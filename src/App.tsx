import React, { useState } from 'react';
import { Header } from './components/Header';
import { CaseInputForm } from './components/CaseInputForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { CounselorChatModal } from './components/CounselorChatModal';
import { SOPGuidelineModal } from './components/SOPGuidelineModal';
import { PrintableRPL } from './components/PrintableRPL';
import { CaseRecord, AnalysisResult } from './types/bk';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [currentRecord, setCurrentRecord] = useState<CaseRecord | null>(null);
  const [caseHistory, setCaseHistory] = useState<CaseRecord[]>([]);

  // Modal states
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isSOPOpen, setIsSOPOpen] = useState<boolean>(false);
  const [isRPLOpen, setIsRPLOpen] = useState<boolean>(false);

  const handleCaseSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('API Key belum terbaca. Pastikan VITE_GEMINI_API_KEY sudah disimpan di Vercel Settings.');
      }

      const systemInstruction = `Kamu adalah Konselor AI Spesialis Bimbingan dan Konseling (BK) jenjang SMP.
Analisis data masalah siswa ke dalam 4 bidang (Pribadi, Sosial, Belajar, Karier) dan tentukan tingkat urgensi risiko (TINGGI, SEDANG, RENDAH).
Kembalikan HANYA format JSON valid tanpa tanda markdown:
{
  "bidangUtama": "Pribadi",
  "tingkatUrgensi": "TINGGI",
  "ringkasanMasalah": "Ringkasan masalah...",
  "faktorPemicu": "Penyebab masalah...",
  "rekomendasiTindakan": [
    "Langkah 1 tindakan guru BK",
    "Langkah 2 koordinasi sekolah atau ortu"
  ],
  "catatanKritis": "Catatan khusus atau penanganan darurat"
}`;

      const userPrompt = `Identitas Siswa:
Nama/Inisial: ${formData.studentInfo?.name || 'Anonim'}
Kelas: ${formData.studentInfo?.grade || 'Kelas 8'}
Jenis Kelamin: ${formData.studentInfo?.gender || 'Tidak disebutkan'}
Sumber Data: ${formData.sourceType}

Data Curhatan / Masalah:
"${formData.text}"
${formData.additionalContext ? `Konteks Tambahan: ${formData.additionalContext}` : ''}`;

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
                parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }]
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2
            }
          })
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `Gagal menghubungi Gemini API (${response.status})`);
      }

      const resData = await response.json();
      const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error('Tidak ada respon teks dari model AI.');
      }

      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const analysis: AnalysisResult = JSON.parse(cleanJson);

      const record: CaseRecord = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        studentInfo: formData.studentInfo,
        sourceType: formData.sourceType,
        rawText: formData.text,
        analysis
      };

      setCurrentAnalysis(analysis);
      setCurrentRecord(record);
      setCaseHistory(prev => [record, ...prev]);

    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Terjadi kesalahan saat menganalisis kasus.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <Header
        onOpenSOP={() => setIsSOPOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        historyCount={caseHistory.length}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">Gagal Menganalisis Kasus</p>
              <p className="text-xs mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2.5 py-1 rounded-md"
            >
              Tutup
            </button>
          </div>
        )}

        <CaseInputForm
          onSubmit={handleCaseSubmit}
          isLoading={isLoading}
        />

        {currentAnalysis && currentRecord && (
          <AnalysisDisplay
            analysis={currentAnalysis}
            record={currentRecord}
            onGenerateRPL={() => setIsRPLOpen(true)}
          />
        )}
      </main>

      {isChatOpen && (
        <CounselorChatModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          currentRecord={currentRecord}
        />
      )}

      {isSOPOpen && (
        <SOPGuidelineModal
          isOpen={isSOPOpen}
          onClose={() => setIsSOPOpen(false)}
        />
      )}

      {isRPLOpen && currentRecord && (
        <PrintableRPL
          record={currentRecord}
          onClose={() => setIsRPLOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
