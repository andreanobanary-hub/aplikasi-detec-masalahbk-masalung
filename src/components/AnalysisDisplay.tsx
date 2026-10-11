import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Heart,
  Users,
  BookOpen,
  Compass,
  Clock,
  Printer,
  BookmarkCheck,
  MessageCircleQuestion,
  Quote,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Brain,
  Lightbulb,
} from 'lucide-react';
import { BKAnalysisResult, StudentInfo } from '../types/bk';

interface AnalysisDisplayProps {
  analysis: BKAnalysisResult;
  studentInfo: StudentInfo;
  sourceType: string;
  onSaveCase: () => void;
  isSaved: boolean;
  onPrintRPL: () => void;
  onOpenConsultant: () => void;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({
  analysis,
  studentInfo,
  sourceType,
  onSaveCase,
  isSaved,
  onPrintRPL,
  onOpenConsultant,
}) => {
  const [copiedScript, setCopiedScript] = useState(false);

  const handleCopyScript = () => {
    if (analysis.recommendationAction.openingDialogueScript) {
      navigator.clipboard.writeText(analysis.recommendationAction.openingDialogueScript);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2500);
    }
  };

  // Field icons & styling helper
  const getFieldBadge = (field: string, isPrimary = false) => {
    let icon = <Heart className="w-3.5 h-3.5" />;
    let colorClass = 'bg-purple-50 text-purple-700 border-purple-200';

    if (field === 'Sosial') {
      icon = <Users className="w-3.5 h-3.5" />;
      colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (field === 'Belajar') {
      icon = <BookOpen className="w-3.5 h-3.5" />;
      colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (field === 'Karier') {
      icon = <Compass className="w-3.5 h-3.5" />;
      colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }

    return (
      <span
        key={field}
        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-bold border ${colorClass} ${
          isPrimary ? 'ring-2 ring-offset-1 ring-slate-400' : ''
        }`}
      >
        {icon}
        <span>
          {field} {isPrimary && '(Utama)'}
        </span>
      </span>
    );
  };

  // Urgency styling
  const isHigh = analysis.urgencyLevel === 'TINGGI';
  const isMedium = analysis.urgencyLevel === 'SEDANG';
  const isLow = analysis.urgencyLevel === 'RENDAH';

  return (
    <div className="space-y-6">
      {/* 1. URGENCY STATUS BANNER */}
      <div
        className={`rounded-2xl p-6 border shadow-sm transition-all ${
          isHigh
            ? 'bg-rose-50/90 border-rose-300 ring-2 ring-rose-500/30'
            : isMedium
            ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-400/40'
            : 'bg-emerald-50/90 border-emerald-300 ring-1 ring-emerald-400/30'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div
              className={`p-3.5 rounded-2xl text-white shadow-md shrink-0 ${
                isHigh ? 'bg-rose-600 animate-pulse' : isMedium ? 'bg-amber-600' : 'bg-emerald-600'
              }`}
            >
              {isHigh ? (
                <AlertOctagon className="w-8 h-8" />
              ) : isMedium ? (
                <AlertTriangle className="w-8 h-8" />
              ) : (
                <CheckCircle2 className="w-8 h-8" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase ${
                    isHigh
                      ? 'bg-rose-700 text-white'
                      : isMedium
                      ? 'bg-amber-700 text-white'
                      : 'bg-emerald-700 text-white'
                  }`}
                >
                  Tingkat Urgensi: {analysis.urgencyLevel}
                </span>

                <span className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    Waktu Respons:{' '}
                    <strong className="text-slate-900">
                      {analysis.recommendationAction.responseTimeframe}
                    </strong>
                  </span>
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-slate-900">
                {isHigh && 'Perhatian Darurat: Indikasi Krisis Keselamatan Siswa SMP Terdeteksi'}
                {isMedium && 'Perhatian Khusus: Masalah Signifikan Memerlukan Penanganan Terencana'}
                {isLow && 'Penanganan Reguler: Bimbingan dan Pendampingan Normatif Siswa'}
              </h2>

              <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-3xl">
                {analysis.urgencyReasoning}
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap md:flex-col items-stretch gap-2 shrink-0">
            <button
              onClick={onSaveCase}
              className={`inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-teal-700 text-white border-teal-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <BookmarkCheck className="w-4 h-4 text-teal-400" />
              <span>{isSaved ? 'Tersimpan di Rekam Kasus' : 'Simpan ke Rekam Kasus'}</span>
            </button>

            <button
              onClick={onPrintRPL}
              className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-indigo-600" />
              <span>Cetak / Lembar RPL BK</span>
            </button>

            <button
              onClick={onOpenConsultant}
              className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-700 hover:bg-indigo-800 text-white shadow-xs transition-colors cursor-pointer"
            >
              <MessageCircleQuestion className="w-4 h-4 text-indigo-200" />
              <span>Konsultasi AI Co-Pilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KLASIFIKASI BIDANG & PROFIL KONSELI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bidang Masalah */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Klasifikasi Bidang BK SMP
            </span>
            <span className="text-[11px] font-semibold text-slate-400">Aturan 4 Bidang</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
              <span className="text-xs text-slate-500 font-medium">Bidang Utama:</span>
              {getFieldBadge(analysis.primaryField, true)}
            </div>
            {analysis.secondaryFields && analysis.secondaryFields.length > 0 && (
              <div className="flex items-center space-x-1.5 flex-wrap gap-y-1 pt-1 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Irisan Sekunder:</span>
                {analysis.secondaryFields.map((f) => getFieldBadge(f, false))}
              </div>
            )}
          </div>
        </div>

        {/* Identitas Siswa */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Informasi Konseli
          </span>
          <div className="text-xs space-y-1">
            <p className="text-slate-900 font-bold text-sm">{studentInfo.name}</p>
            <p className="text-slate-600">
              {studentInfo.classGrade} • {studentInfo.gender || 'Tidak disebutkan'}
            </p>
            <p className="text-slate-500 font-medium">Sumber: {sourceType}</p>
          </div>
        </div>

        {/* Emosi Dominan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Kondisi Emosi Dominan
          </span>
          <div className="flex flex-wrap gap-1.5">
            {analysis.emotionalState.dominantFeelings.map((feeling, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200"
              >
                {feeling}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-600 line-clamp-2">
            {analysis.emotionalState.description}
          </p>
        </div>
      </div>

      {/* 3. RINGKASAN KASUS & HIPOTESIS AKAR MASALAH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ringkasan & Profil Psikologis */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
            <Brain className="w-4 h-4 text-teal-600" />
            <span>Ringkasan Kasus & Gambaran Psikologis</span>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            {analysis.summary}
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Karakteristik Remaja SMP (12-15 Tahun):</span>
            <p>{analysis.emotionalState.description}</p>
          </div>
        </div>

        {/* Hipotesis Akar Masalah */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Hipotesis Akar Masalah (Root Cause)</span>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            {analysis.rootCauseHypothesis}
          </p>
          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-900">
            <span className="font-bold block mb-1">Catatan Diagnostik BK:</span>
            Akar masalah ini dapat dijadikan acuan dalam penyusunan target konseling individual (goal setting) agar tidak hanya mengatasi gejala permukaan.
          </div>
        </div>
      </div>

      {/* 4. INDIKASI KUNCI (KUTIPAN SISWA & MAKNA KLINIS) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <Quote className="w-4 h-4 text-teal-600" />
            <span>Deteksi Frasa Kunci & Indikasi Khusus</span>
          </div>
          <span className="text-xs text-slate-400">Bukti Verbatim dari Siswa</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.keyIndications.map((ind, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-teal-300 transition-colors"
            >
              <div className="flex items-start space-x-2">
                <Quote className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-800 italic">
                  "{ind.quote}"
                </p>
              </div>
              <p className="text-xs text-slate-600 pl-6 border-l-2 border-teal-500">
                <strong className="text-teal-900">Signifikansi Klinis:</strong> {ind.significance}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. REKOMENDASI TINDAKAN AWAL GURU BK (OPERASIONAL) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-teal-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-teal-200" />
            <h3 className="font-bold text-base">
              Rekomendasi Tindakan Awal & Rencana Layanan Guru BK
            </h3>
          </div>
          <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full text-white">
            Operasional Sekolah SMP
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Langkah Pertama Hari Ini */}
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl flex items-start space-x-3.5">
            <div className="p-2 bg-teal-600 text-white rounded-lg mt-0.5 shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-teal-900 uppercase tracking-wide">
                Langkah Mendesak Pertama (Immediate Step):
              </span>
              <p className="text-xs md:text-sm text-teal-950 font-medium leading-relaxed">
                {analysis.recommendationAction.immediateStep}
              </p>
            </div>
          </div>

          {/* Skrip Percakapan Pembuka (Opening Script) */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                <Quote className="w-3.5 h-3.5 text-teal-600" />
                <span>Contoh Skrip Pembuka Dialog Konseling (Empatik & Non-Menghakimi)</span>
              </span>
              <button
                type="button"
                onClick={handleCopyScript}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-500" />
                    <span>Salin Kalimat</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs md:text-sm text-slate-800 italic leading-relaxed">
              "{analysis.recommendationAction.openingDialogueScript}"
            </div>
            <p className="text-[11px] text-slate-500">
              *Gunakan intonasi lembut, posisi duduk setara (tidak berjarak otoriter), dan kontak mata hangat khas konselor ramah anak.
            </p>
          </div>

          {/* Pendekatan & Teknik Konseling */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Pendekatan & Teknik Konseling yang Direkomendasikan
            </h4>
            <div className="p-4 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm text-indigo-950">
                  Teknik: {analysis.recommendationAction.counselingApproach.techniqueName}
                </span>
                <span className="text-xs font-semibold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                  Sesuai Perkembangan SMP
                </span>
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed">
                <strong>Rasional:</strong> {analysis.recommendationAction.counselingApproach.rationale}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-indigo-200/60">
                <span className="text-xs font-bold text-indigo-950 block">
                  Tahapan Praktis dalam Sesi Konseling:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-xs text-indigo-900 leading-relaxed pl-1">
                  {analysis.recommendationAction.counselingApproach.stepGuide.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Kolaborasi Lintas Pihak */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Kolaborasi Pihak Terkait Secara Etis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.recommendationAction.collaboration.map((collab, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-slate-900 block">
                    {collab.party}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {collab.roleAndApproach}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan Asas Etika & Kerahasiaan ABKIN */}
          <div className="p-3.5 bg-slate-100 border border-slate-200 rounded-xl flex items-start space-x-2.5 text-xs text-slate-700">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <p>
              <strong>Etika & Kerahasiaan BK:</strong> {analysis.recommendationAction.ethicalNotice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
