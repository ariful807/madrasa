import { ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import { NoticeItem, NavigationTab } from '../types';

interface UrgentNoticeTickerProps {
  notices: NoticeItem[];
  urgentTickerText: string;
  onNavigate: (tab: NavigationTab) => void;
  onSelectNotice?: (notice: NoticeItem) => void;
}

export function UrgentNoticeTicker({ 
  notices, 
  urgentTickerText, 
  onNavigate,
  onSelectNotice 
}: UrgentNoticeTickerProps) {
  const latestUrgent = notices.find(n => n.isUrgent) || notices[0];

  return (
    <div className="bg-gradient-to-r from-rose-50 via-amber-50/60 to-rose-50 border border-rose-200/90 text-slate-800 text-xs sm:text-sm py-2.5 px-3 sm:px-5 rounded-2xl shadow-xs">
      <div className="flex items-center justify-between gap-3">
        
        {/* Urgent Label Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
          </span>
          <span className="px-2.5 py-1 bg-rose-600 text-white text-[11px] sm:text-xs font-bold rounded-lg tracking-wide flex items-center gap-1 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>জরুরি নোটিশ</span>
          </span>
        </div>

        {/* Notice text or ticker */}
        <div className="flex-1 overflow-hidden">
          {latestUrgent ? (
            <button
              onClick={() => {
                if (onSelectNotice) {
                  onSelectNotice(latestUrgent);
                } else {
                  onNavigate('notices');
                }
              }}
              className="text-left font-semibold text-slate-900 hover:text-rose-700 transition-colors truncate block w-full text-xs sm:text-sm"
              id="ticker-latest-notice-link"
              title={latestUrgent.title}
            >
              <span className="text-rose-700 font-bold mr-1.5">[{latestUrgent.category}]</span>
              <span>{latestUrgent.title}</span>
              {urgentTickerText && (
                <span className="hidden md:inline text-slate-500 font-normal ml-2 text-xs">
                  — {urgentTickerText}
                </span>
              )}
            </button>
          ) : (
            <span className="font-semibold text-slate-800 text-xs sm:text-sm truncate block">
              {urgentTickerText || '২০২৬-২৭ শিক্ষাবর্ষে ভর্তি কার্যক্রম চলমান রয়েছে।'}
            </span>
          )}
        </div>

        {/* View All Notices Button */}
        <button
          onClick={() => onNavigate('notices')}
          className="shrink-0 flex items-center gap-1 text-[11px] sm:text-xs font-bold text-rose-700 hover:text-white hover:bg-rose-600 bg-white px-2.5 py-1 rounded-lg border border-rose-200 transition-all shadow-xs"
          id="ticker-view-all-btn"
        >
          <span>সকল নোটিশ</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}
