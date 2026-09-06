/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, type FormEvent } from 'react';
import { 
  Award, 
  Search, 
  Printer, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Building2,
  FileCheck2,
  GraduationCap,
  Download,
  FileDown,
  Loader2,
  Check
} from 'lucide-react';
import { StudentResult, SiteSettings, JamaatItem } from '../types';
import { storageService } from '../services/storageService';
import { formatDriveImageUrl } from '../utils/imageUtils';
import { downloadDomAsPdf, downloadDomAsImage } from '../utils/downloadUtils';

interface ResultsViewProps {
  results: StudentResult[];
  settings: SiteSettings;
  jamaats?: JamaatItem[];
}

export function ResultsView({ results, settings, jamaats: propJamaats }: ResultsViewProps) {
  const [selectedYear, setSelectedYear] = useState('২০২৬');
  const [selectedDept, setSelectedDept] = useState('সকল বিভাগ');
  const [selectedJamaat, setSelectedJamaat] = useState('সকল জামাত');
  const [rollInput, setRollInput] = useState('');
  const [searchedResult, setSearchedResult] = useState<StudentResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);
  const marksheetRef = useRef<HTMLDivElement>(null);

  // Dynamic Jamaat list from storage or props
  const allJamaats: JamaatItem[] = propJamaats || storageService.getJamaats();

  const departments = ['সকল বিভাগ', 'কিতাব বিভাগ', 'হিফজুল কুরআন', 'নাযেরা বিভাগ', 'নূরানী ও মক্তব'];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setHasSearched(true);

    const match = results.find(r => {
      const matchRoll = rollInput.trim() === '' || 
        r.rollNumber.trim().toLowerCase() === rollInput.trim().toLowerCase() ||
        r.registrationNumber.trim().toLowerCase() === rollInput.trim().toLowerCase();

      const matchYear = selectedYear === 'সব' || r.academicYear === selectedYear;
      const matchDept = selectedDept === 'সকল বিভাগ' || r.department === selectedDept;
      const matchJamaat = selectedJamaat === 'সকল জামাত' || 
        r.jamaat.toLowerCase().includes(selectedJamaat.toLowerCase()) || 
        selectedJamaat.toLowerCase().includes(r.jamaat.toLowerCase());

      return matchRoll && matchYear && matchDept && matchJamaat;
    });

    setSearchedResult(match || null);
  };

  const handleReset = () => {
    setRollInput('');
    setSelectedYear('২০২৬');
    setSelectedDept('সকল বিভাগ');
    setSelectedJamaat('সকল জামাত');
    setSearchedResult(null);
    setHasSearched(false);
  };

  const logoUrl = formatDriveImageUrl(settings.logoUrl);

  const handleDownloadPdf = async () => {
    if (!searchedResult || !marksheetRef.current || isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    setDownloadSuccessMsg(null);
    try {
      const cleanName = `Marksheet_Roll_${searchedResult.rollNumber}_${searchedResult.academicYear}`.replace(/\s+/g, '_');
      const success = await downloadDomAsPdf(marksheetRef.current, cleanName);
      if (success) {
        setDownloadSuccessMsg('নম্বরপত্র PDF সফলভাবে ডাউনলোড হয়েছে!');
        setTimeout(() => setDownloadSuccessMsg(null), 4000);
      }
    } catch (e) {
      console.error('Download PDF error:', e);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!searchedResult || !marksheetRef.current || isDownloadingImage) return;
    setIsDownloadingImage(true);
    setDownloadSuccessMsg(null);
    try {
      const cleanName = `Marksheet_Roll_${searchedResult.rollNumber}_${searchedResult.academicYear}`.replace(/\s+/g, '_');
      const success = await downloadDomAsImage(marksheetRef.current, cleanName);
      if (success) {
        setDownloadSuccessMsg('নম্বরপত্র ইমেজ (PNG) সফলভাবে ডাউনলোড হয়েছে!');
        setTimeout(() => setDownloadSuccessMsg(null), 4000);
      }
    } catch (e) {
      console.error('Download Image error:', e);
    } finally {
      setIsDownloadingImage(false);
    }
  };

  /**
   * Universal A4 Print Function:
   * Uses native window.print() combined with CSS @media print isolation in index.css.
   * Works smoothly on desktop and mobile without iframe sandbox or popup blocker issues.
   */
  const handlePrintMarksheet = () => {
    if (!searchedResult) return;
    try {
      window.print();
    } catch (e) {
      console.error('Print error:', e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-white font-serif">
      
      {/* 1. Clean White Header Title Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>পরীক্ষার ফলাফল ও সার্টিফিকেট পোর্টাল</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
            অনলাইন ফলাফল ও একাডেমিক মার্কশিট
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            শিক্ষাবর্ষ, বিভাগ ও জামাত নির্বাচন করে অথবা রোল / রেজিস্ট্রেশন নম্বর দিয়ে মূল নম্বরপত্র অনুসন্ধান ও প্রিন্ট করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
            পরীক্ষা বোর্ড: {settings.madrasaNameBn}
          </span>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs no-print" id="result-search-form">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                শিক্ষাবর্ষ
              </label>
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                id="select-result-year"
              >
                <option value="২০২৬">২০২৬ শিক্ষাবর্ষ</option>
                <option value="২০২৫">২০২৫ শিক্ষাবর্ষ</option>
                <option value="২০২৪">২০২৪ শিক্ষাবর্ষ</option>
                <option value="সব">সকল বছর</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                বিভাগ নির্বাচন
              </label>
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                id="select-result-dept"
              >
                {departments.map((dept, i) => (
                  <option key={i} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                জামাত / শ্রেণি (ড্যাশবোর্ড তালিকা)
              </label>
              <select
                value={selectedJamaat}
                onChange={e => setSelectedJamaat(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                id="select-result-jamaat"
              >
                <option value="সকল জামাত">সকল জামাত</option>
                {allJamaats.map(j => (
                  <option key={j.id} value={j.name}>{j.name} ({j.department})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                রোল বা রেজিস্ট্রেশন নম্বর *
              </label>
              <input
                type="text"
                value={rollInput}
                onChange={e => setRollInput(e.target.value)}
                placeholder="যেমন: 101 বা 102"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-sans"
                id="input-result-roll"
              />
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-slate-100 gap-3">
            <span className="text-xs text-slate-500">
              * টেস্ট রোল: <button type="button" onClick={() => setRollInput('101')} className="font-bold underline text-emerald-800 hover:text-emerald-950 font-sans">101</button>, <button type="button" onClick={() => setRollInput('102')} className="font-bold underline text-emerald-800 hover:text-emerald-950 font-sans">102</button>, <button type="button" onClick={() => setRollInput('103')} className="font-bold underline text-emerald-800 hover:text-emerald-950 font-sans">103</button> (ক্লিক করে সরাসরি টেস্ট করুন)
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>রিসেট</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-colors flex items-center gap-2"
                id="search-result-btn"
              >
                <Search className="w-4 h-4" />
                <span>ফলাফল অনুসন্ধান</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 3. Marksheet Area */}
      {hasSearched && (
        <div id="printable-marksheet-wrapper" className="space-y-4">
          
          {/* Quick Print and Download Action Bar Above Marksheet */}
          {searchedResult && (
            <div className="space-y-3 no-print">
              {downloadSuccessMsg && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{downloadSuccessMsg}</span>
                </div>
              )}

              <div className="bg-emerald-50 p-4 sm:p-5 rounded-2xl border border-emerald-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-emerald-950">
                  <FileCheck2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">ফলাফল সফলভাবে পাওয়া গেছে!</span>
                    <span className="text-slate-600">একাডেমিক নম্বরপত্রটি সরাসরি PDF বা ইমেজ আকারে ডাউনলোড করুন অথবা প্রিন্ট করুন।</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {/* Download PDF Button */}
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isDownloadingPdf || isDownloadingImage}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    id="download-marksheet-pdf-btn"
                  >
                    {isDownloadingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>PDF তৈরি হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>PDF ডাউনলোড</span>
                      </>
                    )}
                  </button>

                  {/* Download Image (PNG) Button */}
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={isDownloadingPdf || isDownloadingImage}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    id="download-marksheet-img-btn"
                  >
                    {isDownloadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>ইমেজ হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4" />
                        <span>ইমেজ ডাউনলোড</span>
                      </>
                    )}
                  </button>

                  {/* Print Button */}
                  <button
                    type="button"
                    onClick={handlePrintMarksheet}
                    className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold rounded-xl border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    id="print-marksheet-action-btn"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    <span>প্রিন্ট</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {searchedResult ? (
            /* ================= THE AUTHENTIC A4 MARKSHEET ================= */
            <div 
              ref={marksheetRef}
              id="printable-marksheet"
              className="bg-white rounded-none border-4 border-double border-emerald-900 shadow-md p-6 sm:p-10 max-w-[850px] mx-auto text-slate-900 relative"
              style={{ fontFamily: "'Noto Serif Bengali', 'Noto Serif', serif" }}
            >
              
              {/* Subtle Faint Institutional Watermark */}
              {logoUrl && (
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] overflow-hidden"
                  aria-hidden="true"
                >
                  <img 
                    src={logoUrl} 
                    alt="Watermark" 
                    className="w-96 h-96 object-contain grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Top Arabic Inscription */}
              <div className="text-center pb-2">
                <span className="font-arabic text-xl sm:text-2xl font-bold text-slate-800 tracking-wide block">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
                <span className="text-[11px] text-slate-500 font-serif">
                  رَبِّ زِدْنِي عِلْمًا — "হে আমার পালনকর্তা! আমার জ্ঞান বৃদ্ধি করে দিন।"
                </span>
              </div>

              {/* Institution Header with Verified Logo */}
              <div className="flex items-center justify-between gap-4 pt-2 pb-4 border-b-2 border-emerald-900">
                
                {/* Institutional Logo (Left / Top) */}
                <div className="shrink-0">
                  {logoUrl ? (
                    <img 
                      src={logoUrl} 
                      alt={settings.madrasaNameBn} 
                      className="w-18 h-18 sm:w-20 sm:h-20 object-contain rounded-full border-2 border-emerald-900 p-1 bg-white shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 border-emerald-900 flex items-center justify-center bg-emerald-50 text-emerald-950 font-bold font-arabic text-2xl">
                      م
                    </div>
                  )}
                </div>

                {/* Central Institution Identification */}
                <div className="text-center flex-1 space-y-0.5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-950 tracking-tight leading-none">
                    {settings.madrasaNameBn}
                  </h2>
                  <p className="font-arabic text-base sm:text-lg text-emerald-900 font-bold">
                    {settings.madrasaArabicMotto || 'مَرْكَزُ الْإِحْسَانِ لِلتَّعْلِيمِ وَالتَّرْبِيَةِ'}
                  </p>
                  <p className="text-xs text-slate-600 font-semibold tracking-wider uppercase font-sans">
                    {settings.madrasaNameEn}
                  </p>
                  <p className="text-[11px] text-slate-600 font-serif">
                    বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ ও আল-হাইআতুল উলয়া কারিকুলামভুক্ত
                  </p>
                  <p className="text-[10.5px] text-slate-500 font-serif">
                    পশ্চিম যাত্রাবাড়ী (অস্থায়ী ক্যাম্পাস) ও পাইটি, ডেমরা (স্থায়ী ক্যাম্পাস), ঢাকা
                  </p>
                </div>

                {/* Right Side: Befaq Monogram / Serial Badge */}
                <div className="shrink-0 text-right hidden sm:block">
                  <div className="border border-slate-300 rounded p-1.5 text-center bg-slate-50 text-[10px] space-y-0.5 min-w-[90px]">
                    <span className="text-slate-500 block">ক্রমিক নং:</span>
                    <strong className="font-mono text-slate-800 block text-xs">{searchedResult.rollNumber}-{searchedResult.academicYear}</strong>
                    <span className="text-[9px] text-emerald-800 font-bold block">অফিসিয়াল কপি</span>
                  </div>
                </div>

              </div>

              {/* Transcript Title Ribbon */}
              <div className="text-center my-3">
                <div className="inline-block bg-emerald-950 text-amber-300 px-6 py-1 rounded-sm text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs">
                  একাডেমিক নম্বরপত্র / ACADEMIC TRANSCRIPT
                </div>
                <div className="text-xs text-slate-700 font-semibold mt-1">
                  বার্ষিক / কেন্দ্রীয় পরীক্ষা মূল্যায়ন — {searchedResult.academicYear} শিক্ষাবর্ষ
                </div>
              </div>

              {/* Student Metadata Table */}
              <div className="border border-slate-700 mb-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 divide-x divide-slate-700">
                  
                  {/* Column 1 */}
                  <div className="divide-y divide-slate-300">
                    <div className="p-2 flex">
                      <span className="w-32 text-slate-500 font-medium">শিক্ষার্থীর নাম:</span>
                      <strong className="text-slate-900 font-heading text-sm">{searchedResult.studentName}</strong>
                    </div>
                    <div className="p-2 flex">
                      <span className="w-32 text-slate-500 font-medium">পিতার নাম:</span>
                      <span className="text-slate-800 font-medium">{searchedResult.fatherName || 'মাওলানা আব্দুর রহমান'}</span>
                    </div>
                    <div className="p-2 flex">
                      <span className="w-32 text-slate-500 font-medium">জামাত / শ্রেণি:</span>
                      <strong className="text-emerald-950 font-bold">{searchedResult.jamaat}</strong>
                    </div>
                    <div className="p-2 flex">
                      <span className="w-32 text-slate-500 font-medium">শিক্ষা বিভাগ:</span>
                      <span className="text-slate-800">{searchedResult.department}</span>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="divide-y divide-slate-300">
                    <div className="p-2 flex">
                      <span className="w-32 text-slate-500 font-medium">রোল নম্বর:</span>
                      <strong className="text-slate-900 font-mono font-bold text-sm">{searchedResult.rollNumber}</strong>
                    </div>
                    <div className="p-2 flex">
                      <span className="w-32 text-slate-500 font-medium">রেজিস্ট্রেশন নং:</span>
                      <span className="text-slate-800 font-mono font-medium">{searchedResult.registrationNumber}</span>
                    </div>
                    <div className="p-2 flex">
                      <span className="w-32 text-slate-500 font-medium">শিক্ষাবর্ষ:</span>
                      <span className="text-slate-800 font-sans">{searchedResult.academicYear}</span>
                    </div>
                    <div className="p-2 flex">
                      <span className="w-32 text-slate-500 font-medium">ক্যাম্পাস:</span>
                      <span className="text-slate-800">{searchedResult.campus}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Subject Marks Table */}
              <div className="mb-4">
                <table className="w-full text-left border-collapse border border-slate-700 text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 border-b border-slate-700">
                      <th className="p-2 border-r border-slate-700 text-center w-12 font-bold">ক্র. নং</th>
                      <th className="p-2 border-r border-slate-700 font-bold">বিষয় ও কিতাবের নাম</th>
                      <th className="p-2 border-r border-slate-700 text-center w-20 font-bold">পূর্ণমান</th>
                      <th className="p-2 border-r border-slate-700 text-center w-20 font-bold">পাস নম্বর</th>
                      <th className="p-2 border-r border-slate-700 text-center w-24 font-bold">প্রাপ্ত নম্বর</th>
                      <th className="p-2 text-center w-28 font-bold">লেটার গ্রেড</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300">
                    {searchedResult.subjects.map((sub, idx) => (
                      <tr key={idx} className="border-b border-slate-300">
                        <td className="p-2 text-center font-mono border-r border-slate-700 text-slate-600">
                          {idx + 1}
                        </td>
                        <td className="p-2 border-r border-slate-700 font-medium text-slate-900">
                          {sub.subjectName}
                        </td>
                        <td className="p-2 text-center font-sans border-r border-slate-700 text-slate-600">
                          {sub.fullMark}
                        </td>
                        <td className="p-2 text-center font-sans border-r border-slate-700 text-slate-600">
                          ৩৩
                        </td>
                        <td className="p-2 text-center font-sans font-bold border-r border-slate-700 text-slate-950">
                          {sub.obtainedMark}
                        </td>
                        <td className="p-2 text-center font-bold text-emerald-950">
                          {sub.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Result Summary & Befaq Grading Scale Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6">
                
                {/* Result Summary (Left 7 cols) */}
                <div className="sm:col-span-7 border border-slate-700 p-3 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-xs text-slate-600">সর্বমোট প্রাপ্ত নম্বর:</span>
                    <strong className="text-base font-bold font-sans text-slate-900">
                      {searchedResult.obtainedTotal} / {searchedResult.totalMarks}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-xs text-slate-600">গ্রেড পয়েন্ট এভারেজ (GPA):</span>
                    <strong className="text-xl font-extrabold font-sans text-emerald-900">
                      {searchedResult.gpa}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-xs text-slate-600">চূড়ান্ত ফলাফল / বিভাগ:</span>
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-900 text-amber-300 rounded">
                      {searchedResult.division}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>ফলাফল প্রকাশের তারিখ: {searchedResult.publishedDate}</span>
                    <span>যাচাই: সত্য ও সঠিক</span>
                  </div>
                </div>

                {/* Befaq Grading Table (Right 5 cols) */}
                <div className="sm:col-span-5 border border-slate-700 p-2 text-[10px] bg-white">
                  <div className="font-bold text-center border-b border-slate-300 pb-1 mb-1 text-slate-800">
                    বেফাক বোর্ড গ্রেডিং বিন্যাস
                  </div>
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="text-slate-500 border-b border-slate-200">
                        <th className="p-0.5">নম্বর সীমা</th>
                        <th className="p-0.5">বিভাগ</th>
                        <th className="p-0.5">গ্রেড</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="p-0.5 font-sans">৮০ - ১০০</td>
                        <td className="p-0.5 font-semibold">মুমতাজ (স্টার)</td>
                        <td className="p-0.5 font-sans font-bold text-emerald-800">A+ (5.0)</td>
                      </tr>
                      <tr>
                        <td className="p-0.5 font-sans">৬৫ - ৭৯</td>
                        <td className="p-0.5 font-semibold">জায়্যিদ জিদ্দান</td>
                        <td className="p-0.5 font-sans font-bold">A (4.0)</td>
                      </tr>
                      <tr>
                        <td className="p-0.5 font-sans">৫০ - ৬৪</td>
                        <td className="p-0.5 font-semibold">জায়্যিদ (২য়)</td>
                        <td className="p-0.5 font-sans font-bold">B (3.0)</td>
                      </tr>
                      <tr>
                        <td className="p-0.5 font-sans">৩৩ - ৪৯</td>
                        <td className="p-0.5 font-semibold">মাকবুল (৩য়)</td>
                        <td className="p-0.5 font-sans font-bold">C (2.0)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Remarks if any */}
              {searchedResult.remarks && (
                <div className="p-2 mb-4 bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong className="text-slate-900">উস্তাদ ও মুহতামিমের মন্তব্য:</strong> {searchedResult.remarks}
                </div>
              )}

              {/* Four Official Signatures with Circular Seal Stamp */}
              <div className="pt-8 pb-2 border-t-2 border-slate-400 print-signatures">
                <div className="grid grid-cols-4 gap-4 text-center text-xs text-slate-800">
                  
                  <div>
                    <div className="h-10 flex items-end justify-center mb-1">
                      <span className="font-serif italic text-slate-400 text-[11px]">স্বাক্ষরিত</span>
                    </div>
                    <div className="border-t border-slate-600 pt-1 font-semibold">
                      শ্রেণি উস্তাদ
                    </div>
                  </div>

                  <div>
                    <div className="h-10 flex items-end justify-center mb-1">
                      <span className="font-serif italic text-slate-400 text-[11px]">স্বাক্ষরিত</span>
                    </div>
                    <div className="border-t border-slate-600 pt-1 font-semibold">
                      পরীক্ষা নিয়ন্ত্রক
                    </div>
                  </div>

                  <div>
                    <div className="h-10 flex items-end justify-center mb-1">
                      <span className="font-serif italic text-slate-400 text-[11px]">স্বাক্ষরিত</span>
                    </div>
                    <div className="border-t border-slate-600 pt-1 font-semibold">
                      শিক্ষা সচিব
                    </div>
                  </div>

                  <div className="relative">
                    {/* Official Circular Seal Stamp Graphic */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-dashed border-emerald-900 flex items-center justify-center pointer-events-none opacity-80">
                      <div className="text-[7.5px] font-bold text-emerald-900 text-center leading-tight">
                        <span>মারকাযুল ইহসান</span><br />
                        <span className="font-mono text-[7px]">সিলমোহর</span><br />
                        <span>ঢাকা</span>
                      </div>
                    </div>

                    <div className="h-10 flex items-end justify-center mb-1">
                      <span className="font-serif italic text-slate-400 text-[11px]">স্বাক্ষরিত ও সীল</span>
                    </div>
                    <div className="border-t border-slate-600 pt-1 font-semibold text-emerald-950">
                      মুহতামিম / প্রিন্সিপাল
                    </div>
                  </div>

                </div>

                <div className="text-[10px] text-slate-500 text-center mt-6 pt-2 border-t border-slate-200">
                  * এই নম্বরপত্রটি কম্পিউটার জেনারেটেড অফিসিয়াল কপি। যেকোনো তথ্যের জন্য মারকাযুল ইহসান কেন্দ্রীয় পরীক্ষা নিয়ন্ত্রণ দপ্তরে যোগাযোগ করুন।
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-600 space-y-3 no-print">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">কোনো ফলাফল পাওয়া যায়নি</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                প্রদত্ত রোল নম্বর বা জামাতের সাথে কোনো রেকর্ড মেলেনি। অনুগ্রহ করে রোল নম্বর (যেমন: ১০১ বা ১০২) ও শিক্ষাবর্ষ সঠিকভাবে পরীক্ষা করে পুনরায় অনুসন্ধান করুন।
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
