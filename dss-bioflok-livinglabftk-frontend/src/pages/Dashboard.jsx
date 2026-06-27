import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-stack-lg">
        {/* Alert Banner */}
        <div className="w-full rounded-lg bg-surface-container-high border border-primary/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_15px_rgba(34,211,238,0.1)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div className="flex items-center gap-3 text-on-surface">
            <span className="material-symbols-outlined text-primary">warning</span>
            <p className="font-body-md">Data sensor hari ini belum diinput!</p>
          </div>
          <Link to="/prediksi" className="text-primary font-bold hover:brightness-125 transition-all flex items-center gap-2">
            Input Sekarang 
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Metric 1: Status */}
          <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-on-surface-variant font-label-caps uppercase tracking-wider">Status Hari Ini</h3>
              <span className="material-symbols-outlined text-green-500">check_circle</span>
            </div>
            <div className="font-metric-value text-metric-value text-green-400 mb-2">OPTIMAL</div>
            <p className="text-sm text-on-surface-variant mt-auto">Rekomendasi pakan 100%</p>
          </div>

          {/* Metric 2: Suhu */}
          <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-on-surface-variant font-label-caps uppercase tracking-wider">Suhu Terkini</h3>
              <span className="material-symbols-outlined text-primary">device_thermostat</span>
            </div>
            <div className="font-metric-value text-metric-value text-on-surface mb-2 flex items-baseline gap-2">
              28.5°C
              <span className="material-symbols-outlined text-green-500 text-lg">trending_up</span>
            </div>
            <div className="h-8 mt-auto w-full bg-gradient-to-t from-primary/20 to-transparent rounded-b-sm border-b border-primary/50"></div>
          </div>

          {/* Metric 3: Logs */}
          <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary-fixed-dim"></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-on-surface-variant font-label-caps uppercase tracking-wider">Total Log</h3>
              <span className="material-symbols-outlined text-secondary-fixed-dim">database</span>
            </div>
            <div className="font-metric-value text-metric-value text-on-surface mb-2">142</div>
            <p className="text-sm text-on-surface-variant mt-auto">Records logged</p>
          </div>

          {/* Rekomendasi Bento Box */}
          <div className="col-span-1 md:col-span-5 glass-panel rounded-xl p-8 flex flex-col gap-6 border border-primary/30 bg-primary/5">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-primary mb-2">Sistem Rekomendasi</h2>
              <p className="text-on-surface-variant text-sm">Berdasarkan analisis data terkini.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-surface-container/50 rounded-lg p-4 border border-white/5 flex justify-between items-center">
                <span className="text-on-surface-variant">Status Keseluruhan</span>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 font-bold text-sm border border-green-500/20">OPTIMAL</span>
              </div>
              <div className="bg-surface-container/50 rounded-lg p-4 border border-white/5 flex justify-between items-center">
                <span className="text-on-surface-variant">Tindakan</span>
                <span className="text-primary font-bold">PAKAN 100%</span>
              </div>
            </div>
            <div className="mt-auto">
              <h4 className="font-label-caps text-on-surface-variant mb-3">PARAMETER CHECK</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Suhu</div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> pH</div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> DO</div>
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> NH3</div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="col-span-1 md:col-span-7 glass-panel rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Tren Kualitas Air <span className="text-sm font-normal text-on-surface-variant">(7 Hari Terakhir)</span></h2>
              <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
            </div>
            <div className="flex-1 w-full min-h-[250px] relative border-l border-b border-white/10 flex items-end">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="w-full border-t border-white border-dashed"></div>
                <div className="w-full border-t border-white border-dashed"></div>
                <div className="w-full border-t border-white border-dashed"></div>
              </div>
              <div className="w-full h-3/4 bg-gradient-to-t from-primary/30 to-transparent border-t-2 border-primary" style={{clipPath: "polygon(0 100%, 0 40%, 20% 60%, 40% 30%, 60% 50%, 80% 20%, 100% 40%, 100% 100%)"}}></div>
            </div>
          </div>

          {/* Recent Logs Table */}
          <div className="col-span-1 md:col-span-12 glass-panel rounded-xl overflow-hidden flex flex-col mb-10">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Recent Logs</h2>
              <Link to="/riwayat" className="text-primary text-sm font-bold hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container/50 border-b border-white/10 text-on-surface-variant font-label-caps text-xs">
                    <th className="p-4 font-semibold uppercase tracking-wider">Date</th>
                    <th className="p-4 font-semibold uppercase tracking-wider">Pond ID</th>
                    <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
                    <th className="p-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-on-surface">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4">24 Okt 2024, 08:00</td>
                    <td className="p-4 text-primary">Alpha-01</td>
                    <td className="p-4"><span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">Optimal</span></td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4">24 Okt 2024, 07:30</td>
                    <td className="p-4 text-primary">Beta-02</td>
                    <td className="p-4"><span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs">Warning</span></td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4">24 Okt 2024, 06:45</td>
                    <td className="p-4 text-primary">Gamma-03</td>
                    <td className="p-4"><span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs">Critical</span></td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined text-[20px]">visibility</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
