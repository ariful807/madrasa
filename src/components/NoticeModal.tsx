import { useState } from 'react';
import { X, Calendar, Tag, UserCheck, FileText, Printer, Download, Loader2, Check } from 'lucide-react';
import { NoticeItem } from '../types';
import { downloadNoticeAsPdf } from '../utils/downloadUtils';

interface NoticeModalProps {
  notice: NoticeItem | null;
  onClose: () => void;
}

export function NoticeModal({ notice, onClose }: NoticeModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!notice) return null;

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const success = await downloadNoticeAsPdf(notice);
      if (success) {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4000);
      }
    } catch (e) {
      console.error('Download notice error:', e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-300 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            id="notice-modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-800 text-emerald-200 border border-emerald-600/40">
              {notice.category}
            </span>
            {notice.isUrgent && (
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-600 text-white">
                জরুরি বিজ্ঞপ্তি
              </span>
            )}
            <span className="text-xs text-emerald-200/80 flex items-center gap-1 ml-auto mr-8">
              <Calendar className="w-3.5 h-3.5" />
              {notice.date}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-heading text-white pr-6 leading-snug">
            {notice.title}
          </h3>
        </div>

        {/* Download Success Notice */}
        {downloadSuccess && (
          <div className="bg-emerald-100 border-b border-emerald-300 px-6 py-2 text-xs font-semibold text-emerald-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>নোটিশটি PDF ফরম্যাটে সফলভাবে ডাউনলোড হয়েছে!</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="prose prose-emerald text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
            {notice.content}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>প্রকাশক: <strong className="text-slate-700">{notice.publishedBy}</strong></span>
            </div>
            <span>মারকাযুল ইহসান কেন্দ্রীয় নোটিশ দফতর</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Direct Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              id="notice-modal-download-btn"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>ডাউনলোড হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>ডাউনলোড নোটিশ (PDF)</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
}
