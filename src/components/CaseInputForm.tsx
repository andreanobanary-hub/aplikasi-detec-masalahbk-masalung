import React, { useState } from 'react';
import { Send, Sparkles, User, FileText, CheckSquare, MessageSquare, ClipboardList, Shield, RefreshCw } from 'lucide-react';
import { StudentInfo } from '../types/bk';
import { PRESET_CASES, PresetCase } from '../data/presets';

interface CaseInputFormProps {
  onSubmit: (data: {
    text: string;
    studentInfo: StudentInfo;
    sourceType: 'Curhatan Siswa' | 'Kuesioner Kebutuhan (AKPD)' | 'Catatan Observasi Guru';
    additionalContext?: string;
  }) => void;
  isLoading: boolean;
}

export const CaseInputForm: React.FC<CaseInputFormProps> = ({ onSubmit, isLoading }) => {
  const [sourceType, setSourceType] = useState<'Curhatan Siswa' | 'Kuesioner Kebutuhan (AKPD)' | 'Catatan Observasi Guru'>('Curhatan Siswa');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [classGrade, setClassGrade] = useState('Kelas 8B');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan' | 'Tidak disebutkan'>('Tidak disebutkan');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [additionalContext, setAdditionalContext] = useState('');

  // AKPD Interactive Checklist
  const [akpdItems, setAkpdItems] = useState<{ [key: string]: boolean }>({
    // Pribadi
    pribadi_stres: false,
    pribadi_gadget: false,
    pribadi_percaya_diri: false,
    pribadi_selfharm: false,
    // Sosial
    sosial_bullying: false,
    sosial_dikucilkan: false,
    sosial_keluarga: false,
    // Belajar
    belajar_nilai_turun: false,
    belajar_fokus: false,
    belajar_tugas: false,
    // Karier
    karier_studi_lanjut: false,
    karier_minat_bakat: false,
  });
  const [akpdNote, setAkpdNote] = useState('');

  const handleSelectPreset = (preset: PresetCase) => {
    setText(preset.inputText);
    setSourceType(preset.sourceType);
    setName(preset.studentInfo.name);
    setClassGrade(preset.studentInfo.classGrade);
    setGender(preset.studentInfo.gender || 'Tidak disebutkan');
    setIsAnonymous(preset.studentInfo.isAnonymous);
    setAdditionalContext(preset.additionalContext || '');
  };

  const handleToggleAkpd = (key: string) => {
    setAkpdItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerateAkpdText = () => {
    const checkedLabels: string[] = [];
    if (akpdItems.pribadi_stres) checkedLabels.push('- [Pribadi] Sering merasa stres, cemas berlebihan, atau emosi tidak stabil.');
    if (akpdItems.pribadi_gadget) checkedLabels.push('- [Pribadi] Kecanduan gadget/game hingga larut malam/mengganggu aktivitas.');
    if (akpdItems.pribadi_percaya_diri) checkedLabels.push('- [Pribadi] Merasa rendah diri, tidak percaya diri, dan menarik diri.');
    if (akpdItems.pribadi_selfharm) checkedLabels.push('- [Pribadi - KRITIS] Memiliki dorongan melukai diri sendiri atau merasa putus asa.');

    if (akpdItems.sosial_bullying) checkedLabels.push('- [Sosial] Mengalami perundungan (bullying) verbal, fisik, atau di media sosial.');
    if (akpdItems.sosial_dikucilkan) checkedLabels.push('- [Sosial] Merasa dikucilkan/tidak punya teman di lingkungan kelas.');
    if (akpdItems.sosial_keluarga) checkedLabels.push('- [Sosial] Mengalami konflik berat atau kekerasan di lingkungan keluarga.');

    if (akpdItems.belajar_nilai_turun) checkedLabels.push('- [Belajar] Nilai rapor atau ulangan menurun drastis.');
    if (akpdItems.belajar_fokus) checkedLabels.push('- [Belajar] Sulit konsentrasi di kelas dan sering mengantuk.');
    if (akpdItems.belajar_tugas) checkedLabels.push('- [Belajar] Tugas menumpuk banyak dan kesulitan membagi waktu.');

    if (akpdItems.karier_studi_lanjut) checkedLabels.push('- [Karier] Bingung menentukan pilihan sekolah lanjutan (SMA vs SMK).');
    if (akpdItems.karier_minat_bakat) checkedLabels.push('- [Karier] Belum mengenali bakat dan minat masa depan.');

    const formatted = `HASIL KUESIONER KEBUTUHAN SISWA (AKPD SMP):
Indikator Masalah yang Dipilih Siswa:
${checkedLabels.length > 0 ? checkedLabels.join('\n') : '(Tidak ada butir checklist yang dipilih)'}

Catatan/Ungkapan Langsung Siswa:
"${akpdNote.trim() || 'Tidak ada catatan tambahan tertulis.'}"`;

    setText(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit({
      text,
      studentInfo: {
        name: isAnonymous ? 'Anonim (Dirahasiakan)' : (name.trim() || 'Siswa SMP'),
        classGrade,
        gender,
        isAnonymous,
      },
      sourceType,
      additionalContext: additionalContext.trim() || undefined,
    });
  };

  const clearForm = () => {
    setText('');
    setName('');
    setAdditionalContext('');
    setAkpdNote('');
    setAkpdItems({
      pribadi_stres: false,
      pribadi_gadget: false,
      pribadi_percaya_diri: false,
      pribadi_selfharm: false,
      sosial_bullying: false,
      sosial_dikucilkan: false,
      sosial_keluarga: false,
      belajar_nilai_turun: false,
      belajar_fokus: false,
      belajar_tugas: false,
      karier_studi_lanjut: false,
      karier_minat_bakat: false,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Preset Bar */}
      <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Uji Coba Cepat dengan Kasus Nyata SMP:</span>
          </div>
          <button
            type="button"
            onClick={clearForm}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center space-x-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Input</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PRESET_CASES.map((preset) => {
            let urgencyColor = 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100';
            if (preset.expectedUrgency === 'SEDANG') {
              urgencyColor = 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100';
            } else if (preset.expectedUrgency === 'RENDAH') {
              urgencyColor = 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
            }

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors cursor-pointer ${urgencyColor}`}
                title={`Muat ${preset.title}`}
              >
                {preset.title.split(':')[0]}: {preset.badgeLabel}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Source Type Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Metode / Sumber Data Masalah
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSourceType('Curhatan Siswa')}
              className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                sourceType === 'Curhatan Siswa'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-900 shadow-xs ring-1 ring-teal-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-teal-600" />
              <span>Curhatan Siswa (Teks Bebas)</span>
            </button>

            <button
              type="button"
              onClick={() => setSourceType('Kuesioner Kebutuhan (AKPD)')}
              className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                sourceType === 'Kuesioner Kebutuhan (AKPD)'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-900 shadow-xs ring-1 ring-teal-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-teal-600" />
              <span>Kuesioner Kebutuhan (AKPD)</span>
            </button>

            <button
              type="button"
              onClick={() => setSourceType('Catatan Observasi Guru')}
              className={`flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                sourceType === 'Catatan Observasi Guru'
                  ? 'border-teal-600 bg-teal-50/70 text-teal-900 shadow-xs ring-1 ring-teal-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-teal-600" />
              <span>Catatan Observasi Guru</span>
            </button>
          </div>
        </div>

        {/* Student Demographics (Optional & Confidential) */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>Identitas Konseli / Siswa SMP</span>
            </span>
            <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-3.5 w-3.5"
              />
              <span className="font-medium">Jadikan Anonim (Privasi Terjaga)</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Nama / Inisial Siswa
              </label>
              <input
                type="text"
                disabled={isAnonymous}
                value={isAnonymous ? 'Anonim (Dirahasiakan)' : name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Rian Pratama (atau inisial RP)"
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Tingkat Kelas SMP
              </label>
              <select
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Kelas 7A">Kelas 7A</option>
                <option value="Kelas 7B">Kelas 7B</option>
                <option value="Kelas 7C">Kelas 7C</option>
                <option value="Kelas 7D">Kelas 7D</option>
                <option value="Kelas 8A">Kelas 8A</option>
                <option value="Kelas 8B">Kelas 8B</option>
                <option value="Kelas 8C">Kelas 8C</option>
                <option value="Kelas 8D">Kelas 8D</option>
                <option value="Kelas 9A">Kelas 9A</option>
                <option value="Kelas 9B">Kelas 9B</option>
                <option value="Kelas 9C">Kelas 9C</option>
                <option value="Kelas 9D">Kelas 9D</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                Jenis Kelamin
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Tidak disebutkan">Tidak disebutkan</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>
        </div>

        {/* AKPD Checklist Helper if in AKPD mode */}
        {sourceType === 'Kuesioner Kebutuhan (AKPD)' && (
          <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-900">
                Pilih Indikator Kebutuhan Siswa (Instrumen AKPD SMP):
              </span>
              <button
                type="button"
                onClick={handleGenerateAkpdText}
                className="px-2.5 py-1 bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold rounded-md transition-colors cursor-pointer"
              >
                Terapkan ke Kotak Analisis
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-teal-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={akpdItems.pribadi_stres}
                  onChange={() => handleToggleAkpd('pribadi_stres')}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-800">[Pribadi] Sering cemas/stres berat</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-teal-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={akpdItems.pribadi_gadget}
                  onChange={() => handleToggleAkpd('pribadi_gadget')}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-800">[Pribadi] Kecanduan gadget/game online</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-rose-200 cursor-pointer text-rose-900 font-semibold">
                <input
                  type="checkbox"
                  checked={akpdItems.pribadi_selfharm}
                  onChange={() => handleToggleAkpd('pribadi_selfharm')}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span>[Pribadi] Indikasi melukai diri (self-harm)/putus asa</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-teal-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={akpdItems.sosial_bullying}
                  onChange={() => handleToggleAkpd('sosial_bullying')}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-800">[Sosial] Menjadi korban ejekan/bullying</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-teal-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={akpdItems.sosial_dikucilkan}
                  onChange={() => handleToggleAkpd('sosial_dikucilkan')}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-800">[Sosial] Dikucilkan/sulit berteman</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-teal-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={akpdItems.belajar_nilai_turun}
                  onChange={() => handleToggleAkpd('belajar_nilai_turun')}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-800">[Belajar] Nilai akademik turun drastis</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-teal-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={akpdItems.karier_studi_lanjut}
                  onChange={() => handleToggleAkpd('karier_studi_lanjut')}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-800">[Karier] Bingung studi lanjut SMA vs SMK</span>
              </label>

              <label className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-teal-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={akpdItems.karier_minat_bakat}
                  onChange={() => handleToggleAkpd('karier_minat_bakat')}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-800">[Karier] Belum mengenali bakat & minat</span>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-teal-900 mb-1">
                Catatan Terbuka Siswa di Kuesioner:
              </label>
              <input
                type="text"
                value={akpdNote}
                onChange={(e) => setAkpdNote(e.target.value)}
                placeholder="Tuliskan ungkapan kalimat atau keluhan tertulis siswa jika ada..."
                className="w-full text-xs px-3 py-2 bg-white border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        )}

        {/* Main Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>
                {sourceType === 'Curhatan Siswa'
                  ? 'Isi Curhatan / Pesan Siswa'
                  : sourceType === 'Kuesioner Kebutuhan (AKPD)'
                  ? 'Teks / Respon Instrumen Kuesioner'
                  : 'Catatan Observasi Perilaku Guru BK'}
              </span>
            </label>
            <span className="text-[11px] text-slate-400">
              {text.length} karakter
            </span>
          </div>

          <textarea
            required
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Salin atau ketikkan curhatan siswa, pesan WhatsApp dari siswa, isi surat kotak curhat, atau hasil respon kuesioner di sini..."
            className="w-full text-xs md:text-sm p-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed font-sans placeholder:text-slate-400"
          ></textarea>
        </div>

        {/* Additional Context from Counselor/Teacher */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Catatan Tambahan / Observasi Guru BK & Wali Kelas (Opsional)
          </label>
          <input
            type="text"
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Misal: Siswa sering datang terlambat, memakai jaket di kelas, atau laporan guru mapel..."
            className="w-full text-xs px-3.5 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Confidentiality Notice & Submit Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <Shield className="w-4 h-4 text-teal-600 shrink-0" />
            <span>
              Privasi terlindungi. Data diproses khusus untuk analisis profesional bimbingan konseling SMP.
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-teal-700 to-indigo-700 hover:from-teal-800 hover:to-indigo-800 shadow-md shadow-teal-700/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Menganalisis Kasus Siswa...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Analisis Kasus dengan Asisten AI BK</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
