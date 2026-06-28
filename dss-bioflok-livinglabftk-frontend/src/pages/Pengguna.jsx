import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { register } from '../api/services';

function Pengguna() {
  const { user } = useAuth();
  const { addToast } = useToast();

  // Register form state
  const [showRegister, setShowRegister] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'petambak',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid';
    if (!formData.password) newErrors.password = 'Password wajib diisi';
    else if (formData.password.length < 8) newErrors.password = 'Password minimal 8 karakter';
    if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = 'Konfirmasi password tidak cocok';
    if (!formData.role) newErrors.role = 'Role wajib dipilih';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        role: formData.role,
      });
      addToast('Pengguna baru berhasil didaftarkan!', 'success');
      setFormData({ name: '', email: '', password: '', password_confirmation: '', role: 'petambak' });
      setShowRegister(false);
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mendaftarkan pengguna.';
      const fieldErrors = err.response?.data?.errors;
      if (fieldErrors) {
        const mapped = {};
        Object.keys(fieldErrors).forEach((key) => {
          mapped[key] = fieldErrors[key][0];
        });
        setErrors(mapped);
      }
      addToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map((w) => w[0]).join('').substring(0, 2).toUpperCase();
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return (
        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs flex items-center gap-1 w-max border border-primary/30">
          <span className="material-symbols-outlined text-[12px]">security</span> Admin
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs flex items-center gap-1 w-max border border-white/5">
        <span className="material-symbols-outlined text-[12px]">engineering</span> Petambak
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-stack-lg">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Pengguna</h2>
            <p className="text-on-surface-variant mt-1">Kelola akses dan peran pengguna dalam sistem Bioflok Intelligence.</p>
          </div>
          <button
            onClick={() => setShowRegister(!showRegister)}
            className="bg-primary-container text-on-primary-container font-headline-sm text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all"
          >
            <span className="material-symbols-outlined text-lg">{showRegister ? 'close' : 'person_add'}</span>
            {showRegister ? 'Tutup Form' : 'Tambah Pengguna Baru'}
          </button>
        </div>

        {/* Current User Profile Card */}
        <div className="glass-panel rounded-xl p-8 border border-primary/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">person</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Profil Anda</h3>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <span className="text-primary text-3xl font-bold">{getInitials(user?.name)}</span>
              </div>
              {getRoleBadge(user?.role)}
            </div>

            {/* Info */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container/50 rounded-lg p-4 border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Nama Lengkap</p>
                <p className="font-metric-value text-lg text-on-surface">{user?.name || '—'}</p>
              </div>
              <div className="bg-surface-container/50 rounded-lg p-4 border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Email</p>
                <p className="text-on-surface">{user?.email || '—'}</p>
              </div>
              <div className="bg-surface-container/50 rounded-lg p-4 border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Role</p>
                <p className="text-on-surface capitalize">{user?.role || '—'}</p>
              </div>
              <div className="bg-surface-container/50 rounded-lg p-4 border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Bergabung Sejak</p>
                <p className="text-on-surface">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
                    : '—'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Register New User Form */}
        {showRegister && (
          <div className="glass-panel rounded-xl p-8 border border-white/10 animate-scale-in">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="material-symbols-outlined text-primary">person_add</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Daftarkan Pengguna Baru</h3>
                <p className="text-on-surface-variant text-sm">Buat akun baru untuk anggota tim.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">NAMA LENGKAP *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full glass-input rounded-lg p-3 font-body-md text-body-md text-on-surface"
                    placeholder="Nama lengkap"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">EMAIL *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full glass-input rounded-lg p-3 font-body-md text-body-md text-on-surface"
                    placeholder="email@bioflok.id"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">PASSWORD *</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full glass-input rounded-lg p-3 font-body-md text-body-md text-on-surface"
                    placeholder="Minimal 8 karakter"
                  />
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">KONFIRMASI PASSWORD *</label>
                  <input
                    name="password_confirmation"
                    type="password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="w-full glass-input rounded-lg p-3 font-body-md text-body-md text-on-surface"
                    placeholder="Ulangi password"
                  />
                  {errors.password_confirmation && <p className="text-red-400 text-xs mt-1">{errors.password_confirmation}</p>}
                </div>
              </div>

              {/* Role */}
              <div className="max-w-xs">
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">ROLE *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full glass-input rounded-lg p-3 font-body-md text-body-md appearance-none"
                >
                  <option className="bg-surface text-on-surface" value="petambak">Petambak</option>
                  <option className="bg-surface text-on-surface" value="admin">Admin</option>
                </select>
                {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                  className="py-3 px-6 rounded-lg border border-white/10 text-on-surface-variant hover:bg-white/5 transition-all font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-8 rounded-lg btn-primary font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      Mendaftarkan...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">person_add</span>
                      Daftarkan Pengguna
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between text-xs text-on-surface-variant mt-4">
          <p>© 2024 Bioflok Oceanic Intelligence. High-Density Aquaculture Systems.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Technical Docs</a>
            <a href="#" className="hover:text-primary transition-colors">Support</a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Pengguna;
