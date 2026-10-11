export type UrgencyLevel = 'TINGGI' | 'SEDANG' | 'RENDAH';

export type ProblemField = 'Pribadi' | 'Sosial' | 'Belajar' | 'Karier';

export type CaseStatus = 'Belum Ditangani' | 'Dalam Proses Konseling' | 'Selesai' | 'Alih Tangan Kasus';

export interface StudentInfo {
  name: string;
  classGrade: string; // e.g. "Kelas 7A", "Kelas 8B", "Kelas 9C"
  gender?: 'Laki-laki' | 'Perempuan' | 'Tidak disebutkan';
  isAnonymous: boolean;
}

export interface KeyIndication {
  quote: string;
  significance: string;
}

export interface CounselingApproach {
  techniqueName: string;
  rationale: string;
  stepGuide: string[];
}

export interface Collaborator {
  party: string;
  roleAndApproach: string;
}

export interface RecommendationAction {
  responseTimeframe: string;
  immediateStep: string;
  counselingApproach: CounselingApproach;
  openingDialogueScript: string;
  collaboration: Collaborator[];
  ethicalNotice: string;
}

export interface EmotionalState {
  dominantFeelings: string[];
  description: string;
}

export interface BKAnalysisResult {
  urgencyLevel: UrgencyLevel;
  primaryField: ProblemField;
  secondaryFields: ProblemField[];
  urgencyReasoning: string;
  summary: string;
  emotionalState: EmotionalState;
  keyIndications: KeyIndication[];
  rootCauseHypothesis: string;
  recommendationAction: RecommendationAction;
}

export interface SavedCaseRecord {
  id: string;
  createdAt: string;
  studentInfo: StudentInfo;
  sourceType: 'Curhatan Siswa' | 'Kuesioner Kebutuhan (AKPD)' | 'Catatan Observasi Guru';
  inputText: string;
  additionalContext?: string;
  analysis: BKAnalysisResult;
  status: CaseStatus;
  counselorFollowUpNotes?: string;
  updatedAt?: string;
}
