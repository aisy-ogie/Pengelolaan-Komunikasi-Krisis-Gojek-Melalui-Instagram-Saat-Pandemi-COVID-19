import React from 'react';
import { Clock, Globe, Home, Plus, User } from 'lucide-react';
import { NavTab } from '../types/crisis';

interface BottomNavProps {
  activeNav: NavTab;
  onSelectNav: (tab: NavTab) => void;
  onOpenComplaint: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeNav,
  onSelectNav,
  onOpenComplaint,
}) => {
  return (
    <nav
      aria-label="Navigasi Bawah"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 pb-safe"
    >
      <div className="grid grid-cols-5 items-end h-16 px-1">
        {/* 1. Beranda */}
        <button
          type="button"
          onClick={() => onSelectNav('beranda')}
          className={`flex flex-col items-center justify-center h-full min-w-[44px] gap-1 cursor-pointer transition-colors ${
            activeNav === 'beranda' ? 'text-[#00AA13]' : 'text-neutral-500'
          }`}
        >
          <Home className={`w-5 h-5 ${activeNav === 'beranda' ? 'fill-[#00AA13]/15' : ''}`} />
          <span className="text-[11px] font-semibold leading-none whitespace-nowrap">
            Beranda
          </span>
        </button>

        {/* 2. News */}
        <button
          type="button"
          onClick={() => onSelectNav('news')}
          className={`flex flex-col items-center justify-center h-full min-w-[44px] gap-1 cursor-pointer transition-colors ${
            activeNav === 'news' ? 'text-[#00AA13]' : 'text-neutral-500'
          }`}
        >
          <Globe className="w-5 h-5" />
          <span className="text-[11px] font-semibold leading-none whitespace-nowrap">
            News
          </span>
        </button>

        {/* 3. Ajukan Pengaduan (Prominent center action matching mockup) */}
        <div className="flex flex-col items-center justify-end h-full pb-1.5">
          <button
            type="button"
            onClick={onOpenComplaint}
            aria-label="Ajukan Pengaduan"
            className="flex flex-col items-center cursor-pointer group focus-visible:outline-2 focus-visible:outline-[#00AA13] rounded-xl"
          >
            <span className="-mt-6 w-12 h-12 rounded-full bg-[#00AA13] text-white border-4 border-white shadow-md flex items-center justify-center group-active:scale-95 transition-transform">
              <Plus className="w-6 h-6 stroke-[2.6]" />
            </span>
            <span className="text-[10px] font-semibold text-neutral-800 leading-none mt-1 whitespace-nowrap">
              Ajukan Pengaduan
            </span>
          </button>
        </div>

        {/* 4. Riwayat */}
        <button
          type="button"
          onClick={() => onSelectNav('riwayat')}
          className={`flex flex-col items-center justify-center h-full min-w-[44px] gap-1 cursor-pointer transition-colors ${
            activeNav === 'riwayat' ? 'text-[#00AA13]' : 'text-neutral-500'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[11px] font-semibold leading-none whitespace-nowrap">
            Riwayat
          </span>
        </button>

        {/* 5. Profil */}
        <button
          type="button"
          onClick={() => onSelectNav('profil')}
          className={`flex flex-col items-center justify-center h-full min-w-[44px] gap-1 cursor-pointer transition-colors ${
            activeNav === 'profil' ? 'text-[#00AA13]' : 'text-neutral-500'
          }`}
        >
          <User className={`w-5 h-5 ${activeNav === 'profil' ? 'fill-[#00AA13]/15' : ''}`} />
          <span className="text-[11px] font-semibold leading-none whitespace-nowrap">
            Profil
          </span>
        </button>
      </div>
    </nav>
  );
};
