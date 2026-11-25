import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Instagram,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { BottomNav } from './components/BottomNav';
import { CategoryTabs } from './components/CategoryTabs';
import { ComplaintModal } from './components/ComplaintModal';
import { CrisisFlowView } from './components/CrisisFlowView';
import { Header } from './components/Header';
import { HistoryView } from './components/HistoryView';
import { InfoCard } from './components/InfoCard';
import { InfoDetailModal } from './components/InfoDetailModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ProfileView } from './components/ProfileView';
import {
  CRISIS_INFO_ITEMS,
  INITIAL_COMPLAINTS,
  INITIAL_NOTIFICATIONS,
} from './data/crisisData';
import {
  ComplaintItem,
  CrisisInfoItem,
  CrisisPillar,
  NavTab,
  NotificationItem,
  ServiceCategory,
  StakeholderRole,
} from './types/crisis';

const STORAGE_KEYS = {
  complaints: 'gojek_krisis_complaints_v1',
  bookmarks: 'gojek_krisis_bookmarks_v1',
  role: 'gojek_krisis_role_v1',
};

export default function App() {
  const [activeNav, setActiveNav] = useState<NavTab>('beranda');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('semua');
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedInfo, setSelectedInfo] = useState<CrisisInfoItem | null>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [complaintDefaultCategory, setComplaintDefaultCategory] =
    useState<CrisisPillar>('kegiatan');

  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );

  const [complaints, setComplaints] = useState<ComplaintItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.complaints);
      return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
    } catch {
      return INITIAL_COMPLAINTS;
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.bookmarks);
      return saved ? JSON.parse(saved) : ['j3k-1'];
    } catch {
      return ['j3k-1'];
    }
  });

  const [role, setRole] = useState<StakeholderRole>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.role);
      return (saved as StakeholderRole) || 'Masyarakat Umum';
    } catch {
      return 'Masyarakat Umum';
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.complaints, JSON.stringify(complaints));
    } catch {
      // Ignore storage quota errors
    }
  }, [complaints]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(bookmarks));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.role, role);
    } catch {
      // Ignore storage quota errors
    }
  }, [role]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const categoryCounts = useMemo<Record<ServiceCategory, number>>(() => {
    const q = searchQuery.trim().toLowerCase();
    const matchingSearch = CRISIS_INFO_ITEMS.filter((item) => {
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.fullContent.toLowerCase().includes(q)
      );
    });

    return {
      semua: matchingSearch.length,
      kegiatan: matchingSearch.filter((i) => i.category === 'kegiatan').length,
      kebijakan: matchingSearch.filter((i) => i.category === 'kebijakan').length,
      j3k: matchingSearch.filter((i) => i.category === 'j3k').length,
    };
  }, [searchQuery]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CRISIS_INFO_ITEMS.filter((item) => {
      if (selectedCategory !== 'semua' && item.category !== selectedCategory) {
        return false;
      }
      if (onlyUrgent && item.urgency !== 'Penting') {
        return false;
      }
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.fullContent.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, onlyUrgent, searchQuery]);

  const bookmarkedItems = useMemo(
    () => CRISIS_INFO_ITEMS.filter((item) => bookmarks.includes(item.id)),
    [bookmarks]
  );

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      setToastMessage(
        exists
          ? 'Informasi dihapus dari daftar tersimpan.'
          : 'Informasi disimpan ke menu Riwayat.'
      );
      return next;
    });
  };

  const handleOpenComplaintForCategory = (cat: CrisisPillar = 'kegiatan') => {
    setComplaintDefaultCategory(cat);
    setIsComplaintOpen(true);
  };

  const handleSubmitComplaint = (
    data: Omit<ComplaintItem, 'id' | 'createdAt' | 'status'>
  ) => {
    const newItem: ComplaintItem = {
      ...data,
      id: `aduan-${Date.now()}`,
      createdAt: 'Baru saja',
      status: 'Menunggu Tinjauan',
    };
    setComplaints((prev) => [newItem, ...prev]);
    setToastMessage('Pengaduan berhasil dikirim dan dicatat di menu Riwayat.');
    setActiveNav('riwayat');
  };

  const handleDeleteComplaint = (id: string) => {
    setComplaints((prev) => prev.filter((item) => item.id !== id));
    setToastMessage('Riwayat pengaduan dihapus.');
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setIsNotifOpen(false);
    if (notif.linkedInfoId) {
      const target = CRISIS_INFO_ITEMS.find((i) => i.id === notif.linkedInfoId);
      if (target) {
        setActiveNav('beranda');
        setSelectedInfo(target);
      }
    }
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim() && activeNav !== 'beranda') {
      setActiveNav('beranda');
    }
  };

  const resetFilters = () => {
    setSelectedCategory('semua');
    setOnlyUrgent(false);
    setSearchQuery('');
  };

  const activeCategoryTitle: Record<ServiceCategory, string> = {
    semua: 'Semua Informasi Komunikasi Krisis',
    kegiatan: 'Informasi Kegiatan Perusahaan',
    kebijakan: 'Informasi Kebijakan Perusahaan',
    j3k: 'Informasi Kampanye Protokol Kesehatan J3K',
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-neutral-900 flex flex-col pb-24 md:pb-10">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotifOpen(true)}
        activeNav={activeNav}
        onSelectNav={setActiveNav}
        onOpenComplaint={() => handleOpenComplaintForCategory('kegiatan')}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7">
        {activeNav === 'beranda' && (
          <div className="space-y-6">
            {/* 3 Service Categories & Tab Switcher */}
            <CategoryTabs
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              counts={categoryCounts}
            />

            {/* Main Content + Desktop Context Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <section className="lg:col-span-8 space-y-4" aria-label="Daftar Informasi Layanan">
                {/* Section Header & Urgency Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-base sm:text-lg font-bold text-neutral-900">
                      {activeCategoryTitle[selectedCategory]}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5 tabular-nums">
                      Menampilkan {filteredItems.length} informasi untuk {role}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOnlyUrgent((prev) => !prev)}
                      aria-pressed={onlyUrgent}
                      className={`inline-flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        onlyUrgent
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Prioritas Penting</span>
                    </button>

                    {(selectedCategory !== 'semua' || onlyUrgent || searchQuery) && (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1 min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Cards List / Grid */}
                {filteredItems.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 text-center">
                    <p className="font-display text-base font-bold text-neutral-900">
                      Informasi tidak ditemukan
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      Coba ubah kata kunci pencarian atau pilih kategori tab lainnya.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 rounded-xl bg-[#00AA13] text-white text-sm font-semibold cursor-pointer"
                    >
                      Tampilkan Semua Layanan
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map((item) => (
                      <InfoCard
                        key={item.id}
                        item={item}
                        isBookmarked={bookmarks.includes(item.id)}
                        onToggleBookmark={toggleBookmark}
                        onOpenDetail={setSelectedInfo}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Desktop / Tablet Secondary Context Column */}
              <aside className="lg:col-span-4 space-y-4">
                <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 space-y-3.5">
                  <div className="flex items-center gap-2 text-[#00AA13]">
                    <Instagram className="w-5 h-5" aria-hidden="true" />
                    <h3 className="font-display text-base font-bold text-neutral-900">
                      Strategi Instagram @gojekindonesia
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Selama pandemi COVID-19, Gojek mengelompokkan komunikasi krisis ke dalam 3 layanan utama: Kegiatan, Kebijakan, dan Protokol Kesehatan J3K agar pesan cepat dipahami publik dan mitra.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveNav('news')}
                    className="w-full min-h-[42px] px-4 py-2.5 rounded-xl bg-[#00AA13]/10 hover:bg-[#00AA13]/15 text-[#00AA13] text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Lihat Alur Komunikasi Krisis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#00AA13]">
                    <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                    <h3 className="font-display text-base font-bold text-neutral-900">
                      3 Pilar Protokol J3K
                    </h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-neutral-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 text-[#00AA13] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-neutral-900">Jaga Kesehatan:</strong>{' '}
                        Cek suhu mitra tercatat di aplikasi &amp; wajib masker.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 text-[#00AA13] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-neutral-900">Jaga Kebersihan:</strong>{' '}
                        Disinfeksi rutin armada di Posko Aman Gojek.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 text-[#00AA13] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-neutral-900">Jaga Keamanan:</strong>{' '}
                        Sekat pelindung &amp; pengantaran tanpa kontak fisik.
                      </span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        )}

        {activeNav === 'news' && (
          <CrisisFlowView
            onSelectCategoryAndGoHome={(cat) => {
              setSelectedCategory(cat);
              setActiveNav('beranda');
            }}
            onOpenDetail={setSelectedInfo}
          />
        )}

        {activeNav === 'riwayat' && (
          <HistoryView
            complaints={complaints}
            bookmarkedItems={bookmarkedItems}
            onOpenComplaint={() => handleOpenComplaintForCategory('kegiatan')}
            onOpenDetail={setSelectedInfo}
            onToggleBookmark={toggleBookmark}
            onDeleteComplaint={handleDeleteComplaint}
          />
        )}

        {activeNav === 'profil' && (
          <ProfileView
            role={role}
            onChangeRole={(newRole) => {
              setRole(newRole);
              setToastMessage(`Perspektif diubah ke ${newRole}.`);
            }}
            totalSaved={bookmarks.length}
            totalComplaints={complaints.length}
          />
        )}
      </main>

      {/* Quiet Desktop Footer */}
      <footer className="hidden md:block max-w-6xl w-full mx-auto px-6 pt-8 pb-4 text-xs text-neutral-500 border-t border-neutral-200/70 mt-10">
        <div className="flex items-center justify-between gap-4">
          <span>
            Prototipe Pelayanan Komunikasi Krisis Gojek Melalui Instagram Saat Pandemi COVID-19
          </span>
          <span>Kegiatan · Kebijakan · J3K</span>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeNav={activeNav}
        onSelectNav={setActiveNav}
        onOpenComplaint={() => handleOpenComplaintForCategory('kegiatan')}
      />

      {/* Modals & Drawers */}
      <InfoDetailModal
        item={selectedInfo}
        isBookmarked={selectedInfo ? bookmarks.includes(selectedInfo.id) : false}
        onToggleBookmark={toggleBookmark}
        onClose={() => setSelectedInfo(null)}
        onReportCategory={(cat) => handleOpenComplaintForCategory(cat)}
      />

      <ComplaintModal
        isOpen={isComplaintOpen}
        defaultCategory={complaintDefaultCategory}
        onClose={() => setIsComplaintOpen(false)}
        onSubmitComplaint={handleSubmitComplaint}
      />

      <NotificationDrawer
        isOpen={isNotifOpen}
        notifications={notifications}
        onClose={() => setIsNotifOpen(false)}
        onMarkAllRead={handleMarkAllRead}
        onSelectNotification={handleSelectNotification}
      />

      {/* Non-intrusive Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-neutral-900 text-white text-xs sm:text-sm font-medium shadow-lg whitespace-nowrap"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
