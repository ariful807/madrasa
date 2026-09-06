/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  HeartHandshake, 
  GraduationCap, 
  BookOpen, 
  Lock,
  ChevronRight,
  Home,
  Award,
  FileText,
  Image,
  ScrollText,
  Info,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { NavigationTab, SiteSettings } from '../types';
import { formatDriveImageUrl, THEME_PALETTES } from '../utils/imageUtils';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
  settings: SiteSettings;
}

export function Footer({ onNavigate, settings }: FooterProps) {
  const [logoError, setLogoError] = useState(false);
  const theme = THEME_PALETTES[settings.themeColor || 'emerald'] || THEME_PALETTES.emerald;
  const logoSrc = formatDriveImageUrl(settings.logoUrl);

  const handleNav = (tab: NavigationTab) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated quick shortcuts list for footer
  const quickShortcuts: { id: NavigationTab; label: string; icon: any; isHighlight?: boolean; badge?: string }[] = [
    { id: 'home', label: 'হোম পেজ', icon: Home },
    { id: 'admission', label: 'ভর্তি আবেদন ফরম', icon: GraduationCap, isHighlight: true, badge: 'চলমান' },
    { id: 'results', label: 'পরীক্ষার রেজাল্ট', icon: Award, isHighlight: true },
    { id: 'notices', label: 'নোটিশ বোর্ড', icon: FileText },
    { id: 'syllabus', label: 'সিলেবাস ও কিতাব', icon: BookOpen },
    { id: 'campus', label: 'ক্যাম্পাস পরিচিতি', icon: Building2 },
    { id: 'about', label: 'আমাদের সম্পর্কে', icon: Info },
    { id: 'rules', label: 'শিক্ষার্থী নীতিমালা', icon: ScrollText },
    { id: 'khidmat-fund', label: 'খেদমত ফান্ড', icon: HeartHandshake, badge: 'দান' },
    { id: 'gallery', label: 'ফটোগ্যালারি', icon: Image },
    { id: 'blog', label: 'ইসলামিক প্রবন্ধ ও ব্লগ', icon: FileText },
    { id: 'contact', label: 'যোগাযোগ ও ম্যাপ', icon: Phone },
    { id: 'admin', label: 'এডমিন প্যানেল', icon: Lock },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-serif">
      
      {/* 1. TOP PRE-FOOTER HIGHLIGHT & CALL TO ACTIONS */}
      <div className={`bg-gradient-to-r ${theme.heroGradient} border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="font-arabic text-xl text-amber-300 block mb-1">
              {settings.madrasaArabicMotto}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              {settings.madrasaNameBn}
            </h3>
            <p className="text-sm text-slate-200 mt-1 max-w-xl">
              {settings.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleNav('admission')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-105"
              id="footer-cta-admission-btn"
            >
              <GraduationCap className="w-4 h-4" />
              <span>ভর্তি আবেদন করুন</span>
            </button>
            <button
              onClick={() => handleNav('khidmat-fund')}
              className="px-5 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2 hover:scale-105"
              id="footer-cta-donation-btn"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>খেদমত ফান্ডে দান করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DEDICATED QUICK SHORTCUTS SECTION (ফুটার এ ও শর্ট কার্ট থাকবে) */}
      <div className="bg-slate-950/80 border-b border-slate-800/90 py-8 px-4 sm:px-6 lg:px-8" id="footer-shortcuts-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white font-serif">
                  ওয়েবসাইট দ্রুত শর্টকাট
                </h4>
                <p className="text-xs text-slate-400">
                  এক ক্লিকে মাদরাসার যেকোনো পেজ ও বিভাগে প্রবেশ করুন
                </p>
              </div>
            </div>

            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
              ১৩টি গুরুত্বপূর্ণ শর্টকাট
            </span>
          </div>

          {/* Quick Shortcut Buttons Grid */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {quickShortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`p-3 rounded-xl border text-left transition-all group flex flex-col justify-between gap-2 relative ${
                    item.isHighlight
                      ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 hover:border-amber-400'
                      : 'bg-slate-900/90 hover:bg-emerald-950/80 border-slate-800 hover:border-emerald-700'
                  }`}
                  id={`footer-shortcut-${item.id}`}
                  title={item.label}
                >
                  <div className="flex items-center justify-between gap-1 w-full">
                    <div className={`p-1.5 rounded-lg shrink-0 ${
                      item.isHighlight 
                        ? 'bg-amber-500 text-slate-950 font-bold' 
                        : 'bg-slate-800 text-amber-300 group-hover:bg-emerald-700 group-hover:text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-amber-500 text-slate-950">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <span className={`text-xs font-semibold truncate block w-full mt-1 ${
                    item.isHighlight ? 'text-amber-300 font-bold' : 'text-slate-200 group-hover:text-emerald-300'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. MAIN FOOTER CONTENT (৪ কলাম বিস্তারিত তথ্য) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Madrasa Overview with Auto-Updating Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {logoSrc && !logoError ? (
                <img
                  src={logoSrc}
                  alt={settings.madrasaNameBn}
                  onError={() => setLogoError(true)}
                  className="w-11 h-11 rounded-lg object-cover border border-amber-500/40 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-11 h-11 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-arabic text-xl font-bold border border-emerald-600/40">
                  م
                </div>
              )}
              <div>
                <h4 className="font-bold text-white text-base font-serif">{settings.madrasaNameBn}</h4>
                <p className="text-xs text-slate-400">{settings.madrasaNameEn}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {settings.establishedDate}-এ প্রতিষ্ঠিত ঐতিহ্যবাহী দ্বীনি বিদ্যাপীঠ। আন্তর্জাতিক মানসম্মত হিফজুল কুরআন এবং দাওরায়ে হাদীস (মাস্টার্স) পর্যন্ত কিতাব বিভাগের নির্ভরযোগ্য প্রতিষ্ঠান।
            </p>
            <div className="pt-1">
              <p className="text-xs text-slate-400">
                <strong className="text-slate-300">প্রতিষ্ঠাতা:</strong> {settings.founderName}
              </p>
            </div>
          </div>

          {/* Column 2: Campuses Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm font-serif border-b border-slate-800 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>আমাদের ক্যাম্পাসসমূহ</span>
            </h4>
            
            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 space-y-1">
              <span className="text-xs font-semibold text-amber-400 block">
                অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী):
              </span>
              <p className="text-xs text-slate-300 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{settings.addressTemporary}</span>
              </p>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 space-y-1">
              <span className="text-xs font-semibold text-emerald-400 block">
                স্থায়ী ক্যাম্পাস (ডেমরা):
              </span>
              <p className="text-xs text-slate-300 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{settings.addressPermanent}</span>
              </p>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm font-serif border-b border-slate-800 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>গুরুত্বপূর্ণ লিংকসমূহ</span>
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'notices', label: 'নোটিশ বোর্ড' },
                { id: 'results', label: 'পরীক্ষার ফলাফল' },
                { id: 'syllabus', label: 'সিলেবাস ও বই' },
                { id: 'rules', label: 'নিয়ম-কানুন' },
                { id: 'campus', label: 'ক্যাম্পাস পরিচিতি' },
                { id: 'blog', label: 'ইসলামিক ব্লগ' },
                { id: 'gallery', label: 'ফটোগ্যালারি' },
                { id: 'about', label: 'আমাদের সম্পর্কে' },
                { id: 'contact', label: 'যোগাযোগ ও ম্যাপ' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id as NavigationTab)}
                    className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 text-left"
                    id={`footer-link-${link.id}`}
                  >
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Donation Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm font-serif border-b border-slate-800 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>যোগাযোগ ও অনুদান</span>
            </h4>
            
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${settings.phonePrimary}`} className="hover:text-white">
                  {settings.phonePrimary}
                </a>
                <span>/</span>
                <a href={`tel:${settings.phoneSecondary}`} className="hover:text-white">
                  {settings.phoneSecondary}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${settings.emailAddress || settings.email}`} className="hover:text-white truncate">
                  {settings.emailAddress || settings.email}
                </a>
              </p>
            </div>

            <div className="bg-slate-800/80 p-2.5 rounded border border-slate-700/60 text-[11px] text-slate-300">
              <span className="font-semibold block text-amber-400 mb-0.5">বিকাশ / নগদ অনুদান:</span>
              <p className="font-mono text-xs text-amber-300 font-semibold">{settings.bkashNumber.split(' ')[0]}</p>
              <span className="text-[10px] text-slate-400">রেফারেন্স: "Zakat" বা "Khedmat"</span>
            </div>
          </div>

        </div>

        {/* 4. Bottom Bar with Discreet Admin Access */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© ২০১৮ - {new Date().getFullYear()} {settings.madrasaNameBn} ({settings.madrasaNameEn})। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('rules')}
              className="hover:text-slate-200 transition-colors"
            >
              শিক্ষার্থী নীতিমালা
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60"
              title="মাদরাসা এডমিন কন্ট্রোল"
              id="footer-admin-link"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>এডমিন প্যানেল</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
