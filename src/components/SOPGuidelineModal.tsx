import React from 'react';
import { X, ShieldAlert, PhoneCall, CheckCircle2, UserCheck, AlertOctagon, Heart, Compass, BookOpen, Users } from 'lucide-react';

interface SOPGuidelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SOPGuidelineModal: React.FC<SOPGuidelineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-teal-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Pedoman Standar & SOP Krisis Guru BK SMP</h2>
              <p className="text-xs text-teal-100">
                Prinsip Etika Konseling, Matriks 4 Bidang Bimbingan, dan Protokol Keamanan Siswa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm">
          {/* Matriks 4 Bidang Bimbingan */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
              <span>1. Klasifikasi 4 Bidang Bimbingan Konseling (BK SMP)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-2 text-purple-900 font-bold">
                  <Heart className="w-4 h-4 text-purple-600" />
                  <span>Bidang Pribadi</span>
                </div>
                <p className="text-xs text-purple-800">
                  Fokus pada pemahaman diri, kestabilan emosi labil remaja awal, manajemen stres, percaya diri, kecanduan gadget/game, kesepian, dan kesehatan mental individual.
                </p>
              </div>

              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-2 text-blue-900 font-bold">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Bidang Sosial</span>
                </div>
                <p className="text-xs text-blue-800">
                  Fokus pada hubungan pertemanan sebaya, perundungan (bullying verbal/fisik/siber), isolasi sosial, penyesuaian di kelas, serta dinamika konflik dalam keluarga.
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-900 font-bold">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Bidang Belajar</span>
                </div>
                <p className="text-xs text-amber-800">
                  Fokus pada penurunan nilai akademik, prokrastinasi, kesulitan konsentrasi, penumpukan tugas sekolah, adaptasi cara belajar baru, dan motivasi berprestasi.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>Bidang Karier</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Fokus pada orientasi studi lanjut (dilema SMA vs SMK vs MA), eksplorasi minat, bakat, potensi diri, serta pemilihan kegiatan ekstrakurikuler terarah.
                </p>
              </div>
            </div>
          </div>

          {/* Protokol 3 Tingkat Urgensi */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              <span>2. Protokol Tindak Lanjut Berdasarkan Tingkat Urgensi</span>
            </h3>
            <div className="space-y-2.5">
              <div className="p-3.5 border border-rose-300 bg-rose-50/60 rounded-xl flex items-start space-x-3">
                <div className="p-2 bg-rose-600 text-white rounded-lg mt-0.5">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-xs font-extrabold bg-rose-600 text-white rounded">TINGGI (DARURAT)</span>
                    <span className="text-xs font-semibold text-rose-900">Respon Seketika (&lt; 1 - 2 Jam)</span>
                  </div>
                  <p className="text-xs text-rose-950 font-medium leading-relaxed">
                    <strong>Indikator:</strong> Perilaku melukai diri (self-harm), ide bunuh diri, keputusasaan ekstrem, kekerasan fisik, kekerasan seksual/pelecehan, penganiayaan di rumah, atau ancaman keselamatan jiwa.
                  </p>
                  <p className="text-xs text-rose-800">
                    <strong>Tindakan:</strong> Amankan keselamatan fisik siswa segera. Jangan tinggalkan siswa sendirian. Terapkan protokol kerahasiaan terbatas (asas kerahasiaan dibatalkan demi keselamatan jiwa). Koordinasikan segera dengan Kepala Sekolah & Orang Tua, serta lakukan rujukan alih tangan kasus (PPA / Rumah Sakit / Psikolog Klinis).
                  </p>
                </div>
              </div>

              <div className="p-3.5 border border-amber-300 bg-amber-50/60 rounded-xl flex items-start space-x-3">
                <div className="p-2 bg-amber-600 text-white rounded-lg mt-0.5">
                  <AlertTriangleIcon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-xs font-extrabold bg-amber-600 text-white rounded">SEDANG</span>
                    <span className="text-xs font-semibold text-amber-900">Respon dalam 1 x 24 Jam</span>
                  </div>
                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    <strong>Indikator:</strong> Perundungan/bullying verbal berulang, pengucilan terus-menerus di kelas, kecemasan intens/gejala psikosomatis, penurunan nilai drastis karena masalah psikologis, adiksi gadget parah (membolos berulang).
                  </p>
                  <p className="text-xs text-amber-800">
                    <strong>Tindakan:</strong> Jadwalkan konseling individual terencana, koordinasi halus dengan wali kelas, lakukan observasi lingkungan kelas, rancang rencana intervensi perilaku atau konseling suportif.
                  </p>
                </div>
              </div>

              <div className="p-3.5 border border-emerald-300 bg-emerald-50/60 rounded-xl flex items-start space-x-3">
                <div className="p-2 bg-emerald-600 text-white rounded-lg mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-xs font-extrabold bg-emerald-600 text-white rounded">RENDAH</span>
                    <span className="text-xs font-semibold text-emerald-900">Respon dalam Jadwal Mingguan Normal</span>
                  </div>
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    <strong>Indikator:</strong> Kesulitan adaptasi belajar awal semester, kebingungan memilih ekstrakurikuler, eksplorasi minat bakat studi lanjut SMA/SMK tanpa distres psikologis berat.
                  </p>
                  <p className="text-xs text-emerald-800">
                    <strong>Tindakan:</strong> Layanan konseling individual santai, bimbingan kelompok, atau bimbingan klasikal bersama siswa lain dengan kebutuhan serupa.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Asas Etika Bimbingan Konseling */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <span>3. Asas Etika Bimbingan dan Konseling (ABKIN)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="font-bold text-slate-900 mb-1">Asas Kerahasiaan</p>
                <p className="text-slate-600">Guru BK wajib menjaga segala rahasia pribadi konseli. Pengecualian hanya berlaku jika ada ancaman keselamatan jiwa/kriminalitas.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="font-bold text-slate-900 mb-1">Asas Kesukarelaan & Keterbukaan</p>
                <p className="text-slate-600">Siswa diajak secara sukarela tanpa paksaan intimidatif agar merasa aman untuk terbuka menyatakan perasaannya.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <p className="font-bold text-slate-900 mb-1">Asas Alih Tangan Kasus (Referral)</p>
                <p className="text-slate-600">Jika masalah di luar kewenangan Guru BK (gangguan psikiatris, visum luka fisik, kekerasan seksual), segera rujuk ke pihak berwenang.</p>
              </div>
            </div>
          </div>

          {/* Kontak Darurat Perlindungan Anak di Indonesia */}
          <div className="p-4 bg-teal-50 border border-teal-300 rounded-xl space-y-2.5">
            <div className="flex items-center space-x-2 text-teal-900 font-bold">
              <PhoneCall className="w-4 h-4 text-teal-700" />
              <span>Hotline Darurat & Rujukan Perlindungan Anak (Indonesia)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-teal-200">
                <p className="font-bold text-slate-800">SAPAS 129 (KemenPPPA)</p>
                <p className="text-teal-700 font-medium">Telepon: 129 / WA: 08111-129-129</p>
                <p className="text-[11px] text-slate-500">Layanan pengaduan kekerasan perempuan & anak</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-teal-200">
                <p className="font-bold text-slate-800">SEJIWA (Kemenkes)</p>
                <p className="text-teal-700 font-medium">Telepon: 119 (Tekan 8)</p>
                <p className="text-[11px] text-slate-500">Konseling darurat krisis kesehatan mental</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-teal-200">
                <p className="font-bold text-slate-800">TePSA (Kemensos)</p>
                <p className="text-teal-700 font-medium">Telepon: 1500-771</p>
                <p className="text-[11px] text-slate-500">Telepon Sahabat Anak perlindungan sosial</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup Pedoman
          </button>
        </div>
      </div>
    </div>
  );
};

function AlertTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
