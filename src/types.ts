export type NavigationTab = 
  | 'home'
  | 'campus'
  | 'about'
  | 'admission'
  | 'notices'
  | 'results'
  | 'rules'
  | 'syllabus'
  | 'gallery'
  | 'blog'
  | 'khidmat-fund'
  | 'contact'
  | 'admin';

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: 'জরুরি' | 'ভর্তি' | 'পরীক্ষা' | 'ছুটি' | 'ফলাফল' | 'অন্যান্য';
  isUrgent?: boolean;
  content: string;
  imageUrl?: string;
  pdfUrl?: string;
  publishedBy: string;
}

export interface StudentApplication {
  id: string;
  studentNameBn: string;
  studentNameEn: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  whatsappNumber?: string;
  birthDate: string;
  academicYear: string;
  campus: 'অস্থায়ী ক্যাম্পাস (যাত্রাবাড়ী)' | 'স্থায়ী ক্যাম্পাস (ডেমরা)';
  department: string;
  jamaat: string;
  studentType: 'নতুন ছাত্র' | 'পুরাতন ছাত্র';
  residenceType: 'আবাসিক' | 'অনাবাসিক' | 'ডে-কেয়ার';
  address: string;
  previousInstitute?: string;
  status: 'অপেক্ষমান' | 'অনুমোদিত' | 'বাতিল';
  appliedDate: string;
  notes?: string;
}

export interface SubjectMark {
  subjectName: string;
  fullMark: number;
  obtainedMark: number;
  grade: string;
}

export interface StudentResult {
  id: string;
  studentName: string;
  fatherName?: string;
  rollNumber: string;
  registrationNumber: string;
  academicYear: string;
  department: string;
  jamaat: string;
  campus: string;
  totalMarks: number;
  obtainedTotal: number;
  gpa: string;
  division: 'মুমতাজ (স্টার)' | 'জায়্যিদ জিদ্দান (১ম)' | 'জায়্যিদ (২য়)' | 'মাকবুল (৩য়)' | 'রাসিব (অনুত্তীর্ণ)';
  subjects: SubjectMark[];
  publishedDate: string;
  remarks?: string;
}

export interface SliderImageItem {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  badge?: string;
  linkTab?: NavigationTab;
  order?: number;
  isActive?: boolean;
}

export interface TeacherItem {
  id: string;
  name: string;
  designation: string; // যেমন: মুহতামিম, শায়খুল হাদিস, নায়েবে মুহতামিম, নাযেম-ই-তালিমাত, হিফজ প্রধান
  department: string; // কিতাব বিভাগ, হিফজুল কুরআন, নাযেরা ও নূরানী, প্রশাসন
  qualification: string; // যেমন: দাওরায়ে হাদীস, ইফতা, আদব, তাজবীদ ও কিরাত
  experience?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  bio?: string;
  order?: number;
  isActive?: boolean;
}

export interface JamaatItem {
  id: string;
  name: string;
  department: string;
  code?: string;
  capacity?: number;
  monthlyFee?: number;
  description?: string;
  isActive?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'ইসলামিক শিক্ষা' | 'মাদরাসা কার্যক্রম' | 'শিক্ষামূলক লেখা' | 'নোটিশ/আপডেট';
  author: string;
  authorDesignation: string;
  date: string;
  readTime: string;
  imageUrl: string;
  summary: string;
  content: string;
  tags?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ক্যাম্পাস' | 'ক্লাসরুম' | 'ছাত্রবৃন্দ' | 'ইভেন্ট ও মাহফিল' | 'উস্তাদবৃন্দ' | 'কার্যক্রম';
  imageUrl: string;
  images?: string[]; // Multiple photos under one program/event
  caption?: string;
  date?: string;
}

export interface MadrasaFeature {
  id: string;
  title: string;
  desc: string;
  icon?: string;
}

export interface SyllabusItem {
  id: string;
  department: string;
  jamaat: string;
  subjectName: string;
  bookName: string;
  authorName: string;
  totalMarks: number;
  writtenMark: number;
  oralMark: number;
  examDetails?: string;
  pdfDownloadUrl?: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  donorPhone: string;
  amount: number;
  fundType: 'সাধারণ খেদমত ফান্ড' | 'যাকাত ফান্ড' | 'মাদরাসা নির্মাণ' | 'মসজিদ কমপ্লেক্স' | 'এতিম ও ছাত্র সহায়তা';
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Bank' | 'নগদ/ক্যাশ';
  trxId?: string;
  bankInfo?: string;
  date: string;
  isAnonymous?: boolean;
  status: 'যাচাইকৃত' | 'অপেক্ষমান' | 'নিশ্চিত';
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface SiteSettings {
  madrasaNameBn: string;
  madrasaNameEn: string;
  madrasaArabicMotto: string;
  tagline: string;
  establishedDate: string;
  founderName: string;
  founderDesignation?: string;
  founderImageUrl?: string;
  patronName: string;
  patronDesignation?: string;
  patronImageUrl?: string;
  principalMessage?: string;
  aboutSummary?: string;
  admissionYear: string;
  isAdmissionOpen: boolean;
  admissionNoticeText: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  emailAddress: string;
  email?: string;
  addressTemporary: string;
  addressPermanent: string;
  urgentTickerText: string;
  urgentNoticeText?: string;
  showUrgentNotice?: boolean;
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  bankAccountDetails: string;
  googleSheetWebAppUrl: string;
  googleAppsScriptUrl?: string;
  adminPasswordHash: string;
  adminPassword?: string;
  facebookPageUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
  googleMapsUrl?: string;
  temporaryCampusMapsUrl?: string;
  permanentCampusMapsUrl?: string;
  features?: MadrasaFeature[];
  themeColor?: 'emerald' | 'navy' | 'maroon' | 'teal' | 'forest';
  logoUrl?: string;
  heroImageUrl?: string;
  aboutImageUrl?: string;
  campusTemporaryImageUrl?: string;
  campusPermanentImageUrl?: string;
  lastSyncedAt?: string;
}
