import { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Check,
  FileText
} from 'lucide-react';
import { SiteSettings } from '../types';

interface RulesViewProps {
  settings: SiteSettings;
}

export function RulesView({ settings }: RulesViewProps) {
  const [activeTab, setActiveTab] = useState<'pledge' | 'hostel' | 'routine' | 'library' | 'parents'>('pledge');

  const studentPledge10 = [
    '১. আমি সদা সত্য কথা বলিব, কখনো মিথ্যা বা প্রবঞ্চনার আশ্রয় গ্রহণ করিব না।',
    '২. পাঁচ ওয়াক্ত নামাজ তাকবীরে উলার সহিত জামাতের সাথে আদায় করিব এবং তাহাজ্জুদ ও সুন্নাতের পাবন্দি করিব।',
    '৩. রাসূলুল্লাহ (সা.)-এর সুন্নাহ মোতাবেক পোশাক-পরিচ্ছদ, চুল ও চালচলন রক্ষা করিব এবং সুন্নাতের পরিপন্থী সকল কাজ হইতে বিরত থাকিব।',
    '৪. উস্তাদ ও মুরব্বিদের প্রতি পূর্ণ শ্রদ্ধা ও তাজিম প্রদর্শন করিব এবং তাঁহাদের আদেশ-নিষেধ সানন্দে মান্য করিব।',
    '৫. মাদরাসার সকল ক্লাসে যথা সময়ে উপস্থিত থাকিব এবং দৈনিক সবক ও মুতালাআয় কোনো অবহেলা করিব না।',
    '৬. সহপাঠী ও ছোট ভাইদের প্রতি স্নেহশীল হইব এবং কোনো প্রকার মারামারি, গীবত বা অসদাচরণ করিব না।',
    '৭. মাদরাসার সকল আসবাবপত্র, কিতাব ও জাতীয় সম্পদের হেফাজত করিব এবং কোনো প্রকার ক্ষতিসাধন করিব না।',
    '৮. বিনা অনুমতিতে কখনো মাদরাসা বা ছাত্রাবাস এলাকার বাহিরে গমন করিব না।',
    '৯. রাজনৈতিক বা দ্বীন পরিপন্থী কোনো দল বা সংগঠনে জড়িত হইব না এবং স্মার্টফোন বা নিষিদ্ধ কোনো বস্তু ব্যবহার করিব না।',
    '১০. আমার জীবন ও চরিত্রকে একনিষ্ঠভাবে দ্বীনের খেদমত ও আখেরাতের কামিয়াবির জন্য উৎসর্গ করিব।'
  ];

  const dailyRoutine = [
    { time: 'ভোর ৪:৩০ - ৫:০০', event: 'তাহাজ্জুদ নামাজ, ফজর পূর্ব তিলাওয়াত ও প্রস্তুতি' },
    { time: 'ভোর ৫:০০ - ৬:০০', event: 'ফজরের জামাত, সকালের সুবাসিত জিকির ও দোয়া' },
    { time: 'সকাল ৬:০০ - ৭:৩০', event: '১ম ঘণ্টা: হিফজ সবক / কিতাব মুতালাআ ও দরস' },
    { time: 'সকাল ৭:৩০ - ৮:১৫', event: 'সকালের নাস্তা ও সামান্য বিশ্রাম' },
    { time: 'সকাল ৮:১৫ - ১১:৪৫', event: 'প্রধান একাডেমিক ক্লাসের ঘণ্টা (নাহু, সারফ, ফেকাহ, হাদিস ও হিফজ)' },
    { time: 'দুপুর ১২:০০ - ১:০০', event: 'গোসল, ব্যক্তিগত পরিষ্কার-পরিচ্ছন্নতা ও কায়লুলা (দুপুরের সুন্নাত বিশ্রাম)' },
    { time: 'দুপুর ১:০০ - ২:০০', event: 'যোহরের জামাত ও দুপুরের পুষ্টিকর আহার' },
    { time: 'দুপুর ২:০০ - ৩:৪৫', event: 'বিকেলের কিতাব দরস ও তাজবীদ মশক' },
    { time: 'বিকাল ৪:০০ - ৫:১৫', event: 'আছরের নামাজ, মাদরাসা মাঠে সুস্থ শারীরিক খেলাধুলা ও মুক্ত হাওয়া' },
    { time: 'মাগরিব - এশা', event: 'মাগরিবের জামাত, সবকী ও হিফজ পুনরাবৃত্তি' },
    { time: 'রাত ৮:০০ - ৯:০০', event: 'এশার জামাত ও রাতের খাবার' },
    { time: 'রাত ৯:০০ - ১০:৩০', event: 'রাতের গভীর মুতালাআ, তাকরার ও পড়া প্রস্তুতকরণ' },
    { time: 'রাত ১০:৩০', event: 'শোয়ার পূর্বে মাসনূন দোআ পাঠ ও বাতি নিভিয়ে ঘুমানো' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
          <BookOpen className="w-4 h-4" />
          <span>ছাত্র নির্দেশিকা ও নীতিমালা</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          মারকাযুল ইহসান শিক্ষার্থী নীতিমালা ও তথ্যকোষ
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-2xl">
          চরিত্র গঠন, নিয়মানুবর্তিতা এবং সুন্নাহসম্মত আদব আখলাকই একজন সাচ্চা আলেমেদ্বীন ও হাফেজের আসল পরিচয়।
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'pledge', label: '১০ দফা অঙ্গীকারনামা', icon: ShieldCheck },
          { id: 'routine', label: 'দৈনিক সময়সূচী', icon: Clock },
          { id: 'hostel', label: 'ছাত্রাবাস ও হোস্টেল নিয়ম', icon: BookOpen },
          { id: 'library', label: 'কুতুবখানা বিধিমালা', icon: FileText },
          { id: 'parents', label: 'অভিভাবক নির্দেশিকা', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
              id={`rules-tab-${tab.id}`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ১০ দফা অঙ্গীকারনামা */}
      {activeTab === 'pledge' && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              ভর্তিকালীন বাধ্যবাধকতা
            </span>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mt-1">
              মারকাযুল ইহসানের ছাত্রের ১০ দফা অঙ্গীকারনামা
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              প্রত্যেক ছাত্রকে ভর্তির সময়ে এই অঙ্গীকারনামায় স্বাক্ষর করতে হয়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentPledge10.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
            <span>* এই নীতিমালা ভঙ্গের ক্ষেত্রে মাদরাসার শৃঙ্খলা কমিটি প্রয়োজনীয় শাসনমূলক ব্যবস্থা নেওয়ার অধিকার রাখে।</span>
          </div>
        </div>
      )}

      {/* TAB 2: দৈনিক সময়সূচী */}
      {activeTab === 'routine' && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              দৈনন্দিন রুটিন
            </span>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mt-1">
              তাহাজ্জুদ থেকে এশা পর্যন্ত ২৪ ঘণ্টার সময়সূচী
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-emerald-900 text-white">
                  <th className="p-3.5 font-semibold rounded-tl-lg w-48">সময়</th>
                  <th className="p-3.5 font-semibold rounded-tr-lg">কর্মসূচি ও কার্যক্রম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {dailyRoutine.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-emerald-900 font-heading bg-emerald-50/40">
                      {item.time}
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">
                      {item.event}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ছাত্রাবাস ও হোস্টেল নিয়ম */}
      {activeTab === 'hostel' && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              ছাত্রাবাস ও মেস ব্যবস্থাপনা নিয়মাবলী
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-heading block">১. পরিষ্কার-পরিচ্ছন্নতা:</strong>
              <p>প্রতিটি ছাত্রের নিজ বিছানা, বাক্স ও পড়ার টেবিল সর্বদা পরিচ্ছন্ন ও পরিপাটি রাখতে হবে। ময়লা-আবর্জনা নির্দিষ্ট ডাস্টবিনে ফেলতে হবে।</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-heading block">২. অনুমতি ছাড়া প্রস্থান নিষেধ:</strong>
              <p>হোস্টেল সুপারের লিখিত পাস বা অনুমতি ছাড়া কোনো ছাত্র ক্যাম্পাসের বাইরে যেতে পারবে না।</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-heading block">৩. মোবাইল ফোন ও গ্যাজেট:</strong>
              <p>ছাত্রাবাসে সাধারণ শিক্ষার্থীদের স্মার্টফোন, ট্যাব বা যেকোনো ইলেকট্রনিক বিনোদন সামগ্রী রাখা সম্পূর্ণ নিষিদ্ধ। জরুরি প্রয়োজনে মাদরাসার অফিশিয়াল নম্বর ব্যবহার করতে হবে।</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-900 font-heading block">৪. খাবার সময় ও শালীনতা:</strong>
              <p>ডাইনিংয়ে নির্ধারিত সময়ে সুশৃঙ্খলভাবে লাইনে দাঁড়িয়ে খাবার গ্রহণ করতে হবে। অপচয় করা সম্পূর্ণরূপে পরিত্যাজ্য।</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: কুতুবখানা নিয়ম */}
      {activeTab === 'library' && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              কুতুবখানা ও কেন্দ্রীয় লাইব্রেরি বিধিমালা
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <p>
              মারকাযুল ইহসানের কুতুবখানায় তাফসীর, হাদীস, ফিকহ, উসূলে ফিকহ, আরবি সাহিত্য ও উর্দু কিতাবের এক সুবিশাল সংগ্রহ রয়েছে।
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>কুতুবখানায় প্রবেশের পর পূর্ণ নীরবতা বজায় রাখতে হবে।</li>
              <li>লাইব্রেরিয়ান উস্তাদের অনুমতি ছাড়া কোনো কিতাব লাইব্রেরির বাইরে নেওয়া যাবে না।</li>
              <li>ইস্যুকৃত কিতাবে কোনো প্রকার দাগ দেওয়া, পাতা ভাঁজ করা বা ছেঁড়া যাবে না।</li>
              <li>নির্ধারিত মেয়াদের মধ্যে কিতাব ফেরত দেওয়া বাধ্যতামূলক।</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 5: অভিভাবক নির্দেশিকা */}
      {activeTab === 'parents' && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              সম্মানিত অভিভাবকদের জন্য দিকনির্দেশনা
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <span className="font-bold text-amber-900 block mb-1">সাক্ষাতের নির্দিষ্ট সময়:</span>
              <p>প্রতি শুক্রবার সকাল ৮:০০ থেকে মাগরিবের পূর্ব পর্যন্ত অভিভাবকগণ ছাত্রদের সাথে সাক্ষাৎ করতে পারেন। বিশেষ প্রয়োজন ছাড়া ক্লাসের সময়ে সাক্ষাৎ পরিহার করতে অনুরোধ করা হচ্ছে।</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">ছুটি প্রদান নীতি:</span>
              <p>মাদরাসার বার্ষিক ক্যালেন্ডার অনুযায়ী ছাড়া মধ্যবর্তী সময়ে বিশেষ কারণ ব্যতীত সাধারণ ছুটি প্রদান করা হয় না।</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">ফি পরিশোধের সময়:</span>
              <p>প্রতি মাসের ১০ তারিখের মধ্যে মাসিক ফি পরিশোধ করার অনুরোধ করা যাচ্ছে। বিকাশ/নগদেও ফি জমা দেওয়া যায়।</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
