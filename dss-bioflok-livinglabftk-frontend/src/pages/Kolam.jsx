import DashboardLayout from '../components/DashboardLayout';

function Kolam() {
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
          <button className="bg-surface-variant border border-white/10 text-on-surface font-headline-sm text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            Tambah Kolam
          </button>
        </div>

        {/* Grid Kolam */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Kolam Card 1 */}
          <div className="glass-panel p-6 rounded-xl flex flex-col border border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">water_drop</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">A-01</h3>
              </div>
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> AKTIF
              </span>
            </div>
            <p className="text-on-surface-variant text-sm mb-6">Blok Utara, Sektor 1</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-surface-container/50 rounded-lg p-4 text-center border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Kapasitas</p>
                <div className="font-metric-value text-2xl text-on-surface">120 <span className="text-sm font-normal text-on-surface-variant">m³</span></div>
              </div>
              <div className="bg-surface-container/50 rounded-lg p-4 text-center border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Biomassa</p>
                <div className="font-metric-value text-2xl text-on-surface">45 <span className="text-sm font-normal text-on-surface-variant">kg/m³</span></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4">
              <span className="text-xs text-on-surface-variant">Terakhir diupdate: 10 mnt lalu</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-error transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
              </div>
            </div>
          </div>

          {/* Kolam Card 2 */}
          <div className="glass-panel p-6 rounded-xl flex flex-col border border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">water_drop</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">A-02</h3>
              </div>
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> AKTIF
              </span>
            </div>
            <p className="text-on-surface-variant text-sm mb-6">Blok Utara, Sektor 1</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-surface-container/50 rounded-lg p-4 text-center border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Kapasitas</p>
                <div className="font-metric-value text-2xl text-on-surface">120 <span className="text-sm font-normal text-on-surface-variant">m³</span></div>
              </div>
              <div className="bg-surface-container/50 rounded-lg p-4 text-center border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Biomassa</p>
                <div className="font-metric-value text-2xl text-on-surface">42 <span className="text-sm font-normal text-on-surface-variant">kg/m³</span></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4">
              <span className="text-xs text-on-surface-variant">Terakhir diupdate: 12 mnt lalu</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-error transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
              </div>
            </div>
          </div>

          {/* Kolam Card 3 - Maintenance */}
          <div className="glass-panel p-6 rounded-xl flex flex-col border border-white/10 relative overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-2xl">water_drop</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface-variant">B-01</h3>
              </div>
              <span className="px-2 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs font-bold border border-white/10 flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]">build</span> MAINTENANCE
              </span>
            </div>
            <p className="text-on-surface-variant text-sm mb-6">Blok Selatan, Sektor 2</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-surface-container/30 rounded-lg p-4 text-center border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Kapasitas</p>
                <div className="font-metric-value text-2xl text-on-surface-variant">200 <span className="text-sm font-normal text-on-surface-variant">m³</span></div>
              </div>
              <div className="bg-surface-container/30 rounded-lg p-4 text-center border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Biomassa</p>
                <div className="font-metric-value text-2xl text-on-surface-variant">0 <span className="text-sm font-normal text-on-surface-variant">kg/m³</span></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4">
              <span className="text-xs text-on-surface-variant">Dikosongkan: 2 hari lalu</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-error transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
              </div>
            </div>
          </div>

          {/* Kolam Card 4 */}
          <div className="glass-panel p-6 rounded-xl flex flex-col border border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">water_drop</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">C-04</h3>
              </div>
              <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div> AKTIF
              </span>
            </div>
            <p className="text-on-surface-variant text-sm mb-6">Blok Timur, Sektor 3</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-surface-container/50 rounded-lg p-4 text-center border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Kapasitas</p>
                <div className="font-metric-value text-2xl text-on-surface">150 <span className="text-sm font-normal text-on-surface-variant">m³</span></div>
              </div>
              <div className="bg-surface-container/50 rounded-lg p-4 text-center border border-white/5">
                <p className="font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Biomassa</p>
                <div className="font-metric-value text-2xl text-on-surface">58 <span className="text-sm font-normal text-on-surface-variant">kg/m³</span></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4">
              <span className="text-xs text-on-surface-variant">Terakhir diupdate: 1 jam lalu</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                <button className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center hover:text-error transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Kolam;
