import React from 'react';
import { Bell, Search, X, Plus } from 'lucide-react';
import { NavTab } from '../types/crisis';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  activeNav: NavTab;
  onSelectNav: (tab: NavTab) => void;
  onOpenComplaint: () => void;
}

export const GojekMark: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
    <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeDasharray="82 22" transform="rotate(128 18 18)" />
    <circle cx="18" cy="18" r="5.5" fill="currentColor" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  unreadCount,
  onOpenNotifications,
  activeNav,
  onSelectNav,
  onOpenComplaint,
}) => {
  return (
    <header className="w-full">
      {/* Desktop Top Bar Contract (3 zones: Wordmark — 4 Nav Links — 1 Primary Action) */}
      <div className="hidden md:block bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text/brand wordmark */}
          <button
            type="button"
            onClick={() => onSelectNav('beranda')}
            className="flex items-center gap-2 text-[#00AA13] font-display font-extrabold text-2xl tracking-tight whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00AA13] rounded-md"
          >
            <GojekMark className="w-7 h-7" />
            <span>gojek</span>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="flex items-center gap-7 text-sm font-medium" aria-label="Navigasi Utama">
            {[
              { id: 'beranda' as NavTab, label: 'Beranda' },
              { id: 'news' as NavTab, label: 'Alur & News' },
              { id: 'riwayat' as NavTab, label: 'Riwayat' },
              { id: 'profil' as NavTab, label: 'Profil' },
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectNav(item.id)}
                  className={`py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-[#00AA13] border-[#00AA13] font-semibold'
                      : 'text-neutral-600 border-transparent hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenComplaint}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#00AA13] hover:bg-[#008C10] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Ajukan Pengaduan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Gojek Green Signature Header Area (Mobile & Desktop Context Banner) */}
      <div className="gojek-header-pattern text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-6 md:py-6">
          {/* Mobile Brand & Notification Row */}
          <div className="flex items-center justify-between gap-4 mb-4 md:mb-3">
            <div className="flex items-center gap-2.5 md:hidden">
              <GojekMark className="w-7 h-7 text-white" />
              <span className="font-display font-extrabold text-2xl tracking-tight">gojek</span>
            </div>

            <div className="hidden md:block">
              <h1 className="font-display text-xl lg:text-2xl font-bold tracking-tight text-white">
                Pengelolaan Komunikasi Krisis Gojek Saat Pandemi COVID-19
              </h1>
              <p className="text-sm text-white/90 mt-0.5">
                Pusat informasi resmi layanan Kegiatan, Kebijakan, dan Protokol J3K melalui Instagram @gojekindonesia
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenNotifications}
              aria-label={`Notifikasi (${unreadCount} belum dibaca)`}
              className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-white"
            >
              <Bell className="w-5 h-5 text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EF4444] text-white text-[11px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Subtitle */}
          <p className="text-xs text-white/90 mb-3 md:hidden leading-relaxed">
            Informasi krisis COVID-19 via Instagram @gojekindonesia
          </p>

          {/* Search Bar matching mockup */}
          <div className="relative max-w-2xl">
            <label htmlFor="crisis-search" className="sr-only">
              Pencarian informasi komunikasi krisis
            </label>
            <Search
              className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="crisis-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Pencarian informasi kegiatan, kebijakan, J3K..."
              className="w-full h-11 pl-11 pr-11 rounded-full bg-white text-neutral-900 placeholder:text-neutral-400 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-white/60 transition-shadow"
            />
            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Hapus pencarian"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
