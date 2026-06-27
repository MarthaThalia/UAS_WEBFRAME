import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

function Prediksi() {
  const [showResult, setShowResult] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    setTimestamp(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setShowResult(true);
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
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Pilih Kolam</label>
                <select className="w-full glass-input rounded-lg p-3 font-body-md text-body-md appearance-none" defaultValue="">
                  <option className="bg-surface text-on-surface" disabled value="">Pilih Kolam Aktif...</option>
                  <option className="bg-surface text-on-surface" value="A1">Kolam Bioflok A1 (Udang Vannamei)</option>
                  <option className="bg-surface text-on-surface" value="A2">Kolam Bioflok A2 (Udang Vannamei)</option>
                  <option className="bg-surface text-on-surface" value="B1">Kolam Bioflok B1 (Nila)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">Suhu (°C)</label>
                  <div className="relative">
                    <input className="w-full glass-input rounded-lg p-3 pl-10 font-body-md text-body-md" placeholder="28.5" required step="0.1" type="number" />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">thermostat</span>
                  </div>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">pH Air</label>
                  <div className="relative">
                    <input className="w-full glass-input rounded-lg p-3 pl-10 font-body-md text-body-md" placeholder="7.8" required step="0.1" type="number" />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">science</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">DO (mg/L)</label>
                  <div className="relative">
                    <input className="w-full glass-input rounded-lg p-3 pl-10 font-body-md text-body-md" placeholder="5.5" required step="0.1" type="number" />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">air</span>
                  </div>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">NH3 (ppm)</label>
                  <div className="relative">
                    <input className="w-full glass-input rounded-lg p-3 pl-10 font-body-md text-body-md" placeholder="0.05" required step="0.01" type="number" />
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">coronavirus</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-4 btn-primary rounded-lg font-headline-sm text-[20px] flex items-center justify-center gap-3" type="submit">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                Analisis & Prediksi
              </button>
            </form>
          </div>

          {/* Result Section */}
          <div className={`lg:col-span-7 transition-opacity duration-500 ease-in-out ${showResult ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <div className="glass-panel rounded-xl p-1 border-t-4 border-t-[#22c55e]">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[#22c55e]">check_circle</span>
                      <h3 className="font-headline-sm text-headline-sm text-[#22c55e]">STATUS: OPTIMAL</h3>
                    </div>
                    <p className="text-on-surface-variant text-sm">Analisis selesai pada: <span>{timestamp}</span></p>
                  </div>
                  <div className="bg-primary/10 border border-primary/30 rounded-lg px-6 py-4 text-center">
                    <p className="font-label-caps text-label-caps text-primary mb-1">REKOMENDASI</p>
                    <p className="font-metric-value text-metric-value text-primary">PAKAN 100%</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <h4 className="font-label-caps text-label-caps text-on-surface-variant border-b border-white/10 pb-2">DETAIL PARAMETER</h4>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[#22c55e] mt-0.5">task_alt</span>
                    <p className="font-body-md text-on-surface"><strong className="text-white">Suhu Normal (28.5°C):</strong> Metabolisme ikan beroperasi pada tingkat optimal. Tidak perlu penyesuaian pakan.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[#22c55e] mt-0.5">task_alt</span>
                    <p className="font-body-md text-on-surface"><strong className="text-white">pH Stabil (7.8):</strong> Berada dalam rentang ideal (7.5-8.5). Keseimbangan bakteri bioflok terjaga dengan baik.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[#22c55e] mt-0.5">task_alt</span>
                    <p className="font-body-md text-on-surface"><strong className="text-white">Oksigen Terlarut Cukup (5.5 mg/L):</strong> Kadar DO memadai untuk mendukung pencernaan pakan maksimal dan aktivitas bakteri.</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[#22c55e] mt-0.5">task_alt</span>
                    <p className="font-body-md text-on-surface"><strong className="text-white">Amonia Aman (0.05 ppm):</strong> Sistem bioflok aktif mengubah limbah nitrogen secara efisien. Risiko keracunan sangat rendah.</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Link to="/dashboard" className="py-2 px-6 border border-primary text-primary hover:bg-primary/10 rounded-lg font-body-md text-body-md flex items-center gap-2 transition-colors">
                    Lihat di Dashboard
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Prediksi;
