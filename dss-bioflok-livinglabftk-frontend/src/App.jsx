import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Prediksi from './pages/Prediksi';
import Riwayat from './pages/Riwayat';
import Kolam from './pages/Kolam';
import Pengguna from './pages/Pengguna';

// Guard: redirect to dashboard if already logged in
function LoginGuard({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return children;
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={
                <LoginGuard>
                  <Login />
                </LoginGuard>
              }
            />

            {/* Protected — wajib login */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/prediksi" element={<Prediksi />} />
              <Route path="/riwayat" element={<Riwayat />} />

              {/* Admin only */}
              <Route element={<AdminRoute />}>
                <Route path="/kolam" element={<Kolam />} />
                <Route path="/pengguna" element={<Pengguna />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
