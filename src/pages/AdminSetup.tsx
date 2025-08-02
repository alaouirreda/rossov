import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminUserCreator from '@/components/admin/AdminUserCreator';
import { Navigate } from 'react-router-dom';

const AdminSetup: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { language } = useLanguage();

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If user is already admin, redirect to admin dashboard
  if (user && profile?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold text-morocco-green ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'إعداد المدير' : language === 'fr' ? 'Configuration Administrateur' : 'Admin Setup'}
          </h1>
          <p className={`text-muted-foreground mt-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'قم بترقية مستخدم موجود إلى مدير للوصول إلى لوحة الإدارة' :
              language === 'fr' ? 
              'Promouvoir un utilisateur existant en administrateur pour accéder au panneau d\'administration' :
              'Promote an existing user to admin to access the admin panel'
            }
          </p>
        </div>

        <AdminUserCreator />

        <div className="mt-8 p-6 bg-muted/50 rounded-lg space-y-4">
          <h2 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'كيفية إنشاء مدير:' : language === 'fr' ? 'Comment créer un admin:' : 'How to create an admin:'}
          </h2>
          <ol className={`space-y-2 text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            <li>
              1. {language === 'ar' ? 
                'قم بإنشاء حساب عادي أولاً من خلال صفحة التسجيل' :
                language === 'fr' ? 
                'Créez d\'abord un compte normal via la page d\'inscription' :
                'First create a normal account through the registration page'
              }
            </li>
            <li>
              2. {language === 'ar' ? 
                'استخدم النموذج أعلاه لترقية المستخدم إلى مدير' :
                language === 'fr' ? 
                'Utilisez le formulaire ci-dessus pour promouvoir l\'utilisateur en admin' :
                'Use the form above to promote the user to admin'
              }
            </li>
            <li>
              3. {language === 'ar' ? 
                'سجل الدخول مرة أخرى للوصول إلى لوحة الإدارة' :
                language === 'fr' ? 
                'Reconnectez-vous pour accéder au panneau d\'administration' :
                'Log in again to access the admin panel'
              }
            </li>
          </ol>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className={`font-semibold text-blue-800 dark:text-blue-200 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'ملاحظة مهمة:' : language === 'fr' ? 'Note importante:' : 'Important Note:'}
            </h3>
            <p className={`text-sm text-blue-700 dark:text-blue-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 
                'بعد الترقية إلى مدير، قم بتسجيل الخروج وإعادة تسجيل الدخول لرؤية رابط "الإدارة" في القائمة.' :
                language === 'fr' ? 
                'Après la promotion en admin, déconnectez-vous et reconnectez-vous pour voir le lien "Admin" dans le menu.' :
                'After promotion to admin, log out and log back in to see the "Admin" link in the menu.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;