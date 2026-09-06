/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Menu, 
  X, 
  GraduationCap, 
  HeartHandshake,
  Award,
  FileText,
  BookOpen,
  Image,
  Phone,
  Info,
  Home,
  Building2,
  Lock,
  ScrollText
} from 'lucide-react';
import { NavigationTab, SiteSettings } from '../types';
import { formatDriveImageUrl } from '../utils/imageUtils';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  settings: SiteSettings;
  isAdminLoggedIn?: boolean;
}

export function Header({ currentTab, onNavigate, settings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // All application page tabs
  const allTabs: {
    id: NavigationTab;
    label: string;
    subtitle: string;
    icon: any;
    badge?: string;
  }[] = [
    { id: 'home', label: 'হোম পেজ', subtitle: 'স্লাইডার, মূল তথ্য ও কার্যক্রম', icon: Home },
    { id: 'admission', label: 'ভর্তি তথ্য ও আবেদন', subtitle: 'অনলাইন ভর্তি ফরম ও আসন সংখ্যা', icon: GraduationCap, badge: 'চলমান' },
    { id: 'results', label: 'পরীক্ষার ফলাফল', subtitle: 'রোল ও পরীক্ষা অনুযায়ী মার্কশিট', icon: Award, badge: 'রেজাল্ট' },
    { id: 'notices', label: 'নোটিশ বোর্ড', subtitle: 'জরুরি বিজ্ঞপ্তি ও পরীক্ষার সময়সূচি', icon: FileText },
    { id: 'syllabus', label: 'সিলেবাস ও কিতাব', subtitle: 'জামাতভিত্তিক কিতাবের তালিকা', icon: BookOpen },
    { id: 'campus', label: 'ক্যাম্পাস পরিচিতি', subtitle: 'যাত্রাবাড়ী ও ডেমরা শাখা', icon: Building2 },
    { id: 'about', label: 'আমাদের সম্পর্কে', subtitle: 'ইতিহাস, লক্ষ্য ও শিক্ষক পরিষদ', icon: Info },
    { id: 'rules', label: 'শিক্ষার্থী নীতিমালা', subtitle: 'মাদরাসার নিয়ম-কানুন ও শৃঙ্খলা', icon: ScrollText },
    { id: 'khidmat-fund', label: 'খেদমত ফান্ড', subtitle: 'সদকা, যাকাত ও অনুদান বিকাশ/নগদ', icon: HeartHandshake, badge: 'দান' },
    { id: 'gallery', label: 'ফটোগ্যালারি', subtitle: 'ক্যাম্পাস ও বিভিন্ন অনুষ্ঠানের স্থিরচিত্র', icon: Image },
    { id: 'blog', label: 'ইসলামিক ব্লগ', subtitle: 'দ্বীনি প্রবন্ধ ও সচেতনতামূলক লেখা', icon: FileText },
    { id: 'contact', label: 'যোগাযোগ ও হেল্পলাইন', subtitle: 'ফোন, ইমেইল ও গুগল ম্যাপ লোকেশন', icon: Phone },
    { id: 'admin', label: 'এডমিন প্যানেল', subtitle: 'মাদরাসা তথ্য ব্যবস্থাপনা ও সিঙ্ক', icon: Lock },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoSrc = formatDriveImageUrl(settings.logoUrl);

  return (
    <header className="w-full bg-white shadow-xs border-b border-slate-200 no-print z-40 relative">
      
      {/* MAIN LOGO & BRANDING ROW (হেডার এর পাশে একটাই নেভিগেশন বার আইকন) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Madrasa Title */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3.5 text-left group focus:outline-none"
            id="header-brand-logo-btn"
          >
            {logoSrc && !logoError ? (
              <img
                src={logoSrc}
                alt={settings.madrasaNameBn}
                onError={() => setLogoError(true)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover shadow-sm border border-emerald-700/20 group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 flex items-center justify-center text-white shadow-sm border border-emerald-700/40 group-hover:scale-105 transition-transform shrink-0">
                <div className="text-center leading-none">
                  <span className="block font-arabic text-2xl font-bold text-amber-300">م</span>
                  <span className="block text-[8px] font-serif font-semibold tracking-wider text-emerald-200 uppercase mt-0.5">IHSAN</span>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif tracking-tight group-hover:text-emerald-800 transition-colors">
                  {settings.madrasaNameBn || 'মাদরাসা মারকাযুল ইহসান ঢাকা'}
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full font-serif">
                  {settings.establishedDate || '২০১৮ ইং'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-serif tracking-wide truncate max-w-[280px] sm:max-w-xl">
                {settings.madrasaNameEn || 'Madrasa Markazul Ihsan Dhaka'}
              </p>
              <p className="hidden md:block font-arabic text-xs text-emerald-800 font-semibold mt-0.5">
                {settings.madrasaArabicMotto || 'مَدْرَسَةُ مَرْكَزِ الْإِحْسَانِ دَكَّا — لِلتَّعْلِيمِ وَالتَّرْبِيَةِ'}
              </p>
            </div>
          </button>

          {/* হেডার এর পাশে একমাত্র নেভিগেশন বার আইকন (Menu Bar Icon) */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2.5 sm:p-3 rounded-2xl transition-all shadow-sm flex items-center justify-center cursor-pointer border ${
                isMenuOpen
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-inner'
                  : 'bg-emerald-900 hover:bg-emerald-950 text-amber-300 border-emerald-700 hover:scale-105 active:scale-95'
              }`}
              title={isMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু তালিকা খুলুন'}
              aria-label="নেভিগেশন মেনু বার"
              id="header-bar-nav-icon-btn"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 3. ইন-পেজ মেনু তালিকা (কোনো নতুন পেজ বা পপআপ ইন্টারফেস ছাড়া হোম পেজেই মেনু ড্রপডাউন) */}
      {isMenuOpen && (
        <div 
          className="w-full bg-slate-50 border-t border-b border-emerald-800/40 shadow-xl py-6 px-4 sm:px-6 lg:px-8 transition-all animate-in slide-in-from-top-2 duration-200"
          id="header-inpage-menus-list"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 animate-pulse"></span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                  মাদরাসার সকল মেনু ও বিভাগ
                </h2>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-xs text-slate-500 hover:text-rose-600 font-bold flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>বন্ধ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {allTabs.map((item) => {
                const Icon = item.icon;
                const isCurrent = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 group ${
                      isCurrent
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600/30 shadow-xs'
                        : 'bg-white hover:bg-emerald-50/70 border-slate-200 hover:border-emerald-300 text-slate-800 shadow-xs'
                    }`}
                    id={`menu-item-${item.id}`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                      isCurrent
                        ? 'bg-emerald-800 text-amber-300 shadow-xs'
                        : 'bg-slate-100 text-emerald-800 border border-slate-200 group-hover:bg-emerald-700 group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs sm:text-sm font-bold truncate block ${isCurrent ? 'text-emerald-950' : 'group-hover:text-emerald-900'}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-sm bg-amber-400 text-slate-950 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 truncate block mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
