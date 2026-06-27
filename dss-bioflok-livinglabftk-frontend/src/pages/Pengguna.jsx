import DashboardLayout from '../components/DashboardLayout';

function Pengguna() {
  return (
    <DashboardLayout>
      <div className="space-y-stack-lg">
        {/* Page Header & Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Pengguna</h2>
            <p className="text-on-surface-variant mt-1">Kelola akses dan peran pengguna dalam sistem Bioflok Intelligence.</p>
          </div>
          <button className="bg-primary-container text-on-primary-container font-headline-sm text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            Tambah Pengguna Baru
          </button>
        </div>

        {/* Data Table Container */}
        <div className="glass-panel rounded-xl overflow-hidden flex flex-col border border-white/10">
          <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
              <input className="glass-input w-full pl-10 pr-4 py-2 rounded-lg text-sm font-body-md" placeholder="Cari pengguna..." type="text" />
            </div>
            <button className="bg-surface-variant border border-white/10 text-on-surface font-headline-sm text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 font-label-caps text-label-caps text-on-surface-variant">
                  <th className="p-4 w-12">NO</th>
                  <th className="p-4">NAMA</th>
                  <th className="p-4">EMAIL</th>
                  <th className="p-4">PERAN</th>
                  <th className="p-4">TANGGAL BERGABUNG</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-body-md">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface-variant">1</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">AU</div>
                      <span className="font-semibold text-on-surface">Admin Utama</span>
                    </div>
                  </td>
                  <td className="p-4 text-on-surface-variant">admin@bioflok.io</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs flex items-center gap-1 w-max border border-white/5">
                      <span className="material-symbols-outlined text-[12px]">security</span> Admin
                    </span>
                  </td>
                  <td className="p-4 text-on-surface-variant">12 Okt 2023</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></div>
                      <span className="text-xs text-[#10b981]">Aktif</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button className="text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface-variant">2</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-bold text-xs">OL</div>
                      <span className="font-semibold text-on-surface">Operator Lapangan</span>
                    </div>
                  </td>
                  <td className="p-4 text-on-surface-variant">operator1@bioflok.io</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs flex items-center gap-1 w-max border border-white/5">
                      <span className="material-symbols-outlined text-[12px]">engineering</span> Operator
                    </span>
                  </td>
                  <td className="p-4 text-on-surface-variant">15 Okt 2023</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></div>
                      <span className="text-xs text-[#10b981]">Aktif</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button className="text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface-variant">3</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-bold text-xs">RS</div>
                      <span className="font-semibold text-on-surface">Riset Sensor</span>
                    </div>
                  </td>
                  <td className="p-4 text-on-surface-variant">riset@bioflok.io</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs flex items-center gap-1 w-max border border-white/5">
                      <span className="material-symbols-outlined text-[12px]">science</span> Analyst
                    </span>
                  </td>
                  <td className="p-4 text-on-surface-variant">20 Nov 2023</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-surface-variant"></div>
                      <span className="text-xs text-on-surface-variant">Nonaktif</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button className="text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="border-t border-white/10 p-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-low/50">
            <span className="text-sm text-on-surface-variant">Menampilkan 1 - 3 dari 12 pengguna</span>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded bg-primary/20 border border-primary/50 text-primary flex items-center justify-center text-sm font-semibold">1</button>
              <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors text-sm">2</button>
              <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors text-sm">3</button>
              <span className="text-on-surface-variant">...</span>
              <button className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-on-surface-variant hover:bg-white/5 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

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
