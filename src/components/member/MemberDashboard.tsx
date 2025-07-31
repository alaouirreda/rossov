import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfile } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import ProfileManagement from './ProfileManagement';
import PurchaseHistory from './PurchaseHistory';
import CharterAcceptance from './CharterAcceptance';
import { User, Package, FileText, CreditCard } from 'lucide-react';

const MemberDashboard: React.FC = () => {
  const { profile, loading } = useProfile();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className={language === 'ar' ? 'font-arabic' : ''}>
            {language === 'ar' ? 'جاري التحميل...' : language === 'fr' ? 'Chargement...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // If user hasn't accepted charter, show charter acceptance
  if (profile && !profile.charter_accepted) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold text-morocco-green ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'مرحباً بك في RossoVerde' : language === 'fr' ? 'Bienvenue dans RossoVerde' : 'Welcome to RossoVerde'}
            </h1>
            <p className={`text-muted-foreground mt-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 
                'يرجى قراءة وقبول ميثاق المشجعين قبل المتابعة' :
                language === 'fr' ? 
                'Veuillez lire et accepter la charte des supporters avant de continuer' :
                'Please read and accept the supporters charter before continuing'
              }
            </p>
          </div>
          
          <CharterAcceptance onAccepted={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-morocco-green ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'لوحة تحكم العضو' : language === 'fr' ? 'Tableau de bord membre' : 'Member Dashboard'}
          </h1>
          <p className={`text-muted-foreground mt-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              `مرحباً ${profile?.full_name || 'بك'}، إدارة حسابك وعضويتك` :
              language === 'fr' ? 
              `Bonjour ${profile?.full_name || ''}, gérez votre compte et votre adhésion` :
              `Hello ${profile?.full_name || ''}, manage your account and membership`
            }
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
              <User className="h-4 w-4" />
              {language === 'ar' ? 'الملف الشخصي' : language === 'fr' ? 'Profil' : 'Profile'}
            </TabsTrigger>
            <TabsTrigger value="purchases" className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
              <Package className="h-4 w-4" />
              {language === 'ar' ? 'المشتريات' : language === 'fr' ? 'Achats' : 'Purchases'}
            </TabsTrigger>
            <TabsTrigger value="membership" className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
              <CreditCard className="h-4 w-4" />
              {language === 'ar' ? 'العضوية' : language === 'fr' ? 'Adhésion' : 'Membership'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileManagement />
          </TabsContent>

          <TabsContent value="purchases">
            <PurchaseHistory />
          </TabsContent>

          <TabsContent value="membership">
            <Card>
              <CardHeader>
                <CardTitle className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'معلومات العضوية' : language === 'fr' ? 'Informations d\'adhésion' : 'Membership Information'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 
                    'سيتم عرض معلومات العضوية هنا' :
                    language === 'fr' ? 
                    'Les informations d\'adhésion seront affichées ici' :
                    'Membership information will be displayed here'
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MemberDashboard;