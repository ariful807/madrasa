import { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Filter, 
  Search, 
  FileText, 
  CheckCircle2, 
  Layers,
  Loader2
} from 'lucide-react';
import { SyllabusItem } from '../types';
import { downloadSyllabusAsPdf } from '../utils/downloadUtils';

interface SyllabusViewProps {
  syllabus: SyllabusItem[];
}

export function SyllabusView({ syllabus }: SyllabusViewProps) {
  const [selectedDept, setSelectedDept] = useState('সকল বিভাগ');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadSyllabus = async (item: SyllabusItem) => {
    if (downloadingId) return;
    setDownloadingId(item.id);
    try {
      await downloadSyllabusAsPdf(item);
    } catch (e) {
      console.error('Error downloading syllabus:', e);
    } finally {
      setDownloadingId(null);
    }
  };

  const departments = ['সকল বিভাগ', 'দাওরায়ে হাদীস (মাস্টার্স সমমান)', 'দাওরায়ে হাদীস', 'ফজিলত বিভাগ', 'সানাবিয়া বিভাগ', 'হিফজুল কুরআন'];

  const filteredItems = syllabus.filter(item => {
    const matchDept = selectedDept === 'সকল বিভাগ' || item.department === selectedDept;
    const matchSearch = item.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.jamaat.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>পাঠ্যক্রম ও সিলেবাস</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            মারকাযুল ইহসানের শিক্ষাক্রম ও কিতাব তালিকা
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশের কারিকুলাম অনুযায়ী বিভাগ ও জামাতভিত্তিক সিলেবাস।
          </p>
        </div>

        <div className="w-full md:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="কিতাব বা বিষয় খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 bg-white/10 text-white placeholder-emerald-200/60 rounded-xl text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setSelectedDept(dept)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedDept === dept
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Syllabus Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-emerald-900 text-white">
                <th className="p-3.5 font-semibold">বিভাগ ও জামাত</th>
                <th className="p-3.5 font-semibold">বিষয়</th>
                <th className="p-3.5 font-semibold">কিতাবের নাম</th>
                <th className="p-3.5 font-semibold">মুসান্নিফ / লেখক</th>
                <th className="p-3.5 font-semibold text-center">পূর্ণমান (লিখিত/মৌখিক)</th>
                <th className="p-3.5 font-semibold text-right">ডাউনলোড</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    কোনো সিলেবাস রেকর্ড মেলেনি।
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 font-heading block">{item.jamaat}</span>
                      <span className="text-[11px] text-slate-500">{item.department}</span>
                    </td>
                    <td className="p-3.5 font-semibold text-emerald-900">
                      {item.subjectName}
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">
                      {item.bookName}
                    </td>
                    <td className="p-3.5 text-slate-600 italic">
                      {item.authorName}
                    </td>
                    <td className="p-3.5 text-center font-sans">
                      <span className="font-bold text-slate-900">{item.totalMarks}</span>
                      <span className="text-slate-400 text-xs block">
                        ({item.writtenMark} + {item.oralMark})
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDownloadSyllabus(item)}
                        disabled={downloadingId === item.id}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors cursor-pointer disabled:opacity-50"
                        title="সিলেবাস PDF ডাউনলোড করুন"
                      >
                        {downloadingId === item.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>ডাউনলোড...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
