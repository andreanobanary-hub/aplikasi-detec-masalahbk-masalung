import React from 'react';
import { ShieldCheck, HeartHandshake, BookOpen, Clock, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  onOpenSOP: () => void;
  onOpenHistory: () => void;
  savedCount: number;
  urgentCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSOP,
  onOpenHistory,
  savedCount,
  urgentCount,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-700 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  KonselorBK <span className="text-teal-600">AI</span>
                </span>
                <span className="text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full">
                  SMP Spesialis
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Asisten Analisis Curhatan, Asesmen Masalah & Rekomendasi Tindakan Guru BK
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onOpenSOP}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Lihat Pedoman Etika & SOP Krisis BK"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              <span className="hidden sm:inline">SOP Krisis & Etika BK</span>
            </button>

            <button
              onClick={onOpenHistory}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer relative"
              title="Daftar Kasus Tersimpan"
            >
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Rekam Kasus ({savedCount})</span>
              {urgentCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-rose-600 rounded-full animate-pulse">
                  <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />
                  {urgentCount} Darurat
                </span>
              )}
            </button>

            <div className="hidden lg:flex items-center space-x-1.5 pl-2 border-l border-slate-200 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-emerald-700 font-medium">Model AI Siap</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
