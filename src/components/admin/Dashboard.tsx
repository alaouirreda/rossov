import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  CreditCard, 
  ShoppingCart, 
  TrendingUp,
  Activity,
  Calendar,
  DollarSign,
  Eye
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const { language } = useLanguage();

  // Mock data
  const stats = [
    {
      title: language === 'ar' ? 'إجمالي الأعضاء' : language === 'fr' ? 'Total des membres' : 'Total Members',
      value: '1,247',
      change: '+12%',
      icon: Users,
      positive: true
    },
    {
      title: language === 'ar' ? 'الإيرادات الشهرية' : language === 'fr' ? 'Revenus mensuels' : 'Monthly Revenue',
      value: '$23,456',
      change: '+8%',
      icon: DollarSign,
      positive: true
    },
    {
      title: language === 'ar' ? 'الطلبات الجديدة' : language === 'fr' ? 'Nouvelles commandes' : 'New Orders',
      value: '89',
      change: '+23%',
      icon: ShoppingCart,
      positive: true
    },
    {
      title: language === 'ar' ? 'معدل النمو' : language === 'fr' ? 'Taux de croissance' : 'Growth Rate',
      value: '15.2%',
      change: '+2.1%',
      icon: TrendingUp,
      positive: true
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'membership',
      user: 'Ahmed Benali',
      action: language === 'ar' ? 'اشترك في العضوية المميزة' : language === 'fr' ? 'S\'est abonné à l\'adhésion premium' : 'Subscribed to premium membership',
      time: '2 hours ago',
      amount: '$30'
    },
    {
      id: 2,
      type: 'order',
      user: 'Sara Alaoui',
      action: language === 'ar' ? 'طلب قميص RossoVerde' : language === 'fr' ? 'A commandé un maillot RossoVerde' : 'Ordered RossoVerde jersey',
      time: '4 hours ago',
      amount: '$65'
    },
    {
      id: 3,
      type: 'membership',
      user: 'Mohamed Tazi',
      action: language === 'ar' ? 'تجديد العضوية' : language === 'fr' ? 'A renouvelé l\'adhésion' : 'Renewed membership',
      time: '6 hours ago',
      amount: '$15'
    },
    {
      id: 4,
      type: 'order',
      user: 'Fatima Chraibi',
      action: language === 'ar' ? 'طلب إكسسوارات متعددة' : language === 'fr' ? 'A commandé plusieurs accessoires' : 'Ordered multiple accessories',
      time: '1 day ago',
      amount: '$45'
    }
  ];

  const quickActions = [
    {
      title: language === 'ar' ? 'إضافة منتج جديد' : language === 'fr' ? 'Ajouter un nouveau produit' : 'Add New Product',
      description: language === 'ar' ? 'أضف منتجات جديدة للمتجر' : language === 'fr' ? 'Ajoutez de nouveaux produits à la boutique' : 'Add new products to the store',
      action: language === 'ar' ? 'إضافة منتج' : language === 'fr' ? 'Ajouter produit' : 'Add Product',
      link: '/admin/store'
    },
    {
      title: language === 'ar' ? 'إنشاء مقال جديد' : language === 'fr' ? 'Créer un nouvel article' : 'Create New Post',
      description: language === 'ar' ? 'انشر أخباراً وإعلانات جديدة' : language === 'fr' ? 'Publiez de nouvelles actualités et annonces' : 'Publish new news and announcements',
      action: language === 'ar' ? 'إنشاء مقال' : language === 'fr' ? 'Créer article' : 'Create Post',
      link: '/admin/posts'
    },
    {
      title: language === 'ar' ? 'إدارة العضويات' : language === 'fr' ? 'Gérer les adhésions' : 'Manage Memberships',
      description: language === 'ar' ? 'راجع وأدر اشتراكات الأعضاء' : language === 'fr' ? 'Examinez et gérez les abonnements des membres' : 'Review and manage member subscriptions',
      action: language === 'ar' ? 'إدارة العضويات' : language === 'fr' ? 'Gérer adhésions' : 'Manage Memberships',
      link: '/admin/memberships'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'لوحة التحكم' : language === 'fr' ? 'Tableau de bord' : 'Dashboard'}
        </h1>
        <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'نظرة عامة على أداء جمعية RossoVerde' : language === 'fr' ? 'Aperçu des performances de l\'association RossoVerde' : 'Overview of RossoVerde association performance'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change} {language === 'ar' ? 'من الشهر الماضي' : language === 'fr' ? 'du mois dernier' : 'from last month'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                <Activity className="h-5 w-5" />
                <span>{language === 'ar' ? 'النشاط الأخير' : language === 'fr' ? 'Activité récente' : 'Recent Activity'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${activity.type === 'membership' ? 'bg-primary-green' : 'bg-primary-red'}`} />
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{activity.amount}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                <Calendar className="h-5 w-5" />
                <span>{language === 'ar' ? 'إجراءات سريعة' : language === 'fr' ? 'Actions rapides' : 'Quick Actions'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover-lift cursor-pointer">
                    <h3 className={`font-semibold mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {action.title}
                    </h3>
                    <p className={`text-sm text-muted-foreground mb-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {action.description}
                    </p>
                    <Badge className="bg-primary text-primary-foreground">
                      {action.action}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Today's Overview */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            <Eye className="h-5 w-5" />
            <span>{language === 'ar' ? 'نظرة عامة على اليوم' : language === 'fr' ? 'Aperçu d\'aujourd\'hui' : 'Today\'s Overview'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">23</p>
              <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'أعضاء جدد' : language === 'fr' ? 'Nouveaux membres' : 'New Members'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">$1,234</p>
              <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'المبيعات اليومية' : language === 'fr' ? 'Ventes du jour' : 'Daily Sales'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">15</p>
              <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'طلبات جديدة' : language === 'fr' ? 'Nouvelles commandes' : 'New Orders'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;