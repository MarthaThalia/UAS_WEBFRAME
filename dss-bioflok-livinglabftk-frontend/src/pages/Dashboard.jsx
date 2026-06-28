import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { getSensorReadings } from '../api/services';
import { useToast } from '../components/Toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

// Mapping helpers
const STATUS_MAP = {
  optimal: { label: 'OPTIMAL', color: '#10b981', icon: 'check_circle', bgClass: 'bg-green-500', textClass: 'text-green-400', borderClass: 'border-green-500', pakan: 'PAKAN 100%' },
  waspada: { label: 'SIAGA', color: '#f59e0b', icon: 'warning', bgClass: 'bg-yellow-500', textClass: 'text-yellow-400', borderClass: 'border-yellow-500', pakan: 'KURANGI 50%' },
  buruk: { label: 'KRITIS', color: '#ef4444', icon: 'error', bgClass: 'bg-red-500', textClass: 'text-red-400', borderClass: 'border-red-500', pakan: 'PUASA TOTAL' },
};

const INTERP_MAP = {
  optimal: { icon: 'check', color: 'text-green-500' },
  peringatan: { icon: 'warning', color: 'text-yellow-500' },
  kritis: { icon: 'error', color: 'text-red-500' },
};

function getInterpDisplay(value) {
  return INTERP_MAP[value] || INTERP_MAP.optimal;
}

function Dashboard() {
  const [readings, setReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getSensorReadings();
      setReadings(response.data.data || []);
    } catch {
      addToast('Gagal memuat data sensor.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Latest reading
  const latest = readings.length > 0 ? readings[0] : null;
  const status = latest ? STATUS_MAP[latest.water_condition] || STATUS_MAP.optimal : STATUS_MAP.optimal;

  // Check if there's a reading today
  const today = new Date().toISOString().split('T')[0];
  const hasTodayReading = readings.some((r) => r.created_at && r.created_at.startsWith(today));

  // Chart data — last 7 readings (reversed for chronological order)
  const chartReadings = readings.slice(0, 7).reverse();
  const chartData = {
    labels: chartReadings.map((r) => {
      const d = new Date(r.created_at);
      return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    }),
    datasets: [
      {
        label: 'Suhu (°C)',
        data: chartReadings.map((r) => r.temperature),
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#22d3ee',
        pointBorderColor: '#22d3ee',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        borderColor: 'rgba(34, 211, 238, 0.3)',
        borderWidth: 1,
        titleColor: '#22d3ee',
        bodyColor: '#e2e8f0',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: 'rgba(255,255,255,0.4)', font: { size: 11 } },
      },
    },
  };

  // Recent 5 logs
  const recentLogs = readings.slice(0, 5);

  // Skeleton loader component
  const Skeleton = ({ className }) => <div className={`skeleton ${className}`}></div>;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col gap-stack-lg">
          <Skeleton className="w-full h-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <Skeleton className="md:col-span-5 h-72" />
            <Skeleton className="md:col-span-7 h-72" />
          </div>
          <Skeleton className="w-full h-64" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-stack-lg">
        {/* Alert Banner — only if no reading today */}
        {!hasTodayReading && (
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
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Metric 1: Status */}
          <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${status.bgClass} shadow-[0_0_10px_${status.color}80]`}></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-on-surface-variant font-label-caps uppercase tracking-wider">Status Hari Ini</h3>
              <span className={`material-symbols-outlined ${status.textClass}`}>{status.icon}</span>
            </div>
            <div className={`font-metric-value text-metric-value ${status.textClass} mb-2`}>
              {latest ? status.label : 'N/A'}
            </div>
            <p className="text-sm text-on-surface-variant mt-auto">
              {latest ? `Rekomendasi pakan: ${status.pakan}` : 'Belum ada data'}
            </p>
          </div>

          {/* Metric 2: Suhu */}
          <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-on-surface-variant font-label-caps uppercase tracking-wider">Suhu Terkini</h3>
              <span className="material-symbols-outlined text-primary">device_thermostat</span>
            </div>
            <div className="font-metric-value text-metric-value text-on-surface mb-2 flex items-baseline gap-2">
              {latest ? `${latest.temperature}°C` : '—'}
              {latest && (
                <span className={`material-symbols-outlined text-lg ${getInterpDisplay(latest.temp_interpretation).color}`}>
                  {latest.temp_interpretation === 'optimal' ? 'trending_up' : 'trending_down'}
                </span>
              )}
            </div>
            <div className="h-8 mt-auto w-full bg-gradient-to-t from-primary/20 to-transparent rounded-b-sm border-b border-primary/50"></div>
          </div>

          {/* Metric 3: Total Logs */}
          <div className="col-span-1 md:col-span-4 glass-panel rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary-fixed-dim"></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-on-surface-variant font-label-caps uppercase tracking-wider">Total Log</h3>
              <span className="material-symbols-outlined text-secondary-fixed-dim">database</span>
            </div>
            <div className="font-metric-value text-metric-value text-on-surface mb-2">{readings.length}</div>
            <p className="text-sm text-on-surface-variant mt-auto">Records logged</p>
          </div>

          {/* Rekomendasi Bento Box */}
          <div className={`col-span-1 md:col-span-5 glass-panel rounded-xl p-8 flex flex-col gap-6 border ${latest ? `border-${status.textClass.replace('text-', '')}/30 bg-${status.textClass.replace('text-', '')}/5` : 'border-primary/30 bg-primary/5'}`}>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-primary mb-2">Sistem Rekomendasi</h2>
              <p className="text-on-surface-variant text-sm">Berdasarkan analisis data terkini.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-surface-container/50 rounded-lg p-4 border border-white/5 flex justify-between items-center">
                <span className="text-on-surface-variant">Status Keseluruhan</span>
                <span className={`px-3 py-1 rounded-full ${status.bgClass}/10 ${status.textClass} font-bold text-sm border ${status.bgClass}/20`}>
                  {latest ? status.label : 'N/A'}
                </span>
              </div>
              <div className="bg-surface-container/50 rounded-lg p-4 border border-white/5 flex justify-between items-center">
                <span className="text-on-surface-variant">Tindakan</span>
                <span className={`${status.textClass} font-bold`}>{latest ? status.pakan : '—'}</span>
              </div>
            </div>
            <div className="mt-auto">
              <h4 className="font-label-caps text-on-surface-variant mb-3">PARAMETER CHECK</h4>
              <div className="grid grid-cols-2 gap-3">
                {latest ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${getInterpDisplay(latest.temp_interpretation).color} text-sm`}>
                        {getInterpDisplay(latest.temp_interpretation).icon}
                      </span> Suhu
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${getInterpDisplay(latest.ph_interpretation).color} text-sm`}>
                        {getInterpDisplay(latest.ph_interpretation).icon}
                      </span> pH
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${getInterpDisplay(latest.DO_condition).color} text-sm`}>
                        {getInterpDisplay(latest.DO_condition).icon}
                      </span> DO
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${getInterpDisplay(latest.NH3_condition).color} text-sm`}>
                        {getInterpDisplay(latest.NH3_condition).icon}
                      </span> NH3
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-on-surface-variant">— Suhu</div>
                    <div className="flex items-center gap-2 text-on-surface-variant">— pH</div>
                    <div className="flex items-center gap-2 text-on-surface-variant">— DO</div>
                    <div className="flex items-center gap-2 text-on-surface-variant">— NH3</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="col-span-1 md:col-span-7 glass-panel rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Tren Kualitas Air <span className="text-sm font-normal text-on-surface-variant">(7 Data Terakhir)</span></h2>
            </div>
            <div className="flex-1 w-full min-h-[250px] relative">
              {chartReadings.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-on-surface-variant">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl mb-2 block opacity-30">show_chart</span>
                    <p className="text-sm">Belum ada data untuk ditampilkan</p>
                  </div>
                </div>
              )}
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
                    <th className="p-4 font-semibold uppercase tracking-wider">Kolam</th>
                    <th className="p-4 font-semibold uppercase tracking-wider">Status</th>
                    <th className="p-4 font-semibold uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-on-surface">
                  {recentLogs.length > 0 ? (
                    recentLogs.map((log) => {
                      const logStatus = STATUS_MAP[log.water_condition] || STATUS_MAP.optimal;
                      return (
                        <tr key={log.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            {new Date(log.created_at).toLocaleDateString('id-ID', {
                              day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                          </td>
                          <td className="p-4 text-primary">{log.pond?.name || `Kolam #${log.pond_id}`}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded ${logStatus.bgClass}/20 ${logStatus.textClass} text-xs`}>
                              {logStatus.label}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <Link to="/riwayat" className="text-on-surface-variant hover:text-primary">
                              <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                        Belum ada data sensor. <Link to="/prediksi" className="text-primary hover:underline">Input data pertama</Link>
                      </td>
                    </tr>
                  )}
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
