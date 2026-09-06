import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  UserCheck, 
  Target, 
  Sparkles,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { SiteSettings, NavigationTab, TeacherItem } from '../types';
import { TeacherProfileSection } from '../components/TeacherProfileSection';
import { storageService } from '../services/storageService';

interface AboutViewProps {
  settings: SiteSettings;
  onNavigate: (tab: NavigationTab) => void;
  teachers?: TeacherItem[];
}

export function AboutView({ settings, onNavigate, teachers: propsTeachers }: AboutViewProps) {
  const teachers = propsTeachers && propsTeachers.length > 0 ? propsTeachers : storageService.getTeachers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>আমাদের সম্পর্কে</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            মারকাযুল ইহসানের পরিচিতি ও ইতিহাস
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {settings.tagline}
          </p>
        </div>
      </div>

      {/* 1. শুরু কথা ও ইতিহাস */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              সূচনা ও পথচলা
            </span>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mt-1">
              মাদরাসার শুরু কথা ও সংক্ষিপ্ত ইতিহাস
            </h2>
          </div>

          <div className="prose prose-slate text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            <p>
              আল্লাহ তায়ালার অশেষ মেহেরবানীতে দ্বীনি ইলমের আলো ছড়িয়ে দিতে এবং একটি যুগোপযোগী আদর্শ ইসলামী শিক্ষা প্রতিষ্ঠান গড়ে তোলার মহৎ উদ্দেশ্যে <strong>২৩ জুন ২০১৮ ইং</strong> তারিখে ঢাকার পশ্চিম যাত্রাবাড়ীতে মারকাযুল ইহসানের আনুষ্ঠানিক শিক্ষা কার্যক্রমের শুভ সূচনা হয়।
            </p>
            <p>
              সূচনালগ্ন থেকেই প্রতিষ্ঠানটি কওমি মাদরাসার ঐতিহ্যবাহী ধারার পূর্ণ হেফাজত করে মুখস্থনির্ভর পড়াশোনার পাশাপাশি সহীহ তরবিয়ত, সুন্দর আখলাক এবং বিশুদ্ধ কুরআন তিলাওয়াত ও হাদিসের গভীর তত্ত্ব অনুধাবনের ওপর গুরুত্ব দিয়ে আসছে।
            </p>
            <p>
              ছাত্রদের সংখ্যা বৃদ্ধি ও স্থান সংকুলান না হওয়ার কারণে পরবর্তীতে ঢাকার পাইটি, ডেমরায় স্থায়ী ক্যাম্পাস নির্মাণের উদ্দেশ্যে জমি ক্রয় করা হয় এবং সেখানে উচ্চতর জামাতসমূহের শিক্ষা কার্যক্রম সম্প্রসারিত করা হয়।
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100">
              <span className="text-xs font-semibold text-emerald-900 block">মূল লক্ষ্য:</span>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                ইলমে ওহীর ধারক-বাহক এমন একদল মুখলিস আলেম ও হাফেজ তৈরি করা, যারা দেশ ও জাতির সঠিক দিকনির্দেশনা দিতে সক্ষম হবেন।
              </p>
            </div>
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-100">
              <span className="text-xs font-semibold text-amber-900 block">মূল আদর্শ:</span>
              <p className="text-xs sm:text-sm text-slate-700 mt-1">
                আহলুস সুন্নাত ওয়াল জামাআতের আকিদা এবং দারুল উলুম দেওবন্দের মহান আকাবীরগণের ত্যাগ ও বুজুর্গির পথ অনুসরণ।
              </p>
            </div>
          </div>
        </div>

        {/* Quick Facts Sidebar */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold font-heading text-slate-900 border-b border-slate-100 pb-2">
            এক নজরে মারকাযুল ইহসান
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block text-xs">প্রতিষ্ঠানের পূর্ণ নাম:</span>
              <strong className="text-slate-900 font-heading">{settings.madrasaNameBn}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">ইংরেজি নাম:</span>
              <strong className="text-slate-800 font-sans">{settings.madrasaNameEn}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">প্রতিষ্ঠাকাল:</span>
              <strong className="text-emerald-800">{settings.establishedDate}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">প্রতিষ্ঠাতা ও মুহতামিম:</span>
              <strong className="text-slate-900">{settings.founderName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">কারিকুলাম:</span>
              <strong className="text-slate-800">বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">ক্যাম্পাসসমূহ:</span>
              <p className="text-slate-700 mt-0.5">
                ১. পশ্চিম যাত্রাবাড়ী (অস্থায়ী)<br />
                ২. পাইটি, ডেমরা (স্থায়ী)
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate('admission')}
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              ভর্তি তথ্য দেখুন
            </button>
          </div>
        </div>
      </div>

      {/* 2. প্রতিষ্ঠাতা ও পরিচালনা পরিষদ */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            দিকনির্দেশনা ও নেতৃত্ব
          </span>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mt-1">
            প্রতিষ্ঠাতা ও মোতাওয়াল্লীর বাণী
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto bg-gradient-to-br from-emerald-800 to-teal-950 text-white flex items-center justify-center shadow-lg border-4 border-emerald-100">
              <span className="font-arabic text-4xl text-amber-300">م</span>
            </div>
            <h4 className="font-bold text-slate-900 mt-3 font-heading text-base">
              {settings.founderName}
            </h4>
            <p className="text-xs text-slate-500">
              প্রতিষ্ঠাতা, পরিচালক ও মোতাওয়াল্লী
            </p>
          </div>

          <div className="md:col-span-8 bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
            <p className="italic text-slate-800 font-serif">
              "বিসমিল্লাহির রাহমানির রাহীম। সমস্ত প্রশংসা মহান রব্বুল আলামীনের, যিনি আমাদেরকে দ্বীনের খাদেম হিসেবে কবুল করেছেন। মারকাযুল ইহসান কোনো সাধারণ শিক্ষালয় নয়; এটি একটি আদর্শিক পরিবার। আমরা চেষ্টা করি প্রতিটি ছাত্রের অন্তরে তাকওয়া, বিনয়, আল্লাহর ভয় এবং সুন্নাহর গভীর মহব্বত প্রতিষ্ঠা করতে।"
            </p>
            <p>
              "আমরা অভিভাবকদের প্রতি আন্তরিক কৃতজ্ঞতা জানাই যারা আমাদের ওপর আস্থা রেখে তাদের নয়নমণি সন্তানদের দ্বীনি শিক্ষার জন্য অর্পণ করেছেন। সকলের দোআ ও সহযোগিতাই আমাদের পথচলার মূল প্রেরণা।"
            </p>
          </div>
        </div>
      </div>

      {/* 3. সম্মানিত শিক্ষক ও উস্তাদমণ্ডলীর পরিচিতি (Teacher Profiles & Designations) */}
      <TeacherProfileSection teachers={teachers} />

      {/* 4. বিশেষ বৈশিষ্ট্যসমূহ (Grid) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            আমাদের প্রাতিষ্ঠানিক মানদণ্ড
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-1">
            মাদরাসার বিশেষ বৈশিষ্ট্য ও সুবিধাসমূহ
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'বিশুদ্ধ তাজবীদ ও আন্তর্জাতিক হিফজ',
              desc: 'আন্তর্জাতিক মানের মশকের মাধ্যমে সুর ও লাহনের সঠিক প্রয়োগ নিশ্চিত করে হিফজ সমাপন।'
            },
            {
              title: 'অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকবৃন্দ',
              desc: 'দারুল উলুম দেওবন্দ ও দেশের শীর্ষস্থানীয় জামেয়া থেকে ফারেগ প্রাজ্ঞ উস্তাদমণ্ডলী দ্বারা পাঠদান।'
            },
            {
              title: 'শীতাতপ নিয়ন্ত্রিত (AC) ক্লাসরুম',
              desc: 'ছাত্রদের দীর্ঘ সময় পড়াশোনায় ক্লান্তি দূর করতে হিফজ ও গুরুত্বপূর্ণ ক্লাসে এসি সুবিধা।'
            },
            {
              title: 'সুশৃঙ্খল ছাত্রাবাস ও মেস ব্যবস্থা',
              desc: 'দিন-রাত ২৪ ঘণ্টা হোস্টেল সুপারদের তত্ত্বাবধান এবং নিয়মিত পুষ্টিকর সুষম খাদ্য।'
            },
            {
              title: 'সিসিটিভি নিরাপত্তা ও নিরিবিলি পরিবেশ',
              desc: 'ক্যাম্পাসের প্রতিটি কোণ সার্বক্ষণিক ডিজিটাল নজরদারির আওতায় রাখা হয়।'
            },
            {
              title: 'নিয়মিত অভিভাবক বৈঠক ও অগ্রগতি রিপোর্ট',
              desc: 'প্রতি সাময়িক পরীক্ষার পর অভিভাবক সমাবেশ ও ফলাফলের ডায়রি মূল্যায়ন।'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 font-bold text-xs">
                  ০{idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 text-base font-heading mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
