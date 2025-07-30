import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <span className={`font-bold text-xl gradient-text ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'روسو فيردي' : 'RossoVerde'}
              </span>
            </Link>
            <p className={`text-muted-foreground text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? (
                'نبضة أسود الأطلس. صوت واحد يوحدنا، وشغف يدفعنا.'
              ) : language === 'fr' ? (
                'Le Cœur Battant des Lions de l\'Atlas. Une Nation, Un Pouls.'
              ) : (
                'The Heartbeat of the Atlas Lions. One Nation, One Pulse.'
              )}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'روابط سريعة' : language === 'fr' ? 'Liens Rapides' : 'Quick Links'}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className={`text-muted-foreground hover:text-primary transition-colors text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t('nav.about')}
              </Link>
              <Link to="/membership" className={`text-muted-foreground hover:text-primary transition-colors text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t('nav.membership')}
              </Link>
              <Link to="/store" className={`text-muted-foreground hover:text-primary transition-colors text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t('nav.store')}
              </Link>
              <Link to="/news" className={`text-muted-foreground hover:text-primary transition-colors text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                {t('nav.news')}
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'الدعم' : language === 'fr' ? 'Support' : 'Support'}
            </h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className={`text-muted-foreground hover:text-primary transition-colors text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'اتصل بنا' : language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
              </a>
              <a href="#" className={`text-muted-foreground hover:text-primary transition-colors text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'الأسئلة الشائعة' : language === 'fr' ? 'FAQ' : 'FAQ'}
              </a>
              <a href="#" className={`text-muted-foreground hover:text-primary transition-colors text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'الخصوصية' : language === 'fr' ? 'Confidentialité' : 'Privacy'}
              </a>
              <a href="#" className={`text-muted-foreground hover:text-primary transition-colors text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'الشروط' : language === 'fr' ? 'Termes' : 'Terms'}
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className={`font-semibold text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'معلومات الاتصال' : language === 'fr' ? 'Contact' : 'Contact Info'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@rossoverde.ma</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'الرباط، المغرب' : language === 'fr' ? 'Rabat, Maroc' : 'Rabat, Morocco'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className={`text-muted-foreground text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
            © 2024 {language === 'ar' ? 'روسو فيردي' : 'RossoVerde'}. {language === 'ar' ? 'جميع الحقوق محفوظة.' : language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;