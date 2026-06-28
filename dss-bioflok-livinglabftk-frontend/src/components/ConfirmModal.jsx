function ConfirmModal({ isOpen, onConfirm, onCancel, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative glass-panel rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/10 animate-scale-in">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
          <span className="material-symbols-outlined text-red-400 text-3xl">warning</span>
        </div>

        <h3 className="font-headline-sm text-headline-sm text-on-surface text-center mb-2">
          {title || 'Konfirmasi Hapus'}
        </h3>
        <p className="text-on-surface-variant text-center text-sm mb-8">
          {message || 'Apakah Anda yakin? Tindakan ini tidak dapat dibatalkan.'}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5 transition-all font-medium"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all font-bold flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
