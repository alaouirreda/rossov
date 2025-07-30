import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const Layout: React.FC = () => {
  const { language } = useLanguage();
  React.useEffect(() => {
    document.body.classList.remove('lang-en', 'lang-fr', 'lang-ar');
    document.body.classList.add(`lang-${language}`);
  }, [language]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;