import { useState, type FormEvent } from 'react';
import { 
  HeartHandshake, 
  Copy, 
  Check, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Send, 
  Printer,
  Sparkles
} from 'lucide-react';
import { SiteSettings, DonationRecord } from '../types';
import { storageService } from '../services/storageService';

interface DonationViewProps {
  settings: SiteSettings;
}

export function DonationView({ settings }: DonationViewProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    donorName: '',
    donorPhone: '',
    amount: '',
    fundType: 'মাদরাসা নির্মাণ' as DonationRecord['fundType'],
    paymentMethod: 'bKash' as DonationRecord['paymentMethod'],
    trxId: '',
    bankInfo: '',
    isAnonymous: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDonation, setSubmittedDonation] = useState<DonationRecord | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.amount || Number(formData.amount) <= 0) {
      alert('অনুগ্রহ করে সঠিক অনুদানের পরিমাণ লিখুন।');
      return;
    }
    if (!formData.donorPhone) {
      alert('অনুগ্রহ করে মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    setIsSubmitting(true);

    const record: DonationRecord = {
      id: `DON-${Date.now().toString().slice(-5)}`,
      donorName: formData.isAnonymous ? 'আল্লাহর এক বান্দা' : (formData.donorName || 'শুভাকাঙ্ক্ষী'),
      donorPhone: formData.donorPhone,
      amount: Number(formData.amount),
      fundType: formData.fundType,
      paymentMethod: formData.paymentMethod,
      trxId: formData.trxId,
      bankInfo: formData.bankInfo,
      date: new Date().toLocaleDateString('bn-BD'),
      isAnonymous: formData.isAnonymous,
      status: 'অপেক্ষমান'
    };

    try {
      storageService.submitDonation(record);
      setSubmittedDonation(record);
      setFormData({
        donorName: '',
        donorPhone: '',
        amount: '',
        fundType: 'মাদরাসা নির্মাণ',
        paymentMethod: 'bKash',
        trxId: '',
        bankInfo: '',
        isAnonymous: false
      });
    } catch (err) {
      console.error(err);
      alert('অনুদান তথ্য সংরক্ষণ করতে সমস্যা হয়েছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fundTypes = [
    {
      title: 'মাদরাসা নির্মাণ ও স্থায়ী ক্যাম্পাস',
      desc: 'পাইটি, ডেমরায় বহুতল স্থায়ী একাডেমিক ভবন ও ছাত্রাবাস নির্মাণে ইট, রড, সিমেন্ট বা নগদ অনুদান।'
    },
    {
      title: 'লিল্লাহ ও যাকাত ফান্ড',
      desc: 'অসহায়, এতিম ও দরিদ্র পরিবারের মেধাবী ছাত্রদের খাদ্য, কিতাবপত্র ও চিকিৎসার জন্য পূর্ণ যাকাত আদায়।'
    },
    {
      title: 'কেন্দ্রীয় মসজিদ কমপ্লেক্স ফান্ড',
      desc: 'ক্যাম্পাসে সুবিশাল জামে মসজিদ নির্মাণে অংশগ্রহণ করে কিয়ামত পর্যন্ত সদকায়ে জারিয়ার সওয়াব লাভ।'
    },
    {
      title: 'সাধারণ খেদমত ফান্ড',
      desc: 'উস্তাদগণের হাদিয়া, কারেন্ট-গ্যাস বিল ও মাদরাসার সাধারণ প্রশাসনিক পরিচালনা কার্যক্রমের ব্যয়।'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4" />
            <span>খেদমত ও যাকাত ফান্ড</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            ইলমে ওহীর খেদমতে সদকায়ে জারিয়া
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            "যখন কোনো মানুষ মৃত্যুবরণ করে, তখন তার সমস্ত আমল বন্ধ হয়ে যায় তিনটি ছাড়া—সদকায়ে জারিয়া, উপকারী ইলম এবং নেক সন্তান যে তার জন্য দোয়া করে।" (সহীহ মুসলিম)
          </p>
        </div>
      </div>

      {/* Fund Categories */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            ফান্ড খাতসমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 mt-1">
            যেসব খাতে আপনি দান করতে পারেন
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fundTypes.map((f, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold mb-3">
                  ০{idx + 1}
                </span>
                <h3 className="font-bold text-slate-900 text-base font-heading mb-2">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Accounts Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            হিসাব নম্বরসমূহ
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-1">
            বিকাশ, নগদ, রকেট ও ব্যাংক একাউন্ট
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            নম্বর কপি করতে পাশের বোতামে ক্লিক করুন। টাকা প্রেরণের পর নিচের ফর্মে ট্রানজেকশন আইডি দিন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* bKash */}
          <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-800 text-base">বিকাশ (bKash)</span>
              <span className="text-xs font-semibold bg-rose-200/80 text-rose-900 px-2 py-0.5 rounded">
                Personal
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-rose-200 flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-slate-900">
                {settings.bkashNumber.split(' ')[0]}
              </span>
              <button
                onClick={() => handleCopy(settings.bkashNumber.split(' ')[0], 'bkash')}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
                title="কপি করুন"
              >
                {copiedType === 'bkash' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[11px] text-slate-500 block">Send Money অপশন ব্যবহার করুন</span>
          </div>

          {/* Nagad */}
          <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-800 text-base">নগদ (Nagad)</span>
              <span className="text-xs font-semibold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                Personal
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-slate-900">
                {settings.nagadNumber.split(' ')[0]}
              </span>
              <button
                onClick={() => handleCopy(settings.nagadNumber.split(' ')[0], 'nagad')}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
                title="কপি করুন"
              >
                {copiedType === 'nagad' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[11px] text-slate-500 block">Send Money অপশন ব্যবহার করুন</span>
          </div>

          {/* Rocket */}
          <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-800 text-base">রকেট (Rocket)</span>
              <span className="text-xs font-semibold bg-purple-200/80 text-purple-900 px-2 py-0.5 rounded">
                Personal
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-purple-200 flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-slate-900">
                {settings.rocketNumber.split(' ')[0]}
              </span>
              <button
                onClick={() => handleCopy(settings.rocketNumber.split(' ')[0], 'rocket')}
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
                title="কপি করুন"
              >
                {copiedType === 'rocket' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[11px] text-slate-500 block">Send Money অপশন ব্যবহার করুন</span>
          </div>

        </div>

        {/* Bank Account Details */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>ব্যাংক হিসাবের পূর্ণ বিবরণ</span>
            </span>
            <button
              onClick={() => handleCopy(settings.bankAccountDetails, 'bank')}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-white px-3 py-1 rounded border border-slate-200"
            >
              {copiedType === 'bank' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>ব্যাংক তথ্য কপি করুন</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed">
            {settings.bankAccountDetails}
          </p>
        </div>
      </div>

      {/* Online Donation Submission Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            অনুদানের তথ্য নিশ্চিতকরণ ফরম
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            টাকা প্রেরণের পর ট্রানজেকশন আইডি সহ নিচের ফরমটি পূরণ করুন। মাদরাসা কর্তৃপক্ষ আপনার রশিদ নিশ্চিত করবে।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" id="donation-confirmation-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                দাতার পূর্ণ নাম
              </label>
              <input
                type="text"
                disabled={formData.isAnonymous}
                value={formData.donorName}
                onChange={e => setFormData({ ...formData, donorName: e.target.value })}
                placeholder="যেমন: হাজী মুহাম্মদ রফিকুল ইসলাম"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:bg-slate-100"
              />
              <label className="flex items-center gap-2 mt-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={e => setFormData({ ...formData, isAnonymous: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>নাম গোপন রাখতে চাই (আল্লাহর এক বান্দা)</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                required
                value={formData.donorPhone}
                onChange={e => setFormData({ ...formData, donorPhone: e.target.value })}
                placeholder="017xxxxxxxx"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                অনুদানের পরিমাণ (টাকা) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                placeholder="যেমন: 5000"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                দানের খাত
              </label>
              <select
                value={formData.fundType}
                onChange={e => setFormData({ ...formData, fundType: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="মাদরাসা নির্মাণ">মাদরাসা নির্মাণ</option>
                <option value="যাকাত ফান্ড">যাকাত ফান্ড</option>
                <option value="মসজিদ কমপ্লেক্স">মসজিদ কমপ্লেক্স</option>
                <option value="এতিম ও ছাত্র সহায়তা">এতিম ও ছাত্র সহায়তা</option>
                <option value="সাধারণ খেদমত ফান্ড">সাধারণ খেদমত ফান্ড</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                পেমেন্ট মাধ্যম
              </label>
              <select
                value={formData.paymentMethod}
                onChange={e => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
                <option value="Rocket">Rocket</option>
                <option value="Bank">Bank Account</option>
                <option value="নগদ/ক্যাশ">নগদ/ক্যাশ</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ট্রানজেকশন আইডি (TrxID) / রেফারেন্স
            </label>
            <input
              type="text"
              value={formData.trxId}
              onChange={e => setFormData({ ...formData, trxId: e.target.value })}
              placeholder="যেমন: BK789123 বা ব্যাংকের স্লিপ নম্বর"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              * আপনার তথ্য গোপন রাখা হবে।
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>অনুদানের তথ্য সাবমিট করুন</span>
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {submittedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-emerald-200">
            <div className="bg-emerald-800 text-white p-6 text-center">
              <HeartHandshake className="w-10 h-10 mx-auto text-amber-300 mb-2" />
              <h3 className="text-lg font-bold font-heading">জাযাকুমুল্লাহু খাইরান!</h3>
              <p className="text-xs text-emerald-200 mt-1">
                আপনার অনুদানের তথ্য সফলভাবে গৃহীত হয়েছে।
              </p>
            </div>

            <div className="p-6 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">রসিদ ট্র্যাকিং:</span>
                <strong className="font-mono text-emerald-800">{submittedDonation.id}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">অনুদানের খাত:</span>
                <span>{submittedDonation.fundType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">পরিমাণ:</span>
                <strong className="text-slate-900 font-sans">{submittedDonation.amount} ৳</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">মাধ্যম:</span>
                <span>{submittedDonation.paymentMethod}</span>
              </div>
              {submittedDonation.trxId && (
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500">Trx ID:</span>
                  <span className="font-mono">{submittedDonation.trxId}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট রসিদ</span>
              </button>
              <button
                onClick={() => setSubmittedDonation(null)}
                className="px-4 py-1.5 bg-emerald-800 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700"
              >
                সম্পন্ন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
