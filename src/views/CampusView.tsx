import { 
  Building2, 
  MapPin, 
  Phone, 
  Utensils, 
  Compass, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SiteSettings, NavigationTab } from '../types';

interface CampusViewProps {
  settings: SiteSettings;
  onNavigate: (tab: NavigationTab) => void;
}

export function CampusView({ settings, onNavigate }: CampusViewProps) {
  const mealSchedule = [
    { time: 'সকালের নাস্তা', menu: 'পরোটা/রুটি, ডাল/সবজি অথবা হালুয়া/ডিম ও নিয়মিত দুধ' },
    { time: 'দুপুরের খাবার', menu: 'সুগন্ধি চালের ভাত, টাটকা মাছ/মুরগির মাংস, পুষ্টিকর ডাল ও সুস্বাদু সবজি' },
    { time: 'রাতের খাবার', menu: 'সুষম ভাত, ডিম/সবজি/মাছ ও পাতলা ডাল' },
    { time: 'বিশেষ আয়োজন', menu: 'প্রতি সপ্তাহে বিশেষ পোলাও/বিরিয়ানি ও মিষ্টির ব্যবস্থা' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            <span>আমাদের ক্যাম্পাসসমূহ</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            মারকাযুল ইহসানের ক্যাম্পাস পরিচিতি
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            ঢাকার যাত্রাবাড়ীতে অবস্থিত অস্থায়ী ক্যাম্পাস এবং পাইটি, ডেমরায় নিজস্ব জমিতে সম্প্রসারিত স্থায়ী ক্যাম্পাসে শিক্ষার্থীদের পাঠদান ও তরবিয়তের সুব্যবস্থা রয়েছে।
          </p>
        </div>
      </div>

      {/* Dual Campus Comparison / Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Temporary Campus */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                alt="অস্থায়ী ক্যাম্পাস পশ্চিম যাত্রাবাড়ী"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow-md">
                অস্থায়ী ক্যাম্পাস (যাত্রা শুরু ২০১৮)
              </span>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-xl font-bold font-heading">পশ্চিম যাত্রাবাড়ী ক্যাম্পাস</h2>
                <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{settings.addressTemporary}</span>
                </p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  ক্যাম্পাস পরিচিতি ও সুবিধা
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  যাত্রাবাড়ী প্রাণকেন্দ্রে অবস্থিত বহুতল ভবনে মাদরাসার মূল শিক্ষা কার্যক্রম শুরু হয়েছিল। এখানে আন্তর্জাতিক মানের হিফজুল কুরআন বিভাগ এবং নূরানী-নাযেরা শিক্ষার্থীদের জন্য শীতাতপ নিয়ন্ত্রিত আরামদায়ক ও পরিচ্ছন্ন পরিবেশ রয়েছে।
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  পরিচালিত শিক্ষা কার্যক্রম:
                </h4>
                {[
                  'শিশু ও নূরানী বিভাগ (৪-৬ বছর)',
                  'নাযেরা ও তাজবীদ বিভাগ',
                  'আন্তর্জাতিক হিফজুল কুরআন বিভাগ (শীতাতপ সুবিধা)',
                  'খুসূসী ও কিতাব প্রাথমিক জামাত (মীযান ও নাহবেমীর)',
                  'আবাসিক ও অনাবাসিক হোস্টেল ব্যবস্থা'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600">হটলাইন: <strong className="text-slate-900 font-sans">{settings.phonePrimary}</strong></span>
            <button
              onClick={() => onNavigate('admission')}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>ভর্তি আবেদন</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Permanent Campus */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
                alt="স্থায়ী ক্যাম্পাস পাইটি ডেমরা"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-md">
                স্থায়ী ক্যাম্পাস (নিজস্ব সম্পত্তি)
              </span>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-xl font-bold font-heading">পাইটি, ডেমরা স্থায়ী ক্যাম্পাস</h2>
                <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{settings.addressPermanent}</span>
                </p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  জমির পরিমাণ ও বর্তমান কার্যক্রম
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  আল্লাহর অশেষ রহমতে পাইটি, ডেমরায় সুবিশাল প্রাকৃতিক মনোরম পরিবেশে স্থায়ী ক্যাম্পাসের জমি ক্রয় ও উন্নয়ন কাজ সম্পন্ন হয়েছে। এখানে উচ্চতর কিতাব বিভাগ ও দাওরায়ে হাদীস শাখা পরিচালিত হচ্ছে।
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  ভবিষ্যৎ পরিকল্পনা ও কমপ্লেক্স:
                </h4>
                {[
                  '৬ তলা বিশিষ্ট বহুতল একাডেমিক ভবন নির্মাণ',
                  'সুবিশাল কেন্দ্রীয় জামে মসজিদ ও উন্মুক্ত মিনার',
                  'সমৃদ্ধ ইসলামিক রিসার্চ লাইব্রেরি ও কুতুবখানা',
                  '১০০০ জন ছাত্রের উন্নত স্বাস্থ্যসম্মত ডরমিটরি ও মেস',
                  'উন্নত আইটি ল্যাব ও ভাষা শিক্ষা একাডেমি'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-600">নির্মাণ ফান্ডে দান করতে পারেন</span>
            <button
              onClick={() => onNavigate('khidmat-fund')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>খেদমত ফান্ড</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. FOOD & MEAL INFORMATION (খাদ্য ও পুষ্টি ব্যবস্থা) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                খাদ্য ও ডাইনিং ব্যবস্থা
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                স্বাস্থ্যকর খাবার ও সুষম মিলের তথ্য
              </h3>
            </div>
          </div>

          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">
            অভিজ্ঞ বাবুর্চি দ্বারা নিয়মিত প্রস্তুত
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          কুরআনের হাফেজ ও আলেম ছাত্রদের শারীরিক সুস্থতা ও মেধা বিকাশে পুষ্টিকর ও সুষম খাবার নিশ্চিত করা আমাদের সর্বোচ্চ অগ্রাধিকার। পরিষ্কার-পরিচ্ছন্ন আধুনিক রান্নাঘরে হালাল ও টাটকা খাদ্যদ্রব্য দিয়ে খাবার তৈরি করা হয়।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mealSchedule.map((meal, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mb-2">
                {meal.time}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {meal.menu}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
          <span>* বিশুদ্ধ ফিল্টারকৃত খাবার পানি এবং প্রতি বেলা খাওয়ার পর হাত ধোয়ার সুব্যবস্থা।</span>
          <span>* এতিম ও অসচ্ছল ছাত্রদের জন্য লিল্লাহ বোর্ডিংয়ের মাধ্যমে বিনামূল্যে খাবার সরবরাহ করা হয়।</span>
        </div>
      </div>

      {/* 4. CAMPUS CONTACT & VISIT INFORMATION */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center lg:text-left">
          <h3 className="text-xl font-bold font-heading text-white">
            ক্যাম্পাস স্বচক্ষে পরিদর্শন করার সাদর আমন্ত্রণ
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200">
            শনিবার থেকে বৃহস্পতিবার সকাল ৮:০০ টা থেকে বিকাল ৫:০০ টা পর্যন্ত অভিভাবকবৃন্দ সরাসরি ক্যাম্পাসে এসে পরিবেশ দেখতে পারেন।
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors"
          >
            ক্যাম্পাস লোকেশন ও ম্যাপ
          </button>
          <a
            href={`tel:${settings.phonePrimary}`}
            className="px-5 py-2.5 bg-emerald-950 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-xl border border-emerald-600 transition-colors"
          >
            কথা বলুন: {settings.phonePrimary}
          </a>
        </div>
      </div>

    </div>
  );
}
