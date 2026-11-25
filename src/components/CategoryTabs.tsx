import React from 'react';
import { Building2 } from 'lucide-react';
import { ServiceCategory } from '../types/crisis';

interface CategoryTabsProps {
  selectedCategory: ServiceCategory;
  onSelectCategory: (category: ServiceCategory) => void;
  counts: Record<ServiceCategory, number>;
}

const PolicyIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
    {/* Minimalist 3-people + governance cog motif */}
    <circle cx="20" cy="10.5" r="3.2" fill="currentColor" />
    <circle cx="12" cy="13" r="2.6" fill="currentColor" />
    <circle cx="28" cy="13" r="2.6" fill="currentColor" />
    <path
      d="M14.5 21.5C14.5 18.2 17 16 20 16C23 16 25.5 18.2 25.5 21.5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M8.5 22C8.5 19.6 10.1 18 12.2 18C13.6 18 14.8 18.7 15.4 19.8"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M31.5 22C31.5 19.6 29.9 18 27.8 18C26.4 18 25.2 18.7 24.6 19.8"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M10.5 24.5C11.8 29.1 15.5 32 20 32C24.5 32 28.2 29.1 29.5 24.5"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M20 32V35M14.5 30.5L13 33M25.5 30.5L27 33"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  const services: {
    id: Exclude<ServiceCategory, 'semua'>;
    label: string;
    sublabel: string;
  }[] = [
    {
      id: 'kegiatan',
      label: 'Kegiatan',
      sublabel: 'Bantuan & Aksi',
    },
    {
      id: 'kebijakan',
      label: 'Kebijakan',
      sublabel: 'Prosedur Layanan',
    },
    {
      id: 'j3k',
      label: 'J3K',
      sublabel: 'Protokol Sehat',
    },
  ];

  const handleCircleClick = (id: Exclude<ServiceCategory, 'semua'>) => {
    if (selectedCategory === id) {
      onSelectCategory('semua');
    } else {
      onSelectCategory(id);
    }
  };

  return (
    <section aria-label="Kategori Layanan Komunikasi Krisis" className="w-full">
      {/* 3 Circular Service Feature Icons matching mockup */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto md:max-w-xl py-2">
        {services.map((service) => {
          const isActive = selectedCategory === service.id;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => handleCircleClick(service.id)}
              aria-pressed={isActive}
              className="group flex flex-col items-center text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00AA13] rounded-2xl p-1.5 transition-transform active:scale-[0.97]"
            >
              <div
                className={`w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-150 ${
                  isActive
                    ? 'bg-[#00AA13] border-[#00AA13] text-white shadow-md shadow-[#00AA13]/25 scale-[1.03]'
                    : 'bg-gradient-to-b from-[#00AA13]/15 via-[#00AA13]/10 to-white border-[#00AA13] text-[#00AA13] group-hover:bg-[#00AA13]/15 group-hover:shadow-sm'
                }`}
              >
                {service.id === 'kegiatan' && (
                  <Building2 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.1]" />
                )}
                {service.id === 'kebijakan' && (
                  <PolicyIcon className="w-9 h-9 sm:w-10 sm:h-10" />
                )}
                {service.id === 'j3k' && (
                  <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">
                    J3K
                  </span>
                )}
              </div>

              <span
                className={`mt-2.5 font-display text-sm sm:text-base font-bold transition-colors whitespace-nowrap ${
                  isActive ? 'text-[#00AA13]' : 'text-neutral-900'
                }`}
              >
                {service.label}
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-500 whitespace-nowrap">
                {service.sublabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Clean Single-Line Segmented Tab Strip for explicit category navigation */}
      <div
        role="tablist"
        aria-label="Filter tab kategori informasi"
        className="mt-4 flex items-center gap-1.5 p-1 bg-white border border-neutral-200/80 rounded-xl overflow-x-auto"
      >
        {(
          [
            { id: 'semua', label: 'Semua' },
            { id: 'kegiatan', label: 'Kegiatan' },
            { id: 'kebijakan', label: 'Kebijakan' },
            { id: 'j3k', label: 'J3K' },
          ] as { id: ServiceCategory; label: string }[]
        ).map((tab) => {
          const active = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectCategory(tab.id)}
              className={`flex-1 min-h-[40px] px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                active
                  ? 'bg-[#00AA13] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[11px] tabular-nums ${
                  active ? 'text-white/85' : 'text-neutral-400'
                }`}
              >
                ({counts[tab.id]})
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
