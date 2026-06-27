import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Prediksi from './pages/Prediksi';
import Riwayat from './pages/Riwayat';
import Kolam from './pages/Kolam';
import Pengguna from './pages/Pengguna';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prediksi" element={<Prediksi />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/kolam" element={<Kolam />} />
        <Route path="/pengguna" element={<Pengguna />} />
      </Routes>
    </Router>
  );
}

export default App;
