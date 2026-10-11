import React from 'react';
import { X, Printer } from 'lucide-react';
import { BKAnalysisResult, StudentInfo } from '../types/bk';

interface PrintableRPLProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: BKAnalysisResult;
  studentInfo: StudentInfo;
  sourceType: string;
  originalText?: string;
}

export const PrintableRPL: React.FC<PrintableRPLProps> = ({
  isOpen,
  onClose,
  analysis,
  studentInfo,
  sourceType,
  originalText,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white print:static">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl print:shadow-none print:max-w-none print:w-full print:rounded-none print:max-h-none print:overflow-visible">
        {/* Print Controls (Hidden when printing) */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              Pratinjau Lembar Rencana Pelaksanaan Layanan BK (RPL Konseling Individual)
            </h3>
            <p className="text-xs text-slate-500">
              Dokumen siap cetak atau simpan PDF untuk arsip resmi ruang BK SMP
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Content */}
        <div className="p-8 sm:p-12 text-slate-900 space-y-6 text-sm font-sans bg-white print:p-6 print:text-xs">
          {/* Official Letterhead (Kop Surat BK SMP) */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <h2 className="text-sm font-extrabold tracking-wider uppercase text-slate-800">
              KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH
            </h2>
            <h1 className="text-base sm:text-lg font-black uppercase text-slate-900">
              UNIT BIMBINGAN DAN KONSELING (BK) SEKOLAH MENENGAH PERTAMA (SMP)
            </h1>
            <p className="text-xs text-slate-600">
              LEMBAR REKAM ASESMEN & RENCANA TINDAKAN LAYANAN KONSELING INDIVIDUAL (RPL BK)
            </p>
          </div>

          {/* Metadata & Identitas Siswa */}
          <div className="border border-slate-300 rounded-lg p-4 bg-slate-50/50 space-y-2">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p>
                  <strong className="text-slate-700">Nama / Inisial Konseli:</strong>{' '}
                  <span className="font-semibold text-slate-900">{studentInfo.name}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Tingkat Kelas:</strong>{' '}
                  <span>{studentInfo.classGrade}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Jenis Kelamin:</strong>{' '}
                  <span>{studentInfo.gender || 'Tidak disebutkan'}</span>
                </p>
              </div>
              <div>
                <p>
                  <strong className="text-slate-700">Tanggal Asesmen:</strong>{' '}
                  <span>{currentDate}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Sumber Data:</strong>{' '}
                  <span>{sourceType}</span>
                </p>
                <p>
                  <strong className="text-slate-700">Kerahasiaan Data:</strong>{' '}
                  <span>Tersumpah Etika ABKIN</span>
                </p>
              </div>
            </div>
          </div>

          {/* Klasifikasi & Urgensi */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b pb-1">
              I. DIAGNOSIS MASALAH & TINGKAT URGENSI
            </h3>
            <table className="w-full text-xs border border-slate-300">
              <tbody>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-bold bg-slate-100 w-1/3">Bidang Bimbingan Utama</td>
                  <td className="p-2 font-semibold">
                    Bidang {analysis.primaryField}
                    {analysis.secondaryFields && analysis.secondaryFields.length > 0 && (
                      <span className="font-normal text-slate-600">
                        {' '}
                        (Irisan Sekunder: {analysis.secondaryFields.join(', ')})
                      </span>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-bold bg-slate-100">Tingkat Urgensi</td>
                  <td className="p-2">
                    <span className="font-black px-2 py-0.5 rounded bg-slate-200">
                      {analysis.urgencyLevel}
                    </span>{' '}
                    — Waktu Tanggap: {analysis.recommendationAction.responseTimeframe}
                  </td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-bold bg-slate-100">Alasan Penetapan Urgensi</td>
                  <td className="p-2 leading-relaxed">{analysis.urgencyReasoning}</td>
                </tr>
                <tr className="border-b border-slate-300">
                  <td className="p-2 font-bold bg-slate-100">Gambaran Masalah / Ringkasan</td>
                  <td className="p-2 leading-relaxed">{analysis.summary}</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-slate-100">Kondisi Emosi Dominan</td>
                  <td className="p-2">
                    {analysis.emotionalState.dominantFeelings.join(', ')} —{' '}
                    {analysis.emotionalState.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Indikasi Kunci / Bukti Temuan */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b pb-1">
              II. INDIKASI KHUSUS & AKAR MASALAH (ROOT CAUSE)
            </h3>
            <div className="text-xs space-y-1.5">
              <p>
                <strong>Hipotesis Akar Masalah:</strong> {analysis.rootCauseHypothesis}
              </p>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <p className="font-bold mb-1">Bukti Kutipan Verbatim Siswa:</p>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.keyIndications.map((ind, i) => (
                    <li key={i}>
                      <em>"{ind.quote}"</em> —{' '}
                      <span className="text-slate-600">{ind.significance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Rekomendasi Tindakan Layanan */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 border-b pb-1">
              III. RENCANA PELAKSANAAN LAYANAN & TINDAKAN AWAL GURU BK
            </h3>
            <div className="space-y-2 text-xs">
              <p>
                <strong>1. Langkah Pertama Mendesak:</strong>{' '}
                {analysis.recommendationAction.immediateStep}
              </p>
              <p>
                <strong>2. Teknik Pendekatan Konseling:</strong>{' '}
                {analysis.recommendationAction.counselingApproach.techniqueName} (
                <em>{analysis.recommendationAction.counselingApproach.rationale}</em>)
              </p>
              <div className="pl-4">
                <p className="font-semibold text-slate-700">Langkah-langkah Sesi:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-slate-600">
                  {analysis.recommendationAction.counselingApproach.stepGuide.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
              <p>
                <strong>3. Rekomendasi Dialog Pembuka Konseling:</strong>
                <br />
                <span className="italic text-slate-700">
                  "{analysis.recommendationAction.openingDialogueScript}"
                </span>
              </p>
              <p>
                <strong>4. Kolaborasi Pihak Terkait:</strong>
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-4">
                {analysis.recommendationAction.collaboration.map((c, idx) => (
                  <li key={idx}>
                    <strong>{c.party}:</strong> {c.roleAndApproach}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Catatan Etika */}
          <div className="text-[11px] text-slate-500 border-t pt-2 italic">
            *Catatan: Dokumen ini bersifat rahasia profesional Guru BK sesuai Kode Etik Asosiasi Bimbingan dan Konseling Indonesia (ABKIN). Dilarang menyebarluaskan tanpa dasar hukum perlindungan keselamatan anak.
          </div>

          {/* Tanda Tangan */}
          <div className="grid grid-cols-2 pt-6 text-center text-xs">
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">Kepala Sekolah SMP</p>
              <div className="h-16"></div>
              <p className="font-bold underline">( ............................................ )</p>
              <p className="text-[11px] text-slate-500">NIP. ........................................</p>
            </div>
            <div>
              <p>Guru Pembimbing / Konselor BK,</p>
              <p className="font-bold">Guru BK SMP</p>
              <div className="h-16"></div>
              <p className="font-bold underline">( ............................................ )</p>
              <p className="text-[11px] text-slate-500">NIP. ........................................</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
