import React, { useState } from 'react';
import { Link2, X, Clipboard, Check, Globe, Wifi, Mail, Phone, ExternalLink } from 'lucide-react';

interface LinkInputProps {
  value: string;
  onChange: (val: string) => void;
  onToast: (msg: string) => void;
}

type InputType = 'link' | 'text' | 'wifi' | 'email' | 'phone';

export const LinkInput: React.FC<LinkInputProps> = ({ value, onChange, onToast }) => {
  const [activeType, setActiveType] = useState<InputType>('link');
  const [pasted, setPasted] = useState(false);

  // WiFi helper state
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [wifiAuth, setWifiAuth] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // Email helper state
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');

  // Phone helper state
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text);
        setPasted(true);
        onToast('Link pasted from clipboard');
        setTimeout(() => setPasted(false), 2000);
      }
    } catch {
      onToast('Please allow clipboard permissions or paste directly');
    }
  };

  const handleClear = () => {
    onChange('');
    setWifiSsid('');
    setWifiPass('');
    setEmailTo('');
    setEmailSubject('');
    setPhoneNumber('');
  };

  const applyWifi = (ssid: string, pass: string, auth: string) => {
    if (!ssid) return;
    const wifiString = `WIFI:T:${auth};S:${ssid};P:${pass};;`;
    onChange(wifiString);
  };

  const applyEmail = (to: string, sub: string) => {
    if (!to) return;
    const mailString = `mailto:${to}${sub ? `?subject=${encodeURIComponent(sub)}` : ''}`;
    onChange(mailString);
  };

  const applyPhone = (phone: string) => {
    if (!phone) return;
    onChange(`tel:${phone.replace(/\s+/g, '')}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
      {/* Category selector */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <span>Enter Destination Content</span>
          <span className="text-xs font-normal text-slate-400">
            ({value.length} {value.length === 1 ? 'char' : 'chars'})
          </span>
        </label>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveType('link')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              activeType === 'link'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            Link / URL
          </button>
          <button
            type="button"
            onClick={() => setActiveType('wifi')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              activeType === 'wifi'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 text-indigo-600" />
            Wi-Fi
          </button>
          <button
            type="button"
            onClick={() => setActiveType('email')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              activeType === 'email'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            Email
          </button>
          <button
            type="button"
            onClick={() => setActiveType('phone')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
              activeType === 'phone'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-indigo-600" />
            Phone
          </button>
        </div>
      </div>

      {/* Main input according to active category */}
      {activeType === 'link' && (
        <div className="space-y-3">
          <div className="relative flex items-center">
            <div className="absolute left-3.5 pointer-events-none text-slate-400">
              <Link2 className="w-5 h-5 text-indigo-500" />
            </div>
            <input
              id="qr-link-input"
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://yourwebsite.com or any text..."
              className="w-full pl-11 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm sm:text-base focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              autoFocus
            />

            <div className="absolute right-2 flex items-center gap-1">
              {value && (
                <button
                  type="button"
                  id="qr-clear-btn"
                  onClick={handleClear}
                  title="Clear input"
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                id="qr-paste-btn"
                onClick={handlePaste}
                title="Paste from clipboard"
                className="flex items-center gap-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg shadow-xs transition-colors"
              >
                {pasted ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5 text-slate-500" />}
                <span className="hidden sm:inline">{pasted ? 'Pasted' : 'Paste'}</span>
              </button>
            </div>
          </div>

          {/* Quick sample chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-xs text-slate-400 mr-1">Quick links:</span>
            {[
              { label: 'LinkedIn Profile', url: 'https://www.linkedin.com/in/akashsuresh' },
              { label: 'Google Search', url: 'https://www.google.com' },
              { label: 'GitHub', url: 'https://github.com' },
              { label: 'YouTube Video', url: 'https://youtube.com/watch?v=dQw4w9WgXcQ' },
            ].map((sample) => (
              <button
                key={sample.label}
                type="button"
                onClick={() => {
                  onChange(sample.url);
                  onToast(`Loaded ${sample.label}`);
                }}
                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-transparent hover:border-indigo-100 transition-colors"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Wi-Fi form */}
      {activeType === 'wifi' && (
        <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Network Name (SSID)</label>
              <input
                type="text"
                value={wifiSsid}
                onChange={(e) => {
                  setWifiSsid(e.target.value);
                  applyWifi(e.target.value, wifiPass, wifiAuth);
                }}
                placeholder="Office or Home WiFi"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
              <input
                type="text"
                value={wifiPass}
                onChange={(e) => {
                  setWifiPass(e.target.value);
                  applyWifi(wifiSsid, e.target.value, wifiAuth);
                }}
                placeholder="WiFi Password"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Security: WPA/WPA2 (Standard)</span>
            <span className="text-emerald-600 font-medium">Guests scan to join instantly</span>
          </div>
        </div>
      )}

      {/* Email form */}
      {activeType === 'email' && (
        <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Recipient Email</label>
              <input
                type="email"
                value={emailTo}
                onChange={(e) => {
                  setEmailTo(e.target.value);
                  applyEmail(e.target.value, emailSubject);
                }}
                placeholder="contact@example.com"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Subject (Optional)</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => {
                  setEmailSubject(e.target.value);
                  applyEmail(emailTo, e.target.value);
                }}
                placeholder="Inquiry / Feedback"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Phone form */}
      {activeType === 'phone' && (
        <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number (with country code)</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                applyPhone(e.target.value);
              }}
              placeholder="+1 (555) 019-2834"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
          <p className="text-xs text-slate-500">Scanning this QR code will prompt the device to dial the number directly.</p>
        </div>
      )}
    </div>
  );
};
