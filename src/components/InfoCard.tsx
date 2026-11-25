import React from 'react';
import { AlertCircle, Bookmark, ChevronRight, Info, User } from 'lucide-react';
import { CrisisInfoItem } from '../types/crisis';

interface InfoCardProps {
  item: CrisisInfoItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenDetail: (item: CrisisInfoItem) => void;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  item,
  isBookmarked,
  onToggleBookmark,
  onOpenDetail,
}) => {
  const isUrgent = item.urgency === 'Penting';

  return (
    <article className="bg-white rounded-2xl border border-neutral-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#00AA13]/45 transition-all duration-150 p-4 sm:p-5 flex flex-col justify-between gap-3">
      <div>
        {/* Top Metadata Row: Unboxed text with typographic separators */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-6 h-6 rounded-full bg-[#00AA13] text-white flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              <User className="w-3.5 h-3.5" />
            </span>
            <div className="flex items-center gap-1.5 text-xs text-neutral-600 truncate">
              <span className="font-semibold text-[#00AA13] truncate">
                {item.authorHandle}
              </span>
              <span aria-hidden="true" className="text-neutral-300">
                ·
              </span>
              <span className="font-medium text-neutral-700">{item.categoryLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs font-medium text-[#00AA13] tabular-nums">
              {item.timestamp}
            </span>
            <button
              type="button"
              onClick={() => onToggleBookmark(item.id)}
              aria-label={isBookmarked ? 'Hapus dari tersimpan' : 'Simpan informasi'}
              className={`min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                isBookmarked
                  ? 'text-[#00AA13] bg-[#00AA13]/10'
                  : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Headline & Summary */}
        <button
          type="button"
          onClick={() => onOpenDetail(item)}
          className="text-left w-full group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00AA13] rounded-lg"
        >
          <h3 className="font-display text-base sm:text-[17px] font-bold text-neutral-900 group-hover:text-[#00AA13] transition-colors leading-snug">
            {item.title}
          </h3>
          <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed line-clamp-2">
            {item.summary}
          </p>
        </button>
      </div>

      {/* Bottom Action & Urgency Row */}
      <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-3">
        {/* Semantic urgency indicator: never hue-only (explicit icon + label) */}
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
            isUrgent
              ? 'bg-red-50 text-red-700 border border-red-200/70'
              : 'bg-sky-50 text-sky-700 border border-sky-200/70'
          }`}
        >
          {isUrgent ? (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          )}
          <span>{item.urgency}</span>
        </div>

        <button
          type="button"
          onClick={() => onOpenDetail(item)}
          className="inline-flex items-center gap-1.5 min-h-[40px] pl-3 pr-1.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-[#00AA13] hover:bg-[#00AA13]/8 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Tindakan</span>
          <span className="w-6 h-6 rounded-full bg-[#00AA13] text-white flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </article>
  );
};
