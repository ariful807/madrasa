/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { NavigationTab, NoticeItem, SiteSettings, SliderImageItem, TeacherItem } from './types';
import { storageService } from './services/storageService';

// Layout Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UrgentNoticeTicker } from './components/UrgentNoticeTicker';
import { NoticeModal } from './components/NoticeModal';

// Views
import { HomeView } from './views/HomeView';
import { CampusView } from './views/CampusView';
import { AboutView } from './views/AboutView';
import { AdmissionView } from './views/AdmissionView';
import { NoticesView } from './views/NoticesView';
import { ResultsView } from './views/ResultsView';
import { RulesView } from './views/RulesView';
import { SyllabusView } from './views/SyllabusView';
import { GalleryView } from './views/GalleryView';
import { BlogView } from './views/BlogView';
import { DonationView } from './views/DonationView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [settings, setSettings] = useState<SiteSettings>(() => storageService.getSettings());
  const [notices, setNotices] = useState<NoticeItem[]>(() => storageService.getNotices());
  const [applications, setApplications] = useState(() => storageService.getApplications());
  const [results, setResults] = useState(() => storageService.getResults());
  const [donations, setDonations] = useState(() => storageService.getDonations());
  const [blogs, setBlogs] = useState(() => storageService.getBlogs());
  const [gallery, setGallery] = useState(() => storageService.getGallery());
  const [syllabus, setSyllabus] = useState(() => storageService.getSyllabus());
  const [jamaats, setJamaats] = useState(() => storageService.getJamaats());
  const [sliderImages, setSliderImages] = useState<SliderImageItem[]>(() => storageService.getSliderImages());
  const [teachers, setTeachers] = useState<TeacherItem[]>(() => storageService.getTeachers());
  const [isGasSyncing, setIsGasSyncing] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  // Sync / Refresh function called after admin actions or GAS fetch
  const refreshAppData = useCallback(() => {
    setSettings(storageService.getSettings());
    setNotices(storageService.getNotices());
    setApplications(storageService.getApplications());
    setResults(storageService.getResults());
    setDonations(storageService.getDonations());
    setBlogs(storageService.getBlogs());
    setGallery(storageService.getGallery());
    setSyllabus(storageService.getSyllabus());
    setJamaats(storageService.getJamaats());
    setSliderImages(storageService.getSliderImages());
    setTeachers(storageService.getTeachers());
  }, []);

  // Scroll to top on tab change
  const handleNavigate = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Google Sheets Auto-Sync function
  const handleRefreshFromGas = useCallback(async () => {
    const gasUrl = settings.googleSheetWebAppUrl || settings.googleAppsScriptUrl;
    if (!gasUrl) return;
    setIsGasSyncing(true);
    try {
      const refreshed = await storageService.fetchAllFromGas(gasUrl);
      if (refreshed) {
        refreshAppData();
      }
    } catch (err) {
      console.warn('Auto sync warning:', err);
    } finally {
      setIsGasSyncing(false);
    }
  }, [settings.googleSheetWebAppUrl, settings.googleAppsScriptUrl, refreshAppData]);

  // Background sync with Google Sheets (Immediate + Auto Interval every 45s)
  useEffect(() => {
    const gasUrl = settings.googleSheetWebAppUrl || settings.googleAppsScriptUrl;
    if (gasUrl) {
      handleRefreshFromGas();
      const interval = setInterval(() => {
        handleRefreshFromGas();
      }, 45000);
      return () => clearInterval(interval);
    }
  }, [settings.googleSheetWebAppUrl, settings.googleAppsScriptUrl, handleRefreshFromGas]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-body antialiased selection:bg-emerald-800 selection:text-white">
      
      {/* 1. Header with Sticky Navigation */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        settings={settings}
        isAdminLoggedIn={sessionStorage.getItem('markazul_ihsan_admin_session') === 'true'}
      />

      {/* 2. Main Views Container */}
      <main className="flex-1 w-full" id="main-content-area">
        {currentTab === 'home' && (
          <HomeView
            settings={settings}
            notices={notices}
            blogs={blogs}
            onNavigate={handleNavigate}
            onSelectNotice={setSelectedNotice}
            sliderImages={sliderImages}
            onRefreshFromGas={handleRefreshFromGas}
            isSyncing={isGasSyncing}
          />
        )}

        {currentTab === 'campus' && (
          <CampusView
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'about' && (
          <AboutView
            settings={settings}
            onNavigate={handleNavigate}
            teachers={teachers}
          />
        )}

        {currentTab === 'admission' && (
          <AdmissionView
            settings={settings}
          />
        )}

        {currentTab === 'notices' && (
          <NoticesView
            notices={notices}
            onSelectNotice={setSelectedNotice}
          />
        )}

        {currentTab === 'results' && (
          <ResultsView
            results={results}
            settings={settings}
            jamaats={jamaats}
          />
        )}

        {currentTab === 'rules' && (
          <RulesView
            settings={settings}
          />
        )}

        {currentTab === 'syllabus' && (
          <SyllabusView
            syllabus={syllabus}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryView
            gallery={gallery}
          />
        )}

        {currentTab === 'blog' && (
          <BlogView
            blogs={blogs}
          />
        )}

        {currentTab === 'khidmat-fund' && (
          <DonationView
            settings={settings}
          />
        )}

        {currentTab === 'contact' && (
          <ContactView
            settings={settings}
          />
        )}

        {currentTab === 'admin' && (
          <AdminView
            settings={settings}
            notices={notices}
            applications={applications}
            results={results}
            donations={donations}
            blogs={blogs}
            gallery={gallery}
            sliderImages={sliderImages}
            teachers={teachers}
            onRefreshData={refreshAppData}
          />
        )}
      </main>

      {/* 4. Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
      />

      {/* 5. Notice Detail Modal */}
      {selectedNotice && (
        <NoticeModal
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}

    </div>
  );
}
