import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.membership'), href: '/membership' },
    { name: t('nav.store'), href: '/store' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.news'), href: '/news' },
  ];

  if (user && profile) {
    if (profile.role === 'admin') {
      navigation.push({ name: t('nav.admin'), href: '/admin' });
    } else {
      navigation.push({ 
        name: language === 'ar' ? 'حسابي' : language === 'fr' ? 'Mon compte' : 'My Account', 
        href: '/member' 
      });
    }
  }

  // Add admin setup link for development
  if (!user || (profile && profile.role !== 'admin')) {
    navigation.push({
      name: language === 'ar' ? 'إعداد المدير' : language === 'fr' ? 'Config Admin' : 'Admin Setup',
      href: '/admin-setup'
    });
  }

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className={`sticky top-0 z-50 ${language === 'ar' ? 'glass-effect' : 'navbar-solid'} border-b border-border/50`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-4 hover-lift transition-transform duration-200${language === 'ar' ? '' : ' font-gloock'}`} {...(language === 'ar' ? {dir: 'rtl'} : {})}>
            <img src={logo} alt="RossoVerde" className="h-14 w-14 object-contain" />
            <span className={`font-bold text-3xl text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'روسو فيردي' : 'RossoVerde'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-12${language === 'ar' ? '' : ' font-merriweather'}`} {...(language === 'ar' ? {dir: 'rtl'} : {})}>
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative text-base font-medium transition-all duration-200 hover:text-primary ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-muted-foreground'
                } ${language === 'ar' ? 'font-arabic' : ''}`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-morocco-red to-morocco-green rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fr')}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth Actions */}
            {user ? (
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className={`border-morocco-red/30 hover:bg-morocco-red/10 hover:border-morocco-red/50 ${language === 'ar' ? 'font-arabic' : ''}`}
              >
                {t('nav.logout')}
              </Button>
            ) : (
              <Link to="/auth">
                <Button
                  variant="default"
                  size="sm"
                  className={`bg-morocco-red hover:bg-morocco-red/90 text-white border-0 ${language === 'ar' ? 'font-arabic' : ''}`}
                >
                  {t('nav.login')}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border/50">
            <nav className="flex flex-col space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative text-lg font-medium transition-all duration-200 hover:text-primary ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  } ${language === 'ar' ? 'font-arabic' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-morocco-red to-morocco-green rounded-full" />
                  )}
                </Link>
              ))}

              <div className="pt-6 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Globe className="h-4 w-4 mr-2" />
                        {language.toUpperCase()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setLanguage('en')}>
                        English
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage('fr')}>
                        Français
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage('ar')}>
                        العربية
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {user ? (
  <Button
    onClick={signOut}
    variant="outline"
    size="sm"
    className={`border-morocco-red/30 hover:bg-morocco-red/10 hover:border-morocco-red/50 ${language === 'ar' ? 'font-arabic' : ''}`}
  >
    {t('nav.logout')}
  </Button>
) : (
  <Link to="/auth">
    <Button
      variant="default"
      size="sm"
      className={`bg-morocco-red hover:bg-morocco-red/90 text-white border-0 ${language === 'ar' ? 'font-arabic' : ''}`}
    >
      {t('nav.login')}
    </Button>
  </Link>
)}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;