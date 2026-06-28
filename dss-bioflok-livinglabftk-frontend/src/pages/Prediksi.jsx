import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { getPonds, createSensorReading } from '../api/services';
import { useToast } from '../components/Toast';

const STATUS_MAP = {
  optimal: { label: 'OPTIMAL', color: '#22c55e', icon: 'check_circle', pakan: 'PAKAN 100%' },
  waspada: { label: 'SIAGA', color: '#f59e0b', icon: 'warning', pakan: 'KURANGI 50%' },
  buruk: { label: 'KRITIS', color: '#ef4444', icon: 'error', pakan: 'PUASA TOTAL' },
};

const INTERP_LABELS = {
  temp_interpretation: {
    optimal: { title: 'Suhu Normal', desc: 'Metabolisme ikan beroperasi pada tingkat optimal. Tidak perlu penyesuaian pakan.' },
    peringatan: { title: 'Suhu Fluktuatif', desc: 'Suhu berada di batas ambang. Perlu pemantauan ketat dan potensi penyesuaian pakan.' },
    kritis: { title: 'Suhu Kritis', desc: 'Suhu di luar batas toleransi. Segera ambil tindakan perbaikan lingkungan kolam.' },
  },
  ph_interpretation: {
    optimal: { title: 'pH Stabil', desc: 'Berada dalam rentang ideal. Keseimbangan bakteri bioflok terjaga dengan baik.' },
    peringatan: { title: 'pH Fluktuatif', desc: 'pH mendekati batas ambang. Perlu monitoring dan kemungkinan koreksi.' },
    kritis: { title: 'pH Kritis', desc: 'pH di luar batas toleransi. Segera lakukan koreksi untuk mencegah kematian massal.' },
  },
  DO_condition: {
    optimal: { title: 'Oksigen Terlarut Cukup', desc: 'Kadar DO memadai untuk mendukung pencernaan pakan maksimal dan aktivitas bakteri.' },
    peringatan: { title: 'Oksigen Terlarut Rendah', desc: 'DO mendekati batas minimum. Tingkatkan aerasi dan kurangi pemberian pakan.' },
    kritis: { title: 'Oksigen Terlarut Kritis', desc: 'DO sangat rendah. Risiko tinggi kematian massal. Segera tingkatkan aerasi.' },
  },
  NH3_condition: {
    optimal: { title: 'Amonia Aman', desc: 'Sistem bioflok aktif mengubah limbah nitrogen secara efisien. Risiko keracunan sangat rendah.' },
    peringatan: { title: 'Amonia Tinggi', desc: 'Kadar amonia mulai meningkat. Kurangi pemberian pakan dan tingkatkan sirkulasi air.' },
    kritis: { title: 'Amonia Kritis', desc: 'Kadar amonia sangat tinggi. Bahaya keracunan akut. Segera lakukan pergantian air parsial.' },
  },
};

const INTERP_ICON = {
  optimal: { icon: 'task_alt', color: '#22c55e' },
  peringatan: { icon: 'warning', color: '#f59e0b' },
  kritis: { icon: 'error', color: '#ef4444' },
};

function Prediksi() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [ponds, setPonds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPonds, setIsLoadingPonds] = useState(true);
  const { addToast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    pond_id: '',
    temperature: '',
    ph: '',
    do: '',
    nh3: '',
  });
  const [errors, setErrors] = useState({});

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
      setIsLoadingPonds(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.pond_id) newErrors.pond_id = 'Kolam wajib dipilih';
    if (!formData.temperature) newErrors.temperature = 'Suhu wajib diisi';
    else if (Number(formData.temperature) < 15 || Number(formData.temperature) > 40)
      newErrors.temperature = 'Suhu harus antara 15–40 °C';
    if (!formData.ph) newErrors.ph = 'pH wajib diisi';
    else if (Number(formData.ph) < 0 || Number(formData.ph) > 14)
      newErrors.ph = 'pH harus antara 0–14';
    if (formData.do && (Number(formData.do) < 0 || Number(formData.do) > 20))
      newErrors.do = 'DO harus antara 0–20 mg/L';
    if (formData.nh3 && (Number(formData.nh3) < 0 || Number(formData.nh3) > 10))
      newErrors.nh3 = 'NH3 harus antara 0–10 ppm';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);

    try {
      const payload = {
        pond_id: Number(formData.pond_id),
        temperature: Number(formData.temperature),
        ph: Number(formData.ph),
      };
      if (formData.do) payload.do = Number(formData.do);
      if (formData.nh3) payload.nh3 = Number(formData.nh3);

      const response = await createSensorReading(payload);
      setResult(response.data.data);
      setShowResult(true);
      addToast('Analisis berhasil! Lihat hasil prediksi.', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal mengirim data sensor.';
      addToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const statusInfo = result ? STATUS_MAP[result.water_condition] || STATUS_MAP.optimal : null;

  // Render interpretation items
  const renderInterp = (fieldKey, fieldValue, paramValue, unit) => {
    const interp = INTERP_LABELS[fieldKey]?.[fieldValue] || INTERP_LABELS[fieldKey]?.optimal;
    const iconInfo = INTERP_ICON[fieldValue] || INTERP_ICON.optimal;
    return (
      <div key={fieldKey} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
        <span className="material-symbols-outlined mt-0.5" style={{ color: iconInfo.color }}>
          {iconInfo.icon}
        </span>
        <p className="font-body-md text-on-surface">
          <strong className="text-white">{interp.title} ({paramValue}{unit}):</strong> {interp.desc}
        </p>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-stack-lg">
        <div className="mb-stack-lg">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Prediksi Kebutuhan Pakan</h1>
          <p className="text-on-surface-variant">Sistem Pendukung Keputusan Bioflok berdasar parameter kualitas air terkini.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Input Form Container */}
          <div className="lg:col-span-5 glass-panel rounded-xl p-6 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <span className="material-symbols-outlined text-primary text-3xl">sensors</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Input Data Sensor</h2>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Pilih Kolam *</label>
                <select
                  name="pond_id"
                  value={formData.pond_id}
                  onChange={handleChange}
                  className="w-full glass-input rounded-lg p-3 font-body-md text-body-md appearance-none"
                  disabled={isLoadingPonds}
                >
                  <option className="bg-surface text-on-surface" disabled value="">
                    {isLoadingPonds ? 'Memuat kolam...' : 'Pilih Kolam Aktif...'}
                  </option>
                  {ponds.map((pond) => (
                    <option key={pond.id} className="bg-surface text-on-surface" value={pond.id}>
                      {pond.name} {pond.location ? `(${pond.location})` : ''}
                    </option>
                  ))}
                </select>
                {errors.pond_id && <p className="text-red-400 text-xs mt-1">{errors.pond_id}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Suhu (°C) *</label>
                  <div className="relative">
                    <input
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleChange}
                      className="w-full glass-input rounded-lg p-3 pl-10 font-body-md text-body-md"
                      placeholder="28.5"
                      step="0.1"
                      type="number"
                      min="15"
                      max="40"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">thermostat</span>
                  </div>
                  {errors.temperature && <p className="text-red-400 text-xs mt-1">{errors.temperature}</p>}
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">pH Air *</label>
                  <div className="relative">
                    <input
                      name="ph"
                      value={formData.ph}
                      onChange={handleChange}
                      className="w-full glass-input rounded-lg p-3 pl-10 font-body-md text-body-md"
                      placeholder="7.8"
                      step="0.1"
                      type="number"
                      min="0"
                      max="14"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">science</span>
                  </div>
                  {errors.ph && <p className="text-red-400 text-xs mt-1">{errors.ph}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">DO (mg/L)</label>
                  <div className="relative">
                    <input
                      name="do"
                      value={formData.do}
                      onChange={handleChange}
                      className="w-full glass-input rounded-lg p-3 pl-10 font-body-md text-body-md"
                      placeholder="5.5"
                      step="0.1"
                      type="number"
                      min="0"
                      max="20"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">air</span>
                  </div>
                  {errors.do && <p className="text-red-400 text-xs mt-1">{errors.do}</p>}
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">NH3 (ppm)</label>
                  <div className="relative">
                    <input
                      name="nh3"
                      value={formData.nh3}
                      onChange={handleChange}
                      className="w-full glass-input rounded-lg p-3 pl-10 font-body-md text-body-md"
                      placeholder="0.05"
                      step="0.01"
                      type="number"
                      min="0"
                      max="10"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">coronavirus</span>
                  </div>
                  {errors.nh3 && <p className="text-red-400 text-xs mt-1">{errors.nh3}</p>}
                </div>
              </div>
              <button
                className="w-full mt-4 py-4 btn-primary rounded-lg font-headline-sm text-[20px] flex items-center justify-center gap-3 disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                    Analisis & Prediksi
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className={`lg:col-span-7 transition-opacity duration-500 ease-in-out ${showResult && result ? 'opacity-100' : 'opacity-0 hidden'}`}>
            {result && statusInfo && (
              <div className="glass-panel rounded-xl p-1" style={{ borderTop: `4px solid ${statusInfo.color}` }}>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined" style={{ color: statusInfo.color }}>{statusInfo.icon}</span>
                        <h3 className="font-headline-sm text-headline-sm" style={{ color: statusInfo.color }}>
                          STATUS: {statusInfo.label}
                        </h3>
                      </div>
                      <p className="text-on-surface-variant text-sm">
                        Analisis selesai pada: {new Date(result.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-lg px-6 py-4 text-center">
                      <p className="font-label-caps text-label-caps text-primary mb-1">REKOMENDASI</p>
                      <p className="font-metric-value text-metric-value text-primary">{statusInfo.pakan}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-label-caps text-label-caps text-on-surface-variant border-b border-white/10 pb-2">DETAIL PARAMETER</h4>
                    {renderInterp('temp_interpretation', result.temp_interpretation, result.temperature, '°C')}
                    {renderInterp('ph_interpretation', result.ph_interpretation, result.ph, '')}
                    {renderInterp('DO_condition', result.DO_condition, result.do, ' mg/L')}
                    {renderInterp('NH3_condition', result.NH3_condition, result.nh3, ' ppm')}
                  </div>

                  {/* Correlation Notes */}
                  {result.correlation_notes && (
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mb-6">
                      <h4 className="font-label-caps text-label-caps text-primary mb-2">CATATAN KORELASI DSS</h4>
                      <p className="text-on-surface-variant text-sm">{result.correlation_notes}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Link to="/dashboard" className="py-2 px-6 border border-primary text-primary hover:bg-primary/10 rounded-lg font-body-md text-body-md flex items-center gap-2 transition-colors">
                      Lihat di Dashboard
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Prediksi;
