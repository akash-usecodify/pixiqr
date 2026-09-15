import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Share2, 
  PlusSquare, 
  Check, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Apple,
  Globe
} from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose, onToast }) => {
  const { isInstallable, isIOS, isAndroid, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>(isIOS ? 'ios' : 'android');
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    setIsInstalling(true);
    const res = await install();
    setIsInstalling(false);
    if (res === 'accepted') {
      onToast('PixiQR added to home screen successfully!');
      onClose();
    } else if (res === 'dismissed') {
      onToast('Installation was cancelled');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 overflow-hidden relative transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
                Add PixiQR as a Web Page
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Install on your Home Screen for instant 1-tap access
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle: Android vs iOS */}
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl my-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('android')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
              activeTab === 'android'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android / Chrome</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ios')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
              activeTab === 'ios'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>iPhone / iOS Safari</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'android' ? (
          <div className="space-y-4">
            {isInstallable && (
              <div className="bg-indigo-50 dark:bg-indigo-950/50 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 block">
                    Instant 1-Click Install Available
                  </span>
                  <span className="text-[11px] text-indigo-700 dark:text-indigo-400">
                    Your browser supports native web app installation.
                  </span>
                </div>
                <button
                  type="button"
                  disabled={isInstalling}
                  onClick={handleNativeInstall}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isInstalling ? 'Installing...' : 'Install Now'}</span>
                </button>
              </div>
            )}

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Manual Steps for Android
              </span>
              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  In Chrome or your Android browser, tap the <strong className="text-slate-900 dark:text-white">three dots menu (⋮)</strong> in the top right corner.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Tap <strong className="text-slate-900 dark:text-white">"Install app"</strong> or <strong className="text-slate-900 dark:text-white">"Add to Home screen"</strong>.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Confirm by tapping <strong className="text-slate-900 dark:text-white">"Install"</strong>. PixiQR will appear on your app drawer and home screen.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Steps for iPhone & iPad (Safari)
            </span>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                1
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Open PixiQR in <strong className="text-slate-900 dark:text-white">Safari</strong> and tap the <strong className="text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1 mx-1"><Share2 className="w-3.5 h-3.5 inline" /> Share</strong> button at the bottom of the screen.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                2
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                Scroll down through the share sheet and tap <strong className="text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1 mx-1"><PlusSquare className="w-3.5 h-3.5 inline" /> Add to Home Screen</strong>.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                3
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tap <strong className="text-slate-900 dark:text-white">"Add"</strong> in the top right corner. The PixiQR icon will now be on your iOS Home Screen!
              </p>
            </div>
          </div>
        )}

        {/* Bottom actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Opens like a native standalone app</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
