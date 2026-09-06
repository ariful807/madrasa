import { useState, type FormEvent } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  Clock, 
  Building2, 
  Globe, 
  CheckCircle2, 
  Check 
} from 'lucide-react';
import { SiteSettings } from '../types';

interface ContactViewProps {
  settings: SiteSettings;
}

export function ContactView({ settings }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('অনুগ্রহ করে নাম, ফোন নম্বর ও বার্তা লিখুন।');
      return;
    }
    setIsSubmitted(true);
    setFormData({ name: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <span className="px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
          <Phone className="w-4 h-4" />
          <span>যোগাযোগ ও ক্যাম্পাস ঠিকানা</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          আমাদের সাথে যোগাযোগ করুন
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl">
          ভর্তি তথ্য, ডোনেশন, অভিভাবক সাক্ষাৎ বা যেকোনো জরুরি পরামর্শের জন্য আমাদের হটলাইনে সরাসরি কল করতে পারেন বা মেসেজ পাঠাতে পারেন।
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Phone & WhatsApp */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base font-heading">টেলিফোন ও হটলাইন</h3>
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-sans">
            <p>
              প্রধান হটলাইন: <a href={`tel:${settings.phonePrimary}`} className="font-bold text-emerald-800 hover:underline">{settings.phonePrimary}</a>
            </p>
            <p>
              ভর্তি ডেস্ক: <a href={`tel:${settings.phoneSecondary}`} className="font-medium text-slate-900 hover:underline">{settings.phoneSecondary}</a>
            </p>
            <p className="pt-2">
              <a
                href={`https://wa.me/88${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে চ্যাট করুন</span>
              </a>
            </p>
          </div>
        </div>

        {/* Email & Digital */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base font-heading">ইমেইল ও অনলাইন মাধ্যম</h3>
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            <p>
              অফিশিয়াল ইমেইল:<br />
              <a href={`mailto:${settings.emailAddress || settings.email || 'contact@markazulihsan.edu.bd'}`} className="font-semibold text-emerald-800 hover:underline font-sans">
                {settings.emailAddress || settings.email || 'contact@markazulihsan.edu.bd'}
              </a>
            </p>
            <div className="pt-2 flex items-center gap-2">
              {settings.facebookPageUrl && (
                <a
                  href={settings.facebookPageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  ফেসবুক পেজ
                </a>
              )}
              {settings.youtubeUrl && (
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-xs font-semibold hover:bg-rose-100 transition-colors"
                >
                  ইউটিউব চ্যানেল
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base font-heading">অফিস ও সাক্ষাতের সময়</h3>
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            <p><strong>শনিবার – বৃহস্পতিবার:</strong> সকাল ৮:০০ – সন্ধ্যা ৬:০০</p>
            <p><strong>শুক্রবার:</strong> অভিভাবক সাক্ষাতের বিশেষ সময়</p>
            <p className="text-slate-500 text-xs pt-1">জরুরি প্রয়োজনে সার্বক্ষণিক হটলাইনে যোগাযোগ করা যাবে।</p>
          </div>
        </div>

      </div>

      {/* Two Campuses Address Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Campus 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <h3 className="font-bold text-slate-900 text-lg font-heading">
              অস্থায়ী ক্যাম্পাস (পশ্চিম যাত্রাবাড়ী)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 leading-relaxed">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{settings.addressTemporary}</span>
          </p>
          <p className="text-xs text-slate-500">
            * শিশু, নূরানী, নাযেরা ও হিফজুল কুরআন বিভাগ পরিচালিত হচ্ছে।
          </p>
        </div>

        {/* Campus 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <h3 className="font-bold text-slate-900 text-lg font-heading">
              স্থায়ী ক্যাম্পাস (পাইটি, ডেমরা)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 leading-relaxed">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>{settings.addressPermanent}</span>
          </p>
          <p className="text-xs text-slate-500">
            * উচ্চতর কিতাব বিভাগ, দাওরায়ে হাদীস ও ভবিষ্যৎ মসজিদ কমপ্লেক্স।
          </p>
        </div>

      </div>

      {/* Message Inquiry Form & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold font-heading text-slate-900">
              আমাদের একটি সরাসরি বার্তা পাঠান
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              যেকোনো প্রশ্ন বা তথ্যের জন্য ফর্মটি পূরণ করুন।
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <h4 className="font-bold text-emerald-950 font-heading">আপনার বার্তা সফলভাবে পৌঁছানো হয়েছে!</h4>
              <p className="text-xs text-emerald-800">
                আমাদের প্রতিনিধি দ্রুত আপনার সাথে ফোনে অথবা ইমেইলে যোগাযোগ করবেন ইনশাআল্লাহ।
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-3 px-4 py-1.5 bg-emerald-800 text-white text-xs font-semibold rounded-lg"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="আপনার নাম"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  বিষয় / অনুসন্ধান
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="যেমন: হিফজ বিভাগে নতুন ভর্তি সংক্রান্ত"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  আপনার বার্তা / প্রশ্ন *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="বিস্তারিত এখানে লিখুন..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা প্রেরণ করুন</span>
              </button>
            </form>
          )}
        </div>

        {/* Location Map Box */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-lg font-heading">
            ক্যাম্পাস অবস্থান মানচিত্র
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            ঢাকার যাত্রাবাড়ী মোড় বা কলাপট্টি থেকে খুব সহজেই রিকশা বা হেঁটে ক্যাম্পাসে আসা যায়। ডেমরা স্টাফ কোয়ার্টার থেকে পাইটি স্থায়ী ক্যাম্পাসে আসা যায়।
          </p>

          <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 bg-slate-100 relative">
            <iframe
              title="Markazul Ihsan Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14612.338575027878!2d90.4357771!3d23.7086438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9cc7d566d03%3A0x2472a49ac0e20387!2sJatrabari%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900">
            রাস্তা বা লোকেশন চিনতে অসুবিধা হলে সরাসরি ফোন করুন: <strong className="font-sans">{settings.phonePrimary}</strong>
          </div>
        </div>

      </div>

    </div>
  );
}
