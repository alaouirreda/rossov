import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, lang?: Language) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.membership': 'Membership',
    'nav.store': 'Store',
    'nav.gallery': 'Gallery',
    'nav.news': 'News',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Home Page
    'home.hero.title': 'The Heartbeat of the Atlas Lions',
    'home.hero.subtitle': 'One Nation, One Pulse.',
    'home.hero.cta': 'Join the Pride',
    
    // Membership
    'membership.title': 'Join the Ranks',
    'membership.subtitle': 'Be the 12th Player',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.membership': 'Adhésion',
    'nav.store': 'Boutique',
    'nav.gallery': 'Galerie',
    'nav.news': 'Actualités',
    'nav.admin': 'Admin',
    'nav.login': 'Connexion',
    'nav.logout': 'Déconnexion',
    
    // Home Page
    'home.hero.title': 'Le Cœur Battant des Lions de l\'Atlas',
    'home.hero.subtitle': 'Une Nation, Un Pouls.',
    'home.hero.cta': 'Rejoindre la Fierté',
    
    // Membership
    'membership.title': 'Rejoignez les Rangs',
    'membership.subtitle': 'Soyez le 12ème Joueur',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur survenue',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'حول',
    'nav.membership': 'العضوية',
    'nav.store': 'المتجر',
    'nav.gallery': 'المعرض',
    'nav.news': 'الأخبار',
    'nav.admin': 'الإدارة',
    'nav.login': 'تسجيل الدخول',
    'nav.logout': 'تسجيل الخروج',
    
    // Home Page
    'home.hero.title': 'نبضة أسود الأطلس',
    'home.hero.subtitle': 'صوت واحد يوحدنا، وشغف يدفعنا.',
    'home.hero.cta': 'انضم إلى الفخر',
    
    // Membership
    'membership.title': 'انضم إلى الصفوف',
    'membership.subtitle': 'كن اللاعب رقم 12',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تحرير',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('rossoverde-language') as Language;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rossoverde-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string, lang?: Language): string => {
    const currentLang = lang || language;
    return translations[currentLang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};