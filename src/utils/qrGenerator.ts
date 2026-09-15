import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { QROptions } from '../types';

/**
 * Generate a high-resolution canvas with the QR code.
 */
export async function generateQRCanvas(options: QROptions): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const size = options.resolution || 1024;
  canvas.width = size;
  canvas.height = size;

  await QRCode.toCanvas(canvas, options.value || 'https://pixiqr.app', {
    errorCorrectionLevel: options.errorCorrectionLevel,
    margin: options.margin,
    width: size,
    color: {
      dark: options.fgColor,
      light: options.bgColor,
    },
  });

  return canvas;
}

/**
 * Generate an SVG string representation of the QR code.
 */
export async function generateQRSvg(options: QROptions): Promise<string> {
  return await QRCode.toString(options.value || 'https://pixiqr.app', {
    type: 'svg',
    errorCorrectionLevel: options.errorCorrectionLevel,
    margin: options.margin,
    color: {
      dark: options.fgColor,
      light: options.bgColor,
    },
  });
}

/**
 * Trigger browser file download from a Blob or URL.
 */
export function downloadFile(url: string, filename: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

/**
 * Export QR code in any requested format: PNG, SVG, JPG, WEBP, or PDF.
 */
export async function exportQRCode(
  options: QROptions,
  format: 'png' | 'svg' | 'jpg' | 'webp' | 'pdf'
): Promise<boolean> {
  const safeFilename = getFilename(options.value, format);

  try {
    if (format === 'svg') {
      const svgString = await generateQRSvg(options);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      downloadFile(url, safeFilename);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return true;
    }

    const canvas = await generateQRCanvas(options);

    if (format === 'pdf') {
      // Create clean vector-like high quality PDF with jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Header title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(20, 24, 33);
      pdf.text('PixiQR Code Export', pageWidth / 2, 32, { align: 'center' });

      // Subtitle / value snippet
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(100, 116, 139);
      const truncatedVal = options.value.length > 70 
        ? options.value.substring(0, 67) + '...' 
        : options.value;
      pdf.text(truncatedVal || 'https://pixiqr.app', pageWidth / 2, 42, { align: 'center' });

      // QR Image centered
      const qrSize = 130; // 130mm x 130mm
      const qrX = (pageWidth - qrSize) / 2;
      const qrY = 55;

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', qrX, qrY, qrSize, qrSize);

      // Metadata info box
      pdf.setDrawColor(226, 232, 240);
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(pageWidth / 2 - 60, qrY + qrSize + 12, 120, 22, 3, 3, 'FD');

      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);
      pdf.text(`Resolution: ${options.resolution}x${options.resolution}px  |  Error Correction: Level ${options.errorCorrectionLevel}`, pageWidth / 2, qrY + qrSize + 22, { align: 'center' });
      pdf.text(`Scan with any phone camera or QR reader`, pageWidth / 2, qrY + qrSize + 28, { align: 'center' });

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.text('Generated with PixiQR • Made by Akash Suresh', pageWidth / 2, pageHeight - 16, { align: 'center' });

      pdf.save(safeFilename);
      return true;
    }

    // Raster formats (PNG, JPG, WEBP)
    let mimeType = 'image/png';
    if (format === 'jpg') mimeType = 'image/jpeg';
    if (format === 'webp') mimeType = 'image/webp';

    const dataUrl = canvas.toDataURL(mimeType, 0.95);
    downloadFile(dataUrl, safeFilename);
    return true;
  } catch (err) {
    console.error(`Failed to export QR code as ${format}:`, err);
    throw err;
  }
}

/**
 * Copy QR Code image directly to user's system clipboard.
 */
export async function copyQRCodeToClipboard(options: QROptions): Promise<boolean> {
  try {
    const canvas = await generateQRCanvas(options);
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          if (navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob,
              }),
            ]);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (e) {
          console.error('Clipboard write error:', e);
          resolve(false);
        }
      }, 'image/png');
    });
  } catch (err) {
    console.error('Error copying to clipboard:', err);
    return false;
  }
}

/**
 * Create a descriptive, clean filename based on content and extension.
 */
function getFilename(value: string, extension: string): string {
  try {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      const url = new URL(value);
      const host = url.hostname.replace(/[^a-zA-Z0-9]/g, '_');
      return `pixiqr_${host || 'link'}_${Date.now()}.${extension}`;
    }
  } catch {
    // fallback
  }

  const clean = value.slice(0, 15).replace(/[^a-zA-Z0-9]/g, '_') || 'code';
  return `pixiqr_${clean}_${Date.now()}.${extension}`;
}
