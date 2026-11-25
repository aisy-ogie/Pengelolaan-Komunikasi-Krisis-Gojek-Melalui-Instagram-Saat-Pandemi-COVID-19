export type ServiceCategory = 'semua' | 'kegiatan' | 'kebijakan' | 'j3k';

export type CrisisPillar = 'kegiatan' | 'kebijakan' | 'j3k';

export type UrgencyLevel = 'Normal' | 'Penting';

export type NavTab = 'beranda' | 'news' | 'riwayat' | 'profil';

export type StakeholderRole = 'Masyarakat Umum' | 'Mitra Driver' | 'Mitra Usaha (GoFood)';

export interface CrisisInfoItem {
  id: string;
  category: CrisisPillar;
  categoryLabel: string;
  authorHandle: string;
  timestamp: string;
  title: string;
  summary: string;
  fullContent: string;
  urgency: UrgencyLevel;
  instagramChannel: string;
  targetAudience: string;
  actions: string[];
  monitoringNote: string;
  reachStatus: string;
}

export interface FlowStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  stageType: 'identifikasi' | 'strategi' | 'klasifikasi' | 'distribusi' | 'evaluasi';
  highlightPillars?: string[];
  decisionNote?: string;
}

export interface ComplaintItem {
  id: string;
  category: CrisisPillar;
  urgency: UrgencyLevel;
  username: string;
  title: string;
  description: string;
  createdAt: string;
  status: 'Menunggu Tinjauan' | 'Sedang Ditindaklanjuti' | 'Selesai';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  linkedInfoId?: string;
}
