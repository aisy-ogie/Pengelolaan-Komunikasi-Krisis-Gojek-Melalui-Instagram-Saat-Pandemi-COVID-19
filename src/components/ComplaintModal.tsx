import React, { useEffect, useState } from 'react';
import { Send, X } from 'lucide-react';
import { ComplaintItem, CrisisPillar, UrgencyLevel } from '../types/crisis';

interface ComplaintModalProps {
  isOpen: boolean;
  defaultCategory?: CrisisPillar;
  onClose: () => void;
  onSubmitComplaint: (
    data: Omit<ComplaintItem, 'id' | 'createdAt' | 'status'>
  ) => void;
}

export const ComplaintModal: React.FC<ComplaintModalProps> = ({
  isOpen,
  defaultCategory = 'kegiatan',
  onClose,
  onSubmitComplaint,
}) => {
  const [category, setCategory] = useState<CrisisPillar>(defaultCategory);
  const [urgency, setUrgency] = useState<UrgencyLevel>('Normal');
  const [username, setUsername] = useState('@warga_gojek');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setCategory(defaultCategory);
  }, [defaultCategory, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Mohon lengkapi judul dan ringkasan pengaduan Anda.');
      return;
    }

    const formattedUser = username.trim().startsWith('@')
      ? username.trim()
      : `@${username.trim() || 'pengguna'}`;

    onSubmitComplaint({
      category,
      urgency,
      username: formattedUser,
      title: title.trim(),
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[2px] p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="complaint-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1.5 rounded-full bg-neutral-300" />
        </div>

        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h2
              id="complaint-modal-title"
              className="font-display text-lg font-bold text-neutral-900"
            >
              Ajukan Pengaduan &amp; Aspirasi
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Masukan Anda membantu perbaikan distribusi informasi krisis Gojek
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir pengaduan"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          {/* Category Picker */}
          <div>
            <span className="block text-xs font-semibold text-neutral-700 mb-2">
              Kategori Layanan
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'kegiatan', label: 'Kegiatan' },
                  { id: 'kebijakan', label: 'Kebijakan' },
                  { id: 'j3k', label: 'J3K' },
                ] as { id: CrisisPillar; label: string }[]
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`min-h-[42px] px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                    category === cat.id
                      ? 'bg-[#00AA13] text-white border-[#00AA13]'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency & Username */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Tingkat Prioritas
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(['Normal', 'Penting'] as UrgencyLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUrgency(level)}
                    className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      urgency === level
                        ? level === 'Penting'
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="complaint-username"
                className="block text-xs font-semibold text-neutral-700 mb-1.5"
              >
                Akun / Nama Pengguna
              </label>
              <input
                id="complaint-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
                className="w-full h-[42px] px-3.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:border-[#00AA13]"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="complaint-title"
              className="block text-xs font-semibold text-neutral-700 mb-1.5"
            >
              Judul Pengaduan atau Pertanyaan
            </label>
            <input
              id="complaint-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Contoh: Jadwal pembagian masker di posko wilayah Bandung"
              className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:border-[#00AA13]"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="complaint-desc"
              className="block text-xs font-semibold text-neutral-700 mb-1.5"
            >
              Ringkasan Detail
            </label>
            <textarea
              id="complaint-desc"
              rows={3}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Tuliskan detail kendala, saran perbaikan distribusi informasi, atau pertanyaan terkait layanan..."
              className="w-full p-3.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:border-[#00AA13] resize-none"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-medium text-red-600" role="alert">
              {errorMsg}
            </p>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00AA13] hover:bg-[#008C10] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Pengaduan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
