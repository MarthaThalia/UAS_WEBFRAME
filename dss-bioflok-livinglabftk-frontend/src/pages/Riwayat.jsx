import DashboardLayout from '../components/DashboardLayout';

function Riwayat() {
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
              <input className="glass-input w-full pl-10 pr-4 py-2 rounded-lg text-sm font-body-md" placeholder="Cari kolam/tanggal..." type="text" />
            </div>
            <select className="glass-input py-2 pl-4 pr-8 rounded-lg text-sm font-body-md appearance-none">
              <option value="">Semua Kolam</option>
              <option value="k1">Kolam Alpha</option>
              <option value="k2">Kolam Beta</option>
            </select>
            <select className="glass-input py-2 pl-4 pr-8 rounded-lg text-sm font-body-md appearance-none">
              <option value="">Semua Status</option>
              <option value="optimal">Optimal</option>
              <option value="warning">Warning</option>
              <option value="critical">Critical</option>
            </select>
            <input className="glass-input py-2 px-4 rounded-lg text-sm font-body-md text-on-surface-variant" type="date" />
            <button className="bg-primary-container text-on-primary-container font-headline-sm text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all ml-auto md:ml-0">
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
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface-variant">1</td>
                  <td className="p-4">24 Okt 2024, 08:00</td>
                  <td className="p-4 font-semibold text-primary">Alpha-01</td>
                  <td className="p-4 font-metric-value text-lg">28.5</td>
                  <td className="p-4 font-metric-value text-lg">7.2</td>
                  <td className="p-4 font-metric-value text-lg">6.8</td>
                  <td className="p-4 font-metric-value text-lg">0.02</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></div>
                      <span className="text-xs text-[#10b981]">Optimal</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-on-surface-variant hover:text-error transition-colors p-1 rounded">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface-variant">2</td>
                  <td className="p-4">24 Okt 2024, 07:45</td>
                  <td className="p-4 font-semibold text-primary">Beta-03</td>
                  <td className="p-4 font-metric-value text-lg">29.1</td>
                  <td className="p-4 font-metric-value text-lg text-[#f59e0b]">6.4</td>
                  <td className="p-4 font-metric-value text-lg">5.5</td>
                  <td className="p-4 font-metric-value text-lg">0.05</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]"></div>
                      <span className="text-xs text-[#f59e0b]">Warning</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-on-surface-variant hover:text-error transition-colors p-1 rounded">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors bg-error-container/10">
                  <td className="p-4 text-on-surface-variant">3</td>
                  <td className="p-4">24 Okt 2024, 07:30</td>
                  <td className="p-4 font-semibold text-primary">Gamma-02</td>
                  <td className="p-4 font-metric-value text-lg">30.2</td>
                  <td className="p-4 font-metric-value text-lg">8.1</td>
                  <td className="p-4 font-metric-value text-lg text-error">3.2</td>
                  <td className="p-4 font-metric-value text-lg text-error">0.15</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]"></div>
                      <span className="text-xs text-[#ef4444]">Critical</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-on-surface-variant hover:text-error transition-colors p-1 rounded">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface-variant">4</td>
                  <td className="p-4">24 Okt 2024, 07:15</td>
                  <td className="p-4 font-semibold text-primary">Alpha-02</td>
                  <td className="p-4 font-metric-value text-lg">28.0</td>
                  <td className="p-4 font-metric-value text-lg">7.4</td>
                  <td className="p-4 font-metric-value text-lg">7.1</td>
                  <td className="p-4 font-metric-value text-lg">0.01</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></div>
                      <span className="text-xs text-[#10b981]">Optimal</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-on-surface-variant hover:text-error transition-colors p-1 rounded">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface-variant">5</td>
                  <td className="p-4">24 Okt 2024, 07:00</td>
                  <td className="p-4 font-semibold text-primary">Beta-01</td>
                  <td className="p-4 font-metric-value text-lg">27.8</td>
                  <td className="p-4 font-metric-value text-lg">7.5</td>
                  <td className="p-4 font-metric-value text-lg">7.3</td>
                  <td className="p-4 font-metric-value text-lg">0.01</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></div>
                      <span className="text-xs text-[#10b981]">Optimal</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-on-surface-variant hover:text-error transition-colors p-1 rounded">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="border-t border-white/10 p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-low/50">
            <span className="text-sm text-on-surface-variant">Menampilkan 1-10 dari 142 data</span>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded bg-primary/20 border border-primary/50 text-primary flex items-center justify-center text-sm font-semibold">1</button>
              <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors text-sm">2</button>
              <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors text-sm">3</button>
              <span className="text-on-surface-variant">...</span>
              <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors text-sm">15</button>
              <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Riwayat;
