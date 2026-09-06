import { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  ChevronRight, 
  X, 
  Share2,
  Printer
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogViewProps {
  blogs: BlogPost[];
}

export function BlogView({ blogs }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['সকল', 'ইসলামিক শিক্ষা', 'মাদরাসা কার্যক্রম', 'শিক্ষামূলক লেখা', 'নোটিশ/আপডেট'];

  const filteredBlogs = blogs.filter(b => {
    const matchCat = selectedCategory === 'সকল' || b.category === selectedCategory;
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        b.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>ইসলামিক ব্লগ ও বার্তা</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            মারকাযুল ইহসান প্রবন্ধ ও প্রকাশনা
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100">
            ইলমে দ্বীন, হিফজুল কুরআনের গুরুত্ব, সুন্নাহ চর্চা ও মাদরাসা বিষয়ক গবেষণামূলক লেখা।
          </p>
        </div>

        <div className="w-full md:w-72">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="প্রবন্ধ খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 bg-white/10 text-white placeholder-emerald-200/60 rounded-xl text-xs border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
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
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((post) => (
          <div
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-emerald-900/80 text-white text-xs font-semibold backdrop-blur-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 group-hover:text-emerald-900 text-base font-heading leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700 truncate max-w-[150px]">{post.author}</span>
              <span className="text-emerald-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>পড়ুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-64 overflow-hidden bg-slate-900">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-snug">
                  {activeArticle.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-200">
                  <span>লেখক: {activeArticle.author} ({activeArticle.authorDesignation})</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4 max-h-[55vh] overflow-y-auto">
              <div className="prose prose-emerald max-w-none text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {activeArticle.content}
              </div>

              {activeArticle.tags && (
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {activeArticle.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>প্রিন্ট করুন</span>
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-1.5 bg-emerald-800 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
