import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { QROptions } from '../types';
import { copyQRCodeToClipboard, generateQRSvg } from '../utils/qrGenerator';

interface QRPreviewProps {
  options: QROptions;
  onToast: (msg: string) => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ options, onToast }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  // Live render canvas whenever options change
  useEffect(() => {
    if (!canvasRef.current) return;
    const targetValue = options.value.trim() || 'https://pixiqr.app';

    QRCode.toCanvas(canvasRef.current, targetValue, {
      width: 260,
      margin: options.margin,
      errorCorrectionLevel: options.errorCorrectionLevel,
      color: {
        dark: options.fgColor,
        light: options.bgColor,
      },
    })
      .then(() => {
        setRenderError(null);
      })
      .catch((err: Error) => {
        console.error('QR rendering error:', err);
        setRenderError('Content is too long for this error correction level.');
      });
  }, [options]);

  const handleCopyImage = async () => {
    const success = await copyQRCodeToClipboard(options);
    if (success) {
      setCopiedImage(true);
      onToast('QR Code copied to clipboard as PNG image!');
      setTimeout(() => setCopiedImage(false), 2000);
    } else {
      onToast('Unable to copy image directly. Use PNG download instead.');
    }
  };

  const handleCopySvg = async () => {
    try {
      const svg = await generateQRSvg(options);
      await navigator.clipboard.writeText(svg);
      setCopiedSvg(true);
      onToast('SVG code copied to clipboard!');
      setTimeout(() => setCopiedSvg(false), 2000);
    } catch {
      onToast('Failed to copy SVG');
    }
  };

  const displayUrl = options.value.trim() || 'https://pixiqr.app';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col items-center transition-colors">
      {/* Live Badge */}
      <div className="w-full flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Live Preview
        </span>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Scannable
        </div>
      </div>

      {/* QR Code Container */}
      <div
        className="relative p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-inner flex items-center justify-center transition-colors overflow-hidden"
        style={{ backgroundColor: options.bgColor }}
      >
        <canvas
          ref={canvasRef}
          className="rounded-lg max-w-full h-auto transition-transform hover:scale-[1.01]"
        />

        {renderError && (
          <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs flex items-center justify-center p-4 text-center">
            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{renderError}</p>
          </div>
        )}
      </div>

      {/* Encoded Content Display */}
      <div className="mt-4 w-full bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="block text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Encoded Destination
          </span>
          <span className="block text-xs font-mono text-slate-700 dark:text-slate-300 truncate" title={displayUrl}>
            {displayUrl}
          </span>
        </div>
        {displayUrl.startsWith('http') && (
          <a
            href={displayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors shrink-0"
            title="Open link in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Quick Clipboard Actions */}
      <div className="grid grid-cols-2 gap-2 w-full mt-3">
        <button
          type="button"
          onClick={handleCopyImage}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs"
          title="Copy PNG image to clipboard"
        >
          {copiedImage ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Copied PNG</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Copy Image</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleCopySvg}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs"
          title="Copy SVG XML markup to clipboard"
        >
          {copiedSvg ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Copied SVG</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Copy SVG</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
