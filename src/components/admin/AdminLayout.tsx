import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Store, 
  ShoppingCart, 
  FileText, 
  Image,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { language } = useLanguage();

  const navigation = [
    {
      name: language === 'ar' ? 'لوحة التحكم' : language === 'fr' ? 'Tableau de bord' : 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      name: language === 'ar' ? 'المستخدمون' : language === 'fr' ? 'Utilisateurs' : 'Users',
      href: '/admin/users',
      icon: Users
    },
    {
      name: language === 'ar' ? 'العضويات' : language === 'fr' ? 'Adhésions' : 'Memberships',
      href: '/admin/memberships',
      icon: CreditCard
    },
    {
      name: language === 'ar' ? 'المتجر' : language === 'fr' ? 'Boutique' : 'Store',
      href: '/admin/store',
      icon: Store
    },
    {
      name: language === 'ar' ? 'الطلبات' : language === 'fr' ? 'Commandes' : 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart
    },
    {
      name: language === 'ar' ? 'المقالات' : language === 'fr' ? 'Articles' : 'Posts',
      href: '/admin/posts',
      icon: FileText
    },
    {
      name: language === 'ar' ? 'المعرض' : language === 'fr' ? 'Galerie' : 'Gallery',
      href: '/admin/gallery',
      icon: Image
    }
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r border-border">
          <div className="p-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 mb-8">
              <img src="/logo.png" alt="RossoVerde" className="h-8 w-8" />
              <span className="font-bold text-lg gradient-text">RossoVerde</span>
            </Link>

            {/* Back to Site */}
            <Link to="/">
              <Button variant="outline" className="w-full mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'العودة للموقع' : language === 'fr' ? 'Retour au site' : 'Back to Site'}
                </span>
              </Button>
            </Link>

            {/* Navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className={language === 'ar' ? 'font-arabic' : ''}>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;