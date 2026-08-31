import React from 'react';
import { LanguageProvider, useLanguage } from './components/layout/LanguageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AudioPlayerBar } from './components/layout/AudioPlayerBar';

import { HomePageView } from './pages/HomePage';
import { ScriptureView } from './pages/ScripturePage';
import { ResourcesView } from './pages/ResourcesPage';
import { FindChurchView } from './pages/FindChurchPage';
import { GivingView } from './pages/GivingPage';
import { AcademyView } from './pages/AcademyPage';
import { NewsView } from './pages/NewsPage';
import { OurChurchView } from './pages/OurChurchPage';

import { AuthModal } from './components/modals/AuthModal';
import { ParishAdminModal } from './components/modals/ParishAdminModal';

const AppContent: React.FC = () => {
  const { activeView } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8F6F0', color: '#2C1D07' }}>
      <Header />

      <main className="flex-1" style={{ paddingTop: activeView === 'home' ? 0 : '96px' }}>
        {activeView === 'home' && <HomePageView />}
        {activeView.startsWith('scripture') && <ScriptureView />}
        {(activeView.startsWith('resources') || activeView.startsWith('orthodox-resources')) && <ResourcesView />}
        {activeView.startsWith('find-a-church') && <FindChurchView />}
        {activeView.startsWith('give') && <GivingView />}
        {activeView.startsWith('academy') && <AcademyView />}
        {activeView.startsWith('news') && <NewsView />}
        {activeView.startsWith('our-church') && <OurChurchView />}
      </main>

      <Footer />
      <AudioPlayerBar />

      <AuthModal />
      <ParishAdminModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
