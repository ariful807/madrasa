import { 
  GraduationCap, 
  BookOpen, 
  Building2, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  ChevronRight, 
  Phone, 
  Users, 
  CheckCircle2, 
  Sparkles,
  Calendar,
  Layers,
  FileText,
  Clock,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { NavigationTab, SiteSettings, NoticeItem, BlogPost, SliderImageItem } from '../types';
import { ImageSlider } from '../components/ImageSlider';
import { UrgentNoticeTicker } from '../components/UrgentNoticeTicker';
import { storageService } from '../services/storageService';

interface HomeViewProps {
  onNavigate: (tab: NavigationTab) => void;
  settings: SiteSettings;
  notices: NoticeItem[];
  blogs: BlogPost[];
  onSelectNotice: (notice: NoticeItem) => void;
  sliderImages?: SliderImageItem[];
  onRefreshFromGas?: () => Promise<void>;
  isSyncing?: boolean;
}

export function HomeView({ 
  onNavigate, 
  settings, 
  notices, 
  blogs, 
  onSelectNotice,
  sliderImages: propsSliderImages,
  onRefreshFromGas,
  isSyncing = false
}: HomeViewProps) {
  const sliderImages = propsSliderImages && propsSliderImages.length > 0 
    ? propsSliderImages 
    : storageService.getSliderImages();

  const latestNotices = notices.slice(0, 3);
  const featuredBlogs = blogs.slice(0, 3);

  const features = [
    {
      icon: Award,
      title: 'উন্নত ফলাফল ও মেধা তালিকা',
      desc: 'বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ কেন্দ্রীয় পরীক্ষায় শতভাগ পাসের গৌরব এবং মেধা তালিকায় শীর্ষ স্থান অর্জন।'
    },
    {
      icon: Sparkles,
      title: 'শীতাতপ নিয়ন্ত্রিত আধুনিক শ্রেণিকক্ষ',
      desc: 'শিক্ষার্থীদের নিবিড় একাগ্রতা নিশ্চিত করতে উন্নত আলো-বাতাস ও এসি সুবিধাযুক্ত আন্তর্জাতিক মানসম্পন্ন ক্লাসরুম।'
    },
    {
      icon: ShieldCheck,
      title: '২৪/৭ সিসিটিভি সার্বক্ষণিক নজরদারি',
      desc: 'ছাত্রদের সার্বিক নিরাপত্তা, আচরণ ও শৃঙ্খলা রক্ষায় পুরো ক্যাম্পাস সিসিটিভি ক্যামেরায় সুনিয়ন্ত্রিত।'
    },
    {
      icon: BookOpen,
      title: 'উন্নত ও বৈজ্ঞানিক হিফজ ব্যবস্থা',
      desc: 'আন্তর্জাতিক মানের অভিজ্ঞ হাফেজ ও ক্বারীদের প্রত্যক্ষ তত্ত্বাবধানে সহজ ও স্থায়ী পদ্ধতিতে পবিত্র কুরআন হিফজ।'
    },
    {
      icon: Layers,
      title: 'বেফাক অনুমোদিত পূর্ণাঙ্গ কারিকুলাম',
      desc: 'শিশু শ্রেণি ও নূরানী থেকে শুরু করে দাওরায়ে হাদীস (তাকমীল/মাস্টার্স সমমান) পর্যন্ত সুবিন্যস্ত পাঠ্যক্রম।'
    },
    {
      icon: HeartHandshake,
      title: 'স্বাস্থ্যকর খাবার ও সুন্দর ছাত্রাবাস',
      desc: 'সুষম খাদ্য তালিকা অনুযায়ী পরিষ্কার-পরিচ্ছন্ন পরিবেশে পুষ্টিকর খাবার এবং অভিভাবকসুলভ স্নেহময় হোস্টেল ব্যবস্থা।'
    }
  ];

  const whyChooseList = [
    'বেফাক ও আন্তর্জাতিক প্রতিযোগিতায় ধারাবাহিকভাবে শীর্ষ ফলাফল',
    'শীতাতপ নিয়ন্ত্রিত (AC) আধুনিক শ্রেণিকক্ষ ও নিরিবিলি পড়াশোনার পরিবেশ',
    'অভিজ্ঞ ও হাক্কানি উস্তাদমণ্ডলী দ্বারা বিশেষ তরবিয়ত ও স্নেহময় পাঠদান',
    '২৪ ঘণ্টা সিসিটিভি ক্যামেরা ও নিশ্ছিদ্র নিরাপত্তা মনিটরিং',
    'তাজবীদসহ বিশুদ্ধ কুরআন তিলাওয়াত ও দ্রুত হিফজের বিশেষ টেকনিক',
    'নিয়মিত খেলাধুলা, শারীরিক ব্যায়াম ও সুস্থ বিনোদনের সুযোগ',
    'উভয় ক্যাম্পাসে মনোরম প্রাকৃতিক পরিবেশ ও স্বাস্থ্যসম্মত খাবার',
    'মেধাবী ও এতিম-অসচ্ছল শিক্ষার্থীদের জন্য বিশেষ বৃত্তির ব্যবস্থা'
  ];

  const jamaatHighlights = [
    { name: 'নূরানী ও নাযেরা বিভাগ', age: '৪-৭ বছর', desc: 'সহীহ মাখরাজ ও তাজবীদ সহকারে কুরআন শিক্ষা ও বুনিয়াদি আদব।' },
    { name: 'আন্তর্জাতিক হিফজ বিভাগ', age: '৭-১২ বছর', desc: 'স্বল্প সময়ে নির্ভুলভাবে ৩০ পারা কুরআন হিফজ ও হুসনে সওত অনুশীলন।' },
    { name: 'কিতাব বিভাগ (প্রাথমিক)', age: 'মীযান ও নাহবেমীর', desc: 'আরবি ব্যাকরণ, নাহু-সারফ, ফেকাহ ও সাহিত্য চর্চার সূচনা।' },
    { name: 'উচ্চতর কিতাব ও দাওরা', age: 'তাকমীল (মাস্টার্স)', desc: 'সিহাহ সিত্তাহ সহ হাদিসের গভীর পাঠ ও ফতোয়া বিষয়ক বুৎপত্তি।' },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 bg-white">
      
      {/* 0. DYNAMIC 3-SECOND CAMPUS IMAGE SLIDER (SYNCED VIA GOOGLE SHEETS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <ImageSlider 
          images={sliderImages} 
          onNavigate={onNavigate} 
          onRefreshFromGas={onRefreshFromGas}
          isSyncing={isSyncing}
        />
      </section>

      {/* 1. URGENT NOTICE TICKER - DIRECTLY BELOW THE IMAGE SLIDER */}
      {settings.showUrgentNotice !== false && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6">
          <UrgentNoticeTicker
            notices={notices}
            urgentTickerText={settings.urgentTickerText || settings.urgentNoticeText || '২০২৬-২৭ শিক্ষাবর্ষে শিশু শ্রেণি থেকে তাকমীল ও হিফজ বিভাগে নতুন ছাত্র ভর্তি চলছে!'}
            onNavigate={onNavigate}
            onSelectNotice={onSelectNotice}
          />
        </section>
      )}

      {/* 2. CLEAN WHITE WELCOME & QUICK SERVICE SHORTCUTS (NO DARK HERO BANNER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          
          {/* Top Islamic Invocation & Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-100 gap-3">
            <div className="text-center sm:text-left">
              <span className="font-arabic text-xl sm:text-2xl font-bold text-emerald-800 block">
                {settings.madrasaArabicMotto || 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
              </span>
              <p className="text-xs sm:text-sm text-slate-500 font-serif mt-1">
                {settings.tagline || 'হাক্কানি আলেমেদ্বীন ও আদর্শ হাফেজে কুরআন গঠন করাই আমাদের মূল উদ্দেশ্য'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 font-serif">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>{settings.admissionYear} নতুন ভর্তি চলছে</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LATEST NOTICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-rose-600 font-semibold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>নোটিশ ও গুরুত্বপূর্ণ ঘোষণা</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-1">
                সর্বশেষ নোটিশ বোর্ড
              </h3>
            </div>
            
            <button
              onClick={() => onNavigate('notices')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1.5"
              id="home-all-notices-btn"
            >
              <span>সকল নোটিশ দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestNotices.map((notice) => (
              <div 
                key={notice.id}
                onClick={() => onSelectNotice(notice)}
                className="p-5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
                id={`notice-card-${notice.id}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-emerald-100 text-emerald-800">
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {notice.date}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-900 text-sm sm:text-base line-clamp-2 leading-snug">
                    {notice.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {notice.content}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-900">
                  <span>বিস্তারিত পড়ুন</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MADRASA FEATURES (আমাদের বিশেষত্ব) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            আমাদের বিশেষ বৈশিষ্ট্যসমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-3">
            কেন মারকাযুল ইহসান অনন্য?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            দ্বীনি ও প্রয়োজনীয় আধুনিক জ্ঞানের অপূর্ব সমন্বয়ে শিক্ষার্থীদের সুপ্ত প্রতিভার পূর্ণ বিকাশ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group"
                id={`feature-card-${idx}`}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-900 group-hover:text-emerald-950 mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ACADEMIC DEPARTMENTS (শিক্ষা সফলতা ও জামাতসমূহ) */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                শিক্ষা সফলতা ও কারিকুলাম
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-2">
                প্রাথমিক স্তর থেকে দাওরায়ে হাদীস
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl font-serif">
                বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশের মানদণ্ড অনুযায়ী পরিচালিত সুবিন্যস্ত পাঠ্যক্রম।
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('syllabus')}
                className="px-4 py-2 text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-800 rounded-lg border border-slate-300 transition-colors"
                id="home-view-syllabus-btn"
              >
                সিলেবাস দেখুন
              </button>
              <button
                onClick={() => onNavigate('results')}
                className="px-4 py-2 text-xs sm:text-sm font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors"
                id="home-view-results-btn"
              >
                ফলাফল যাচাই
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jamaatHighlights.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300 inline-block mb-3">
                    {item.age}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 font-heading mb-2">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-serif">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <button 
                    onClick={() => onNavigate('admission')}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 font-serif"
                  >
                    <span>ভর্তি নিয়ম দেখুন</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Education Success Banner */}
          <div className="mt-10 bg-emerald-50 p-6 sm:p-8 rounded-2xl border border-emerald-200 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-emerald-950">
                দ্বীনি শিক্ষার পাশাপাশি বাংলা, ইংরেজি ও গণিত শিক্ষা
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900 max-w-2xl font-serif">
                আমাদের প্রতিটি ছাত্র যেন যুগের চাহিদায় পিছিয়ে না পড়ে, সেজন্য প্রাথমিক থেকে উচ্চতর কিতাব পর্যন্ত প্রয়োজনীয় আধুনিক জ্ঞান ও কম্পিউটার প্রশিক্ষণের ব্যবস্থা রয়েছে।
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => onNavigate('admission')}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
              >
                ভর্তি সংক্রান্ত তথ্য
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl border border-slate-300 transition-all"
              >
                যোগাযোগ করুন
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. ABOUT / MADRASA INTRO & FOUNDATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              মাদরাসা পরিচিতি ও সূচনা
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 leading-tight">
              আলোকিত আলেম গড়ার ৬ বছরের নির্ভরযোগ্য পথচলা
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              ২৩ জুন ২০১৮ সালে ঢাকার ঐতিহ্যবাহী পশ্চিম যাত্রাবাড়ীতে মারকাযুল ইহসানের শিক্ষা কার্যক্রমের সূচনা হয়। প্রতিষ্ঠাতা মুহতামিম <strong>{settings.founderName}</strong>-এর আন্তরিক প্রচেষ্টা এবং শিক্ষানুরাগী সুধীজনদের সহযোগিতায় অল্প সময়ে এটি একটি আদর্শ বিদ্যাপীঠে পরিণত হয়েছে।
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">প্রতিষ্ঠাকাল:</span>
                <span className="text-base font-bold text-slate-900 font-heading">২৩ জুন ২০১৮ ইং</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block">স্থায়ী ক্যাম্পাস:</span>
                <span className="text-base font-bold text-slate-900 font-heading">পাইটি, ডেমরা, ঢাকা</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
                id="home-read-about-btn"
              >
                <span>বিস্তারিত ইতিহাস পড়ুন</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-emerald-50/70 p-6 sm:p-8 rounded-3xl border border-emerald-100 space-y-6">
              <h3 className="text-xl font-bold font-heading text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-700" />
                <span>কেন এখানে আপনার সন্তানকে ভর্তি করবেন?</span>
              </h3>

              <div className="space-y-3">
                {whyChooseList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-emerald-800 font-bold block">ভর্তি হটলাইন:</span>
                  <span className="text-base font-bold text-emerald-950 font-sans">{settings.phonePrimary}</span>
                </div>
                <button
                  onClick={() => onNavigate('admission')}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold rounded-lg transition-colors"
                >
                  অনলাইন ফরম পূরণ
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CAMPUSES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            আমাদের ক্যাম্পাস
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-2">
            উভয় ক্যাম্পাসের মনোরম পরিবেশ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Campus 1 */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col">
            <div className="h-56 relative overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                alt="অস্থায়ী ক্যাম্পাস যাত্রাবাড়ী"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded shadow-md">
                অস্থায়ী ক্যাম্পাস
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  পশ্চিম যাত্রাবাড়ী ক্যাম্পাস
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{settings.addressTemporary}</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  হিফজুল কুরআন ও প্রাথমিক কিতাব বিভাগের জন্য সুসজ্জিত শীতাতপ ক্লাসরুম, পরিচ্ছন্ন মেস ও হোস্টেল সুবিধা।
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">হিফজ ও নূরানী শাখা</span>
                <button
                  onClick={() => onNavigate('campus')}
                  className="text-xs font-bold text-slate-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>ক্যাম্পাস তথ্য</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Campus 2 */}
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col">
            <div className="h-56 relative overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
                alt="স্থায়ী ক্যাম্পাস ডেমরা"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                স্থায়ী ক্যাম্পাস
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  পাইটি, ডেমরা ক্যাম্পাস
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{settings.addressPermanent}</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  উচ্চতর কিতাব ও দাওরায়ে হাদীস শাখা। এখানে বহুতল ইসলামিক কমপ্লেক্স ও সুবিশাল কেন্দ্রীয় জামে মসজিদ নির্মিত হচ্ছে।
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">উচ্চতর কিতাব ও দাওরা</span>
                <button
                  onClick={() => onNavigate('campus')}
                  className="text-xs font-bold text-slate-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>ক্যাম্পাস তথ্য</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. KHIDMAT FUND / DONATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-emerald-700/40 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-600/50">
              <HeartHandshake className="w-4 h-4" />
              <span>খেদমত ও সদকায়ে জারিয়া ফান্ড</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              দ্বীনের খেদমত ও হাফেজে কুরআনদের পাশে দাঁড়ান
            </h2>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              মারকাযুল ইহসানের লিল্লাহ বোর্ডিং, এতিম ও অসচ্ছল হাফেজ ছাত্রদের খাবার খরচ এবং ডেমরা স্থায়ী ক্যাম্পাস ভবনের নির্মাণে আপনার যাকাত, সদকা ও দানের হাত বাড়িয়ে দিন। প্রতিটি দান আল্লাহর দরবারে সদকায়ে জারিয়া হিসেবে সঞ্চিত থাকবে।
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('khidmat-fund')}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all"
                id="home-donate-btn"
              >
                অনলাইনে অনুদান দিন
              </button>
              
              <div className="text-xs text-emerald-200 bg-emerald-950/60 px-4 py-2.5 rounded-xl border border-emerald-800">
                <span>বিকাশ / নগদ: </span>
                <strong className="text-white font-mono text-sm">{settings.bkashNumber.split(' ')[0]}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FEATURED BLOGS / ARTICLES */}
      {featuredBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                ইসলামিক প্রবন্ধ ও মাদরাসা বার্তা
              </span>
              <h3 className="text-2xl font-bold font-heading text-slate-900 mt-1">
                মাদরাসার ব্লগ ও সমসাময়িক লেখা
              </h3>
            </div>
            
            <button
              onClick={() => onNavigate('blog')}
              className="text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>সকল ব্লগ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBlogs.map((blog) => (
              <div 
                key={blog.id}
                onClick={() => onNavigate('blog')}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
              >
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="text-emerald-800 font-semibold">{blog.category}</span>
                      <span>{blog.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-800 text-sm sm:text-base line-clamp-2 leading-snug">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{blog.author}</span>
                    <span className="text-emerald-700 font-semibold">পড়ুন →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. FINAL ADMISSION CTA BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-emerald-950">
              {settings.admissionYear} শিক্ষাবর্ষে আপনার সন্তানকে দ্বীনের খাদেম বানান
            </h3>
            <p className="text-xs sm:text-sm text-emerald-800 mt-1">
              আবাসিক, অনাবাসিক ও ডে-কেয়ার বিভাগে ভর্তি চলছে। সীমিত আসন সংখ্যা।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('admission')}
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all"
            >
              অনলাইনে ভর্তি ফরম
            </button>
            <a
              href={`tel:${settings.phonePrimary}`}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl border border-slate-300 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>{settings.phonePrimary}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
