import React from 'react';
import { Check, Instagram, ShieldCheck, UserCheck, Users } from 'lucide-react';
import { StakeholderRole } from '../types/crisis';

interface ProfileViewProps {
  role: StakeholderRole;
  onChangeRole: (role: StakeholderRole) => void;
  totalSaved: number;
  totalComplaints: number;
}

const ROLES: {
  id: StakeholderRole;
  description: string;
}[] = [
  {
    id: 'Masyarakat Umum',
    description: 'Pelanggan GoRide, GoCar, GoFood, dan GoSend yang memantau informasi layanan aman.',
  },
  {
    id: 'Mitra Driver',
    description: 'Mitra pengemudi yang membutuhkan jadwal bantuan masker, posko J3K, dan kebijakan operasional.',
  },
  {
    id: 'Mitra Usaha (GoFood)',
    description: 'Merchant kuliner yang menerapkan prosedur pengantaran tanpa kontak dan standar kebersihan.',
  },
];

const TEAM_MEMBERS = [
  'Aisyah Fauziah Mardhotillah',
  'Julya Azzahra',
  'Lisa Olviani',
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  role,
  onChangeRole,
  totalSaved,
  totalComplaints,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Left: Stakeholder Profile & Role Switcher */}
      <section className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00AA13] text-white flex items-center justify-center shrink-0">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-neutral-900">
              Profil Pemangku Kepentingan
            </h2>
            <p className="text-sm text-neutral-600">
              Peran aktif: <span className="font-semibold text-[#00AA13]">{role}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-[#F5F5F5] rounded-2xl p-4">
          <div>
            <p className="text-xs text-neutral-500">Informasi Tersimpan</p>
            <p className="font-display text-2xl font-bold text-neutral-900 tabular-nums mt-0.5">
              {totalSaved}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Pengaduan Terkirim</p>
            <p className="font-display text-2xl font-bold text-neutral-900 tabular-nums mt-0.5">
              {totalComplaints}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <h3 className="font-display text-sm font-bold text-neutral-900">
            Pilih Perspektif Pemangku Kepentingan
          </h3>
          <div className="space-y-2">
            {ROLES.map((item) => {
              const selected = role === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChangeRole(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                    selected
                      ? 'border-[#00AA13] bg-[#00AA13]/5'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <div>
                    <p
                      className={`font-display text-sm font-bold ${
                        selected ? 'text-[#00AA13]' : 'text-neutral-900'
                      }`}
                    >
                      {item.id}
                    </p>
                    <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  {selected && (
                    <span className="w-6 h-6 rounded-full bg-[#00AA13] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Right: Project Attribution & Channel Info */}
      <aside className="lg:col-span-5 space-y-4">
        <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#00AA13]">
            <Instagram className="w-5 h-5" aria-hidden="true" />
            <h3 className="font-display text-base font-bold text-neutral-900">
              Kanal Komunikasi Resmi
            </h3>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Seluruh informasi Kegiatan, Kebijakan, dan Kampanye Protokol Kesehatan J3K pada prototipe ini disusun merujuk pada alur pengelolaan komunikasi krisis Gojek melalui Instagram{' '}
            <span className="font-semibold text-neutral-900">@gojekindonesia</span> saat pandemi COVID-19.
          </p>
          <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-600">
            <ShieldCheck className="w-4 h-4 text-[#00AA13] shrink-0" aria-hidden="true" />
            <span>Fokus J3K: Jaga Kesehatan · Jaga Kebersihan · Jaga Keamanan</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 space-y-3">
          <div className="flex items-center gap-2 text-[#00AA13]">
            <Users className="w-5 h-5" aria-hidden="true" />
            <h3 className="font-display text-base font-bold text-neutral-900">
              Tim Penyusun Alur Komunikasi
            </h3>
          </div>
          <ul className="divide-y divide-neutral-100">
            {TEAM_MEMBERS.map((member, idx) => (
              <li
                key={member}
                className="py-2.5 flex items-center gap-3 text-sm text-neutral-800"
              >
                <span className="w-6 h-6 rounded-full bg-[#F5F5F5] text-neutral-600 text-xs font-semibold flex items-center justify-center tabular-nums">
                  {idx + 1}
                </span>
                <span className="font-medium">{member}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};
