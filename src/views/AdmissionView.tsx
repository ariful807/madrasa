import { useState, useRef, type FormEvent } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Send, 
  AlertCircle, 
  Check, 
  Printer,
  ChevronDown,
  Download,
  Loader2
} from 'lucide-react';
import { SiteSettings, StudentApplication } from '../types';
import { storageService } from '../services/storageService';
import { downloadDomAsPdf } from '../utils/downloadUtils';

interface AdmissionViewProps {
  settings: SiteSettings;
}

export function AdmissionView({ settings }: AdmissionViewProps) {
  // Form State
  const [formData, setFormData] = useState({
    studentNameBn: '',
    studentNameEn: '',
    fatherName: '',
    motherName: '',
    guardianPhone: '',
    whatsappNumber: '',
    birthDate: '',
    academicYear: settings.admissionYear || '২০২৬-২০২৭',
    campus: 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)' as 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)' | 'স্থায়ী ক্যাম্পাস (ডেমরা)',
    department: 'হিফজুল কুরআন',
    jamaat: 'হিফজ',
    studentType: 'নতুন ছাত্র' as 'নতুন ছাত্র' | 'পুরাতন ছাত্র',
    residenceType: 'আবাসিক' as 'আবাসিক' | 'অনাবাসিক' | 'ডে-কেয়ার',
    address: '',
    previousInstitute: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<StudentApplication | null>(null);
  const [isDownloadingReceipt, setIsDownloadingReceipt] = useState(false);
  const slipRef = useRef<HTMLDivElement>(null);

  const handleDownloadReceipt = async () => {
    if (!slipRef.current || !submittedApp || isDownloadingReceipt) return;
    setIsDownloadingReceipt(true);
    try {
      await downloadDomAsPdf(slipRef.current, `Admission_Slip_${submittedApp.id}`);
    } catch (e) {
      console.error('Download slip error:', e);
    } finally {
      setIsDownloadingReceipt(false);
    }
  };

  const jamaatsList = [
    { name: 'শিশু শ্রেণি', category: 'নূরানী ও বুনিয়াদি', fee: '৪,৫০০/-', monthly: '২,২০০/-' },
    { name: 'মক্তব বিভাগ', category: 'নূরানী ও বুনিয়াদি', fee: '৪,৫০০/-', monthly: '২,২০০/-' },
    { name: 'নাযেরা বিভাগ', category: 'কুরআন তিলাওয়াত', fee: '৫,০০০/-', monthly: '২,৫০০/-' },
    { name: 'হিফজুল কুরআন', category: 'হিফজ (শীতাতপ)', fee: '৬,০০০/-', monthly: '৩,৫০০/-' },
    { name: 'খুসূসী জামাত', category: 'বয়স্ক/বিশেষ কোর্স', fee: '৫,০০০/-', monthly: '২,৮০০/-' },
    { name: 'তাইসীর জামাত', category: 'ফারসি ও বুনিয়াদি কিতাব', fee: '৫,০০০/-', monthly: '২,৫০০/-' },
    { name: 'মীযান জামাত', category: 'সানাবিয়া (প্রাথমিক)', fee: '৫,৫০০/-', monthly: '২,৬০০/-' },
    { name: 'নাহবেমীর জামাত', category: 'সানাবিয়া (দ্বিতীয়)', fee: '৫,৫০০/-', monthly: '২,৬০০/-' },
    { name: 'কাফিয়া জামাত', category: 'মুতাওয়াসসিতাহ', fee: '৬,০০০/-', monthly: '২,৮০০/-' },
    { name: 'জালালাইন জামাত', category: 'ফজিলত', fee: '৬,৫০০/-', monthly: '৩,০০০/-' },
    { name: 'মেশকাত জামাত', category: 'উচ্চতর হাদিস', fee: '৭,০০০/-', monthly: '৩,২০০/-' },
    { name: 'তাকমীল (দাওরায়ে হাদীস)', category: 'মাস্টার্স সমমান', fee: '৭,৫০০/-', monthly: '৩,৫০০/-' },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.studentNameBn || !formData.guardianPhone) {
      alert('অনুগ্রহ করে ছাত্রের নাম ও অভিভাবকের মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    setIsSubmitting(true);

    const newApp: StudentApplication = {
      id: `MI-${Date.now().toString().slice(-5)}`,
      ...formData,
      status: 'অপেক্ষমান',
      appliedDate: new Date().toLocaleDateString('bn-BD')
    };

    try {
      storageService.submitApplication(newApp);
      setSubmittedApp(newApp);
      // Reset form
      setFormData({
        studentNameBn: '',
        studentNameEn: '',
        fatherName: '',
        motherName: '',
        guardianPhone: '',
        whatsappNumber: '',
        birthDate: '',
        academicYear: settings.admissionYear || '২০২৬-২০২৭',
        campus: 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)',
        department: 'হিফজুল কুরআন',
        jamaat: 'হিফজ',
        studentType: 'নতুন ছাত্র',
        residenceType: 'আবাসিক',
        address: '',
        previousInstitute: '',
        notes: ''
      });
    } catch (err) {
      console.error(err);
      alert('আবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Admission Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>{settings.admissionYear} শিক্ষাবর্ষ</span>
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              settings.isAdmissionOpen ? 'bg-emerald-700 text-white' : 'bg-rose-700 text-white'
            }`}>
              {settings.isAdmissionOpen ? 'ভর্তি চলছে' : 'ভর্তি সাময়িক বন্ধ'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            মারকাযুল ইহসান ভর্তি তথ্য ও আবেদন
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {settings.admissionNoticeText}
          </p>
        </div>
      </div>

      {/* 2. গুরুত্বপূর্ণ ভর্তি তথ্য ও নির্দেশিকা */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base font-heading">ক্যাম্পাস নির্বাচন</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী):</strong> শিশু, মক্তব, নাযেরা ও হিফজ বিভাগ।<br />
            <strong>স্থায়ী ক্যাম্পাস (ডেমরা):</strong> তাইসীর, মীযান, নাহবেমীর থেকে দাওরায়ে হাদীস।
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base font-heading">ভর্তি পরীক্ষা ও মূল্যায়ন</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            নূরানী ও নাযেরায় মৌখিক সাক্ষাৎকার; হিফজে পূর্বের তিলাওয়াত মান; কিতাব বিভাগে বিগত জামাতের কিতাবের ওপর ১০০ নম্বরের লিখিত ও মৌখিক পরীক্ষা।
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base font-heading">প্রয়োজনীয় কাগজপত্র</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            ১. জন্ম সনদের ফটোকপি<br />
            ২. পিতা-মাতার জাতীয় পরিচয়পত্রের কপি<br />
            ৩. সদ্য তোলা ২ কপি পাসপোর্ট সাইজ ছবি<br />
            ৪. পূর্ববর্তী মাদরাসার ছাড়পত্র (যদি থাকে)
          </p>
        </div>
      </div>

      {/* 3. Class/Jamaat Fee Chart */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              ফি তালিকা
            </span>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mt-1">
              জামাতভিত্তিক ভর্তি ও মাসিক ফি চার্ট
            </h2>
          </div>
          <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            * বোর্ডিং খাবার ফি মাসিক ৩,০০০/- (আবাসিকদের জন্য প্রযোজ্য)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-emerald-900 text-white">
                <th className="p-3 font-semibold rounded-tl-lg">ক্রম</th>
                <th className="p-3 font-semibold">জামাত / শ্রেণি</th>
                <th className="p-3 font-semibold">বিভাগ</th>
                <th className="p-3 font-semibold text-center">ভর্তি ফি</th>
                <th className="p-3 font-semibold text-center rounded-tr-lg">মাসিক টিউশন ফি</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {jamaatsList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono text-slate-500">{idx + 1}</td>
                  <td className="p-3 font-bold text-slate-900 font-heading">{item.name}</td>
                  <td className="p-3 text-slate-600">{item.category}</td>
                  <td className="p-3 font-semibold text-emerald-800 text-center">{item.fee}</td>
                  <td className="p-3 font-semibold text-slate-900 text-center">{item.monthly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <span>* এতিম ও অসচ্ছল পরিবারের মেধাবী ছাত্রদের জন্য বিশেষ ছাড় ও বৃত্তির ব্যবস্থা রয়েছে।</span>
          <span>* পুরাতন ছাত্রদের পুনঃভর্তিতে বিশেষ ছাড় দেওয়া হয়।</span>
        </div>
      </div>

      {/* 4. ONLINE ADMISSION APPLICATION FORM */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm" id="online-admission-form-section">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 border-b border-slate-100 pb-4">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
              অনলাইন আবেদন ফরম
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              {settings.admissionYear} শিক্ষাবর্ষে অনলাইনে ভর্তির আবেদন
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              সঠিক তথ্য দিয়ে ফরমটি পূরণ করুন। আবেদন জমা হওয়ার পর আমাদের ভর্তি শাখা থেকে যোগাযোগ করা হবে।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" id="admission-application-form">
            
            {/* Student Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-1.5">
                ১. শিক্ষার্থীর প্রাথমিক তথ্য
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ছাত্রের পূর্ণ নাম (বাংলায়) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentNameBn}
                    onChange={e => setFormData({ ...formData, studentNameBn: e.target.value })}
                    placeholder="যেমন: মুহাম্মদ আব্দুল্লাহ"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                    id="input-student-name-bn"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ছাত্রের পূর্ণ নাম (ইংরেজি ক্যাপিটাল)
                  </label>
                  <input
                    type="text"
                    value={formData.studentNameEn}
                    onChange={e => setFormData({ ...formData, studentNameEn: e.target.value })}
                    placeholder="e.g. MUHAMMAD ABDULLAH"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm uppercase"
                    id="input-student-name-en"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    পিতার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="পিতার নাম"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                    id="input-father-name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মাতার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.motherName}
                    onChange={e => setFormData({ ...formData, motherName: e.target.value })}
                    placeholder="মাতার নাম"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                    id="input-mother-name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    অভিভাবকের মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.guardianPhone}
                    onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-sans"
                    id="input-guardian-phone"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    হোয়াটসঅ্যাপ নম্বর
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-sans"
                    id="input-whatsapp-phone"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    জন্ম তারিখ
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-sans"
                    id="input-birth-date"
                  />
                </div>
              </div>
            </div>

            {/* Academic Selection */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-1.5">
                ২. ক্যাম্পাস, বিভাগ ও জামাত নির্বাচন
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ক্যাম্পাস নির্বাচন *
                  </label>
                  <select
                    value={formData.campus}
                    onChange={e => setFormData({ ...formData, campus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-white"
                    id="select-campus"
                  >
                    <option value="অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)">অস্থায়ী ক্যাম্পাস (পশ্চিম যাত্রাবাড়ী)</option>
                    <option value="স্থায়ী ক্যাম্পাস (ডেমরা)">স্থায়ী ক্যাম্পাস (পাইটি, ডেমরা)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    কাঙ্ক্ষিত জামাত / শ্রেণি *
                  </label>
                  <select
                    value={formData.jamaat}
                    onChange={e => setFormData({ ...formData, jamaat: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-white"
                    id="select-jamaat"
                  >
                    {jamaatsList.map((j, i) => (
                      <option key={i} value={j.name}>{j.name} ({j.category})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ছাত্রের ধরন
                  </label>
                  <div className="flex gap-4 pt-1">
                    {['নতুন ছাত্র', 'পুরাতন ছাত্র'].map((type) => (
                      <label key={type} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="studentType"
                          value={type}
                          checked={formData.studentType === type}
                          onChange={() => setFormData({ ...formData, studentType: type as any })}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    আবাসনের ধরন
                  </label>
                  <div className="flex gap-4 pt-1">
                    {['আবাসিক', 'অনাবাসিক', 'ডে-কেয়ার'].map((res) => (
                      <label key={res} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="residenceType"
                          value={res}
                          checked={formData.residenceType === res}
                          onChange={() => setFormData({ ...formData, residenceType: res as any })}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>{res}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  বর্তমান ঠিকানা *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="গ্রাম/বাড়ি, রাস্তা, থানা, জেলা"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                  id="input-address"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  পূর্ববর্তী শিক্ষা প্রতিষ্ঠান (যদি থাকে)
                </label>
                <input
                  type="text"
                  value={formData.previousInstitute}
                  onChange={e => setFormData({ ...formData, previousInstitute: e.target.value })}
                  placeholder="পূর্বে যে প্রতিষ্ঠানে পড়েছে তার নাম"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                  id="input-prev-institute"
                />
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                * তথ্যসমূহ সরাসরি মাদরাসার এডমিন ডেটাবেস ও গুগল শিটে জমা হবে।
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                id="submit-admission-form-btn"
              >
                {isSubmitting ? (
                  <span>জমা হচ্ছে...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ভর্তি আবেদন জমা দিন</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Confirmation Modal upon Application Submission */}
      {submittedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div ref={slipRef} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-200 animate-in fade-in zoom-in duration-200">
            <div className="bg-emerald-800 text-white p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-700 border-2 border-emerald-400 mx-auto flex items-center justify-center mb-3 text-amber-300">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-xl font-bold font-heading">ভর্তি আবেদন সফলভাবে জমা হয়েছে!</h3>
              <p className="text-xs text-emerald-200 mt-1">
                আবেদন ট্র্যাকিং আইডি: <strong className="font-mono text-amber-300 text-sm">{submittedApp.id}</strong>
              </p>
            </div>

            <div className="p-6 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">ছাত্রের নাম:</span>
                <strong>{submittedApp.studentNameBn}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">নির্বাচিত জামাত:</span>
                <strong>{submittedApp.jamaat}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">ক্যাম্পাস:</span>
                <span>{submittedApp.campus}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">অভিভাবক ফোন:</span>
                <span className="font-sans font-semibold">{submittedApp.guardianPhone}</span>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-900 text-xs mt-3">
                দয়া করে ট্র্যাকিং আইডি সংরক্ষণ করুন। পরীক্ষার সময়সূচী অভিভাবকের নম্বরে এসএমএস বা ফোন করে জানানো হবে।
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  disabled={isDownloadingReceipt}
                  className="px-3.5 py-1.5 bg-emerald-800 text-white text-xs font-semibold rounded-lg hover:bg-emerald-900 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  id="download-admission-slip-btn"
                >
                  {isDownloadingReceipt ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>ডাউনলোড...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>রসিদ ডাউনলোড</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="hidden sm:flex text-xs font-semibold text-slate-600 hover:text-slate-900 items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSubmittedApp(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
