import React from 'react';
import { Linkedin, Shield, Heart, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              Pixi<span className="text-indigo-600">QR</span>
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">Universal Client-Side QR Engine</span>
          </div>

          {/* Primary user-requested attribution */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by</span>
            <a
              id="footer-author-link"
              href="https://www.linkedin.com/in/akashsuresh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors px-2 py-1 rounded-md hover:bg-indigo-50"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              <span>Akash Suresh</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              100% Private
            </span>
            <span className="inline-flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              Always Works
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
