import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  CreditCard,
  Calendar,
  DollarSign,
  TrendingUp,
  Users
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MembershipsManagement: React.FC = () => {
  const { language } = useLanguage();

  // Mock membership data
  const memberships = [
    {
      id: 1,
      userName: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      plan: 'Premium',
      status: 'active',
      startDate: '2023-06-15',
      endDate: '2024-06-15',
      amount: 30,
      paymentMethod: 'Stripe',
      autoRenew: true
    },
    {
      id: 2,
      userName: 'Sara Alaoui',
      email: 'sara.alaoui@email.com',
      plan: 'Basic',
      status: 'active',
      startDate: '2023-08-22',
      endDate: '2024-08-22',
      amount: 15,
      paymentMethod: 'PayPal',
      autoRenew: true
    },
    {
      id: 3,
      userName: 'Mohamed Tazi',
      email: 'mohamed.tazi@email.com',
      plan: 'Premium',
      status: 'expired',
      startDate: '2023-05-10',
      endDate: '2023-12-10',
      amount: 30,
      paymentMethod: 'Stripe',
      autoRenew: false
    },
    {
      id: 4,
      userName: 'Fatima Chraibi',
      email: 'fatima.chraibi@email.com',
      plan: 'Basic',
      status: 'active',
      startDate: '2023-09-30',
      endDate: '2024-09-30',
      amount: 15,
      paymentMethod: 'Stripe',
      autoRenew: true
    },
    {
      id: 5,
      userName: 'Youssef Amrani',
      email: 'youssef.amrani@email.com',
      plan: 'Premium',
      status: 'cancelled',
      startDate: '2023-07-12',
      endDate: '2024-01-12',
      amount: 30,
      paymentMethod: 'PayPal',
      autoRenew: false
    }
  ];

  const getPlanBadge = (plan: string) => {
    const variants = {
      'Premium': 'bg-primary-red text-white',
      'Basic': 'bg-primary-green text-white'
    };
    return variants[plan as keyof typeof variants] || 'bg-muted';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-500 text-white',
      'expired': 'bg-yellow-500 text-white',
      'cancelled': 'bg-red-500 text-white'
    };
    return variants[status as keyof typeof variants] || 'bg-muted';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'active': language === 'ar' ? 'نشط' : language === 'fr' ? 'Actif' : 'Active',
      'expired': language === 'ar' ? 'منتهي' : language === 'fr' ? 'Expiré' : 'Expired',
      'cancelled': language === 'ar' ? 'ملغي' : language === 'fr' ? 'Annulé' : 'Cancelled'
    };
    return texts[status as keyof typeof texts] || status;
  };

  // Calculate stats
  const totalRevenue = memberships.reduce((sum, m) => sum + m.amount, 0);
  const activeMemberships = memberships.filter(m => m.status === 'active').length;
  const premiumMembers = memberships.filter(m => m.plan === 'Premium' && m.status === 'active').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إدارة العضويات' : language === 'fr' ? 'Gestion des adhésions' : 'Memberships Management'}
        </h1>
        <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إدارة ومراقبة جميع اشتراكات الأعضاء ومدفوعاتهم' : language === 'fr' ? 'Gérer et surveiller tous les abonnements et paiements des membres' : 'Manage and monitor all member subscriptions and payments'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'إجمالي الإيرادات' : language === 'fr' ? 'Revenus totaux' : 'Total Revenue'}
                </p>
                <p className="text-2xl font-bold">${totalRevenue}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'عضويات نشطة' : language === 'fr' ? 'Adhésions actives' : 'Active Memberships'}
                </p>
                <p className="text-2xl font-bold">{activeMemberships}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'أعضاء مميزون' : language === 'fr' ? 'Membres premium' : 'Premium Members'}
                </p>
                <p className="text-2xl font-bold">{premiumMembers}</p>
              </div>
              <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary-red" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'معدل النمو' : language === 'fr' ? 'Taux de croissance' : 'Growth Rate'}
                </p>
                <p className="text-2xl font-bold">+12%</p>
              </div>
              <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary-green" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'ar' ? 'البحث عن العضويات...' : language === 'fr' ? 'Rechercher des adhésions...' : 'Search memberships...'}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              <span className={language === 'ar' ? 'font-arabic' : ''}>
                {language === 'ar' ? 'تصفية' : language === 'fr' ? 'Filtrer' : 'Filter'}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Memberships Table */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center justify-between ${language === 'ar' ? 'font-arabic' : ''}`}>
            <span>{language === 'ar' ? 'جميع العضويات' : language === 'fr' ? 'Toutes les adhésions' : 'All Memberships'}</span>
            <Badge variant="outline">{memberships.length} {language === 'ar' ? 'عضوية' : language === 'fr' ? 'adhésions' : 'memberships'}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'العضو' : language === 'fr' ? 'Membre' : 'Member'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'الخطة' : language === 'fr' ? 'Plan' : 'Plan'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'الحالة' : language === 'fr' ? 'Statut' : 'Status'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'تاريخ انتهاء الصلاحية' : language === 'fr' ? 'Date d\'expiration' : 'Expiry Date'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'المبلغ' : language === 'fr' ? 'Montant' : 'Amount'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'التجديد التلقائي' : language === 'fr' ? 'Renouvellement auto' : 'Auto Renew'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {memberships.map((membership) => (
                  <tr key={membership.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-red to-primary-green rounded-full flex items-center justify-center text-white font-bold">
                          {membership.userName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{membership.userName}</p>
                          <p className="text-sm text-muted-foreground">{membership.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <Badge className={getPlanBadge(membership.plan)}>
                        {membership.plan}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <Badge className={getStatusBadge(membership.status)}>
                        {getStatusText(membership.status)}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(membership.endDate).toLocaleDateString(
                          language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US'
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <p className="font-medium">${membership.amount}</p>
                      <p className="text-sm text-muted-foreground">{membership.paymentMethod}</p>
                    </td>
                    <td className="py-4 px-2">
                      <Badge variant={membership.autoRenew ? "default" : "secondary"}>
                        {membership.autoRenew ? 
                          (language === 'ar' ? 'نعم' : language === 'fr' ? 'Oui' : 'Yes') :
                          (language === 'ar' ? 'لا' : language === 'fr' ? 'Non' : 'No')
                        }
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className={language === 'ar' ? 'font-arabic' : ''}>
            {language === 'ar' ? 'إيرادات العضويات الشهرية' : language === 'fr' ? 'Revenus mensuels des adhésions' : 'Monthly Membership Revenue'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-2">
              <TrendingUp className="h-12 w-12 mx-auto" />
              <p className={language === 'ar' ? 'font-arabic' : ''}>
                {language === 'ar' ? 'سيتم عرض الرسم البياني هنا' : language === 'fr' ? 'Le graphique sera affiché ici' : 'Chart will be displayed here'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipsManagement;