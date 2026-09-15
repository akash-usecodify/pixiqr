import React, { useState } from 'react';
import { Download, FileText, Image, Code, Layers, Sparkles, Check } from 'lucide-react';
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
  icon: React.ElementType;
}

const FORMATS: FormatItem[] = [
  {
    id: 'png',
    label: 'PNG Image',
    ext: '.png',
    desc: 'High-res raster for web, mobile & digital apps',
    badge: 'Popular',
    icon: Image,
  },
  {
    id: 'svg',
    label: 'SVG Vector',
    ext: '.svg',
    desc: 'Infinite scaling for Figma, print & banners',
    badge: 'Vector',
    icon: Code,
  },
  {
    id: 'pdf',
    label: 'PDF Document',
    ext: '.pdf',
    desc: 'Print-ready A4 flyer with scan guidelines',
    badge: 'Print Ready',
    icon: FileText,
  },
  {
    id: 'jpg',
    label: 'JPG Image',
    ext: '.jpg',
    desc: 'Standard compressed image for documents',
    icon: Image,
  },
  {
    id: 'webp',
    label: 'WEBP Image',
    ext: '.webp',
    desc: 'Ultra-lightweight modern web graphic',
    icon: Layers,
  },
];

export const DownloadHub: React.FC<DownloadHubProps> = ({ options, onToast }) => {
  const [downloading, setDownloading] = useState<ExportFormat | null>(null);
  const [lastDownloaded, setLastDownloaded] = useState<ExportFormat | null>(null);

  const handleDownload = async (format: ExportFormat) => {
    setDownloading(format);
    try {
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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-600" />
            <span>Download Formats</span>
          </h2>
          <p className="text-xs text-slate-400">All formats generated client-side with zero loss</p>
        </div>

        <button
          type="button"
          onClick={handleDownloadAll}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
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
                  ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                  : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 bg-slate-50/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-white text-slate-700 group-hover:text-indigo-600 shadow-2xs'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 font-['Space_Grotesk']">
                      {item.ext.toUpperCase()}
                    </span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400 group-hover:text-indigo-600 transition-colors text-[11px]">
                  {item.id === 'svg'
                    ? 'Vector scale'
                    : `${options.resolution}x${options.resolution}px`}
                </span>
                <span
                  className={`flex items-center gap-1 text-[11px] ${
                    isDone
                      ? 'text-emerald-700'
                      : 'text-indigo-600 group-hover:translate-x-0.5 transition-transform'
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
