/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { toPng, toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { NoticeItem, SyllabusItem } from '../types';

/**
 * Triggers a download of a file using a Blob or Data URL
 */
export function triggerFileDownload(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    link.remove();
  }, 200);
}

function getSafeFileName(fileName: string, extension: string): string {
  const cleaned = fileName
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
  const fallback = `download${extension}`;

  if (!cleaned) return fallback;
  return cleaned.toLowerCase().endsWith(extension) ? cleaned : `${cleaned}${extension}`;
}

function isDownloadUrl(url?: string): url is string {
  if (!url || url.trim() === '' || url.trim() === '#') return false;

  try {
    const parsed = new URL(url, window.location.href);
    return ['http:', 'https:', 'blob:', 'data:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/** Downloads a supplied PDF URL, falling back to opening it when its server blocks CORS. */
async function downloadPdfUrl(url: string, fileName: string): Promise<boolean> {
  const safeFileName = getSafeFileName(fileName, '.pdf');

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to download file: HTTP ${response.status}`);

    const blob = await response.blob();
    if (blob.size === 0) throw new Error('The downloaded file is empty');

    const objectUrl = URL.createObjectURL(blob);
    triggerFileDownload(objectUrl, safeFileName);
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1_000);
    return true;
  } catch (error) {
    // Some third-party file hosts do not allow CORS requests. Opening the URL still
    // lets the user view and save the original PDF rather than silently failing.
    console.warn('Direct PDF download failed; opening the original URL instead.', error);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => link.remove(), 200);
    return true;
  }
}

function escapeHtml(value: string | number | undefined): string {
  return String(value ?? '').replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[character] ?? character));
}

/**
 * Helper to capture an element to image data URL safely
 * Handles modern CSS (oklch, color-mix), cross-origin images, and web fonts
 */
async function captureToDataUrl(element: HTMLElement, format: 'png' | 'jpeg'): Promise<string> {
  const transparentPlaceholder = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';
  
  const options = {
    backgroundColor: '#ffffff',
    pixelRatio: 2,
    quality: 0.95,
    cacheBust: true,
    imagePlaceholder: transparentPlaceholder,
    filter: (node: HTMLElement) => {
      // Exclude interactive print-hidden elements
      if (node.classList && node.classList.contains('no-print')) {
        return false;
      }
      return true;
    },
  };

  try {
    return format === 'png' ? await toPng(element, options) : await toJpeg(element, options);
  } catch (err) {
    console.warn('Initial capture attempt encountered an issue, retrying with skipFonts: true', err);
    // Retry with skipFonts: true to bypass any cross-origin font embedding restrictions
    const fallbackOptions = { ...options, skipFonts: true };
    return format === 'png' ? await toPng(element, fallbackOptions) : await toJpeg(element, fallbackOptions);
  }
}

/**
 * Downloads a DOM element as a high-resolution PDF (A4 sized)
 */
export async function downloadDomAsPdf(
  element: HTMLElement, 
  fileName: string,
  onProgress?: (status: string) => void
): Promise<boolean> {
  try {
    if (onProgress) onProgress('ডকুমেন্ট প্রসেস হচ্ছে...');

    const imgData = await captureToDataUrl(element, 'jpeg');

    if (onProgress) onProgress('PDF তৈরি হচ্ছে...');

    const img = new Image();
    img.src = imgData;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image could not be rendered for PDF'));
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate aspect ratio
    const imgWidth = pdfWidth;
    const imgHeight = (img.height * pdfWidth) / img.width;

    if (imgHeight <= pdfHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
    }

    const cleanName = getSafeFileName(fileName, '.pdf');
    pdf.save(cleanName);
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    // Fallback: If PDF generator fails in sandboxed environment, trigger native print
    try {
      window.print();
    } catch {
      // ignore
    }
    return false;
  }
}

/**
 * Downloads a DOM element as a high-resolution PNG image
 */
export async function downloadDomAsImage(
  element: HTMLElement, 
  fileName: string,
  onProgress?: (status: string) => void
): Promise<boolean> {
  try {
    if (onProgress) onProgress('ইমেজ তৈরি হচ্ছে...');

    const dataUrl = await captureToDataUrl(element, 'png');
    const cleanName = getSafeFileName(fileName, '.png');
    triggerFileDownload(dataUrl, cleanName);
    return true;
  } catch (error) {
    console.error('Image capture error:', error);
    return false;
  }
}

/**
 * Downloads an official Notice as a beautifully styled PDF document
 */
export async function downloadNoticeAsPdf(
  notice: NoticeItem,
  madrasaName: string = 'মারকাযুল ইহসান ঢাকা'
): Promise<boolean> {
  // Prefer the original uploaded PDF when there is one. A generated PDF is used
  // only for notices without a usable file URL (including the default "#" value).
  if (isDownloadUrl(notice.pdfUrl)) {
    return downloadPdfUrl(notice.pdfUrl, `Notice_${notice.id}`);
  }

  // Otherwise generate an official formatted Madrasa notice paper
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '794px'; // Standard A4 width at 96 DPI
  container.style.minHeight = '1123px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.padding = '48px';
  container.style.boxSizing = 'border-box';
  container.style.fontFamily = "'Noto Serif Bengali', 'Noto Serif', serif";
  container.style.zIndex = '-9999';
  container.style.pointerEvents = 'none';

  container.innerHTML = `
    <div style="border: 3px double #064e3b; padding: 36px; min-height: 1020px; display: flex; flex-direction: column; justify-content: space-between; background: #fff;">
      <div>
        <div style="text-align: center; margin-bottom: 12px;">
          <span style="font-size: 20px; font-weight: bold; color: #1e293b;">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        </div>

        <div style="text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 16px; margin-bottom: 20px;">
          <h1 style="font-size: 26px; font-weight: 800; color: #064e3b; margin: 0 0 6px 0;">${escapeHtml(madrasaName)}</h1>
          <p style="font-size: 14px; color: #334155; margin: 0 0 4px 0;">অফিসিয়াল নোটিশ বোর্ড ও কেন্দ্রীয় দফতর</p>
          <p style="font-size: 12px; color: #64748b; margin: 0;">যাত্রাবাড়ী ও ডেমরা ক্যাম্পাস, ঢাকা | হটলাইন: ০১৭১২-৮৩৬০৭৪, ০১৭৮৯-৩২২১৯৯</p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 1px dashed #cbd5e1; font-size: 13px;">
          <div>
            <span style="background-color: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 4px 12px; border-radius: 6px; font-weight: bold;">
              বিভাগ: ${escapeHtml(notice.category)}
            </span>
            ${notice.isUrgent ? '<span style="background-color: #fee2e2; color: #991b1b; border: 1px solid #fecaca; padding: 4px 10px; border-radius: 6px; font-weight: bold; margin-left: 8px;">জরুরি বিজ্ঞপ্তি</span>' : ''}
          </div>
          <div style="color: #475569;">
            <strong>তারিখ:</strong> ${escapeHtml(notice.date)}
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: bold; color: #0f172a; line-height: 1.4; margin: 0 0 16px 0;">
            ${escapeHtml(notice.title)}
          </h2>
          <div style="font-size: 15px; line-height: 1.8; color: #334155; white-space: pre-line; text-align: justify;">
            ${escapeHtml(notice.content)}
          </div>
        </div>
      </div>

      <div style="margin-top: 40px; padding-top: 24px; border-top: 2px solid #cbd5e1;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <p style="font-size: 12px; color: #64748b; margin: 0 0 4px 0;">নোটিশ আইডি: <strong style="font-family: monospace;">${escapeHtml(notice.id)}</strong></p>
            <p style="font-size: 12px; color: #64748b; margin: 0;">মুদ্রণ তারিখ: ${new Date().toLocaleDateString('bn-BD')}</p>
          </div>

          <div style="text-align: center;">
            <div style="width: 70px; height: 70px; border: 2px dashed #064e3b; border-radius: 50%; margin: 0 auto 8px auto; display: flex; align-items: center; justify-content: center; color: #064e3b; font-size: 10px; font-weight: bold; transform: rotate(-8deg);">
              মারকাযুল ইহসান<br/>সিলমোহর
            </div>
            <div style="border-top: 1px solid #475569; width: 140px; margin-top: 6px; padding-top: 4px; font-weight: bold; font-size: 13px; color: #0f172a;">
              ${escapeHtml(notice.publishedBy)}
            </div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #94a3b8;">
          * এটি মারকাযুল ইহসান ঢাকা-এর অফিসিয়াল নোটিশ। ওয়েবসাইট থেকে সরাসরি সংরক্ষিত।
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const success = await downloadDomAsPdf(container, `Notice_${notice.id}_${notice.date.replace(/[/\\?%*:|"<>]/g, '-')}`);
    return success;
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Downloads a syllabus item as a formatted PDF
 */
export async function downloadSyllabusAsPdf(
  item: SyllabusItem,
  madrasaName: string = 'মারকাযুল ইহসান ঢাকা'
): Promise<boolean> {
  if (isDownloadUrl(item.pdfDownloadUrl)) {
    return downloadPdfUrl(item.pdfDownloadUrl, `Syllabus_${item.jamaat}_${item.bookName}`);
  }

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '794px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.padding = '40px';
  container.style.boxSizing = 'border-box';
  container.style.fontFamily = "'Noto Serif Bengali', 'Noto Serif', serif";
  container.style.zIndex = '-9999';
  container.style.pointerEvents = 'none';

  container.innerHTML = `
    <div style="border: 2px solid #064e3b; padding: 30px; background: #fff;">
      <div style="text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="font-size: 22px; font-weight: bold; color: #064e3b; margin: 0 0 4px 0;">${escapeHtml(madrasaName)}</h2>
        <p style="font-size: 14px; color: #334155; margin: 0 0 2px 0;">শিক্ষাক্রম ও কিতাব বিবরণী</p>
        <p style="font-size: 12px; color: #64748b; margin: 0;">বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ কারিকুলাম</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; width: 35%; background-color: #f8fafc;">জামাত / শ্রেণি:</td>
            <td style="padding: 10px; font-weight: 800; color: #064e3b;">${escapeHtml(item.jamaat)} (${escapeHtml(item.department)})</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">বিষয়:</td>
            <td style="padding: 10px;">${escapeHtml(item.subjectName)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">মূল কিতাবের নাম:</td>
            <td style="padding: 10px; font-weight: bold;">${escapeHtml(item.bookName)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">মুসান্নিফ / রচয়িতা:</td>
            <td style="padding: 10px;">${escapeHtml(item.authorName)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">মোট পূর্ণমান:</td>
            <td style="padding: 10px;">${escapeHtml(item.totalMarks)} (লিখিত: ${escapeHtml(item.writtenMark)}, মৌখিক: ${escapeHtml(item.oralMark)})</td>
          </tr>
          ${item.examDetails ? `
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px; font-weight: bold; background-color: #f8fafc;">পরীক্ষার বিবরণ:</td>
            <td style="padding: 10px;">${escapeHtml(item.examDetails)}</td>
          </tr>
          ` : ''}
        </tbody>
      </table>

      <div style="border-top: 1px dashed #94a3b8; padding-top: 16px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b;">
        <span>মুদ্রণ তারিখ: ${new Date().toLocaleDateString('bn-BD')}</span>
        <span>মারকাযুল ইহসান কেন্দ্রীয় শিক্ষা বিভাগ</span>
      </div>
    </div>
  `;

  document.body.appendChild(container);
  try {
    return await downloadDomAsPdf(container, `Syllabus_${item.jamaat}_${item.bookName}`);
  } finally {
    document.body.removeChild(container);
  }
}
