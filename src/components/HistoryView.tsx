import React, { useState } from 'react';
import { Bookmark, CheckCircle2, Clock, MessageSquarePlus, Trash2 } from 'lucide-react';
import { ComplaintItem, CrisisInfoItem } from '../types/crisis';

interface HistoryViewProps {
  complaints: ComplaintItem[];
  bookmarkedItems: CrisisInfoItem[];
  onOpenComplaint: () => void;
  onOpenDetail: (item: CrisisInfoItem) => void;
  onToggleBookmark: (id: string) => void;
  onDeleteComplaint: (id: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  kegiatan: 'Kegiatan',
  kebijakan: 'Kebijakan',
  j3k: 'J3K',
};

export const HistoryView: React.FC<HistoryViewProps> = ({
  complaints,
  bookmarkedItems,
  onOpenComplaint,
  onOpenDetail,
  onToggleBookmark,
  onDeleteComplaint,
}) => {
  const [subTab, setSubTab] = useState<'pengaduan' | 'tersimpan'>('pengaduan');

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-bold text-neutral-900">
              Riwayat Pengaduan &amp; Informasi Tersimpan
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Pantau tindak lanjut masukan Anda serta daftar informasi krisis yang disimpan.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenComplaint}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#00AA13] hover:bg-[#008C10] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Buat Pengaduan Baru</span>
          </button>
        </div>

        <div className="mt-4 flex items-center gap-1.5 p-1 bg-[#F5F5F5] rounded-xl">
          <button
            type="button"
            onClick={() => setSubTab('pengaduan')}
            className={`flex-1 min-h-[40px] px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              subTab === 'pengaduan'
                ? 'bg-white text-[#00AA13] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Pengaduan Saya ({complaints.length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab('tersimpan')}
            className={`flex-1 min-h-[40px] px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              subTab === 'tersimpan'
                ? 'bg-white text-[#00AA13] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Informasi Tersimpan ({bookmarkedItems.length})
          </button>
        </div>
      </div>

      {subTab === 'pengaduan' ? (
        complaints.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 text-center">
            <p className="font-display text-base font-bold text-neutral-900">
              Belum ada pengaduan yang dikirim
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              Kirim masukan atau pertanyaan seputar Kegiatan, Kebijakan, atau Protokol J3K.
            </p>
            <button
              type="button"
              onClick={onOpenComplaint}
              className="mt-4 px-4 py-2.5 rounded-xl bg-[#00AA13] text-white text-sm font-semibold cursor-pointer"
            >
              Ajukan Pengaduan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complaints.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#00AA13]">{item.username}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-neutral-700">
                        {CATEGORY_LABELS[item.category]}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteComplaint(item.id)}
                      aria-label="Hapus pengaduan"
                      className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-display text-base font-bold text-neutral-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-neutral-500 tabular-nums">{item.createdAt}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 font-semibold ${
                      item.status === 'Selesai' ? 'text-[#00AA13]' : 'text-amber-700'
                    }`}
                  >
                    {item.status === 'Selesai' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    <span>{item.status}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        )
      ) : bookmarkedItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 text-center">
          <p className="font-display text-base font-bold text-neutral-900">
            Belum ada informasi tersimpan
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            Tekan ikon penanda pada kartu informasi untuk menyimpannya di sini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarkedItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-2">
                  <span className="font-semibold text-[#00AA13]">
                    {item.authorHandle} · {item.categoryLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(item.id)}
                    aria-label="Hapus simpanan"
                    className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-[#00AA13] bg-[#00AA13]/10 cursor-pointer"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenDetail(item)}
                  className="text-left cursor-pointer"
                >
                  <h3 className="font-display text-base font-bold text-neutral-900 hover:text-[#00AA13] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-600 line-clamp-2">{item.summary}</p>
                </button>
              </div>
              <button
                type="button"
                onClick={() => onOpenDetail(item)}
                className="self-start text-xs font-semibold text-[#00AA13] hover:underline cursor-pointer"
              >
                Baca selengkapnya →
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
