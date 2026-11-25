import React, { useEffect } from 'react';
import { Bell, CheckCheck, X } from 'lucide-react';
import { NotificationItem } from '../types/crisis';

interface NotificationDrawerProps {
  isOpen: boolean;
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  notifications,
  onClose,
  onMarkAllRead,
  onSelectNotification,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-start sm:justify-end bg-black/40 backdrop-blur-[2px] p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notif-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden sm:mt-14"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#00AA13]" aria-hidden="true" />
            <h2 id="notif-title" className="font-display text-base font-bold text-neutral-900">
              Notifikasi Krisis
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onMarkAllRead}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#00AA13] hover:underline cursor-pointer px-2 py-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai dibaca</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup notifikasi"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-neutral-100 max-h-[65vh] overflow-y-auto">
          {notifications.map((notif) => (
            <button
              key={notif.id}
              type="button"
              onClick={() => onSelectNotification(notif)}
              className={`w-full text-left px-5 py-4 transition-colors cursor-pointer hover:bg-neutral-50 ${
                notif.read ? 'bg-white' : 'bg-[#00AA13]/5'
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs mb-1">
                <span className="font-semibold text-[#00AA13]">
                  {notif.read ? 'Sudah dibaca' : 'Terbaru'}
                </span>
                <span className="text-neutral-500 tabular-nums">{notif.time}</span>
              </div>
              <p className="font-display text-sm font-bold text-neutral-900">{notif.title}</p>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{notif.message}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
