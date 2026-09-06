import { useState, useEffect, useRef, useCallback, TouchEvent } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  RefreshCw, 
  ExternalLink,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { SliderImageItem, NavigationTab } from '../types';
import { formatDriveImageUrl } from '../utils/imageUtils';

interface ImageSliderProps {
  images: SliderImageItem[];
  onNavigate?: (tab: NavigationTab) => void;
  onRefreshFromGas?: () => Promise<void>;
  isSyncing?: boolean;
}

export function ImageSlider({ 
  images, 
  onNavigate,
  onRefreshFromGas,
  isSyncing = false
}: ImageSliderProps) {
  const activeImages = images.filter(img => img.isActive !== false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = activeImages.length;
  const SLIDE_DURATION = 3000; // 3 seconds per user requirement
  const PROGRESS_INTERVAL = 50; // update progress every 50ms

  // Reset index if out of bounds
  useEffect(() => {
    if (currentIndex >= totalSlides && totalSlides > 0) {
      setCurrentIndex(0);
    }
  }, [totalSlides, currentIndex]);

  const goToNext = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  // 3-second Auto Slide Timer with progress bar
  useEffect(() => {
    if (!isPlaying || isHovered || totalSlides <= 1) {
      return;
    }

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
        if (next >= 100) {
          goToNext();
          return 0;
        }
        return next;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(progressTimer);
  }, [isPlaying, isHovered, totalSlides, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    touchStartX.current = null;
  };

  if (totalSlides === 0) {
    return null;
  }

  const currentSlide = activeImages[currentIndex];

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-900 shadow-md select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="মারকাযুল ইহসান ক্যাম্পাস ও কার্যক্রমের ছবি"
      id="homepage-main-image-slider"
    >
      {/* Aspect Ratio Container (16:9 on desktop, 4:3 on mobile) */}
      <div className="relative w-full h-[260px] sm:h-[400px] md:h-[480px] lg:h-[520px] overflow-hidden">
        
        {/* Slides */}
        {activeImages.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const imageUrl = formatDriveImageUrl(slide.imageUrl);

          return (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Fallback */}
              <img
                src={imageUrl}
                alt={slide.title || 'মারকাযুল ইহসান ক্যাম্পাস ছবি'}
                className="w-full h-full object-cover transform scale-100 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Multi-layer Gradient Overlay for superior text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent hidden sm:block" />

              {/* Slide Caption & Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 z-20 text-white">
                <div className="max-w-3xl space-y-2 sm:space-y-3">
                  
                  {/* Category / Campus Badge */}
                  {slide.badge && (
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/90 text-amber-200 backdrop-blur-xs border border-emerald-500/40 font-serif shadow-xs">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>{slide.badge}</span>
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif text-white tracking-tight leading-tight drop-shadow-md">
                    {slide.title}
                  </h2>

                  {/* Subtitle / Description */}
                  {slide.subtitle && (
                    <p className="text-xs sm:text-sm md:text-base text-slate-200 font-serif leading-relaxed line-clamp-2 sm:line-clamp-none max-w-2xl drop-shadow-xs">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Optional Action Button */}
                  {slide.linkTab && onNavigate && (
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate(slide.linkTab as NavigationTab)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm font-serif shadow-md transition-all hover:scale-105 active:scale-95"
                        id={`slide-cta-${slide.id}`}
                      >
                        <span>বিস্তারিত দেখুন</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}

        {/* Top Status Bar (Sync status + Slide indicator) */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          {/* Live Indicator */}
          <div className="pointer-events-auto flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white text-xs font-serif shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs">গুগল শিট লাইভ অ্যালবাম</span>
            {onRefreshFromGas && (
              <button
                onClick={onRefreshFromGas}
                disabled={isSyncing}
                title="গুগল শিট থেকে ছবি রিফ্রেশ করুন"
                className="ml-1 p-0.5 hover:text-emerald-300 transition-colors disabled:opacity-50"
                id="refresh-slider-btn"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-amber-300' : ''}`} />
              </button>
            )}
          </div>

          {/* Slide Counter & Play/Pause */}
          <div className="pointer-events-auto flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white text-xs font-serif shadow-xs">
            <span>{currentIndex + 1} / {totalSlides}</span>
            <span className="text-white/40">•</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-0.5 hover:text-amber-300 transition-colors"
              title={isPlaying ? 'বিরতি দিন' : 'চালু করুন'}
              aria-label={isPlaying ? 'বিরতি দিন' : 'চালু করুন'}
              id="slider-play-pause-btn"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Left & Right Arrow Buttons */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-emerald-900/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 shadow-md"
              aria-label="পূর্ববর্তী ছবি"
              id="slider-prev-btn"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-emerald-900/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 shadow-md"
              aria-label="পরবর্তী ছবি"
              id="slider-next-btn"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Bottom 3-Second Progress Bar */}
        {isPlaying && totalSlides > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30 overflow-hidden">
            <div 
              className="h-full bg-amber-400 transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

      </div>

      {/* Slide Dot Indicators (Below image, high clarity) */}
      {totalSlides > 1 && (
        <div className="bg-slate-900/90 py-2.5 px-4 flex items-center justify-center gap-2 border-t border-slate-800">
          {activeImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setProgress(0);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-7 sm:w-9 bg-amber-400'
                  : 'w-2 sm:w-2.5 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`স্লাইড ${idx + 1}-এ যান`}
              id={`slider-dot-${idx}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
