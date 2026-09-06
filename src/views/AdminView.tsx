import { useState, type FormEvent } from 'react';
import { 
  Lock, 
  Key, 
  LogOut, 
  Settings, 
  FileText, 
  Users, 
  Award, 
  HeartHandshake, 
  Image, 
  Code, 
  Check, 
  Copy, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Clock,
  CheckCircle2,
  Palette,
  Eye,
  Sparkles,
  Layers,
  GraduationCap,
  RotateCcw
} from 'lucide-react';
import { 
  SiteSettings, 
  NoticeItem, 
  StudentApplication, 
  StudentResult, 
  DonationRecord, 
  BlogPost, 
  GalleryItem,
  JamaatItem,
  SliderImageItem,
  TeacherItem
} from '../types';
import { storageService } from '../services/storageService';
import { CODE_GS_SCRIPT, DEFAULT_JAMAATS, DEFAULT_SLIDER_IMAGES, DEFAULT_TEACHERS } from '../data/defaultData';
import { ImageDriveInput } from '../components/ImageDriveInput';
import { THEME_PALETTES, ThemeKey, formatDriveImageUrl } from '../utils/imageUtils';

interface AdminViewProps {
  settings: SiteSettings;
  notices: NoticeItem[];
  applications: StudentApplication[];
  results: StudentResult[];
  donations: DonationRecord[];
  blogs: BlogPost[];
  gallery: GalleryItem[];
  sliderImages?: SliderImageItem[];
  teachers?: TeacherItem[];
  onRefreshData: () => void;
}

export function AdminView({
  settings: initialSettings,
  notices,
  applications,
  results,
  donations,
  blogs,
  gallery,
  sliderImages: propSliderImages,
  teachers: propTeachers,
  onRefreshData
}: AdminViewProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('markazul_ihsan_admin_session') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Management Tab
  const [adminTab, setAdminTab] = useState<
    'settings' | 'apps-script' | 'slider' | 'teachers' | 'notices' | 'applications' | 'results' | 'donations' | 'blogs' | 'gallery' | 'jamaats'
  >('settings');

  // Dynamic Slider Management
  const [sliderList, setSliderList] = useState<SliderImageItem[]>(() => propSliderImages || storageService.getSliderImages());
  const [showSliderForm, setShowSliderForm] = useState(false);
  const [newSliderItem, setNewSliderItem] = useState<Partial<SliderImageItem>>({
    title: '',
    subtitle: '',
    badge: 'ক্যাম্পাস কার্যক্রম',
    imageUrl: '',
    linkTab: 'admission',
    isActive: true
  });

  // Dynamic Teachers Management
  const [teacherList, setTeacherList] = useState<TeacherItem[]>(() => propTeachers || storageService.getTeachers());
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [newTeacherItem, setNewTeacherItem] = useState<Partial<TeacherItem>>({
    name: '',
    designation: '',
    department: 'কিতাব বিভাগ',
    qualification: '',
    experience: '',
    phone: '',
    email: '',
    imageUrl: '',
    bio: '',
    isActive: true
  });

  // Dynamic Jamaat Management
  const [jamaats, setJamaats] = useState<JamaatItem[]>(() => storageService.getJamaats());
  const [showJamaatForm, setShowJamaatForm] = useState(false);
  const [newJamaat, setNewJamaat] = useState<Partial<JamaatItem>>({
    name: '',
    department: 'কিতাব বিভাগ',
    code: '',
    capacity: 35,
    monthlyFee: 1500,
    description: '',
    isActive: true
  });

  // Editable Site Settings
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(initialSettings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Script copy state
  const [isCopied, setIsCopied] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  // New Item Modals / Forms
  const [newNotice, setNewNotice] = useState<Partial<NoticeItem>>({
    category: 'ভর্তি',
    isUrgent: false,
    publishedBy: 'দফতর সচিব'
  });
  const [showNoticeForm, setShowNoticeForm] = useState(false);

  // New Gallery Item Form
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [newGallery, setNewGallery] = useState({
    title: '',
    category: 'ক্যাম্পাস',
    imageUrl: '',
    caption: ''
  });

  // New Blog Form
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'ইসলামিক শিক্ষা',
    author: 'উস্তাদ মারকাযুল ইহসান',
    summary: '',
    content: '',
    imageUrl: ''
  });

  // New Result Form
  const [showResultForm, setShowResultForm] = useState(false);
  const [newResult, setNewResult] = useState({
    rollNumber: '',
    studentName: '',
    fatherName: '',
    jamaat: 'হিফজুল কুরআন',
    academicYear: '২০২৬',
    totalMarks: 500,
    obtainedTotal: 450,
    gpa: 'A+',
    division: 'মুমতায (স্টার মার্ক)',
    position: '১ম স্থান'
  });

  // Login handler
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput === (initialSettings.adminPassword || 'ihsan2026')) {
      setIsAuthenticated(true);
      sessionStorage.setItem('markazul_ihsan_admin_session', 'true');
      setAuthError('');
    } else {
      setAuthError('ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('markazul_ihsan_admin_session');
  };

  // Settings Save Handler
  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    storageService.saveSettings(settingsForm);
    setSettingsSaved(true);
    onRefreshData();
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Copy Code.gs
  const handleCopyScript = () => {
    navigator.clipboard.writeText(CODE_GS_SCRIPT);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Test Sync with Google Apps Script
  const handleTestSync = async () => {
    const url = settingsForm.googleAppsScriptUrl || settingsForm.googleSheetWebAppUrl;
    if (!url) {
      alert('অনুগ্রহ করে আগে Google Apps Script Web App URL টি দিন।');
      return;
    }
    setSyncStatus('সিঙ্ক হচ্ছে...');
    try {
      await storageService.syncWithGoogleSheet();
      setSyncStatus('গুগল শিটের সাথে সফলভাবে সিঙ্ক সম্পন্ন হয়েছে!');
      onRefreshData();
    } catch (err: any) {
      setSyncStatus('সিঙ্ক করতে সমস্যা হয়েছে। Web App URL ও পারমিশন পরীক্ষা করুন।');
    }
    setTimeout(() => setSyncStatus(null), 4000);
  };

  // Notice Handlers
  const handleAddNotice = (e: FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.content) return;

    const notice: NoticeItem = {
      id: `NOT-${Date.now()}`,
      title: newNotice.title,
      category: newNotice.category || 'সাধারণ',
      isUrgent: Boolean(newNotice.isUrgent),
      date: new Date().toLocaleDateString('bn-BD'),
      content: newNotice.content,
      publishedBy: newNotice.publishedBy || 'দফতর সচিব'
    };

    const updated = [notice, ...notices];
    storageService.saveNotices(updated);
    onRefreshData();
    setShowNoticeForm(false);
    setNewNotice({ category: 'ভর্তি', isUrgent: false, publishedBy: 'দফতর সচিব' });
  };

  const handleDeleteNotice = (id: string) => {
    if (window.confirm('আপনি কি নিশ্চিতভাবে এই নোটিশটি মুছে ফেলতে চান?')) {
      const updated = notices.filter(n => n.id !== id);
      storageService.saveNotices(updated);
      onRefreshData();
    }
  };

  // Status toggle for application
  const handleApplicationStatus = (id: string, newStatus: StudentApplication['status']) => {
    const updated = applications.map(app => app.id === id ? { ...app, status: newStatus } : app);
    storageService.saveApplications(updated);
    onRefreshData();
  };

  // Status toggle for donation
  const handleDonationStatus = (id: string, newStatus: DonationRecord['status']) => {
    const updated = donations.map(d => d.id === id ? { ...d, status: newStatus } : d);
    storageService.saveDonations(updated);
    onRefreshData();
  };

  // Result Handlers
  const handleAddResult = (e: FormEvent) => {
    e.preventDefault();
    if (!newResult.rollNumber || !newResult.studentName) {
      alert('অনুগ্রহ করে রোল নম্বর এবং ছাত্রের নাম প্রদান করুন।');
      return;
    }
    const resultItem: StudentResult = {
      id: `RES-${newResult.rollNumber}-${Date.now().toString().slice(-4)}`,
      rollNumber: newResult.rollNumber,
      studentName: newResult.studentName,
      registrationNumber: `REG-${newResult.rollNumber}`,
      department: 'হিফজ ও কিতাব বিভাগ',
      campus: 'প্রধান ক্যাম্পাস',
      jamaat: newResult.jamaat,
      academicYear: newResult.academicYear,
      totalMarks: Number(newResult.totalMarks) || 500,
      obtainedTotal: Number(newResult.obtainedTotal) || 0,
      gpa: newResult.gpa,
      division: (newResult.division || 'মুমতাজ (স্টার)') as any,
      publishedDate: new Date().toLocaleDateString('bn-BD'),
      subjects: [
        { subjectName: 'হিফজুল কুরআন / তিলাওয়াত', fullMark: 100, obtainedMark: Math.min(100, Math.round(Number(newResult.obtainedTotal) * 0.22)), grade: 'A+' },
        { subjectName: 'তাজবীদ ও মাখরাজ', fullMark: 100, obtainedMark: Math.min(100, Math.round(Number(newResult.obtainedTotal) * 0.20)), grade: 'A+' },
        { subjectName: 'আকাইদ ও ফিকহ', fullMark: 100, obtainedMark: Math.min(100, Math.round(Number(newResult.obtainedTotal) * 0.20)), grade: 'A' },
        { subjectName: 'আরবি ভাষা ও সাহিত্য', fullMark: 100, obtainedMark: Math.min(100, Math.round(Number(newResult.obtainedTotal) * 0.19)), grade: 'A' },
        { subjectName: 'বাংলা, গণিত ও ইংরেজি', fullMark: 100, obtainedMark: Math.min(100, Math.round(Number(newResult.obtainedTotal) * 0.19)), grade: 'A' }
      ]
    };
    const updated = [resultItem, ...results];
    storageService.saveResults(updated);
    onRefreshData();
    setShowResultForm(false);
    setNewResult({
      rollNumber: '',
      studentName: '',
      fatherName: '',
      jamaat: 'হিফজুল কুরআন',
      academicYear: '২০২৬',
      totalMarks: 500,
      obtainedTotal: 450,
      gpa: 'A+',
      division: 'মুমতাজ (স্টার)',
      position: '১ম স্থান'
    });
  };

  const handleDeleteResult = (id: string) => {
    if (window.confirm('এই রেজাল্ট রেকর্ডটি মুছে ফেলতে চান?')) {
      const updated = results.filter(r => r.id !== id);
      storageService.saveResults(updated);
      onRefreshData();
    }
  };

  // Blog Handlers
  const handleAddBlog = (e: FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content) {
      alert('অনুগ্রহ করে ব্লগের শিরোনাম এবং বক্তব্য লিখুন।');
      return;
    }
    const post: BlogPost = {
      id: `BLG-${Date.now()}`,
      title: newBlog.title,
      slug: `blog-${Date.now()}`,
      category: (newBlog.category || 'ইসলামিক শিক্ষা') as any,
      author: newBlog.author || 'মুহতামিম',
      authorDesignation: 'উস্তাদ, মারকাযুল ইহসান',
      readTime: '৪ মিনিট',
      date: new Date().toLocaleDateString('bn-BD'),
      summary: newBlog.summary || newBlog.content.slice(0, 120),
      content: newBlog.content,
      imageUrl: formatDriveImageUrl(newBlog.imageUrl, 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'),
      tags: ['ইসলামিক শিক্ষা', 'মারকাযুল ইহসান']
    };
    const updated = [post, ...blogs];
    storageService.saveBlogs(updated);
    onRefreshData();
    setShowBlogForm(false);
    setNewBlog({ title: '', category: 'ইসলামিক শিক্ষা', author: 'উস্তাদ মারকাযুল ইহসান', summary: '', content: '', imageUrl: '' });
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('এই ব্লগ আর্টিকেলটি মুছে ফেলতে চান?')) {
      const updated = blogs.filter(b => b.id !== id);
      storageService.saveBlogs(updated);
      onRefreshData();
    }
  };

  // Gallery Handlers
  const handleAddGallery = (e: FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.imageUrl) {
      alert('অনুগ্রহ করে ছবির শিরোনাম এবং Google Drive ইমেজ লিঙ্ক বা আইডি দিন।');
      return;
    }
    const item: GalleryItem = {
      id: `GAL-${Date.now()}`,
      title: newGallery.title,
      category: newGallery.category,
      imageUrl: formatDriveImageUrl(newGallery.imageUrl),
      caption: newGallery.caption
    };
    const updated = [item, ...gallery];
    storageService.saveGallery(updated);
    onRefreshData();
    setShowGalleryForm(false);
    setNewGallery({ title: '', category: 'ক্যাম্পাস', imageUrl: '', caption: '' });
  };

  const handleDeleteGallery = (id: string) => {
    if (window.confirm('এই ছবিটি গ্যালারি থেকে সরাতে চান?')) {
      const updated = gallery.filter(g => g.id !== id);
      storageService.saveGallery(updated);
      onRefreshData();
    }
  };

  // Jamaat Handlers
  const handleAddJamaat = (e: FormEvent) => {
    e.preventDefault();
    if (!newJamaat.name) {
      alert('অনুগ্রহ করে জামাতের নাম লিখুন।');
      return;
    }
    const created: JamaatItem = {
      id: `jam_${Date.now()}`,
      name: newJamaat.name.trim(),
      department: newJamaat.department || 'কিতাব বিভাগ',
      code: newJamaat.code?.trim() || newJamaat.name.trim().slice(0, 4).toUpperCase(),
      capacity: Number(newJamaat.capacity) || 30,
      monthlyFee: Number(newJamaat.monthlyFee) || 0,
      description: newJamaat.description?.trim() || '',
      isActive: true
    };
    const updated = storageService.addJamaat(created);
    setJamaats(updated);
    setShowJamaatForm(false);
    setNewJamaat({
      name: '',
      department: 'কিতাব বিভাগ',
      code: '',
      capacity: 35,
      monthlyFee: 1500,
      description: '',
      isActive: true
    });
    setSyncStatus(`নতুন জামাত "${created.name}" সফলভাবে যুক্ত হয়েছে!`);
    setTimeout(() => setSyncStatus(null), 3000);
    onRefreshData();
  };

  const handleDeleteJamaat = (id: string, name: string) => {
    if (window.confirm(`আপনি কি "${name}" জামাতটি তালিকা থেকে মুছে ফেলতে চান?`)) {
      const updated = storageService.deleteJamaat(id);
      setJamaats(updated);
      setSyncStatus(`"${name}" জামাতটি মুছে ফেলা হয়েছে।`);
      setTimeout(() => setSyncStatus(null), 3000);
      onRefreshData();
    }
  };

  const handleResetJamaats = () => {
    if (window.confirm('সকল জামাত ডিফল্ট প্রারম্ভিক তালিকায় ফিরিয়ে নিতে চান?')) {
      const updated = storageService.saveJamaats(DEFAULT_JAMAATS);
      setJamaats(updated);
      setSyncStatus('জামাত তালিকা সফলভাবে ডিফল্ট অবস্থায় ফিরিয়ে আনা হয়েছে।');
      setTimeout(() => setSyncStatus(null), 3000);
      onRefreshData();
    }
  };

  // Slider Handlers
  const handleAddSlider = (e: FormEvent) => {
    e.preventDefault();
    if (!newSliderItem.title || !newSliderItem.imageUrl) {
      alert('স্লাইডারের শিরোনাম এবং ছবির লিংক প্রদান করুন।');
      return;
    }
    const item: SliderImageItem = {
      id: `slide_${Date.now()}`,
      title: newSliderItem.title,
      subtitle: newSliderItem.subtitle || '',
      badge: newSliderItem.badge || 'ক্যাম্পাস কার্যক্রম',
      imageUrl: newSliderItem.imageUrl,
      linkTab: newSliderItem.linkTab || 'admission',
      isActive: newSliderItem.isActive !== undefined ? newSliderItem.isActive : true
    };
    const updated = [item, ...sliderList];
    setSliderList(updated);
    storageService.saveSliderImages(updated);
    onRefreshData();
    setShowSliderForm(false);
    setNewSliderItem({
      title: '',
      subtitle: '',
      badge: 'ক্যাম্পাস কার্যক্রম',
      imageUrl: '',
      linkTab: 'admission',
      isActive: true
    });
    setSyncStatus('নতুন স্লাইডার ছবি সফলভাবে যুক্ত হয়েছে!');
    setTimeout(() => setSyncStatus(null), 3000);
  };

  const handleDeleteSlider = (id: string, title: string) => {
    if (window.confirm(`আপনি কি "${title}" স্লাইডারটি মুছে ফেলতে চান?`)) {
      const updated = sliderList.filter(s => s.id !== id);
      setSliderList(updated);
      storageService.saveSliderImages(updated);
      onRefreshData();
    }
  };

  const handleToggleSliderActive = (id: string) => {
    const updated = sliderList.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s);
    setSliderList(updated);
    storageService.saveSliderImages(updated);
    onRefreshData();
  };

  const handleResetSliders = () => {
    if (window.confirm('আপনি কি ডিফল্ট স্লাইডার ছবিতে ফিরে যেতে চান?')) {
      setSliderList(DEFAULT_SLIDER_IMAGES);
      storageService.saveSliderImages(DEFAULT_SLIDER_IMAGES);
      onRefreshData();
    }
  };

  // Teachers Handlers
  const handleAddTeacher = (e: FormEvent) => {
    e.preventDefault();
    if (!newTeacherItem.name || !newTeacherItem.designation) {
      alert('শিক্ষকের নাম এবং পদবি প্রদান করুন।');
      return;
    }
    const item: TeacherItem = {
      id: `teacher_${Date.now()}`,
      name: newTeacherItem.name,
      designation: newTeacherItem.designation,
      department: newTeacherItem.department || 'কিতাব বিভাগ',
      qualification: newTeacherItem.qualification || '',
      experience: newTeacherItem.experience || '',
      phone: newTeacherItem.phone || '',
      email: newTeacherItem.email || '',
      imageUrl: newTeacherItem.imageUrl || '',
      bio: newTeacherItem.bio || '',
      isActive: newTeacherItem.isActive !== undefined ? newTeacherItem.isActive : true
    };
    const updated = [item, ...teacherList];
    setTeacherList(updated);
    storageService.saveTeachers(updated);
    onRefreshData();
    setShowTeacherForm(false);
    setNewTeacherItem({
      name: '',
      designation: '',
      department: 'কিতাব বিভাগ',
      qualification: '',
      experience: '',
      phone: '',
      email: '',
      imageUrl: '',
      bio: '',
      isActive: true
    });
    setSyncStatus('শিক্ষকের প্রোফাইল সফলভাবে যুক্ত হয়েছে!');
    setTimeout(() => setSyncStatus(null), 3000);
  };

  const handleDeleteTeacher = (id: string, name: string) => {
    if (window.confirm(`আপনি কি "${name}" শিক্ষকের প্রোফাইল মুছে ফেলতে চান?`)) {
      const updated = teacherList.filter(t => t.id !== id);
      setTeacherList(updated);
      storageService.saveTeachers(updated);
      onRefreshData();
    }
  };

  const handleToggleTeacherActive = (id: string) => {
    const updated = teacherList.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t);
    setTeacherList(updated);
    storageService.saveTeachers(updated);
    onRefreshData();
  };

  const handleResetTeachers = () => {
    if (window.confirm('আপনি কি ডিফল্ট শিক্ষক তালিকায় ফিরে যেতে চান?')) {
      setTeacherList(DEFAULT_TEACHERS);
      storageService.saveTeachers(DEFAULT_TEACHERS);
      onRefreshData();
    }
  };

  // 1. Password Protected Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              এডমিন প্যানেলে প্রবেশ
            </h2>
            <p className="text-xs text-slate-500">
              মারকাযুল ইহসান প্রশাসনিক ড্যাশবোর্ডে প্রবেশের জন্য গোপন পাসওয়ার্ড প্রদান করুন।
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                এডমিন পাসওয়ার্ড
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  id="admin-password-input"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
              id="admin-login-submit-btn"
            >
              লগইন করুন
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-400">
              নিরাপত্তা রক্ষার্থে সেশন শেষ হলে লগআউট নিশ্চিত করুন।
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Bar */}
      <div className="bg-gradient-to-r from-emerald-950 to-teal-950 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider">
              এডমিন ড্যাশবোর্ড
            </span>
            <span className="text-xs text-emerald-300 font-mono">v1.0 (Google Sheets Connected)</span>
          </div>
          <h1 className="text-2xl font-bold font-heading">মারকাযুল ইহসান ম্যানেজমেন্ট প্যানেল</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleTestSync}
            className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-600"
            id="admin-sync-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>গুগল শিট সিঙ্ক</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 bg-rose-800 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            id="admin-logout-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {syncStatus && (
        <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-300 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{syncStatus}</span>
        </div>
      )}

      {/* Admin Sub-navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'settings', label: 'সাইট সেটিংস ও তথ্য', icon: Settings },
          { id: 'slider', label: `স্লাইডার ছবি (${sliderList.length})`, icon: Sparkles },
          { id: 'teachers', label: `শিক্ষক পরিষদ (${teacherList.length})`, icon: GraduationCap },
          { id: 'notices', label: `জরুরি নোটিশ ও নোটিশ (${notices.length})`, icon: FileText },
          { id: 'applications', label: `ভর্তি আবেদন (${applications.length})`, icon: Users },
          { id: 'results', label: `ফলাফল (${results.length})`, icon: Award },
          { id: 'jamaats', label: `জামাত ও শ্রেণি (${jamaats.length})`, icon: Layers },
          { id: 'donations', label: `খেদমত ফান্ড (${donations.length})`, icon: HeartHandshake },
          { id: 'blogs', label: `ব্লগ প্রবন্ধ (${blogs.length})`, icon: FileText },
          { id: 'gallery', label: `গ্যালারি (${gallery.length})`, icon: Image },
          { id: 'apps-script', label: 'গুগল শিট ও Code.gs', icon: Code },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
              id={`admin-tab-${tab.id}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: GOOGLE APPS SCRIPT (CODE.GS) & GOOGLE SHEETS ================= */}
      {adminTab === 'apps-script' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                ডাটাবেস ও ব্যাকএন্ড ইন্টিগ্রেশন
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-1">
                Google Sheets ও Apps Script (Code.gs) সংযোগ নির্দেশিকা
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                এই ওয়েবসাইটের সমস্ত ডেটা (ভর্তি আবেদন, রেজাল্ট, ডোনেশন, নোটিশ) বিনামূল্যে গুগল শিটে সংরক্ষণ ও নিয়ন্ত্রণ করতে নিচের কোডটি ব্যবহার করুন।
              </p>
            </div>

            {/* Web App URL Input */}
            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-3">
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider">
                আপনার Google Apps Script Web App URL:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={settingsForm.googleAppsScriptUrl}
                  onChange={e => setSettingsForm({ ...settingsForm, googleAppsScriptUrl: e.target.value })}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  id="input-gas-url"
                />
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>URL সংরক্ষণ করুন</span>
                </button>
              </div>
              <p className="text-[11px] text-emerald-800">
                * Deploy সম্পন্ন করার পর গুগল যে Web App URL টি প্রদান করবে, তা হুবহু উপরে পেস্ট করে "URL সংরক্ষণ করুন" এ চাপুন।
              </p>
            </div>

            {/* Step-by-Step Setup Guide in Bangla */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                সহজ ৫টি ধাপে সেটাপ সম্পন্ন করুন:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">১</span>
                  <strong className="text-slate-900 block font-heading">গুগল শিট খুলুন</strong>
                  <p className="text-slate-600">
                    <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold underline flex items-center gap-1">
                      <span>sheets.new</span>
                      <ExternalLink className="w-3 h-3" />
                    </a> লিংকে গিয়ে একটি নতুন ব্ল্যাংক গুগল শিট খুলুন এবং ফাইলের নাম দিন "Markazul Ihsan Database"।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">২</span>
                  <strong className="text-slate-900 block font-heading">Apps Script এ প্রবেশ</strong>
                  <p className="text-slate-600">
                    গুগল শিটের ওপরের মেন্যুবার থেকে <strong>Extensions &gt; Apps Script</strong> এ ক্লিক করুন। একটি নতুন কোড এডিটর উইন্ডো খুলবে।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">৩</span>
                  <strong className="text-slate-900 block font-heading">Code.gs কোড পেস্ট</strong>
                  <p className="text-slate-600">
                    সেখানকার পূর্বের সব কোড মুছে দিয়ে নিচের <strong>"সম্পূর্ণ Code.gs স্ক্রিপ্ট কপি করুন"</strong> বোতামে চাপ দিয়ে কোডটি পেস্ট করুন এবং Save (Ctrl+S) দিন।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">৪</span>
                  <strong className="text-slate-900 block font-heading">Web App হিসেবে ডিপ্লয়</strong>
                  <p className="text-slate-600">
                    ওপরের ডানপাশে <strong>Deploy &gt; New deployment</strong> চাপুন। গিয়ার আইকনে ক্লিক করে <strong>Web App</strong> সিলেক্ট করুন।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">৫</span>
                  <strong className="text-slate-900 block font-heading">পারমিশন ও URL</strong>
                  <p className="text-slate-600">
                    <strong>Execute as:</strong> "Me" এবং <strong>Who has access:</strong> "Anyone" দিন। এরপর Deploy চেপে পারমিশন দিন এবং প্রাপ্ত URL টি কপি করে ওপরে পেস্ট করুন।
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-100/60 border border-emerald-300 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">✓</span>
                    <strong className="text-emerald-950 block font-heading">অটোমেটিক শিট জেনারেশন!</strong>
                    <p className="text-emerald-900">
                      স্ক্রিপ্টটি নিজে নিজেই গুগল শিটে "Applications", "Donations", "Results", "Notices", "Settings" ট্যাব ও কলাম তৈরি করে নিবে!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code.gs Viewer & 1-Click Copy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 font-mono">
                  Code.gs (সম্পূর্ণ রেডি ব্যাকএন্ড স্ক্রিপ্ট)
                </span>
                <button
                  onClick={handleCopyScript}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  id="copy-code-gs-btn"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'কপি হয়েছে!' : 'সম্পূর্ণ Code.gs স্ক্রিপ্ট কপি করুন'}</span>
                </button>
              </div>

              <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs max-h-72 overflow-y-auto border border-slate-800 leading-relaxed scrollbar-thin">
                <pre>{CODE_GS_SCRIPT}</pre>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= TAB 2: SITE SETTINGS MANAGER ================= */}
      {adminTab === 'settings' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-800" />
                <span>সাইট সেটিংস ও সার্বিক তথ্য ব্যবস্থাপনা</span>
              </h2>
              <p className="text-xs text-slate-500">মাদরাসার রঙ থিম, লোগো, ছবি, প্রতিষ্ঠাতা বাণী, ঠিকানা, ভর্তি ও একাউন্ট পরিবর্তন করুন</p>
            </div>
            {settingsSaved && (
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <Check className="w-4 h-4" />
                <span>সকল তথ্য সফলভাবে সংরক্ষিত!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-8">
            {/* 1. Theme Color Selector */}
            <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-emerald-800" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  ১. কালার থিম ও ডিজাইন প্যালেট
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                পছন্দের থিম নির্বাচন করুন। এটি পরিবর্তন করলে ওয়েবসাইটের হেডার, ফুটার, বাটন ও হাইলাইট রঙ স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে।
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {(Object.keys(THEME_PALETTES) as ThemeKey[]).map((key) => {
                  const palette = THEME_PALETTES[key];
                  const isSelected = (settingsForm.themeColor || 'emerald') === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSettingsForm({ ...settingsForm, themeColor: key })}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        isSelected 
                          ? 'border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-sm' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div 
                        className="w-7 h-7 rounded-lg shrink-0 shadow-xs flex items-center justify-center text-white" 
                        style={{ backgroundColor: palette.colorHex }}
                      >
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-900 block truncate">{palette.name}</span>
                        <span className="text-[10px] text-slate-400 capitalize">{key}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Official Logo & Drive Image Uploads */}
            <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-emerald-800" />
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  ২. অফিশিয়াল লোগো ও ওয়েবসাইটের ছবিসমূহ (Google Drive Integration)
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Google Drive-এর যেকোনো ফাইল লিংক বা সরাসরি ইমেজ আইডি দিন। সিস্টেমটি অটোমেটিকভাবে <code className="bg-slate-200 px-1 py-0.5 rounded text-emerald-800">https://lh3.googleusercontent.com/d/ID</code> ফরম্যাটে কনভার্ট করে নিবে।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Logo URL */}
                <div className="md:col-span-2 bg-white p-4 rounded-xl border border-slate-200">
                  <ImageDriveInput
                    label="মাদরাসার অফিশিয়াল মনোগ্রাম / লোগো"
                    value={settingsForm.logoUrl || ''}
                    onChange={(url) => setSettingsForm({ ...settingsForm, logoUrl: url })}
                    placeholder="Google Drive লিংক বা আইডি দিন"
                    helpText="এখানে লোগো পরিবর্তন করলে হেডার, ফুটার, মার্কশীট ও ভাউচার সহ পুরো সাইটের সকল লোগো একবারে অটো আপডেট হবে।"
                  />
                </div>

                {/* Hero Banner Image */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <ImageDriveInput
                    label="প্রথম পাতার হিরো ব্যানার ছবি"
                    value={settingsForm.heroImageUrl || ''}
                    onChange={(url) => setSettingsForm({ ...settingsForm, heroImageUrl: url })}
                    placeholder="Google Drive লিংক বা ছবি আইডি"
                    helpText="হোমপেজের শীর্ষে প্রদর্শিত মূল মাদরাসা বা ক্যাম্পাসের ছবি।"
                  />
                </div>

                {/* Founder Photo */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <ImageDriveInput
                    label="প্রতিষ্ঠাতা ও মুহতামিমের ছবি"
                    value={settingsForm.founderImageUrl || ''}
                    onChange={(url) => setSettingsForm({ ...settingsForm, founderImageUrl: url })}
                    placeholder="Google Drive লিংক বা আইডি"
                    helpText="পরিচিতি ও মুহতামিমের বাণী সেকশনে প্রদর্শিত ছবি।"
                  />
                </div>

                {/* Temporary Campus Image */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <ImageDriveInput
                    label="অস্থায়ী ক্যাম্পাস ছবি (যাত্রাবাড়ী)"
                    value={settingsForm.campusTemporaryImageUrl || ''}
                    onChange={(url) => setSettingsForm({ ...settingsForm, campusTemporaryImageUrl: url })}
                    placeholder="Google Drive লিংক বা আইডি"
                    helpText="যাত্রাবাড়ী ক্যাম্পাসের আলোকচিত্র।"
                  />
                </div>

                {/* Permanent Campus Image */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <ImageDriveInput
                    label="স্থায়ী ক্যাম্পাস ছবি (ডেমরা, ঢাকা)"
                    value={settingsForm.campusPermanentImageUrl || ''}
                    onChange={(url) => setSettingsForm({ ...settingsForm, campusPermanentImageUrl: url })}
                    placeholder="Google Drive লিংক বা আইডি"
                    helpText="পাইটি, ডেমরার স্থায়ী ক্যাম্পাস ও ভূমির ছবি।"
                  />
                </div>
              </div>
            </div>

            {/* 3. Madrasa Info & Statements */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-1">
                ৩. মাদরাসার মূল পরিচিতি ও বাণী
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">মাদরাসার নাম (বাংলা)</label>
                  <input
                    type="text"
                    value={settingsForm.madrasaNameBn}
                    onChange={e => setSettingsForm({ ...settingsForm, madrasaNameBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">মাদরাসার নাম (ইংরেজি)</label>
                  <input
                    type="text"
                    value={settingsForm.madrasaNameEn}
                    onChange={e => setSettingsForm({ ...settingsForm, madrasaNameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">আরবি মূলমন্ত্র (Motto)</label>
                  <input
                    type="text"
                    value={settingsForm.madrasaArabicMotto || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, madrasaArabicMotto: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-serif focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ট্যাগলাইন / স্লোগান</label>
                  <input
                    type="text"
                    value={settingsForm.tagline || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">প্রতিষ্ঠাতা ও মোতাওয়াল্লী</label>
                  <input
                    type="text"
                    value={settingsForm.founderName}
                    onChange={e => setSettingsForm({ ...settingsForm, founderName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">প্রতিষ্ঠাতার পদবী</label>
                  <input
                    type="text"
                    value={settingsForm.founderDesignation || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, founderDesignation: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">প্রতিষ্ঠার তারিখ</label>
                  <input
                    type="text"
                    value={settingsForm.establishedDate}
                    onChange={e => setSettingsForm({ ...settingsForm, establishedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ভর্তি বছরের নাম</label>
                  <input
                    type="text"
                    value={settingsForm.admissionYear}
                    onChange={e => setSettingsForm({ ...settingsForm, admissionYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Principal Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">মুহতামিম ও প্রতিষ্ঠাতার দিকনির্দেশনামূলক বাণী</label>
                <textarea
                  rows={3}
                  value={settingsForm.principalMessage || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, principalMessage: e.target.value })}
                  placeholder="মুহতামিমের মূল্যবান বাণী লিখুন..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* About Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">সংক্ষিপ্ত পরিচিতি ও উদ্দেশ্য</label>
                <textarea
                  rows={3}
                  value={settingsForm.aboutSummary || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, aboutSummary: e.target.value })}
                  placeholder="মাদরাসার সংক্ষিপ্ত ইতিহাস ও লক্ষ্য..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">অস্থায়ী ক্যাম্পাস ঠিকানা</label>
                  <textarea
                    rows={2}
                    value={settingsForm.addressTemporary}
                    onChange={e => setSettingsForm({ ...settingsForm, addressTemporary: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">স্থায়ী ক্যাম্পাস ঠিকানা</label>
                  <textarea
                    rows={2}
                    value={settingsForm.addressPermanent}
                    onChange={e => setSettingsForm({ ...settingsForm, addressPermanent: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* 4. Urgent Notice Ticker */}
            <div className="space-y-4 p-4 bg-rose-50/60 rounded-xl border border-rose-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 border-b border-rose-200 pb-1 flex items-center justify-between">
                <span>৪. জরুরি নোটিশ ও স্ক্রল টিক্কার (স্লাইডারের ঠিক নিচে)</span>
                <span className="text-[11px] font-normal text-slate-500">হোমপেজে স্লাইডারের নিচে দেখাবে</span>
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.showUrgentNotice}
                    onChange={e => setSettingsForm({ ...settingsForm, showUrgentNotice: e.target.checked })}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>জরুরি নোটিশ টিক্কার চালু রাখুন (ইমেজ স্লাইডারের নিচে প্রদর্শিত হবে)</span>
                </label>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">জরুরি নোটিশের বিষয়বস্তু / বার্তা</label>
                  <textarea
                    rows={2}
                    value={settingsForm.urgentTickerText || settingsForm.urgentNoticeText || ''}
                    onChange={e => setSettingsForm({ 
                      ...settingsForm, 
                      urgentNoticeText: e.target.value,
                      urgentTickerText: e.target.value 
                    })}
                    placeholder="উদাহরণ: ২০২৬-২৭ শিক্ষাবর্ষে শিশু শ্রেণি থেকে তাকমীল ও হিফজ বিভাগে নতুন ছাত্র ভর্তি চলছে!"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-600 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 5. Admission Controls */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-1">
                ৫. ভর্তি কার্যক্রম নিয়ন্ত্রণ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ভর্তি স্ট্যাটাস</label>
                  <label className="flex items-center gap-2 pt-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsForm.isAdmissionOpen}
                      onChange={e => setSettingsForm({ ...settingsForm, isAdmissionOpen: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className={settingsForm.isAdmissionOpen ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                      {settingsForm.isAdmissionOpen ? '✓ ভর্তি চলছে (Active)' : '✗ ভর্তি সাময়িক বন্ধ (Closed)'}
                    </span>
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ভর্তি সংক্রান্ত বার্তা</label>
                  <input
                    type="text"
                    value={settingsForm.admissionNoticeText || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, admissionNoticeText: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* 6. Phone, WhatsApp & Social */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-1">
                ৬. যোগাযোগ ও সোশ্যাল লিংক
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">প্রধান ফোন নম্বর</label>
                  <input
                    type="text"
                    value={settingsForm.phonePrimary}
                    onChange={e => setSettingsForm({ ...settingsForm, phonePrimary: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ভর্তি ডেস্ক ফোন</label>
                  <input
                    type="text"
                    value={settingsForm.phoneSecondary}
                    onChange={e => setSettingsForm({ ...settingsForm, phoneSecondary: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">হোয়াটসঅ্যাপ নম্বর</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={e => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={e => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ফেসবুক পেজ লিংক</label>
                  <input
                    type="url"
                    value={settingsForm.facebookPageUrl}
                    onChange={e => setSettingsForm({ ...settingsForm, facebookPageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ইউটিউব চ্যানেল লিংক</label>
                  <input
                    type="url"
                    value={settingsForm.youtubeUrl}
                    onChange={e => setSettingsForm({ ...settingsForm, youtubeUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* 7. Accounts & Donation */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-1">
                ৭. দান ও পেমেন্ট একাউন্টসমূহ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">বিকাশ (bKash) নম্বর</label>
                  <input
                    type="text"
                    value={settingsForm.bkashNumber}
                    onChange={e => setSettingsForm({ ...settingsForm, bkashNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">নগদ (Nagad) নম্বর</label>
                  <input
                    type="text"
                    value={settingsForm.nagadNumber}
                    onChange={e => setSettingsForm({ ...settingsForm, nagadNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">রকেট (Rocket) নম্বর</label>
                  <input
                    type="text"
                    value={settingsForm.rocketNumber}
                    onChange={e => setSettingsForm({ ...settingsForm, rocketNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ব্যাংক হিসাব বিবরণ</label>
                <textarea
                  rows={2}
                  value={settingsForm.bankAccountDetails}
                  onChange={e => setSettingsForm({ ...settingsForm, bankAccountDetails: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* 8. Google Apps Script Web App Integration */}
            <div className="space-y-4 p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 border-b border-emerald-200 pb-1 flex items-center justify-between">
                <span>৮. গুগল শিট ও Apps Script ওয়েব অ্যাপ ইউআরএল</span>
                {syncStatus && <span className="text-[11px] font-normal text-emerald-700">{syncStatus}</span>}
              </h3>
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  Google Apps Script Web App URL (Exec Link)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={settingsForm.googleAppsScriptUrl || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, googleAppsScriptUrl: e.target.value, googleSheetWebAppUrl: e.target.value })}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleTestSync}
                    className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>সিঙ্ক পরীক্ষা</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 9. Admin Password Change */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 border-b border-slate-100 pb-1">
                ৯. এডমিন লগইন পাসওয়ার্ড পরিবর্তন
              </h3>
              <div className="max-w-xs">
                <label className="block text-xs font-semibold text-slate-700 mb-1">নতুন পাসওয়ার্ড</label>
                <input
                  type="text"
                  value={settingsForm.adminPassword}
                  onChange={e => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                className="px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center gap-2"
                id="save-settings-btn"
              >
                <Save className="w-4 h-4" />
                <span>সকল পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= TAB 3: ADMISSION APPLICATIONS ================= */}
      {adminTab === 'applications' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900">অনলাইন ভর্তি আবেদন তালিকা</h2>
              <p className="text-xs text-slate-500">মোট আবেদন জমা হয়েছে: {applications.length} টি</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-3 font-semibold">আবেদন আইডি</th>
                  <th className="p-3 font-semibold">ছাত্রের নাম</th>
                  <th className="p-3 font-semibold">পিতার নাম</th>
                  <th className="p-3 font-semibold">অভিভাবক ফোন</th>
                  <th className="p-3 font-semibold">জামাত</th>
                  <th className="p-3 font-semibold">ক্যাম্পাস</th>
                  <th className="p-3 font-semibold">আবেদনের তারিখ</th>
                  <th className="p-3 font-semibold text-center">অবস্থা (Status)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {applications.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-slate-400">কোনো আবেদন নেই।</td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-emerald-800">{app.id}</td>
                      <td className="p-3 font-bold text-slate-900 font-heading">{app.studentNameBn}</td>
                      <td className="p-3 text-slate-600">{app.fatherName}</td>
                      <td className="p-3 font-sans">{app.guardianPhone}</td>
                      <td className="p-3 font-semibold text-slate-800">{app.jamaat}</td>
                      <td className="p-3 text-slate-600 text-xs">{app.campus.includes('যাত্রাবাড়ী') ? 'যাত্রাবাড়ী' : 'ডেমরা'}</td>
                      <td className="p-3 text-slate-500 font-sans text-xs">{app.appliedDate}</td>
                      <td className="p-3 text-center">
                        <select
                          value={app.status}
                          onChange={e => handleApplicationStatus(app.id, e.target.value as any)}
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            app.status === 'অনুমোদিত'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : app.status === 'বাতিল'
                              ? 'bg-rose-100 text-rose-800 border-rose-300'
                              : 'bg-amber-100 text-amber-800 border-amber-300'
                          } border`}
                        >
                          <option value="অপেক্ষমান">অপেক্ষমান</option>
                          <option value="অনুমোদিত">অনুমোদিত</option>
                          <option value="বাতিল">বাতিল</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: DONATIONS / KHIDMAT FUND ================= */}
      {adminTab === 'donations' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold font-heading text-slate-900">অনুদান ও খেদমত ফান্ড ট্র্যাকিং</h2>
            <p className="text-xs text-slate-500">মোট রেকর্ড: {donations.length} টি</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-3 font-semibold">আইডি</th>
                  <th className="p-3 font-semibold">দাতার নাম</th>
                  <th className="p-3 font-semibold">মোবাইল</th>
                  <th className="p-3 font-semibold">খাত</th>
                  <th className="p-3 font-semibold">পরিমাণ</th>
                  <th className="p-3 font-semibold">মাধ্যম</th>
                  <th className="p-3 font-semibold">Trx ID</th>
                  <th className="p-3 font-semibold">তারিখ</th>
                  <th className="p-3 font-semibold text-center">স্ট্যাটাস</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-600">{d.id}</td>
                    <td className="p-3 font-bold text-slate-900">{d.donorName}</td>
                    <td className="p-3 font-sans">{d.donorPhone}</td>
                    <td className="p-3 text-slate-700">{d.fundType}</td>
                    <td className="p-3 font-bold text-emerald-800 font-sans">{d.amount} ৳</td>
                    <td className="p-3 text-slate-600">{d.paymentMethod}</td>
                    <td className="p-3 font-mono text-xs">{d.trxId || '—'}</td>
                    <td className="p-3 font-sans text-xs">{d.date}</td>
                    <td className="p-3 text-center">
                      <select
                        value={d.status}
                        onChange={e => handleDonationStatus(d.id, e.target.value as any)}
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          d.status === 'নিশ্চিত'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        } border`}
                      >
                        <option value="অপেক্ষমান">অপেক্ষমান</option>
                        <option value="নিশ্চিত">নিশ্চিত</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 5: NOTICES MANAGER ================= */}
      {adminTab === 'notices' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900">নোটিশ বোর্ড ব্যবস্থাপনা</h2>
              <p className="text-xs text-slate-500">নতুন নোটিশ প্রকাশ ও পূর্বের নোটিশ সম্পাদন</p>
            </div>
            <button
              onClick={() => setShowNoticeForm(!showNoticeForm)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              id="add-new-notice-toggle"
            >
              <Plus className="w-4 h-4" />
              <span>{showNoticeForm ? 'ফর্ম বন্ধ' : 'নতুন নোটিশ তৈরি'}</span>
            </button>
          </div>

          {/* New Notice Form */}
          {showNoticeForm && (
            <form onSubmit={handleAddNotice} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                নতুন নোটিশের তথ্য
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">নোটিশের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={newNotice.title || ''}
                  onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="যেমন: পবিত্র মাহে রমজান উপলক্ষে ক্লাস ছুটি"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={newNotice.category || 'ভর্তি'}
                    onChange={e => setNewNotice({ ...newNotice, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="ভর্তি">ভর্তি</option>
                    <option value="পরীক্ষা">পরীক্ষা</option>
                    <option value="ছুটি">ছুটি</option>
                    <option value="ফলাফল">ফলাফল</option>
                    <option value="জরুরি">জরুরি</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">প্রকাশকের নাম</label>
                  <input
                    type="text"
                    value={newNotice.publishedBy || 'দফতর সচিব'}
                    onChange={e => setNewNotice({ ...newNotice, publishedBy: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(newNotice.isUrgent)}
                      onChange={e => setNewNotice({ ...newNotice, isUrgent: e.target.checked })}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-rose-700">জরুরি নোটিশ হিসেবে চিহ্নিত করুন</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">নোটিশের বিস্তারিত বক্তব্য *</label>
                <textarea
                  rows={4}
                  required
                  value={newNotice.content || ''}
                  onChange={e => setNewNotice({ ...newNotice, content: e.target.value })}
                  placeholder="নোটিশের বিস্তারিত বিবরণ লিখুন..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-700"
              >
                নোটিশ প্রকাশ করুন
              </button>
            </form>
          )}

          {/* Notices Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-3 font-semibold">শিরোনাম</th>
                  <th className="p-3 font-semibold">ক্যাটাগরি</th>
                  <th className="p-3 font-semibold">তারিখ</th>
                  <th className="p-3 font-semibold">প্রকাশক</th>
                  <th className="p-3 font-semibold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {notices.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 font-heading">
                      {n.title}
                      {n.isUrgent && <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-rose-600 text-white rounded font-sans">জরুরি</span>}
                    </td>
                    <td className="p-3 text-slate-600">{n.category}</td>
                    <td className="p-3 font-sans text-xs">{n.date}</td>
                    <td className="p-3 text-slate-500 text-xs">{n.publishedBy}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteNotice(n.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 6: RESULTS MANAGER ================= */}
      {adminTab === 'results' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-800" />
                <span>পরীক্ষার ফলাফল ডাটাবেস</span>
              </h2>
              <p className="text-xs text-slate-500">মোট রেজাল্ট রেকর্ড: {results.length} টি (গুগল শিট ও লোকাল ডাটাবেস)</p>
            </div>
            <button
              onClick={() => setShowResultForm(!showResultForm)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              id="add-new-result-toggle"
            >
              <Plus className="w-4 h-4" />
              <span>{showResultForm ? 'ফর্ম বন্ধ' : 'নতুন ফলাফল যুক্ত করুন'}</span>
            </button>
          </div>

          {/* New Result Form */}
          {showResultForm && (
            <form onSubmit={handleAddResult} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                নতুন ছাত্রের পরীক্ষার ফলাফল অন্তর্ভুক্তি
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">রোল নম্বর *</label>
                  <input
                    type="text"
                    required
                    value={newResult.rollNumber}
                    onChange={e => setNewResult({ ...newResult, rollNumber: e.target.value })}
                    placeholder="যেমন: MI-2026-101"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">শিক্ষার্থীর নাম *</label>
                  <input
                    type="text"
                    required
                    value={newResult.studentName}
                    onChange={e => setNewResult({ ...newResult, studentName: e.target.value })}
                    placeholder="যেমন: মুহাম্মদ আবদুল্লাহ"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">পিতার নাম</label>
                  <input
                    type="text"
                    value={newResult.fatherName}
                    onChange={e => setNewResult({ ...newResult, fatherName: e.target.value })}
                    placeholder="পিতার নাম"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">জামাত / শ্রেণি (ড্যাশবোর্ড তালিকা)</label>
                  <select
                    value={newResult.jamaat}
                    onChange={e => setNewResult({ ...newResult, jamaat: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    {jamaats.map(j => (
                      <option key={j.id} value={j.name}>{j.name} ({j.department})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">শিক্ষাবর্ষ</label>
                  <input
                    type="text"
                    value={newResult.academicYear}
                    onChange={e => setNewResult({ ...newResult, academicYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">প্রাপ্ত নম্বর / মোট নম্বর</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={newResult.obtainedTotal}
                      onChange={e => setNewResult({ ...newResult, obtainedTotal: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                    />
                    <span className="text-slate-400">/</span>
                    <input
                      type="number"
                      value={newResult.totalMarks}
                      onChange={e => setNewResult({ ...newResult, totalMarks: Number(e.target.value) })}
                      className="w-24 px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GPA / গ্রেড</label>
                  <input
                    type="text"
                    value={newResult.gpa}
                    onChange={e => setNewResult({ ...newResult, gpa: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">বিভাগ (Division)</label>
                  <input
                    type="text"
                    value={newResult.division}
                    onChange={e => setNewResult({ ...newResult, division: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">স্থান / পজিশন</label>
                  <input
                    type="text"
                    value={newResult.position}
                    onChange={e => setNewResult({ ...newResult, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-700 transition-colors"
              >
                ফলাফল সংরক্ষণ করুন
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-3 font-semibold">রোল</th>
                  <th className="p-3 font-semibold">ছাত্রের নাম</th>
                  <th className="p-3 font-semibold">জামাত</th>
                  <th className="p-3 font-semibold">শিক্ষাবর্ষ</th>
                  <th className="p-3 font-semibold">প্রাপ্ত নম্বর</th>
                  <th className="p-3 font-semibold">GPA</th>
                  <th className="p-3 font-semibold">বিভাগ</th>
                  <th className="p-3 font-semibold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-emerald-800">{r.rollNumber}</td>
                    <td className="p-3 font-bold text-slate-900">{r.studentName}</td>
                    <td className="p-3 text-slate-700">{r.jamaat}</td>
                    <td className="p-3 font-sans text-xs">{r.academicYear}</td>
                    <td className="p-3 font-sans">{r.obtainedTotal} / {r.totalMarks}</td>
                    <td className="p-3 font-bold font-sans text-emerald-700">{r.gpa}</td>
                    <td className="p-3 font-semibold text-slate-800">{r.division}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteResult(r.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 7: BLOG ARTICLES ================= */}
      {adminTab === 'blogs' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-800" />
                <span>ব্লগ ও প্রবন্ধ তালিকা</span>
              </h2>
              <p className="text-xs text-slate-500">মোট প্রবন্ধ: {blogs.length} টি (Google Drive কাভার ছবি সাপোর্ট সহ)</p>
            </div>
            <button
              onClick={() => setShowBlogForm(!showBlogForm)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              id="add-new-blog-toggle"
            >
              <Plus className="w-4 h-4" />
              <span>{showBlogForm ? 'ফর্ম বন্ধ' : 'নতুন প্রবন্ধ প্রকাশ করুন'}</span>
            </button>
          </div>

          {/* New Blog Form */}
          {showBlogForm && (
            <form onSubmit={handleAddBlog} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                নতুন ব্লগ পোস্ট বা আর্টিকেল
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">প্রবন্ধের শিরোনাম *</label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                    placeholder="যেমন: কুরআনে হাফেজ হওয়ার ফজিলত ও মর্যাদা"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <input
                    type="text"
                    value={newBlog.category}
                    onChange={e => setNewBlog({ ...newBlog, category: e.target.value })}
                    placeholder="যেমন: ইসলামিক শিক্ষা"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">লেখকের নাম</label>
                  <input
                    type="text"
                    value={newBlog.author}
                    onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
                    placeholder="যেমন: মুহতামিম, মারকাযুল ইহসান"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <ImageDriveInput
                    label="ব্লগ কাভার ছবি (Google Drive)"
                    value={newBlog.imageUrl}
                    onChange={(url) => setNewBlog({ ...newBlog, imageUrl: url })}
                    placeholder="Google Drive ছবি আইডি বা লিংক"
                    helpText="ব্লগের প্রধান শিরোনামের সাথে প্রদর্শিত হবে।"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">সংক্ষিপ্ত সারাংশ</label>
                <input
                  type="text"
                  value={newBlog.summary}
                  onChange={e => setNewBlog({ ...newBlog, summary: e.target.value })}
                  placeholder="পাঠকদের আকৃষ্ট করতে এক বা দুই লাইনে সারাংশ লিখুন..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">সম্পূর্ণ বক্তব্য ও বিষয়বস্তু *</label>
                <textarea
                  rows={5}
                  required
                  value={newBlog.content}
                  onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                  placeholder="বিস্তারিত আলোচনা ও প্রবন্ধ লিখুন..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-700 transition-colors"
              >
                প্রবন্ধ প্রকাশ করুন
              </button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="p-3 font-semibold">শিরোনাম</th>
                  <th className="p-3 font-semibold">ক্যাটাগরি</th>
                  <th className="p-3 font-semibold">লেখক</th>
                  <th className="p-3 font-semibold">তারিখ</th>
                  <th className="p-3 font-semibold text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900 font-heading">{b.title}</td>
                    <td className="p-3 text-slate-600">{b.category}</td>
                    <td className="p-3 text-slate-700">{b.author}</td>
                    <td className="p-3 font-sans text-xs">{b.date}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 8: GALLERY MANAGER ================= */}
      {adminTab === 'gallery' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                <Image className="w-5 h-5 text-emerald-800" />
                <span>ফটোগ্যালারি ব্যবস্থাপনা</span>
              </h2>
              <p className="text-xs text-slate-500">মোট ছবি: {gallery.length} টি (Google Drive সরাসরি লিংক ফরম্যাট)</p>
            </div>
            <button
              onClick={() => setShowGalleryForm(!showGalleryForm)}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              id="add-new-gallery-toggle"
            >
              <Plus className="w-4 h-4" />
              <span>{showGalleryForm ? 'ফর্ম বন্ধ' : 'নতুন ছবি যোগ করুন'}</span>
            </button>
          </div>

          {/* New Gallery Form */}
          {showGalleryForm && (
            <form onSubmit={handleAddGallery} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                গ্যালারিতে নতুন আলোকচিত্র অন্তর্ভুক্তি
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ছবির শিরোনাম *</label>
                  <input
                    type="text"
                    required
                    value={newGallery.title}
                    onChange={e => setNewGallery({ ...newGallery, title: e.target.value })}
                    placeholder="যেমন: হিফজ সমাপ্তকারী ছাত্রদের পাগড়ি প্রদান অনুষ্ঠান"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={newGallery.category}
                    onChange={e => setNewGallery({ ...newGallery, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    <option value="ক্যাম্পাস">ক্যাম্পাস</option>
                    <option value="ক্লাসরুম">ক্লাসরুম</option>
                    <option value="ছাত্রবৃন্দ">ছাত্রবৃন্দ</option>
                    <option value="অনুষ্ঠান">অনুষ্ঠান ও মাহফিল</option>
                    <option value="লাইব্রেরি">লাইব্রেরি</option>
                  </select>
                </div>
              </div>

              <div>
                <ImageDriveInput
                  label="Google Drive ছবির লিংক বা ফাইল আইডি *"
                  value={newGallery.imageUrl}
                  onChange={(url) => setNewGallery({ ...newGallery, imageUrl: url })}
                  placeholder="https://drive.google.com/file/d/ID/view অথবা শুধু আইডি"
                  helpText="ছবিটি স্বয়ংক্রিয়ভাবে https://lh3.googleusercontent.com/d/ID ফরম্যাটে রূপান্তরিত হবে এবং ওয়েবসাইটে সাথে সাথে দেখা যাবে।"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">ক্যাপশন / বিবরণ (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={newGallery.caption}
                  onChange={e => setNewGallery({ ...newGallery, caption: e.target.value })}
                  placeholder="ছবির সাথে ছোট বর্ণনা"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-emerald-700 transition-colors"
              >
                ছবি গ্যালারিতে প্রকাশ করুন
              </button>
            </form>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((g) => (
              <div key={g.id} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 relative group">
                <img 
                  src={formatDriveImageUrl(g.imageUrl)} 
                  alt={g.title} 
                  className="w-full h-36 object-cover" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback in case of broken network link
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
                  }} 
                />
                <div className="p-2.5">
                  <span className="text-[10px] font-bold text-emerald-800 block">{g.category}</span>
                  <p className="text-xs font-bold text-slate-900 truncate">{g.title}</p>
                </div>
                <button
                  onClick={() => handleDeleteGallery(g.id)}
                  className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  title="মুছুন"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB: JAMAAT & CLASS MANAGEMENT (ছাত্রদের জামাত যুক্ত ও পরিচালনা) ================= */}
      {adminTab === 'jamaats' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  ক্লাস ও শিক্ষাক্রম ব্যবস্থাপনা
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-2">
                  ছাত্রদের জামাত ও শ্রেণি তালিকা পরিচালনা
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-serif">
                  নতুন জামাত যুক্ত করুন, আসন সংখ্যা ও মাসিক ফি নির্ধারণ করুন। এখান থেকে যুক্ত করা জামাতসমূহ স্বয়ংক্রিয়ভাবে ফলাফল ও ভর্তি অনুসন্ধানে আপডেট হবে।
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleResetJamaats}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                  title="ডিফল্ট তালিকা রিস্টোর করুন"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>ডিফল্ট তালিকা</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowJamaatForm(!showJamaatForm)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  id="admin-add-jamaat-btn"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showJamaatForm ? 'ফরম বন্ধ করুন' : 'নতুন জামাত যুক্ত করুন'}</span>
                </button>
              </div>
            </div>

            {/* Quick Summary Counter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-bold block">মোট জামাত</span>
                <span className="text-2xl font-bold text-emerald-950 font-sans">{jamaats.length} টি</span>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-xs text-amber-900 font-bold block">কিতাব বিভাগ</span>
                <span className="text-2xl font-bold text-amber-950 font-sans">
                  {jamaats.filter(j => j.department.includes('কিতাব')).length} টি
                </span>
              </div>
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                <span className="text-xs text-teal-900 font-bold block">হিফজ ও কুরআন</span>
                <span className="text-2xl font-bold text-teal-950 font-sans">
                  {jamaats.filter(j => j.department.includes('হিফজ') || j.department.includes('নাযেরা') || j.department.includes('নূরানী')).length} টি
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-700 font-bold block">মোট আসন ক্ষমতা</span>
                <span className="text-2xl font-bold text-slate-900 font-sans">
                  {jamaats.reduce((acc, curr) => acc + (curr.capacity || 0), 0)} জন
                </span>
              </div>
            </div>

            {/* New Jamaat Creation Form */}
            {showJamaatForm && (
              <form onSubmit={handleAddJamaat} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in" id="add-jamaat-form">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-800" />
                    <span>নতুন জামাতের তথ্য পূরণ করুন</span>
                  </h3>
                  <span className="text-xs text-slate-500">* চিহ্নিত ঘরগুলো আবশ্যক</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      জামাতের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={newJamaat.name || ''}
                      onChange={e => setNewJamaat({ ...newJamaat, name: e.target.value })}
                      placeholder="যেমন: তাকমীল (দাওরায়ে হাদীস)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      id="input-jamaat-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      বিভাগ *
                    </label>
                    <select
                      value={newJamaat.department || 'কিতাব বিভাগ'}
                      onChange={e => setNewJamaat({ ...newJamaat, department: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      id="select-jamaat-dept"
                    >
                      <option value="কিতাব বিভাগ">কিতাব বিভাগ</option>
                      <option value="হিফজুল কুরআন">হিফজুল কুরআন</option>
                      <option value="নাযেরা বিভাগ">নাযেরা বিভাগ</option>
                      <option value="নূরানী ও মক্তব">নূরানী ও মক্তব</option>
                      <option value="অন্যান্য বিশেষ বিভাগ">অন্যান্য বিশেষ বিভাগ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      সংক্ষিপ্ত কোড (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={newJamaat.code || ''}
                      onChange={e => setNewJamaat({ ...newJamaat, code: e.target.value })}
                      placeholder="যেমন: TAK বা MIF"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm uppercase font-mono focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      id="input-jamaat-code"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      সর্বোচ্চ আসন সংখ্যা
                    </label>
                    <input
                      type="number"
                      value={newJamaat.capacity || 35}
                      onChange={e => setNewJamaat({ ...newJamaat, capacity: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      id="input-jamaat-capacity"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      মাসিক অনুদান / বেতন (৳)
                    </label>
                    <input
                      type="number"
                      value={newJamaat.monthlyFee || 1500}
                      onChange={e => setNewJamaat({ ...newJamaat, monthlyFee: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      id="input-jamaat-fee"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      সিলেবাস ও সংক্ষিপ্ত বিবরণ
                    </label>
                    <input
                      type="text"
                      value={newJamaat.description || ''}
                      onChange={e => setNewJamaat({ ...newJamaat, description: e.target.value })}
                      placeholder="যেমন: সিহাহ সিত্তাহ ও উসূলে হাদীস পাঠদান"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      id="input-jamaat-desc"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowJamaatForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-lg transition-colors"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                    id="submit-jamaat-btn"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>সংরক্ষণ করুন</span>
                  </button>
                </div>
              </form>
            )}

            {/* List of Registered Jamaats */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="p-3 font-semibold">ক্রম</th>
                    <th className="p-3 font-semibold">জামাত / শ্রেণি</th>
                    <th className="p-3 font-semibold">বিভাগ</th>
                    <th className="p-3 font-semibold text-center">কোড</th>
                    <th className="p-3 font-semibold text-center">আসন সংখ্যা</th>
                    <th className="p-3 font-semibold text-center">মাসিক ফি (৳)</th>
                    <th className="p-3 font-semibold">সিলেবাস / বিবরণ</th>
                    <th className="p-3 font-semibold text-right">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {jamaats.map((j, index) => (
                    <tr key={j.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono text-slate-400">{index + 1}</td>
                      <td className="p-3">
                        <strong className="text-slate-900 font-heading block">{j.name}</strong>
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold inline-block ${
                          j.department.includes('হিফজ')
                            ? 'bg-teal-100 text-teal-900 border border-teal-200'
                            : j.department.includes('কিতাব')
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                            : 'bg-amber-100 text-amber-900 border border-amber-200'
                        }`}>
                          {j.department}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                          {j.code || '—'}
                        </span>
                      </td>
                      <td className="p-3 text-center font-sans font-medium text-slate-800">
                        {j.capacity || 30} জন
                      </td>
                      <td className="p-3 text-center font-sans font-medium text-slate-800">
                        {j.monthlyFee ? `৳${j.monthlyFee}` : 'বিনামূল্যে'}
                      </td>
                      <td className="p-3 text-slate-600 text-xs max-w-xs truncate font-serif">
                        {j.description || '—'}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteJamaat(j.id, j.name)}
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                          title="জামাত মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* ================= TAB: SLIDER IMAGES MANAGEMENT ================= */}
      {adminTab === 'slider' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-800" />
                <h2 className="text-xl font-bold text-slate-900 font-heading">
                  হোমপেজ ব্যানার স্লাইডার ছবি ({sliderList.length})
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-serif">
                হোমপেজে প্রতি ৩ সেকেন্ড পর পর এই ছবিগুলো স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে। গুগল শিটের <strong>Slider</strong> ট্যাবে এন্ট্রি করলে অটোমেটিক সিঙ্ক হবে।
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleResetSliders}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ডিফল্ট স্লাইডার ফেরত আনুন</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSliderForm(!showSliderForm)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>{showSliderForm ? 'ফর্ম বন্ধ করুন' : 'নতুন স্লাইড যোগ করুন'}</span>
              </button>
            </div>
          </div>

          {/* Add Slider Item Form */}
          {showSliderForm && (
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-800 shadow-md">
              <h3 className="text-base font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-800" />
                <span>নতুন স্লাইডার ব্যানার এন্ট্রি</span>
              </h3>
              <form onSubmit={handleAddSlider} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ব্যানার শিরোনাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="উদা: ঐতিহ্যবাহী কেন্দ্রীয় জামে মসজিদ ও হিফজ ক্যাম্পাস"
                      value={newSliderItem.title}
                      onChange={e => setNewSliderItem({ ...newSliderItem, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ব্যাজ / ট্যাগ (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      placeholder="উদা: ক্যাম্পাস কার্যক্রম / কিতাব বিভাগ"
                      value={newSliderItem.badge}
                      onChange={e => setNewSliderItem({ ...newSliderItem, badge: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    সংক্ষিপ্ত বিবরণ / উপ-শিরোনাম
                  </label>
                  <input
                    type="text"
                    placeholder="উদা: সুশৃঙ্খল ও নিরিবিলি মনোরম পরিবেশে দ্বীনি ইলম চর্চার পবিত্র অঙ্গন"
                    value={newSliderItem.subtitle}
                    onChange={e => setNewSliderItem({ ...newSliderItem, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
                  />
                </div>

                {/* Google Drive / Direct Image Input */}
                <ImageDriveInput
                  label="স্লাইডারের ছবি লিংক (Google Drive বা Direct URL) *"
                  value={newSliderItem.imageUrl || ''}
                  onChange={url => setNewSliderItem({ ...newSliderItem, imageUrl: url })}
                  placeholder="Google Drive share link or direct image URL..."
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSliderForm(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Slider Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sliderList.map((item, index) => {
              const displayUrl = formatDriveImageUrl(item.imageUrl);
              return (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl overflow-hidden border transition-all ${
                    item.isActive ? 'border-slate-200 shadow-sm' : 'border-dashed border-slate-300 opacity-60'
                  }`}
                >
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    {displayUrl ? (
                      <img
                        src={displayUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        ছবি নেই
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-900/70 text-white text-[10px] font-bold backdrop-blur-xs">
                      #{index + 1} {item.badge}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleSliderActive(item.id)}
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.isActive ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-slate-200'
                      }`}
                    >
                      {item.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                    </button>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-bold text-slate-900 font-heading line-clamp-1">
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="text-xs text-slate-600 font-serif line-clamp-2">
                        {item.subtitle}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                        {item.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSlider(item.id, item.title)}
                        className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                        title="স্লাইড মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB: TEACHERS MANAGEMENT ================= */}
      {adminTab === 'teachers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-800" />
                <h2 className="text-xl font-bold text-slate-900 font-heading">
                  উস্তাদ ও শিক্ষক পরিষদ পরিচিতি ({teacherList.length})
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-serif">
                আমাদের সম্পর্কে পেজে সম্মানিত উস্তাদগণের প্রোফাইল, পদবি ও তথ্য প্রদর্শিত হবে। গুগল শিটের <strong>Teachers</strong> ট্যাবের সাথে সিঙ্ক হবে।
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleResetTeachers}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ডিফল্ট তালিকা ফেরত আনুন</span>
              </button>
              <button
                type="button"
                onClick={() => setShowTeacherForm(!showTeacherForm)}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>{showTeacherForm ? 'ফর্ম বন্ধ করুন' : 'নতুন শিক্ষক প্রোফাইল যোগ করুন'}</span>
              </button>
            </div>
          </div>

          {/* Add Teacher Form */}
          {showTeacherForm && (
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-800 shadow-md">
              <h3 className="text-base font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-800" />
                <span>নতুন শিক্ষক প্রোফাইল এন্ট্রি</span>
              </h3>
              <form onSubmit={handleAddTeacher} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      উস্তাদের পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="উদা: মাওলানা মুফতি আব্দুল্লাহ মাহমুদ"
                      value={newTeacherItem.name}
                      onChange={e => setNewTeacherItem({ ...newTeacherItem, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      পদবি *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="উদা: শাইখুল হাদিস ও প্রধান মুফতি"
                      value={newTeacherItem.designation}
                      onChange={e => setNewTeacherItem({ ...newTeacherItem, designation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      বিভাগ
                    </label>
                    <select
                      value={newTeacherItem.department}
                      onChange={e => setNewTeacherItem({ ...newTeacherItem, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800 bg-white"
                    >
                      <option value="কিতাব বিভাগ">কিতাব বিভাগ</option>
                      <option value="হিফজুল কুরআন বিভাগ">হিফজুল কুরআন বিভাগ</option>
                      <option value="নাজেরা ও নুরানী বিভাগ">নাজেরা ও নুরানী বিভাগ</option>
                      <option value="নূরানী ও শিশু বিভাগ">নূরানী ও শিশু বিভাগ</option>
                      <option value="প্রশাসন ও পরিচালনা">প্রশাসন ও পরিচালনা</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      শিক্ষাগত যোগ্যতা
                    </label>
                    <input
                      type="text"
                      placeholder="উদা: দাওরায়ে হাদিস, ইফতা (দারুল উলুম দেওবন্দ)"
                      value={newTeacherItem.qualification}
                      onChange={e => setNewTeacherItem({ ...newTeacherItem, qualification: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      অভিজ্ঞতা
                    </label>
                    <input
                      type="text"
                      placeholder="উদা: ১৫+ বছর"
                      value={newTeacherItem.experience}
                      onChange={e => setNewTeacherItem({ ...newTeacherItem, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
                    />
                  </div>
                </div>

                {/* Google Drive / Direct Image Input for Teacher Photo */}
                <ImageDriveInput
                  label="উস্তাদের ছবি লিংক (Google Drive বা Direct URL)"
                  value={newTeacherItem.imageUrl || ''}
                  onChange={url => setNewTeacherItem({ ...newTeacherItem, imageUrl: url })}
                  placeholder="উস্তাদের ছবির Google Drive শেয়ার লিংক পেস্ট করুন..."
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowTeacherForm(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                  >
                    প্রোফাইল সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Teacher Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherList.map(teacher => {
              const photoUrl = formatDriveImageUrl(teacher.imageUrl);
              return (
                <div 
                  key={teacher.id}
                  className={`bg-white rounded-2xl p-5 border transition-all ${
                    teacher.isActive ? 'border-slate-200 shadow-sm' : 'border-dashed border-slate-300 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={teacher.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-950 flex items-center justify-center font-bold text-xl shrink-0 font-serif">
                        {teacher.name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold">
                          {teacher.department}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleTeacherActive(teacher.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            teacher.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {teacher.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading mt-1 line-clamp-1">
                        {teacher.name}
                      </h4>
                      <p className="text-xs text-amber-900 font-semibold font-serif">
                        {teacher.designation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1 font-serif">
                    {teacher.qualification && (
                      <p className="truncate">🎓 {teacher.qualification}</p>
                    )}
                    {teacher.experience && (
                      <p>⏳ অভিজ্ঞতা: {teacher.experience}</p>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}
                      className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                      title="মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
