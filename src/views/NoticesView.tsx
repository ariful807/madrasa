import { useState, type MouseEvent } from 'react';
import { 
  Bell, 
  Search, 
  Calendar, 
  Tag, 
  AlertCircle, 
  ChevronRight, 
  FileText, 
  Filter,
  Download,
  Loader2
} from 'lucide-react';
import { NoticeItem } from '../types';
import { downloadNoticeAsPdf } from '../utils/downloadUtils';

interface NoticesViewProps {
  notices: NoticeItem[];
  onSelectNotice: (notice: NoticeItem) => void;
}

export function NoticesView({ notices, onSelectNotice }: NoticesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleCardDownload = async (e: MouseEvent, notice: NoticeItem) => {
    e.stopPropagation();
    if (downloadingId) return;
    setDownloadingId(notice.id);
    try {
      await downloadNoticeAsPdf(notice);
    } catch (err) {
      console.error('Error downloading notice:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const categories = ['সকল', 'জরুরি', 'ভর্তি', 'পরীক্ষা', 'ছুটি', 'ফলাফল', 'অন্যান্য'];

  const filteredNotices = notices.filter(item => {
    const matchesCategory = selectedCategory === 'সকল' 
      ? true 
      : selectedCategory === 'জরুরি' 
        ? item.isUrgent || item.category === 'জরুরি'
        : item.category === selectedCategory;

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Bell className="w-4 h-4" />
            <span>অফিশিয়াল নোটিশ বোর্ড</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            মাদরাসার নোটিশ ও জরুরি ঘোষণাসমূহ
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            ভর্তি, পরীক্ষা, ছুটির ঘোষণা ও একাডেমিক সংক্রান্ত সকল তথ্য নিয়মিত হালনাগাদ করা হয়।
          </p>
        </div>

        <div className="w-full md:w-72 bg-white/10 p-2 rounded-xl border border-white/20 backdrop-blur-xs">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-200 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="নোটিশ খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 bg-white/90 text-slate-900 placeholder-slate-400 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
              id="notice-search-input"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
            id={`filter-category-${cat}`}
          >
            {cat === 'জরুরি' ? '🚨 জরুরি নোটিশ' : cat}
          </button>
        ))}
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-base font-semibold text-slate-700">কোনো নোটিশ খুঁজে পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400">অন্য কোনো কি-ওয়ার্ড দিয়ে খুঁজুন বা ফিল্টার পরিবর্তন করুন।</p>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => onSelectNotice(notice)}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              id={`notice-item-${notice.id}`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {notice.category}
                  </span>
                  {notice.isUrgent && (
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-600 text-white flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>জরুরি</span>
                    </span>
                  )}
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-sans">
                    <Calendar className="w-3.5 h-3.5" />
                    {notice.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-900 leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {notice.content}
                </p>

                <span className="text-[11px] text-slate-400 block">
                  প্রকাশ করেছে: {notice.publishedBy}
                </span>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleCardDownload(e, notice)}
                  disabled={downloadingId === notice.id}
                  title="নোটিশ ডাউনলোড করুন"
                  className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  id={`download-notice-btn-${notice.id}`}
                >
                  {downloadingId === notice.id ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span className="hidden sm:inline">ডাউনলোড...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>ডাউনলোড</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="px-4 py-2 bg-slate-50 group-hover:bg-emerald-800 group-hover:text-white text-emerald-800 text-xs font-semibold rounded-lg border border-slate-200 group-hover:border-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>সম্পূর্ণ নোটিশ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
