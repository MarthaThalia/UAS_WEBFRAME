import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  useEffect(() => {
    // Simple particle generator for background
    const container = document.getElementById('particles-container');
    if (container) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize size and position
        const size = Math.random() * 40 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Randomize animation delay and duration
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
        
        container.appendChild(particle);
      }
    }
    
    return () => {
      if (container) container.innerHTML = '';
    }
  }, []);

  return (
    <div className="font-body-md text-body-md antialiased min-h-screen flex flex-col gradient-bg dark">
      {/* Top Navigation */}
      <nav className="sticky top-0 w-full flex justify-between items-center px-gutter py-4 z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
        <div className="font-display-lg text-headline-sm font-bold text-primary tracking-tight">DSS Bioflok</div>
        <div className="flex items-center gap-4 hidden"></div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden glass-panel">
            <img alt="Researcher Profile Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEi8_86ePCoeu8RpMYQ10-AAWFdCtTg4RSP64zdM-lgUH1z5UnB0Z7-6XRA2xSotdlcPGThXqm-ujPxMHexp0KgFz1cDjHIpuQi7OnAbue2sP9CHSRU1RaNCgrX0TOcE1fQ0XtauZJ4v_jLWEp49jofj3Feq5dRGik8-zshqcrHaWiX7HQSPnNGHttLQr9-LcRUYhf6nZVJiACwn4BMwoWpUE145_Hs-O0gR9w6N4EgkGvot4ifcL02hc83EoyHhbJESck2gnzmg"/>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[819px] flex items-center justify-center overflow-hidden px-gutter">
        <div className="particles" id="particles-container"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-stack-lg">
          <h1 className="font-display-lg text-display-lg text-primary">Smart Fishing DSS</h1>
          <p className="font-headline-md text-headline-md text-on-surface-variant max-w-2xl">Optimasi Pakan Ikan Nila Bioflok</p>
          <Link to="/login">
            <button className="btn-primary font-label-caps text-label-caps px-8 py-4 rounded-full mt-4 flex items-center gap-2">
              Masuk ke Sistem
              <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Wave Divider */}
      <div className="wave-divider text-surface-container">
        <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C73.23,28.79,152.26,45.69,230.13,53.47A100.91,100.91,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Features Section */}
      <section className="py-stack-lg px-gutter relative bg-surface-container">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-headline-md text-headline-md text-primary text-center mb-12">Fitur Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel rounded-xl p-8 flex flex-col gap-4 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl" data-icon="monitoring">monitoring</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Monitor Real-time</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Pantau kondisi kolam bioflok secara langsung dengan sensor iot terintegrasi.
              </p>
            </div>
            <div className="glass-panel rounded-xl p-8 flex flex-col gap-4 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl" data-icon="psychology">psychology</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Prediksi Pakan Cerdas</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Algoritma cerdas yang menghitung kebutuhan pakan optimal berdasarkan kualitas air.
              </p>
            </div>
            <div className="glass-panel rounded-xl p-8 flex flex-col gap-4 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl" data-icon="network_node">network_node</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Machine Learning Hybrid</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Model hybrid yang menggabungkan data historis dan real-time untuk akurasi tinggi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider text-surface-container rotate-180">
        <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C73.23,28.79,152.26,45.69,230.13,53.47A100.91,100.91,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* How it Works Section */}
      <section className="py-stack-lg px-gutter relative pb-32">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-16">Cara Kerja</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            <div className="flex flex-col items-center gap-4 z-10 w-full max-w-xs">
              <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center text-primary border-primary/30">
                <span className="material-symbols-outlined text-4xl" data-icon="input">input</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">1. Input Data</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">Data sensor IoT dan manual dimasukkan ke sistem.</p>
            </div>
            <div className="hidden md:block w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="md:hidden h-12 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
            <div className="flex flex-col items-center gap-4 z-10 w-full max-w-xs">
              <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center text-primary border-primary/30">
                <span className="material-symbols-outlined text-4xl" data-icon="memory">memory</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">2. Analisis AI</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">Sistem memproses data menggunakan model Machine Learning.</p>
            </div>
            <div className="hidden md:block w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="md:hidden h-12 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
            <div className="flex flex-col items-center gap-4 z-10 w-full max-w-xs">
              <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center text-primary border-primary/30">
                <span className="material-symbols-outlined text-4xl" data-icon="fact_check">fact_check</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">3. Rekomendasi</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">Menghasilkan rekomendasi jumlah pakan presisi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto flex flex-col md:flex-row justify-between items-center px-gutter gap-4 bg-surface-container-lowest border-t border-white/5 opacity-80 hover:opacity-100 transition-opacity">
        <div className="font-display-lg text-primary text-xl">Living Lab FTK — Universitas Pendidikan Ganesha © 2026</div>
        <div className="flex gap-6 font-label-caps text-label-caps">
          <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Technical Docs</a>
          <a className="text-on-surface-variant hover:text-primary-container transition-colors" href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
