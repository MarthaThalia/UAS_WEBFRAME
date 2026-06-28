import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

const allNavItems = [
  { path: '/dashboard', icon: 'dashboard', label: 'Dashboard', adminOnly: false },
  { path: '/prediksi', icon: 'analytics', label: 'Prediksi', adminOnly: false },
  { path: '/riwayat', icon: 'history', label: 'Riwayat', adminOnly: false },
  { path: '/kolam', icon: 'tsunami', label: 'Kolam', adminOnly: true },
  { path: '/pengguna', icon: 'group', label: 'Pengguna', adminOnly: true },
];

function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Filter nav items based on user role
  const navItems = allNavItems.filter(
    (item) => !item.adminOnly || (user && user.role === 'admin')
  );

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
      addToast('Logout berhasil.', 'success');
      navigate('/login');
    } catch {
      navigate('/login');
    }
  };

  return (
    <div className="font-body-md text-on-surface min-h-screen flex flex-col md:flex-row dark">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" style={{
        backgroundColor: '#0e1416',
        backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(34, 211, 238, 0.05), transparent 25%), radial-gradient(circle at 85% 30%, rgba(34, 211, 238, 0.03), transparent 25%)',
        backgroundAttachment: 'fixed',
      }}>
        <div className="particle-ambient absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="particle-delayed absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop) — slides off-screen when closed */}
      <nav
        className={`hidden md:flex flex-col h-full border-r border-white/10 pt-20 bg-surface-container-lowest/80 backdrop-blur-2xl font-body-md text-body-md fixed left-0 top-0 z-40 shadow-2xl transition-transform duration-300 w-64 overflow-hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo & Brand */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>tsunami</span>
            </div>
            <div className="overflow-hidden">
              <h1 className="font-display-lg text-headline-sm text-primary tracking-tight whitespace-nowrap">Bioflok Intelligence</h1>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Oceanic DSS v1.0</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/prediksi')}
            className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold hover:brightness-110 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            <span>New Log Entry</span>
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 py-3 px-6 transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary border-r-4 border-primary'
                      : 'text-on-surface-variant hover:bg-white/5 hover:text-primary'
                  }`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-auto p-6">
          <ul className="space-y-2">
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-4 py-2" href="#">
                <span className="material-symbols-outlined">settings</span>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-4 py-2 w-full text-left"
              >
                <span className="material-symbols-outlined">logout</span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      <nav
        className={`md:hidden flex flex-col h-full border-r border-white/10 pt-20 bg-surface-container-lowest backdrop-blur-2xl font-body-md text-body-md fixed left-0 top-0 z-50 shadow-2xl transition-transform duration-300 w-64 overflow-hidden ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo & Brand */}
        <div className="px-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>tsunami</span>
            </div>
            <div className="overflow-hidden">
              <h1 className="font-display-lg text-headline-sm text-primary tracking-tight whitespace-nowrap">Bioflok Intelligence</h1>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Oceanic DSS v1.0</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-4 py-3 px-6 transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary border-r-4 border-primary'
                      : 'text-on-surface-variant hover:bg-white/5 hover:text-primary'
                  }`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={isActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-auto p-6">
          <ul className="space-y-2">
            <li>
              <a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-4 py-2" href="#">
                <span className="material-symbols-outlined">settings</span>
                <span>Settings</span>
              </a>
            </li>
            <li>
              <button
                onClick={() => { setMobileSidebarOpen(false); handleLogout(); }}
                className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-4 py-2 w-full text-left"
              >
                <span className="material-symbols-outlined">logout</span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`flex-1 w-full flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
        {/* TopAppBar */}
        <header className="sticky top-0 w-full flex justify-between items-center px-gutter py-4 z-30 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-on-surface-variant hover:text-primary transition-colors duration-300"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            {/* Desktop sidebar toggle */}
            <button
              className="hidden md:flex text-on-surface-variant hover:text-primary transition-colors duration-300"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title={sidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
            >
              <span className="material-symbols-outlined">{sidebarOpen ? 'menu_open' : 'menu'}</span>
            </button>
            <h1 className="font-display-lg text-headline-sm font-bold text-primary tracking-tight">DSS Bioflok</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors duration-300 relative group">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full group-hover:animate-ping"></span>
            </button>
            {/* User avatar with initials */}
            <div
              className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden cursor-pointer hover:border-primary transition-colors bg-primary/20 flex items-center justify-center"
              title={user?.name || 'User'}
            >
              <span className="text-primary text-sm font-bold">{getInitials(user?.name)}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-margin-mobile md:p-gutter max-w-[1440px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
