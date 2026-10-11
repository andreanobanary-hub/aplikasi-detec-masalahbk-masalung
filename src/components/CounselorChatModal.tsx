import React, { useState } from 'react';
import { X, Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { BKAnalysisResult, StudentInfo } from '../types/bk';

interface CounselorChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCaseContext?: {
    analysis: BKAnalysisResult;
    studentInfo: StudentInfo;
  } | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const CounselorChatModal: React.FC<CounselorChatModalProps> = ({
  isOpen,
  onClose,
  currentCaseContext,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: currentCaseContext
        ? `Halo Bapak/Ibu Guru BK. Saya siap mendampingi Anda merancang strategi konseling untuk kasus **${currentCaseContext.studentInfo.name}** (${currentCaseContext.analysis.primaryField} - Urgensi ${currentCaseContext.analysis.urgencyLevel}). Silakan tanyakan teknik mediasi, simulasi dialog konseling, draf komunikasi dengan orang tua/wali kelas, atau penanganan krisis.`
        : 'Halo Bapak/Ibu Guru BK! Saya asisten AI konselor BK SMP. Apa yang ingin Anda diskusikan seputar layanan bimbingan konseling, asesmen, atau dinamika psikologis siswa SMP?',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPrompts = currentCaseContext
    ? [
        'Bagaimana cara memulai sesi konseling jika siswa ini menangis atau terdiam membisu?',
        'Draf kalimat pesan WhatsApp untuk mengundang orang tua secara bijak tanpa membuat panik.',
        'Latihan teknik relaksasi / grounding 5-4-3-2-1 yang ramah anak SMP untuk meredakan kecemasan.',
        'Bagaimana format surat alih tangan kasus (referral) jika situasi semakin darurat?',
      ]
    : [
        'Bagaimana cara mengidentifikasi perundungan siber (cyberbullying) di kalangan siswa SMP?',
        'Strategi menghadapi siswa yang kecanduan game online dan sering membolos.',
        'Teknik konseling SFBT (Solution-Focused Brief Therapy) sederhana untuk siswa SMP.',
        'Cara membimbing siswa kelas 9 yang bingung memilih antara SMA atau SMK.',
      ];

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || inputQuery).trim();
    if (!q || isLoading) return;

    setError(null);
    setInputQuery('');

    const newMessages: Message[] = [...messages, { role: 'user', content: q }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          caseContext: currentCaseContext
            ? {
                studentName: currentCaseContext.studentInfo.name,
                classGrade: currentCaseContext.studentInfo.classGrade,
                urgencyLevel: currentCaseContext.analysis.urgencyLevel,
                primaryField: currentCaseContext.analysis.primaryField,
                summary: currentCaseContext.analysis.summary,
                rootCause: currentCaseContext.analysis.rootCauseHypothesis,
              }
            : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal memproses respon dari konselor AI');
      }

      setMessages([...newMessages, { role: 'assistant', content: data.answer }]);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full h-[85vh] max-h-[700px] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-teal-700 to-indigo-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <Bot className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Konsultasi Interaktif AI Co-Pilot Guru BK</h3>
              <p className="text-[11px] text-teal-100">
                {currentCaseContext
                  ? `Membahas Kasus: ${currentCaseContext.studentInfo.name} (${currentCaseContext.studentInfo.classGrade})`
                  : 'Rekan Diskusi Profesional Bimbingan Konseling SMP'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-teal-700 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none whitespace-pre-line border border-slate-200'
                }`}
              >
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2.5 text-slate-500">
              <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3 rounded-bl-none flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[11px] text-slate-500 font-medium">Asisten BK sedang menyusun saran...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 shrink-0">
          <div className="flex items-center space-x-1.5 mb-1 text-[11px] font-bold text-slate-500">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>Pertanyaan Cepat untuk Kasus Ini:</span>
          </div>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                className="text-[11px] text-left px-2.5 py-1 bg-white hover:bg-teal-50 hover:text-teal-900 border border-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ketik pertanyaan atau skenario bimbingan konseling..."
              disabled={isLoading}
              className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
