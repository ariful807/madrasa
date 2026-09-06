import {
  DEFAULT_SETTINGS,
  DEFAULT_NOTICES,
  DEFAULT_RESULTS,
  DEFAULT_APPLICATIONS,
  DEFAULT_BLOGS,
  DEFAULT_GALLERY,
  DEFAULT_SYLLABUS,
  DEFAULT_DONATIONS,
  DEFAULT_MESSAGES,
  DEFAULT_JAMAATS,
  DEFAULT_SLIDER_IMAGES,
  DEFAULT_TEACHERS
} from '../data/defaultData';
import {
  SiteSettings,
  NoticeItem,
  StudentResult,
  StudentApplication,
  BlogPost,
  GalleryItem,
  SyllabusItem,
  DonationRecord,
  ContactMessage,
  JamaatItem,
  SliderImageItem,
  TeacherItem
} from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'mi_site_settings',
  NOTICES: 'mi_notices',
  RESULTS: 'mi_results',
  APPLICATIONS: 'mi_applications',
  BLOGS: 'mi_blogs',
  GALLERY: 'mi_gallery',
  SLIDER: 'mi_slider',
  TEACHERS: 'mi_teachers',
  SYLLABUS: 'mi_syllabus',
  DONATIONS: 'mi_donations',
  MESSAGES: 'mi_messages',
  JAMAATS: 'mi_jamaats',
  AUTH: 'mi_admin_authenticated'
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from storage:`, err);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing ${key} to storage:`, err);
  }
}

export const storageService = {
  // Settings
  getSettings(): SiteSettings {
    const stored = getFromStorage<SiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    if ((stored as any).isUserCustomized) {
      return { ...DEFAULT_SETTINGS, ...stored };
    }
    if (!stored.madrasaNameBn || stored.madrasaNameBn === 'মারকাযুল ইহসান' || (stored.founderName && stored.founderName.includes('আব্দুল্লাহ আল-মামুন'))) {
      const merged = { ...DEFAULT_SETTINGS, ...stored, 
        madrasaNameBn: DEFAULT_SETTINGS.madrasaNameBn,
        madrasaNameEn: DEFAULT_SETTINGS.madrasaNameEn,
        founderName: DEFAULT_SETTINGS.founderName,
        founderDesignation: DEFAULT_SETTINGS.founderDesignation,
        phonePrimary: DEFAULT_SETTINGS.phonePrimary,
        emailAddress: DEFAULT_SETTINGS.emailAddress,
        email: DEFAULT_SETTINGS.email,
        addressTemporary: DEFAULT_SETTINGS.addressTemporary,
        addressPermanent: DEFAULT_SETTINGS.addressPermanent
      };
      saveToStorage(STORAGE_KEYS.SETTINGS, merged);
      return merged;
    }
    return { ...DEFAULT_SETTINGS, ...stored };
  },
  saveSettings(settings: SiteSettings): void {
    saveToStorage(STORAGE_KEYS.SETTINGS, { ...settings, isUserCustomized: true });
  },

  // Notices
  getNotices(): NoticeItem[] {
    return getFromStorage<NoticeItem[]>(STORAGE_KEYS.NOTICES, DEFAULT_NOTICES);
  },
  saveNotices(notices: NoticeItem[]): void {
    saveToStorage(STORAGE_KEYS.NOTICES, notices);
  },
  addNotice(notice: NoticeItem): void {
    const list = this.getNotices();
    const updated = [notice, ...list.filter(n => n.id !== notice.id)];
    this.saveNotices(updated);
  },
  deleteNotice(id: string): void {
    const list = this.getNotices().filter(n => n.id !== id);
    this.saveNotices(list);
  },

  // Results
  getResults(): StudentResult[] {
    return getFromStorage<StudentResult[]>(STORAGE_KEYS.RESULTS, DEFAULT_RESULTS);
  },
  saveResults(results: StudentResult[]): void {
    saveToStorage(STORAGE_KEYS.RESULTS, results);
  },
  addResult(result: StudentResult): void {
    const list = this.getResults();
    const updated = [result, ...list.filter(r => r.id !== result.id)];
    this.saveResults(updated);
  },
  deleteResult(id: string): void {
    const list = this.getResults().filter(r => r.id !== id);
    this.saveResults(list);
  },

  // Applications
  getApplications(): StudentApplication[] {
    return getFromStorage<StudentApplication[]>(STORAGE_KEYS.APPLICATIONS, DEFAULT_APPLICATIONS);
  },
  saveApplications(apps: StudentApplication[]): void {
    saveToStorage(STORAGE_KEYS.APPLICATIONS, apps);
  },
  submitApplication(app: StudentApplication): void {
    const list = this.getApplications();
    const updated = [app, ...list.filter(a => a.id !== app.id)];
    this.saveApplications(updated);

    // Sync to Google Apps Script if URL configured
    const settings = this.getSettings();
    if (settings.googleSheetWebAppUrl) {
      this.sendPostToGas(settings.googleSheetWebAppUrl, 'submitAdmission', app).catch(err => {
        console.warn('Google Sheet async sync error:', err);
      });
    }
  },
  updateApplicationStatus(id: string, status: StudentApplication['status']): void {
    const list = this.getApplications().map(a => a.id === id ? { ...a, status } : a);
    this.saveApplications(list);
  },

  // Blogs
  getBlogs(): BlogPost[] {
    return getFromStorage<BlogPost[]>(STORAGE_KEYS.BLOGS, DEFAULT_BLOGS);
  },
  saveBlogs(blogs: BlogPost[]): void {
    saveToStorage(STORAGE_KEYS.BLOGS, blogs);
  },
  addBlog(blog: BlogPost): void {
    const list = this.getBlogs();
    const updated = [blog, ...list.filter(b => b.id !== blog.id)];
    this.saveBlogs(updated);
  },
  deleteBlog(id: string): void {
    const list = this.getBlogs().filter(b => b.id !== id);
    this.saveBlogs(list);
  },

  // Gallery
  getGallery(): GalleryItem[] {
    return getFromStorage<GalleryItem[]>(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
  },
  saveGallery(gallery: GalleryItem[]): void {
    saveToStorage(STORAGE_KEYS.GALLERY, gallery);
  },
  addGalleryItem(item: GalleryItem): void {
    const list = this.getGallery();
    const updated = [item, ...list.filter(g => g.id !== item.id)];
    this.saveGallery(updated);
  },
  deleteGalleryItem(id: string): void {
    const list = this.getGallery().filter(g => g.id !== id);
    this.saveGallery(list);
  },

  // Slider Images (for Home Page Carousel)
  getSliderImages(): SliderImageItem[] {
    return getFromStorage<SliderImageItem[]>(STORAGE_KEYS.SLIDER, DEFAULT_SLIDER_IMAGES);
  },
  saveSliderImages(sliderImages: SliderImageItem[]): void {
    saveToStorage(STORAGE_KEYS.SLIDER, sliderImages);
  },
  addSliderImage(item: SliderImageItem): void {
    const list = this.getSliderImages();
    const updated = [item, ...list.filter(s => s.id !== item.id)];
    this.saveSliderImages(updated);
  },
  deleteSliderImage(id: string): void {
    const list = this.getSliderImages().filter(s => s.id !== id);
    this.saveSliderImages(list);
  },

  // Teachers / Faculty
  getTeachers(): TeacherItem[] {
    return getFromStorage<TeacherItem[]>(STORAGE_KEYS.TEACHERS, DEFAULT_TEACHERS);
  },
  saveTeachers(teachers: TeacherItem[]): void {
    saveToStorage(STORAGE_KEYS.TEACHERS, teachers);
  },
  addTeacher(teacher: TeacherItem): void {
    const list = this.getTeachers();
    const updated = [teacher, ...list.filter(t => t.id !== teacher.id)];
    this.saveTeachers(updated);
  },
  deleteTeacher(id: string): void {
    const list = this.getTeachers().filter(t => t.id !== id);
    this.saveTeachers(list);
  },

  // Syllabus
  getSyllabus(): SyllabusItem[] {
    return getFromStorage<SyllabusItem[]>(STORAGE_KEYS.SYLLABUS, DEFAULT_SYLLABUS);
  },
  saveSyllabus(syllabus: SyllabusItem[]): void {
    saveToStorage(STORAGE_KEYS.SYLLABUS, syllabus);
  },
  addSyllabusItem(item: SyllabusItem): void {
    const list = this.getSyllabus();
    const updated = [item, ...list.filter(s => s.id !== item.id)];
    this.saveSyllabus(updated);
  },
  deleteSyllabusItem(id: string): void {
    const list = this.getSyllabus().filter(s => s.id !== id);
    this.saveSyllabus(list);
  },

  // Donations
  getDonations(): DonationRecord[] {
    return getFromStorage<DonationRecord[]>(STORAGE_KEYS.DONATIONS, DEFAULT_DONATIONS);
  },
  saveDonations(donations: DonationRecord[]): void {
    saveToStorage(STORAGE_KEYS.DONATIONS, donations);
  },
  submitDonation(don: DonationRecord): void {
    const list = this.getDonations();
    const updated = [don, ...list.filter(d => d.id !== don.id)];
    this.saveDonations(updated);

    // Sync to GAS
    const settings = this.getSettings();
    if (settings.googleSheetWebAppUrl) {
      this.sendPostToGas(settings.googleSheetWebAppUrl, 'submitDonation', don).catch(err => {
        console.warn('Google Sheet async sync error:', err);
      });
    }
  },

  // Messages
  getMessages(): ContactMessage[] {
    return getFromStorage<ContactMessage[]>(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
  },
  saveMessages(messages: ContactMessage[]): void {
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);
  },
  submitMessage(msg: ContactMessage): void {
    const list = this.getMessages();
    const updated = [msg, ...list.filter(m => m.id !== msg.id)];
    this.saveMessages(updated);

    // Sync to GAS
    const settings = this.getSettings();
    if (settings.googleSheetWebAppUrl) {
      this.sendPostToGas(settings.googleSheetWebAppUrl, 'submitContactMessage', msg).catch(err => {
        console.warn('Google Sheet async sync error:', err);
      });
    }
  },
  markMessageAsRead(id: string): void {
    const list = this.getMessages().map(m => m.id === id ? { ...m, isRead: true } : m);
    this.saveMessages(list);
  },

  // Jamaats / Classes
  getJamaats(): JamaatItem[] {
    return getFromStorage<JamaatItem[]>(STORAGE_KEYS.JAMAATS, DEFAULT_JAMAATS);
  },
  saveJamaats(jamaats: JamaatItem[]): void {
    saveToStorage(STORAGE_KEYS.JAMAATS, jamaats);
  },
  addJamaat(jamaat: JamaatItem): void {
    const list = this.getJamaats();
    const updated = [...list.filter(j => j.id !== jamaat.id), jamaat];
    this.saveJamaats(updated);
  },
  deleteJamaat(id: string): void {
    const list = this.getJamaats().filter(j => j.id !== id);
    this.saveJamaats(list);
  },

  // Authentication
  isAuthenticated(): boolean {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  },
  setAuthenticated(value: boolean): void {
    if (value) {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  },

  // Reset to default data
  resetAllToDefault(): void {
    this.saveSettings(DEFAULT_SETTINGS);
    this.saveNotices(DEFAULT_NOTICES);
    this.saveResults(DEFAULT_RESULTS);
    this.saveApplications(DEFAULT_APPLICATIONS);
    this.saveBlogs(DEFAULT_BLOGS);
    this.saveGallery(DEFAULT_GALLERY);
    this.saveSliderImages(DEFAULT_SLIDER_IMAGES);
    this.saveTeachers(DEFAULT_TEACHERS);
    this.saveJamaats(DEFAULT_JAMAATS);
    this.saveSyllabus(DEFAULT_SYLLABUS);
    this.saveDonations(DEFAULT_DONATIONS);
    this.saveMessages(DEFAULT_MESSAGES);
  },

  // Google Apps Script API Helpers
  async fetchAllFromGas(webAppUrl: string): Promise<{ success: boolean; message: string }> {
    try {
      const url = `${webAppUrl}?action=getAll&t=${Date.now()}`;
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.status === 'success') {
        if (data.notices && Array.isArray(data.notices) && data.notices.length > 0) {
          this.saveNotices(data.notices);
        }
        if (data.admissions && Array.isArray(data.admissions) && data.admissions.length > 0) {
          this.saveApplications(data.admissions);
        }
        if (data.results && Array.isArray(data.results) && data.results.length > 0) {
          this.saveResults(data.results);
        }
        if (data.blogs && Array.isArray(data.blogs) && data.blogs.length > 0) {
          this.saveBlogs(data.blogs);
        }
        if (data.donations && Array.isArray(data.donations) && data.donations.length > 0) {
          this.saveDonations(data.donations);
        }
        if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
          this.saveMessages(data.messages);
        }
        if (data.slider && Array.isArray(data.slider) && data.slider.length > 0) {
          this.saveSliderImages(data.slider);
        }
        if (data.teachers && Array.isArray(data.teachers) && data.teachers.length > 0) {
          this.saveTeachers(data.teachers);
        }
        if (data.jamaats && Array.isArray(data.jamaats) && data.jamaats.length > 0) {
          this.saveJamaats(data.jamaats);
        }
        if (data.gallery && Array.isArray(data.gallery) && data.gallery.length > 0) {
          this.saveGallery(data.gallery);
        }
        if (data.settings && typeof data.settings === 'object') {
          const current = this.getSettings();
          this.saveSettings({ ...current, ...data.settings, lastSyncedAt: new Date().toISOString() });
        }
        return { success: true, message: 'গুগল শিট থেকে সকল ডেটা সফলভাবে লোড ও সিঙ্ক হয়েছে!' };
      }
      return { success: false, message: data.message || 'অজানা ত্রুটি হয়েছে।' };
    } catch (err: any) {
      return { success: false, message: `সংযোগ ব্যর্থ: ${err.message || err}` };
    }
  },

  async pushAllToGas(webAppUrl: string): Promise<{ success: boolean; message: string }> {
    try {
      const payload = {
        action: 'syncAllFromAdmin',
        payload: {
          notices: this.getNotices(),
          admissions: this.getApplications(),
          results: this.getResults(),
          blogs: this.getBlogs(),
          donations: this.getDonations(),
          messages: this.getMessages(),
          slider: this.getSliderImages(),
          teachers: this.getTeachers(),
          jamaats: this.getJamaats(),
          gallery: this.getGallery(),
          settings: this.getSettings()
        }
      };

      const res = await fetch(webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // text/plain prevents CORS preflight issues with Google Apps Script
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (json.status === 'success') {
        const settings = this.getSettings();
        this.saveSettings({ ...settings, lastSyncedAt: new Date().toISOString() });
        return { success: true, message: 'গুগল শিটে সমস্ত তথ্য সফলভাবে আপলোড ও সিঙ্ক হয়েছে!' };
      }
      return { success: false, message: json.message || 'গুগল শিট রেসপন্সে সমস্যা হয়েছে।' };
    } catch (err: any) {
      return { success: false, message: `সিঙ্ক ব্যর্থ: ${err.message || err}` };
    }
  },

  async sendPostToGas(webAppUrl: string, action: string, data: any): Promise<void> {
    await fetch(webAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, payload: data })
    });
  },

  async syncWithGoogleSheet(): Promise<boolean> {
    const settings = this.getSettings();
    const url = settings.googleSheetWebAppUrl || settings.googleAppsScriptUrl;
    if (!url) return false;
    const res = await this.fetchAllFromGas(url);
    return res.success;
  }
};
