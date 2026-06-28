import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import PondFormModal from '../components/PondFormModal';
import ConfirmModal from '../components/ConfirmModal';
import { getPonds, createPond, updatePond, deletePond } from '../api/services';
import { useToast } from '../components/Toast';

const STATUS_BADGE = {
  active: {
    label: 'AKTIF',
    dotClass: 'bg-primary',
    textClass: 'text-primary',
    bgClass: 'bg-primary/20',
    borderClass: 'border-primary/30',
    cardBorder: 'border-primary/30',
    iconColor: 'text-primary',
    barClass: 'bg-primary',
  },
  maintenance: {
    label: 'MAINTENANCE',
    dotClass: 'bg-surface-variant',
    textClass: 'text-on-surface-variant',
    bgClass: 'bg-surface-variant',
    borderClass: 'border-white/10',
    cardBorder: 'border-white/10',
    iconColor: 'text-on-surface-variant',
    barClass: '',
  },
  inactive: {
    label: 'NONAKTIF',
    dotClass: 'bg-red-500',
    textClass: 'text-red-400',
    bgClass: 'bg-red-500/20',
    borderClass: 'border-red-500/30',
    cardBorder: 'border-red-500/30',
    iconColor: 'text-red-400',
    barClass: 'bg-red-500',
  },
};

function Kolam() {
  const { addToast } = useToast();
  const [ponds, setPonds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [formModal, setFormModal] = useState({ isOpen: false, editData: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPonds();
  }, []);

  const fetchPonds = async () => {
    try {
      const response = await getPonds();
      setPonds(response.data.data || []);
    } catch {
      addToast('Gagal memuat data kolam.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (data) => {
    setIsSubmitting(true);
    try {
      if (formModal.editData) {
        await updatePond(formModal.editData.id, data);
        addToast('Data kolam berhasil diperbarui.', 'success');
      } else {
        await createPond(data);
        addToast('Kolam baru berhasil ditambahkan.', 'success');
      }
      setFormModal({ isOpen: false, editData: null });
      fetchPonds();
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menyimpan data kolam.';
      addToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    setIsSubmitting(true);
    try {
      await deletePond(deleteModal.id);
      setPonds((prev) => prev.filter((p) => p.id !== deleteModal.id));
      addToast('Kolam berhasil dihapus.', 'success');
    } catch {
      addToast('Gagal menghapus kolam.', 'error');
    } finally {
      setIsSubmitting(false);
      setDeleteModal({ isOpen: false, id: null, name: '' });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} mnt lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const Skeleton = ({ className }) => <div className={`skeleton ${className}`}></div>;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-stack-lg">
          <Skeleton className="w-full h-20" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-stack-lg">
        {/* Page Header & Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <p className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-1">Administration</p>
            <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Kolam Bioflok</h2>
            <p className="text-on-surface-variant mt-1">Kelola infrastruktur kolam, monitor status, dan konfigurasi kapasitas sistem budidaya.</p>
          </div>
          <button
            onClick={() => setFormModal({ isOpen: true, editData: null })}
            className="bg-surface-variant border border-white/10 text-on-surface font-headline-sm text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Tambah Kolam
          </button>
        </div>

        {/* Grid Kolam */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ponds.length > 0 ? (
            ponds.map((pond) => {
              const badge = STATUS_BADGE[pond.status] || STATUS_BADGE.active;
              const isActive = pond.status === 'active';
              const isMaint = pond.status === 'maintenance';

              return (
                <div
                  key={pond.id}
                  className={`glass-panel p-6 rounded-xl flex flex-col border ${badge.cardBorder} relative overflow-hidden ${isMaint ? 'opacity-70 hover:opacity-100 transition-opacity' : ''}`}
                >
                  {/* Left accent bar for active ponds */}
                  {badge.barClass && (
                    <div className={`absolute top-0 left-0 w-1 h-full ${badge.barClass}`}></div>
                  )}

                  {/* Header */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${badge.iconColor} text-2xl`}>water_drop</span>
                      <h3 className={`font-headline-sm text-headline-sm ${isActive ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                        {pond.name}
                      </h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full ${badge.bgClass} ${badge.textClass} text-xs font-bold border ${badge.borderClass} flex items-center gap-1`}>
                      {isActive ? (
                        <div className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`}></div>
                      ) : isMaint ? (
                        <span className="material-symbols-outlined text-[10px]">build</span>
                      ) : (
                        <div className={`w-1.5 h-1.5 rounded-full ${badge.dotClass}`}></div>
                      )}
                      {badge.label}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-on-surface-variant text-sm mb-6">{pond.location || 'Lokasi belum diatur'}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`${isMaint ? 'bg-surface-container/30' : 'bg-surface-container/50'} rounded-lg p-4 text-center border border-white/5`}>
                      <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Kapasitas</p>
                      <div className={`font-metric-value text-2xl ${isActive ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                        {pond.capacity_m3} <span className="text-sm font-normal text-on-surface-variant">m³</span>
                      </div>
                    </div>
                    <div className={`${isMaint ? 'bg-surface-container/30' : 'bg-surface-container/50'} rounded-lg p-4 text-center border border-white/5`}>
                      <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Status</p>
                      <div className={`font-metric-value text-lg ${badge.textClass}`}>
                        {pond.status === 'active' ? 'Aktif' : pond.status === 'maintenance' ? 'Maint.' : 'Nonaktif'}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4">
                    <span className="text-xs text-on-surface-variant">
                      Terakhir diupdate: {formatDate(pond.updated_at)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFormModal({ isOpen: true, editData: pond })}
                        className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, id: pond.id, name: pond.name })}
                        className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full glass-panel rounded-xl p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-30 mb-4 block">water_drop</span>
              <p className="text-on-surface-variant mb-4">Belum ada kolam terdaftar.</p>
              <button
                onClick={() => setFormModal({ isOpen: true, editData: null })}
                className="btn-primary px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Tambah Kolam Pertama
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pond Form Modal */}
      <PondFormModal
        isOpen={formModal.isOpen}
        onClose={() => setFormModal({ isOpen: false, editData: null })}
        onSubmit={handleCreateOrUpdate}
        initialData={formModal.editData}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
        title="Hapus Kolam"
        message={`Apakah Anda yakin ingin menghapus kolam "${deleteModal.name}"? Semua data sensor terkait juga akan terhapus.`}
      />
    </DashboardLayout>
  );
}

export default Kolam;
