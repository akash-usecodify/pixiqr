export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type ExportFormat = 'png' | 'svg' | 'jpg' | 'webp' | 'pdf';

export interface QROptions {
  value: string;
  fgColor: string;
  bgColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  resolution: number; // 512, 1024, 2048
}

export interface PresetColor {
  name: string;
  fg: string;
  bg: string;
}
