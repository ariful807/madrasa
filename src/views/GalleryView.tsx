import { useState } from 'react';
import { Image, X, ZoomIn, Calendar, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryViewProps {
  gallery: GalleryItem[];
}

export function GalleryView({ gallery }: GalleryViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('সকল');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['সকল', 'ক্যাম্পাস', 'ক্লাসরুম', 'ছাত্রবৃন্দ', 'ইভেন্ট ও মাহফিল', 'উস্তাদবৃন্দ', 'কার্যক্রম'];

  const filteredGallery = activeCategory === 'সকল'
    ? gallery
    : gallery.filter(g => g.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
          <Image className="w-4 h-4" />
          <span>ফটোগ্যালারি</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          মারকাযুল ইহসানের স্মৃতিচিত্র ও কার্যক্রম
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl">
          আমাদের ক্যাম্পাস, শীতাতপ ক্লাসরুম, শিক্ষার্থীদের তিলাওয়াত, বার্ষিক পাগড়ি প্রদান মাহফিল ও নানাবিধ দ্বীনি আয়োজনের স্থিরচিত্র।
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col"
          >
            <div className="relative h-60 overflow-hidden bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-3 bg-white/90 text-slate-900 rounded-full shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-900/75 text-white text-xs font-semibold backdrop-blur-xs">
                {item.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base font-heading group-hover:text-emerald-900 leading-snug">
                {item.title}
              </h3>
              {item.caption && (
                <p className="text-xs text-slate-500 mt-1">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setLightboxItem(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={lightboxItem.imageUrl}
              alt={lightboxItem.title}
              className="w-full max-h-[75vh] object-contain bg-black"
              referrerPolicy="no-referrer"
            />

            <div className="p-6 bg-slate-900 text-white space-y-1">
              <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                {lightboxItem.category}
              </span>
              <h3 className="text-lg font-bold font-heading">
                {lightboxItem.title}
              </h3>
              {lightboxItem.caption && (
                <p className="text-xs text-slate-300">
                  {lightboxItem.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
