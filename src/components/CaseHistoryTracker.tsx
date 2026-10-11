import React, { useState } from 'react';
import {
  X,
  Search,
  Filter,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Edit3,
  Save,
  Clock,
  User,
  Heart,
  Users,
  BookOpen,
  Compass,
} from 'lucide-react';
import { SavedCaseRecord, CaseStatus, UrgencyLevel, ProblemField } from '../types/bk';

interface CaseHistoryTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  cases: SavedCaseRecord[];
  onSelectCase: (record: SavedCaseRecord) => void;
  onUpdateStatus: (id: string, status: CaseStatus, notes?: string) => void;
  onDeleteCase: (id: string) => void;
}

export const CaseHistoryTracker: React.FC<CaseHistoryTrackerProps> = ({
  isOpen,
  onClose,
  cases,
  onSelectCase,
  onUpdateStatus,
  onDeleteCase,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUrgency, setFilterUrgency] = useState<string>('ALL');
  const [filterField, setFilterField] = useState<string>('ALL');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  if (!isOpen) return null;

  // Filter cases
  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.studentInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.studentInfo.classGrade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.inputText.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUrgency = filterUrgency === 'ALL' || c.analysis.urgencyLevel === filterUrgency;
    const matchesField =
      filterField === 'ALL' ||
      c.analysis.primaryField === filterField ||
      (c.analysis.secondaryFields && c.analysis.secondaryFields.includes(filterField as any));

    return matchesSearch && matchesUrgency && matchesField;
  });

  const countHigh = cases.filter((c) => c.analysis.urgencyLevel === 'TINGGI').length;
  const countMedium = cases.filter((c) => c.analysis.urgencyLevel === 'SEDANG').length;
  const countLow = cases.filter((c) => c.analysis.urgencyLevel === 'RENDAH').length;

  const handleStartEditNotes = (record: SavedCaseRecord) => {
    setEditingNotesId(record.id);
    setTempNotes(record.counselorFollowUpNotes || '');
  };

  const handleSaveNotes = (record: SavedCaseRecord) => {
    onUpdateStatus(record.id, record.status, tempNotes);
    setEditingNotesId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-5xl w-full h-[90vh] max-h-[850px] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-800 to-indigo-900 text-white flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg font-bold">Rekam Jejak Kasus Konseling Guru BK SMP</h2>
            <p className="text-xs text-teal-100">
              Total {cases.length} Kasus Terdata • Pantau Perkembangan & Status Penanganan Siswa
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-slate-50 border-b border-slate-200 text-xs shrink-0">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <div>
              <p className="text-slate-500 font-medium">Total Kasus</p>
              <p className="text-sm font-bold text-slate-800">{cases.length}</p>
            </div>
          </div>
          <div className="bg-rose-50/70 p-2.5 rounded-xl border border-rose-200 flex items-center space-x-2">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <div>
              <p className="text-rose-700 font-medium">Urgensi TINGGI</p>
              <p className="text-sm font-extrabold text-rose-900">{countHigh}</p>
            </div>
          </div>
          <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <div>
              <p className="text-amber-700 font-medium">Urgensi SEDANG</p>
              <p className="text-sm font-extrabold text-amber-900">{countMedium}</p>
            </div>
          </div>
          <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="text-emerald-700 font-medium">Urgensi RENDAH</p>
              <p className="text-sm font-extrabold text-emerald-900">{countLow}</p>
            </div>
          </div>
        </div>

        {/* Filters and search */}
        <div className="p-4 border-b border-slate-200 bg-white flex flex-wrap gap-2.5 items-center justify-between shrink-0">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama siswa, kelas, atau kata kunci keluhan..."
              className="w-full text-xs pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            {/* Filter Urgensi */}
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="text-xs px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">Semua Urgensi</option>
              <option value="TINGGI">Tinggi (Darurat)</option>
              <option value="SEDANG">Sedang</option>
              <option value="RENDAH">Rendah</option>
            </select>

            {/* Filter Bidang */}
            <select
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
              className="text-xs px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">Semua Bidang BK</option>
              <option value="Pribadi">Bidang Pribadi</option>
              <option value="Sosial">Bidang Sosial</option>
              <option value="Belajar">Bidang Belajar</option>
              <option value="Karier">Bidang Karier</option>
            </select>
          </div>
        </div>

        {/* Case List Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {filteredCases.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <p className="text-sm font-medium">Belum ada rekam kasus yang sesuai dengan filter.</p>
              <p className="text-xs">
                Simpan hasil analisis kasus dari beranda utama untuk melihat riwayat di sini.
              </p>
            </div>
          ) : (
            filteredCases.map((record) => {
              const isHigh = record.analysis.urgencyLevel === 'TINGGI';
              const isMedium = record.analysis.urgencyLevel === 'SEDANG';

              return (
                <div
                  key={record.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isHigh
                      ? 'bg-rose-50/40 border-rose-300'
                      : isMedium
                      ? 'bg-amber-50/30 border-amber-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-black uppercase ${
                          isHigh
                            ? 'bg-rose-600 text-white'
                            : isMedium
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {record.analysis.urgencyLevel}
                      </span>

                      <span className="text-xs font-bold text-slate-900">
                        {record.studentInfo.name} ({record.studentInfo.classGrade})
                      </span>

                      <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.2 rounded">
                        Bidang: {record.analysis.primaryField}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      {/* Status Selector */}
                      <select
                        value={record.status}
                        onChange={(e) =>
                          onUpdateStatus(record.id, e.target.value as CaseStatus, record.counselorFollowUpNotes)
                        }
                        className="text-[11px] font-semibold px-2 py-1 rounded bg-white border border-slate-300 text-slate-700"
                      >
                        <option value="Belum Ditangani">Belum Ditangani</option>
                        <option value="Dalam Proses Konseling">Dalam Proses Konseling</option>
                        <option value="Selesai">Selesai Ditangani</option>
                        <option value="Alih Tangan Kasus">Alih Tangan Kasus (Referral)</option>
                      </select>

                      <button
                        onClick={() => {
                          onSelectCase(record);
                          onClose();
                        }}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 bg-teal-700 hover:bg-teal-800 text-white rounded text-[11px] font-semibold cursor-pointer"
                        title="Buka Detail Analisis"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Buka Detail</span>
                      </button>

                      <button
                        onClick={() => onDeleteCase(record.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Hapus Rekam Kasus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-2 mb-2 leading-relaxed italic">
                    "{record.inputText}"
                  </p>

                  <div className="text-xs text-slate-600 space-y-1 mb-2">
                    <p>
                      <strong>Ringkasan Diagnosis:</strong> {record.analysis.summary}
                    </p>
                    <p>
                      <strong>Tindakan Pertama:</strong> {record.analysis.recommendationAction.immediateStep}
                    </p>
                  </div>

                  {/* Counselor Follow-up Notes */}
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700 flex items-center space-x-1">
                        <Edit3 className="w-3 h-3 text-teal-600" />
                        <span>Catatan Perkembangan Guru BK:</span>
                      </span>
                      {editingNotesId !== record.id && (
                        <button
                          type="button"
                          onClick={() => handleStartEditNotes(record)}
                          className="text-[11px] text-teal-700 hover:underline cursor-pointer"
                        >
                          {record.counselorFollowUpNotes ? 'Ubah Catatan' : '+ Tambah Catatan'}
                        </button>
                      )}
                    </div>

                    {editingNotesId === record.id ? (
                      <div className="space-y-1.5 pt-1">
                        <textarea
                          rows={2}
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Tuliskan catatan sesi konseling, respon siswa, atau hasil koordinasi..."
                          className="w-full text-xs p-2 border border-teal-300 rounded focus:outline-none"
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingNotesId(null)}
                            className="px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveNotes(record)}
                            className="px-2.5 py-0.5 text-[11px] bg-teal-700 text-white rounded font-semibold cursor-pointer"
                          >
                            Simpan Catatan
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-600 italic">
                        {record.counselorFollowUpNotes ||
                          '(Belum ada catatan tindak lanjut. Klik tambah catatan untuk mendokumentasikan hasil konseling).'}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>Dicatat pada: {record.createdAt}</span>
                    <span>Waktu Tanggap: {record.analysis.recommendationAction.responseTimeframe}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Data disimpan aman di browser Guru BK</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold cursor-pointer"
          >
            Tutup Rekam Kasus
          </button>
        </div>
      </div>
    </div>
  );
};
