import React, { useState } from 'react';
import { Palette, Shield, Sliders, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { ErrorCorrectionLevel, QROptions } from '../types';

interface CustomizationPanelProps {
  options: QROptions;
  onChange: (options: QROptions) => void;
  onReset: () => void;
}

const COLOR_PRESETS = [
  { name: 'Classic Black', fg: '#000000', bg: '#ffffff' },
  { name: 'Deep Navy', fg: '#0f172a', bg: '#ffffff' },
  { name: 'Royal Indigo', fg: '#4338ca', bg: '#ffffff' },
  { name: 'Emerald Forest', fg: '#065f46', bg: '#ffffff' },
  { name: 'Burgundy', fg: '#881337', bg: '#ffffff' },
  { name: 'Dark Mode', fg: '#ffffff', bg: '#0f172a' },
];

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  options,
  onChange,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleColorPreset = (fg: string, bg: string) => {
    onChange({
      ...options,
      fgColor: fg,
      bgColor: bg,
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Customize QR Design & Quality
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Colors, error correction, and export size
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 pt-2 space-y-5 border-t border-slate-100 dark:border-slate-800">
          {/* Colors */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                Color Theme
              </label>
              <button
                type="button"
                onClick={onReset}
                className="text-[11px] font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
                title="Reset to default colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset defaults
              </button>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {COLOR_PRESETS.map((preset) => {
                const isSelected =
                  options.fgColor.toLowerCase() === preset.fg.toLowerCase() &&
                  options.bgColor.toLowerCase() === preset.bg.toLowerCase();
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleColorPreset(preset.fg, preset.bg)}
                    className={`group relative p-2 rounded-xl border text-left transition-all flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/60 ring-1 ring-indigo-600 dark:ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg border border-black/10 dark:border-white/10 shadow-2xs flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: preset.bg }}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-xs"
                        style={{ backgroundColor: preset.fg }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300 truncate max-w-full font-medium">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom pickers */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <input
                  type="color"
                  value={options.fgColor}
                  onChange={(e) => onChange({ ...options, fgColor: e.target.value })}
                  className="w-7 h-7 rounded-md cursor-pointer border-0 p-0 bg-transparent"
                />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase">
                    Foreground
                  </span>
                  <span className="block text-xs font-mono text-slate-700 dark:text-slate-200">
                    {options.fgColor}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <input
                  type="color"
                  value={options.bgColor}
                  onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
                  className="w-7 h-7 rounded-md cursor-pointer border-0 p-0 bg-transparent"
                />
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase">
                    Background
                  </span>
                  <span className="block text-xs font-mono text-slate-700 dark:text-slate-200">
                    {options.bgColor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Error Correction */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                Error Correction
              </label>
              <div className="grid grid-cols-4 gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((level) => {
                  const labels: Record<ErrorCorrectionLevel, { pct: string; desc: string }> = {
                    L: { pct: '7%', desc: 'Low' },
                    M: { pct: '15%', desc: 'Med' },
                    Q: { pct: '25%', desc: 'High' },
                    H: { pct: '30%', desc: 'Max' },
                  };
                  const active = options.errorCorrectionLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => onChange({ ...options, errorCorrectionLevel: level })}
                      className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                        active
                          ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                      }`}
                      title={`Level ${level} restores up to ${labels[level].pct} damaged modules`}
                    >
                      <span className="block text-xs">{level}</span>
                      <span className="block text-[10px] opacity-75">{labels[level].pct}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
                Higher levels allow scanning even if partially obstructed.
              </p>
            </div>

            {/* Resolution scale */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                Export Resolution
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {[
                  { label: '512px', val: 512, sub: 'Web' },
                  { label: '1024px', val: 1024, sub: 'HD' },
                  { label: '2048px', val: 2048, sub: 'Print' },
                ].map((res) => {
                  const active = options.resolution === res.val;
                  return (
                    <button
                      key={res.val}
                      type="button"
                      onClick={() => onChange({ ...options, resolution: res.val })}
                      className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                        active
                          ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
                      }`}
                    >
                      <span className="block text-xs">{res.label}</span>
                      <span className="block text-[10px] opacity-75">{res.sub}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
                SVG vector format remains infinitely crisp at any scale.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
