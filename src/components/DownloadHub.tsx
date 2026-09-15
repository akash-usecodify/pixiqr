import React, { useState } from 'react';
import { 
  Download, 
  FileImage, 
  FileCode, 
  FileText, 
  Sparkles, 
  Check, 
  Layers 
} from 'lucide-react';
import { ExportFormat, QROptions } from '../types';
import { exportQRCode } from '../utils/qrGenerator';

interface DownloadHubProps {
  options: QROptions;
  onToast: (msg: string) => void;
}

interface FormatItem {
  id: ExportFormat;
  label: string;
  ext: string;
  desc: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FORMATS: FormatItem[] = [
  {
    id: 'png',
    label: 'PNG Image',
    ext: 'png',
    desc: 'Raster format with transparency support. Ideal for websites, presentations & social media.',
    badge: 'Most Popular',
    icon: FileImage,
  },
  {
    id: 'svg',
    label: 'SVG Vector',
    ext: 'svg',
    desc: 'Infinitely scalable vector code. Perfect for graphic designers, billboards & sharp printing.',
    badge: 'Lossless Vector',
    icon: FileCode,
  },
  {
    id: 'pdf',
    label: 'PDF Document',
    ext: 'pdf',
    desc: 'Ready-to-print vector PDF with neat formatting, ready for office flyers and table tents.',
    badge: 'Print Ready',
    icon: FileText,
  },
  {
    id: 'jpg',
    label: 'JPG Image',
    ext: 'jpg',
    desc: 'Standard compressed photographic format. Maximum compatibility across older software.',
    icon: FileImage,
  },
  {
    id: 'webp',
    label: 'WebP Image',
    ext: 'webp',
    desc: 'Modern web format providing high compression with small file sizes for fast loading.',
    badge: 'Ultra Fast',
    icon: Layers,
  },
];

export const DownloadHub: React.FC<DownloadHubProps> = ({ options, onToast }) => {
  const [downloading, setDownloading] = useState<ExportFormat | null>(null);
  const [lastDownloaded, setLastDownloaded] = useState<ExportFormat | null>(null);

  const handleDownload = async (format: ExportFormat) => {
    try {
      setDownloading(format);
      await exportQRCode(options, format);
      setLastDownloaded(format);
      onToast(`Successfully exported as .${format.toUpperCase()}`);
      setTimeout(() => setLastDownloaded(null), 3000);
    } catch (err) {
      console.error(err);
      onToast(`Failed to download ${format}. Please try again.`);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    for (const fmt of ['png', 'svg', 'pdf'] as ExportFormat[]) {
      await handleDownload(fmt);
    }
    onToast('Downloaded primary formats (PNG, SVG, PDF)');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs transition-colors">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Download Formats</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            All formats generated client-side with zero loss
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadAll}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-100 dark:border-indigo-900 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Batch Pack (PNG, SVG, PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FORMATS.map((item) => {
          const Icon = item.icon;
          const isBusy = downloading === item.id;
          const isDone = lastDownloaded === item.id;

          return (
            <button
              key={item.id}
              type="button"
              disabled={isBusy}
              onClick={() => handleDownload(item.id)}
              className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between group ${
                isDone
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 bg-slate-50/40 dark:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isDone
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shadow-2xs'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-['Space_Grotesk']">
                      {item.ext.toUpperCase()}
                    </span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-[11px]">
                  {item.id === 'svg'
                    ? 'Vector scale'
                    : `${options.resolution}x${options.resolution}px`}
                </span>
                <span
                  className={`flex items-center gap-1 text-[11px] ${
                    isDone
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : 'text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform'
                  }`}
                >
                  {isBusy ? (
                    'Generating...'
                  ) : isDone ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Downloaded
                    </>
                  ) : (
                    <>
                      Download
                      <Download className="w-3 h-3" />
                    </>
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
