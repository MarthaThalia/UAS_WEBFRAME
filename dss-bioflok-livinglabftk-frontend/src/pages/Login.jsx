import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const container = document.getElementById('bubbles-container');
    if (!container) return;

    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      
      const size = Math.random() * 20 + 5;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 10;

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDuration = `${duration}s`;
      bubble.style.animationDelay = `${delay}s`;

      container.appendChild(bubble);

      bubble.addEventListener('animationend', () => {
        bubble.remove();
        createBubble();
      });
    };

    const bubbleCount = 15;
    for (let i = 0; i < bubbleCount; i++) {
      createBubble();
    }
    
    return () => {
      if (container) container.innerHTML = '';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row antialiased relative dark">
      {/* Left Side: Decorative Panel */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-surface-container flex-col justify-center items-center p-12">
        {/* Background Image overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-overlay" 
          style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC16s95gcSo9EMVfPonjp6x22DV4XNjI5DGgG0xwHZZzumU_3BiYgme115atpFBIzDDCS20KFC1bTdsYT8342D0D-zQ7PL-ePsqlq5AitvIFzzK0T7yLauUCf9RSVbFZWCWbHnBWiN4miEi20zTtZtBTwlWGxEEug5gsoZ0-aZBTXOzkYNZlwHF1IAyDt4De0hz7EV-hJwRVe_T-ZBmgvEA6S2nav79yIAWrB1Trd6rbYIY740sMxiU1r61zUC4cGg-6yYHp86X6A')"}}
        ></div>
        
        {/* Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface/50 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent z-10"></div>
        
        {/* Animated Bubbles Container */}
        <div className="absolute inset-0 z-20 pointer-events-none" id="bubbles-container"></div>
        
        {/* Content overlay */}
        <div className="relative z-30 text-center glass-panel p-12 rounded-2xl max-w-lg shadow-[0_0_30px_rgba(34,211,238,0.1)]">
          <span className="material-symbols-outlined text-primary-container text-7xl mb-6 block" style={{fontVariationSettings: "'FILL' 1"}}>tsunami</span>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-4">Bioflok Intelligence</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Precision monitoring for high-density aquaculture systems. Oceanic DSS v1.0.</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gradient-shift relative z-10 min-h-screen">
        <div className="w-full max-w-md">
          {/* Glassmorphism Login Card */}
          <div className="glass-panel rounded-2xl p-8 sm:p-10 w-full shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl border border-primary-container/40 shadow-[0_0_20px_rgba(34,211,238,0.15)]"></div>
            
            {/* Logo / Header */}
            <div className="text-center mb-10 relative z-10">
              <h2 className="font-display-lg text-headline-sm font-bold text-primary tracking-tight mb-2">DSS Bioflok</h2>
              <h3 className="font-headline-md text-headline-md text-on-surface">Masuk ke Sistem</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Otentikasi akses keamanan tinggi.</p>
            </div>
            
            {/* Form */}
            <form action="#" className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
              {/* Email Field */}
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1" htmlFor="email">ALAMAT EMAIL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">mail</span>
                  </div>
                  <input className="glass-input w-full pl-10 pr-4 py-3 rounded-lg font-body-md text-body-md text-on-surface placeholder-outline-variant focus:ring-0" id="email" name="email" placeholder="operator@bioflok.id" required type="email"/>
                </div>
              </div>
              
              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2 ml-1">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">KATA SANDI</label>
                  <a className="font-label-caps text-label-caps text-primary hover:text-primary-container transition-colors" href="#">Lupa Sandi?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline">lock</span>
                  </div>
                  <input className="glass-input w-full pl-10 pr-4 py-3 rounded-lg font-body-md text-body-md text-on-surface placeholder-outline-variant focus:ring-0" id="password" name="password" placeholder="••••••••" required type="password"/>
                </div>
              </div>
              
              {/* Submit Button */}
              <button className="btn-primary w-full py-3 rounded-lg font-headline-sm text-[18px] flex items-center justify-center gap-2 mt-8" type="submit">
                <span>Masuk</span>
                <span className="material-symbols-outlined text-[20px]">login</span>
              </button>
            </form>
            
            {/* Back to Home Link */}
            <div className="mt-8 text-center relative z-10">
              <Link to="/" className="inline-flex items-center gap-2 font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Kembali ke Beranda
              </Link>
            </div>
          </div>
          
          {/* Footer text */}
          <div className="text-center mt-8">
            <p className="font-label-caps text-label-caps text-outline">© 2024 Bioflok Oceanic Intelligence.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
