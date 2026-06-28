import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ConfirmModal from '../components/ConfirmModal';
import { getSensorReadings, getPonds, deleteSensorReading } from '../api/services';
import { useToast } from '../components/Toast';

const STATUS_MAP = {
  optimal: { label: 'Optimal', color: '#10b981' },
  waspada: { label: 'Siaga', color: '#f59e0b' },
  buruk: { label: 'Kritis', color: '#ef4444' },
};

const ITEMS_PER_PAGE = 10;

function Riwayat() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [readings, setReadings] = useState([]);
  const [ponds, setPonds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPond, setFilterPond] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [readingsRes, pondsRes] = await Promise.all([getSensorReadings(), getPonds()]);
      setReadings(readingsRes.data.data || []);
      setPonds(pondsRes.data.data || []);
    } catch {
      addToast('Gagal memuat data riwayat.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered data
  const filteredData = useMemo(() => {
    let data = [...readings];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (r) =>
          (r.pond?.name || '').toLowerCase().includes(q) ||
          (r.created_at || '').includes(q)
      );
    }

    if (filterPond) {
      data = data.filter((r) => String(r.pond_id) === filterPond);
    }

    if (filterStatus) {
      data = data.filter((r) => r.water_condition === filterStatus);
    }

    if (filterDate) {
      data = data.filter((r) => r.created_at && r.created_at.startsWith(filterDate));
    }

    return data;
  }, [readings, searchQuery, filterPond, filterStatus, filterDate]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterPond, filterStatus, filterDate]);

  // Delete handler
  const handleDelete = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      await deleteSensorReading(deleteModal.id);
      setReadings((prev) => prev.filter((r) => r.id !== deleteModal.id));
      addToast('Data sensor berhasil dihapus.', 'success');
    } catch {
      addToast('Gagal menghapus data sensor.', 'error');
    } finally {
      setIsDeleting(false);
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const Skeleton = ({ className }) => <div className={`skeleton ${className}`}></div>;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-stack-lg">
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-96" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-stack-lg">
        {/* Page Header & Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Riwayat Log</h2>
            <p className="text-on-surface-variant mt-1">Data historis sensor dan parameter air.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
              <input
                className="glass-input w-full pl-10 pr-4 py-2 rounded-lg text-sm font-body-md"
                placeholder="Cari kolam/tanggal..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="glass-input py-2 pl-4 pr-8 rounded-lg text-sm font-body-md appearance-none"
              value={filterPond}
              onChange={(e) => setFilterPond(e.target.value)}
            >
              <option value="">Semua Kolam</option>
              {ponds.map((pond) => (
                <option key={pond.id} value={pond.id}>{pond.name}</option>
              ))}
            </select>
            <select
              className="glass-input py-2 pl-4 pr-8 rounded-lg text-sm font-body-md appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="optimal">Optimal</option>
              <option value="waspada">Siaga</option>
              <option value="buruk">Kritis</option>
            </select>
            <input
              className="glass-input py-2 px-4 rounded-lg text-sm font-body-md text-on-surface-variant"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <button
              onClick={() => navigate('/prediksi')}
              className="bg-primary-container text-on-primary-container font-headline-sm text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all ml-auto md:ml-0"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Input Baru
            </button>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-surface-container/50 font-label-caps text-label-caps text-on-surface-variant">
                  <th className="p-4 w-12">#</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Kolam</th>
                  <th className="p-4">Suhu (°C)</th>
                  <th className="p-4">pH</th>
                  <th className="p-4">DO (mg/L)</th>
                  <th className="p-4">NH3 (mg/L)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-body-md">
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => {
                    const rowStatus = STATUS_MAP[row.water_condition] || STATUS_MAP.optimal;
                    const rowNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                    const isCritical = row.water_condition === 'buruk';
                    return (
                      <tr
                        key={row.id}
                        className={`hover:bg-white/5 transition-colors ${isCritical ? 'bg-error-container/10' : ''}`}
                      >
                        <td className="p-4 text-on-surface-variant">{rowNumber}</td>
                        <td className="p-4">
                          {new Date(row.created_at).toLocaleDateString('id-ID', {
                            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                        <td className="p-4 font-semibold text-primary">{row.pond?.name || `#${row.pond_id}`}</td>
                        <td className="p-4 font-metric-value text-lg">{row.temperature}</td>
                        <td className={`p-4 font-metric-value text-lg ${row.ph_interpretation === 'peringatan' ? 'text-[#f59e0b]' : row.ph_interpretation === 'kritis' ? 'text-error' : ''}`}>
                          {row.ph}
                        </td>
                        <td className={`p-4 font-metric-value text-lg ${row.DO_condition === 'peringatan' ? 'text-[#f59e0b]' : row.DO_condition === 'kritis' ? 'text-error' : ''}`}>
                          {row.do}
                        </td>
                        <td className={`p-4 font-metric-value text-lg ${row.NH3_condition === 'peringatan' ? 'text-[#f59e0b]' : row.NH3_condition === 'kritis' ? 'text-error' : ''}`}>
                          {row.nh3}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: rowStatus.color, boxShadow: `0 0 8px ${rowStatus.color}` }}
                            ></div>
                            <span className="text-xs" style={{ color: rowStatus.color }}>{rowStatus.label}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, id: row.id })}
                            className="text-on-surface-variant hover:text-error transition-colors p-1 rounded"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-on-surface-variant">
                      {readings.length === 0
                        ? 'Belum ada data sensor.'
                        : 'Tidak ada data yang sesuai filter.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="border-t border-white/10 p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-low/50">
            <span className="text-sm text-on-surface-variant">
              Menampilkan {filteredData.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} dari {filteredData.length} data
            </span>
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? 'bg-primary/20 border border-primary/50 text-primary'
                        : 'border border-white/10 text-on-surface-variant hover:bg-white/5 hover:text-primary'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-on-surface-variant">...</span>
                  <button
                    className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors text-sm"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors disabled:opacity-50"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null })}
        title="Hapus Data Sensor"
        message="Apakah Anda yakin ingin menghapus data sensor ini? Tindakan ini tidak dapat dibatalkan."
      />
    </DashboardLayout>
  );
}

export default Riwayat;
