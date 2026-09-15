import React from 'react';
import { QrCode, ShieldCheck, Moon, Sun, Smartphone, Linkedin } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenInstallModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onOpenInstallModal,
}) => {
  return (
    <header className="border-b border-slate-200/80 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-indigo-600 flex items-center justify-center text-white shadow-sm ring-1 ring-black/5">
            <QrCode className="w-5 h-5 text-indigo-400 dark:text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-['Space_Grotesk']">
                Pixi<span className="text-indigo-600 dark:text-indigo-400">QR</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                Universal
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Simpler, instant QR code generator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Add as Web Page / Install Button */}
          <button
            type="button"
            id="header-install-btn"
            onClick={onOpenInstallModal}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/70 dark:border-indigo-800 transition-all shadow-2xs"
            title="Add PixiQR to Android or iOS Home Screen"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Add as Web Page</span>
            <span className="inline xs:hidden sm:hidden">Install</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Creator Profile Link */}
          <a
            href="https://www.linkedin.com/in/akashsuresh24/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Visit Akash Suresh on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
            <span>Akash Suresh</span>
          </a>
        </div>
      </div>
    </header>
  );
};
