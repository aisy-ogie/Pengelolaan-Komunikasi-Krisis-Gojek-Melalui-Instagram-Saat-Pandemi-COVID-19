import React, { useEffect } from 'react';
import {
  AlertCircle,
  Bookmark,
  CheckCircle2,
  Instagram,
  MessageSquarePlus,
  Users,
  X,
} from 'lucide-react';
import { CrisisInfoItem, CrisisPillar } from '../types/crisis';

interface InfoDetailModalProps {
  item: CrisisInfoItem | null;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onClose: () => void;
  onReportCategory: (category: CrisisPillar) => void;
}

export const InfoDetailModal: React.FC<InfoDetailModalProps> = ({
  item,
  isBookmarked,
  onToggleBookmark,
  onClose,
  onReportCategory,
}) => {
  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [item, onClose]);

  if (!item) return null;

  const isUrgent = item.urgency === 'Penting';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[2px] p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-neutral-300" />
        </div>

        {/* Header */}
        <div className="px-5 py-3.5 border-b border-neutral-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-600 min-w-0">
            <span className="font-semibold text-[#00AA13] truncate">{item.authorHandle}</span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-neutral-800">{item.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{item.timestamp}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmark(item.id)}
              aria-label={isBookmarked ? 'Hapus simpanan' : 'Simpan informasi'}
              className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-[#00AA13]/10 text-[#00AA13]'
                  : 'text-neutral-500 hover:bg-neutral-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup detail informasi"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                  isUrgent
                    ? 'bg-red-50 text-red-700 border border-red-200/70'
                    : 'bg-sky-50 text-sky-700 border border-sky-200/70'
                }`}
              >
                {isUrgent ? <AlertCircle className="w-3.5 h-3.5" /> : null}
                <span>Prioritas {item.urgency}</span>
              </span>
              <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-[#00AA13]" aria-hidden="true" />
                <span>{item.instagramChannel}</span>
              </span>
            </div>

            <h2
              id="detail-modal-title"
              className="font-display text-xl font-bold text-neutral-900 leading-snug"
            >
              {item.title}
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] text-neutral-700 leading-relaxed">
              {item.fullContent}
            </p>
          </div>

          {/* Action Checklist */}
          <div className="bg-[#F5F5F5] rounded-2xl p-4 space-y-2.5">
            <h3 className="font-display text-sm font-bold text-neutral-900">
              Tindakan yang Dapat Dilakukan
            </h3>
            <ul className="space-y-2.5">
              {item.actions.map((step, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <CheckCircle2
                    className="w-4 h-4 text-[#00AA13] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Monitoring & Reach Section (reflecting PDF flowchart evaluation loop) */}
          <div className="border border-neutral-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs text-neutral-500">
              <span className="font-semibold text-neutral-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#00AA13]" aria-hidden="true" />
                <span>Pemantauan Respons &amp; Jangkauan</span>
              </span>
              <span className="text-[#00AA13] font-medium">{item.targetAudience}</span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{item.monitoringNote}</p>
            <p className="text-xs font-medium text-neutral-500 tabular-nums pt-1">
              {item.reachStatus}
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 py-4 border-t border-neutral-100 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onReportCategory(item.category);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00AA13] hover:bg-[#008C10] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Ajukan Masukan / Pengaduan Terkait</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-sm font-semibold transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
