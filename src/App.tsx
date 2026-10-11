import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CaseInputForm } from './components/CaseInputForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { SOPGuidelineModal } from './components/SOPGuidelineModal';
import { PrintableRPL } from './components/PrintableRPL';
import { CounselorChatModal } from './components/CounselorChatModal';
import { CaseHistoryTracker } from './components/CaseHistoryTracker';
import { BKAnalysisResult, StudentInfo, SavedCaseRecord, CaseStatus } from './types/bk';
import { AlertCircle, Sparkles, BookOpen, HeartHandshake, ShieldCheck, HelpCircle } from 'lucide-react';

const STORAGE_KEY = 'konselor_bk_cases_v1';

export default function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<BKAnalysisResult | null>(null);
  const [currentStudentInfo, setCurrentStudentInfo] = useState<StudentInfo>({
    name: 'Siswa SMP',
    classGrade: 'Kelas 8B',
    gender: 'Tidak disebutkan',
    isAnonymous: false,
  });
  const [currentSourceType, setCurrentSourceType] = useState<string>('Curhatan Siswa');
  const [currentInputText, setCurrentInputText] = useState<string>('');

  const [savedCases, setSavedCases] = useState<SavedCaseRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [isSOPModalOpen, setIsSOPModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);

  // Load saved cases from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedCases(JSON.parse(stored));
      } else {
        // Seed default initial case sample
        const initialSeed: SavedCaseRecord[] = [
          {
            id: 'seed-case-1',
            createdAt: '11 Oktober 2026, 09:15 WIB',
            studentInfo: {
              name: 'Alya Putri',
              classGrade: 'Kelas 7B',
              gender: 'Perempuan',
              isAnonymous: false,
            },
            sourceType: 'Curhatan Siswa',
            inputText:
              'Teman-teman di baris belakang kelas selalu ngejek saya si bau apek dan bikin stiker muka waktu saya nangis. Saya takut ke kantin dan tiap pagi mual-mual mau berangkat sekolah...',
            status: 'Dalam Proses Konseling',
            counselorFollowUpNotes:
              'Sudah dilakukan sesi konseling awal. Siswa diberikan ruang aman bercerita. Akan dilakukan observasi kelas dan bimbingan kelompok tentang stop perundungan.',
            analysis: {
              urgencyLevel: 'SEDANG',
              primaryField: 'Sosial',
              secondaryFields: ['Pribadi'],
              urgencyReasoning:
                'Tindakan bullying verbal berkepanjangan disertai pengucilan relasional dan stiker pelecehan telah menimbulkan gejala kecemasan psikosomatis (mual, takut ke sekolah). Perlu intervensi terencana dalam 1x24 jam sebelum berkembang menjadi fobia sekolah.',
              summary:
                'Siswa kelas 7 mengalami perundungan verbal dan pengucilan oleh teman sekelas hingga mengalami ketakutan sosial dan gejala psikosomatis.',
              emotionalState: {
                dominantFeelings: ['Ketakutan', 'Rasa Malu', 'Terisolasi', 'Kecemasan Sosial'],
                description:
                  'Siswa mengalami distres emosional berat khas remaja awal (12-13 tahun) saat penerimaan kelompok sebaya (peer group) menjadi kebutuhan psikologis primer.',
              },
              keyIndications: [
                {
                  quote: 'Tiap pagi sebelum berangkat sekolah, perut saya sakit melilit dan mual-mual',
                  significance: 'Reaksi psikosomatis akibat stres dan kecemasan antisipatoris tinggi.',
                },
                {
                  quote: 'bikin stiker muka saya waktu saya menangis',
                  significance: 'Indikasi cyberbullying dan pelecehan harga diri berulang.',
                },
              ],
              rootCauseHypothesis:
                'Dinamika hierarki kelompok teman sebaya di kelas yang tidak sehat serta kurangnya pengawasan wali kelas terhadap interaksi informal siswa.',
              recommendationAction: {
                responseTimeframe: '1 x 24 Jam',
                immediateStep:
                  'Panggil siswa ke ruang BK secara rahasia (tanpa melalui pengumuman kelas) untuk validasi emosi dan memberikan rasa aman.',
                counselingApproach: {
                  techniqueName: 'Person-Centered Counseling & Assertive Training',
                  rationale:
                    'Membangun kembali konsep diri siswa yang runtuh dan melatih cara merespons ejekan dengan asertif.',
                  stepGuide: [
                    'Ventilasi perasaan: dengarkan keluhan siswa tanpa memotong dan validasi rasa sakitnya.',
                    'Teknik stabilisasi emosi dan pernapasan untuk meredakan kecemasan fisik.',
                    'Latihan role-play respons asertif sederhana jika berhadapan dengan pelaku.',
                    'Susun rencana perlindungan lingkungan kelas bersama wali kelas.',
                  ],
                },
                openingDialogueScript:
                  'Halo Alya, terima kasih banyak ya sudah berani berbagi cerita sama Ibu. Di ruangan ini Alya aman, ceritanya rahasia, dan Ibu ada di sini untuk mendengarkan serta membantu Alya.',
                collaboration: [
                  {
                    party: 'Wali Kelas 7B',
                    roleAndApproach:
                      'Koordinasi tertutup untuk mengatur ulang posisi tempat duduk dan mengawasi dinamika kelas tanpa membongkar curhatan Alya.',
                  },
                ],
                ethicalNotice:
                  'Jaga asas kerahasiaan konseli. Jangan pernah mengkonfrontasi langsung korban dan pelaku di satu ruangan tanpa kesiapan mental korban.',
              },
            },
          },
        ];
        setSavedCases(initialSeed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeed));
      }
    } catch (e) {
      console.warn('Could not read localStorage:', e);
    }
  }, []);

  const saveToLocalStorage = (updated: SavedCaseRecord[]) => {
    setSavedCases(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  };

  const handleAnalyze = async (data: {
    text: string;
    studentInfo: StudentInfo;
    sourceType: 'Curhatan Siswa' | 'Kuesioner Kebutuhan (AKPD)' | 'Catatan Observasi Guru';
    additionalContext?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setCurrentInputText(data.text);
    setCurrentStudentInfo(data.studentInfo);
    setCurrentSourceType(data.sourceType);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: data.text,
          studentInfo: data.studentInfo,
          sourceType: data.sourceType,
          additionalContext: data.additionalContext,
        }),
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Gagal memproses analisis data siswa.');
      }

      setCurrentAnalysis(json.data);

      // Smooth scroll down to analysis results
      setTimeout(() => {
        window.scrollTo({
          top: 550,
          behavior: 'smooth',
        });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan sistem saat menganalisis.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCurrentCase = () => {
    if (!currentAnalysis) return;

    const newRecord: SavedCaseRecord = {
      id: `case-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB',
      studentInfo: currentStudentInfo,
      sourceType: currentSourceType as any,
      inputText: currentInputText,
      analysis: currentAnalysis,
      status: 'Belum Ditangani',
      counselorFollowUpNotes: '',
    };

    const updated = [newRecord, ...savedCases];
    saveToLocalStorage(updated);
  };

  const handleSelectCaseFromHistory = (record: SavedCaseRecord) => {
    setCurrentAnalysis(record.analysis);
    setCurrentStudentInfo(record.studentInfo);
    setCurrentSourceType(record.sourceType);
    setCurrentInputText(record.inputText);

    window.scrollTo({
      top: 550,
      behavior: 'smooth',
    });
  };

  const handleUpdateCaseStatus = (id: string, status: CaseStatus, notes?: string) => {
    const updated = savedCases.map((c) =>
      c.id === id ? { ...c, status, counselorFollowUpNotes: notes, updatedAt: new Date().toISOString() } : c
    );
    saveToLocalStorage(updated);
  };

  const handleDeleteCase = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus rekam kasus ini?')) {
      const updated = savedCases.filter((c) => c.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const urgentCount = savedCases.filter((c) => c.analysis.urgencyLevel === 'TINGGI').length;
  const isCurrentSaved = savedCases.some(
    (c) => c.inputText === currentInputText && c.studentInfo.name === currentStudentInfo.name
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <Header
        onOpenSOP={() => setIsSOPModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        savedCount={savedCases.length}
        urgentCount={urgentCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Counselor Context Hero */}
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-teal-500/10 to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-teal-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              <span>Standar Bimbingan dan Konseling SMP Indonesia (ABKIN)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Asisten AI Konselor BK SMP: Analisis Masalah & Rekomendasi Tindakan Awal
            </h1>

            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Membantu Guru BK mendiagnosis curhatan siswa dan kuesioner asesmen ke dalam 4 bidang (
              <strong className="text-white">Pribadi</strong>, <strong className="text-white">Sosial</strong>,{' '}
              <strong className="text-white">Belajar</strong>, <strong className="text-white">Karier</strong>),
              menilai tingkat urgensi risiko (<strong className="text-rose-300">TINGGI</strong>,{' '}
              <strong className="text-amber-300">SEDANG</strong>, <strong className="text-emerald-300">RENDAH</strong>
              ), serta menyusun langkah awal konseling yang tepat sasaran.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setIsSOPModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-teal-700/80 hover:bg-teal-700 text-white rounded-xl font-semibold border border-teal-500/40 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-200" />
                <span>Pelajari Matriks 4 Bidang & Urgensi</span>
              </button>

              <button
                onClick={() => setIsChatModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-indigo-700/80 hover:bg-indigo-700 text-white rounded-xl font-semibold border border-indigo-500/40 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                <span>Konsultasi AI Co-Pilot Guru BK</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error notification if any */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl text-rose-900 flex items-start space-x-3 text-xs sm:text-sm shadow-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Gagal Menganalisis Kasus</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* 1. Input Form Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Langkah 1: Masukkan Curhatan atau Respon Kuesioner Siswa</span>
            </h2>
            <span className="text-xs text-slate-500">Pilih salah satu metode input</span>
          </div>

          <CaseInputForm onSubmit={handleAnalyze} isLoading={isLoading} />
        </section>

        {/* 2. Analysis Results Section */}
        {currentAnalysis && (
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <span>Langkah 2: Hasil Analisis Diagnostik & Rekomendasi Tindakan</span>
              </h2>
              <span className="text-xs text-slate-500">Dihasilkan oleh Asisten AI Konselor BK</span>
            </div>

            <AnalysisDisplay
              analysis={currentAnalysis}
              studentInfo={currentStudentInfo}
              sourceType={currentSourceType}
              onSaveCase={handleSaveCurrentCase}
              isSaved={isCurrentSaved}
              onPrintRPL={() => setIsPrintModalOpen(true)}
              onOpenConsultant={() => setIsChatModalOpen(true)}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1.5">
          <p className="font-medium text-slate-700">
            KonselorBK AI — Sistem Rekomendasi Layanan Bimbingan & Konseling Tingkat SMP
          </p>
          <p className="text-[11px] text-slate-400">
            Didukung oleh model AI canggih Gemini. Dirancang sesuai norma & kode etik Asosiasi Bimbingan dan Konseling Indonesia (ABKIN).
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SOPGuidelineModal isOpen={isSOPModalOpen} onClose={() => setIsSOPModalOpen(false)} />

      <CaseHistoryTracker
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        cases={savedCases}
        onSelectCase={handleSelectCaseFromHistory}
        onUpdateStatus={handleUpdateCaseStatus}
        onDeleteCase={handleDeleteCase}
      />

      {currentAnalysis && (
        <PrintableRPL
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          analysis={currentAnalysis}
          studentInfo={currentStudentInfo}
          sourceType={currentSourceType}
          originalText={currentInputText}
        />
      )}

      <CounselorChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        currentCaseContext={
          currentAnalysis
            ? {
                analysis: currentAnalysis,
                studentInfo: currentStudentInfo,
              }
            : null
        }
      />
    </div>
  );
}
