import React, { useState } from 'react';
import { Header } from './components/Header';
import { LinkInput } from './components/LinkInput';
import { CustomizationPanel } from './components/CustomizationPanel';
import { QRPreview } from './components/QRPreview';
import { DownloadHub } from './components/DownloadHub';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { InstallModal } from './components/InstallModal';
import { QROptions } from './types';
import { useTheme } from './utils/useTheme';
import { usePWAInstall } from './utils/usePWAInstall';
import { Sparkles, CheckCircle2, ShieldCheck, Zap, Smartphone, ArrowRight } from 'lucide-react';

const DEFAULT_OPTIONS: QROptions = {
  value: 'https://www.linkedin.com/in/akashsuresh24/',
  fgColor: '#000000',
  bgColor: '#ffffff',
  errorCorrectionLevel: 'M',
  margin: 2,
  resolution: 1024,
};

export default function App() {
  const [options, setOptions] = useState<QROptions>(DEFAULT_OPTIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  
  const { theme, isDark, toggleTheme } = useTheme();
  const { isInstalled } = usePWAInstall();

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const handleLinkChange = (value: string) => {
    setOptions((prev) => ({ ...prev, value }));
  };

  const handleReset = () => {
    setOptions((prev) => ({
      ...prev,
      fgColor: isDark ? '#ffffff' : '#000000',
      bgColor: isDark ? '#0f172a' : '#ffffff',
      errorCorrectionLevel: 'M',
      margin: 2,
      resolution: 1024,
    }));
    triggerToast('Reset to default clean styling');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-12">
        {/* PWA Install Banner (When not already installed) */}
        {!isInstalled && (
          <div className="mb-6 p-3 sm:p-3.5 bg-gradient-to-r from-indigo-50 via-white to-indigo-50/50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Add PixiQR to Android or iOS Home Screen
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Quick access directly from your mobile home screen with zero app store install needed.
                </p>
              </div>
            </div>

            <button
              type="button"
              id="banner-install-btn"
              onClick={() => setIsInstallModalOpen(true)}
              className="w-full sm:w-auto px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Add as Web Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Simple & Clean Intro Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100/80 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Instant & Free Universal QR Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Space_Grotesk']">
            Generate QR Codes in <span className="text-indigo-600 dark:text-indigo-400">All Formats</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Paste any link or text to generate a verified, high-resolution QR code. 
            Download in SVG vector, PNG, JPG, WEBP, or printable PDF.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Link Input & Customization */}
          <div className="lg:col-span-7 space-y-5">
            <LinkInput
              value={options.value}
              onChange={handleLinkChange}
              onToast={triggerToast}
            />

            <CustomizationPanel
              options={options}
              onChange={setOptions}
              onReset={handleReset}
            />

            {/* Feature Highlights / Trust Signals */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200/70 dark:border-slate-800 flex flex-col items-center text-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">100% Reliable</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Works offline in-browser</span>
              </div>
              <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200/70 dark:border-slate-800 flex flex-col items-center text-center">
                <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mb-1" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Zero Lag</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Instant live generation</span>
              </div>
              <div className="p-3 bg-white/70 dark:bg-slate-900/60 rounded-xl border border-slate-200/70 dark:border-slate-800 flex flex-col items-center text-center">
                <ShieldCheck className="w-4 h-4 text-slate-800 dark:text-slate-200 mb-1" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Private</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">No server tracking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Preview & Downloads */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
            <QRPreview
              options={options}
              onToast={triggerToast}
            />

            <DownloadHub
              options={options}
              onToast={triggerToast}
            />
          </div>
        </div>
      </main>

      {/* Footer with Akash Suresh Attribution */}
      <Footer />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} />

      {/* Add as Web Page / Install Modal */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onToast={triggerToast}
      />
    </div>
  );
}
