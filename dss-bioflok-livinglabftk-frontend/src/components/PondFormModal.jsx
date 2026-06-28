import { useState, useEffect } from 'react';

function PondFormModal({ isOpen, onClose, onSubmit, initialData, isSubmitting }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity_m3: '',
    status: 'active',
  });
  const [errors, setErrors] = useState({});

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        location: initialData.location || '',
        capacity_m3: initialData.capacity_m3 || '',
        status: initialData.status || 'active',
      });
    } else {
      setFormData({ name: '', location: '', capacity_m3: '', status: 'active' });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama kolam wajib diisi';
    if (!formData.capacity_m3 || Number(formData.capacity_m3) < 1)
      newErrors.capacity_m3 = 'Kapasitas minimal 1 m³';
    if (!formData.status) newErrors.status = 'Status wajib dipilih';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: formData.name.trim(),
      location: formData.location.trim() || null,
      capacity_m3: Number(formData.capacity_m3),
      status: formData.status,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-panel rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-white/10 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="material-symbols-outlined text-primary">
                {isEdit ? 'edit' : 'add'}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {isEdit ? 'Edit Kolam' : 'Tambah Kolam Baru'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">
              NAMA KOLAM *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full glass-input rounded-lg p-3 font-body-md text-body-md text-on-surface"
              placeholder="Contoh: Alpha-01"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">
              LOKASI
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full glass-input rounded-lg p-3 font-body-md text-body-md text-on-surface"
              placeholder="Contoh: Blok Utara, Sektor 1"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">
              KAPASITAS (m³) *
            </label>
            <input
              name="capacity_m3"
              type="number"
              min="1"
              step="0.1"
              value={formData.capacity_m3}
              onChange={handleChange}
              className="w-full glass-input rounded-lg p-3 font-body-md text-body-md text-on-surface"
              placeholder="120"
            />
            {errors.capacity_m3 && (
              <p className="text-red-400 text-xs mt-1">{errors.capacity_m3}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">
              STATUS *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full glass-input rounded-lg p-3 font-body-md text-body-md appearance-none"
            >
              <option className="bg-surface text-on-surface" value="active">Aktif</option>
              <option className="bg-surface text-on-surface" value="maintenance">Maintenance</option>
              <option className="bg-surface text-on-surface" value="inactive">Nonaktif</option>
            </select>
            {errors.status && (
              <p className="text-red-400 text-xs mt-1">{errors.status}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5 transition-all font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-lg btn-primary font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">save</span>
                  {isEdit ? 'Perbarui' : 'Simpan'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PondFormModal;
