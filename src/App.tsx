import React, { useState } from 'react';
import { Header } from './components/Header';
import { LinkInput } from './components/LinkInput';
import { CustomizationPanel } from './components/CustomizationPanel';
import { QRPreview } from './components/QRPreview';
import { DownloadHub } from './components/DownloadHub';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { QROptions } from './types';
import { Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const DEFAULT_OPTIONS: QROptions = {
  value: 'https://www.linkedin.com/in/akashsuresh',
  fgColor: '#000000',
  bgColor: '#ffffff',
  errorCorrectionLevel: 'M',
  margin: 2,
  resolution: 1024,
};

export default function App() {
  const [options, setOptions] = useState<QROptions>(DEFAULT_OPTIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      fgColor: '#000000',
      bgColor: '#ffffff',
      errorCorrectionLevel: 'M',
      margin: 2,
      resolution: 1024,
    }));
    triggerToast('Reset to default clean styling');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-12">
        {/* Simple & Clean Intro Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Instant & Free Universal QR Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-['Space_Grotesk']">
            Generate QR Codes in <span className="text-indigo-600">All Formats</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
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
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/70 flex flex-col items-center text-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-xs font-bold text-slate-800">100% Reliable</span>
                <span className="text-[11px] text-slate-400">Works offline in-browser</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/70 flex flex-col items-center text-center">
                <Zap className="w-4 h-4 text-indigo-600 mb-1" />
                <span className="text-xs font-bold text-slate-800">Zero Lag</span>
                <span className="text-[11px] text-slate-400">Instant live generation</span>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/70 flex flex-col items-center text-center">
                <ShieldCheck className="w-4 h-4 text-slate-800 mb-1" />
                <span className="text-xs font-bold text-slate-800">Private</span>
                <span className="text-[11px] text-slate-400">No server tracking</span>
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
    </div>
  );
}
