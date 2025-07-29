import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  UserPlus,
  MoreHorizontal,
  Mail,
  Calendar
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const UsersManagement: React.FC = () => {
  const { language } = useLanguage();

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'Ahmed Benali',
      email: 'ahmed.benali@email.com',
      membership: 'Premium',
      joinDate: '2023-06-15',
      status: 'active',
      lastActive: '2024-01-15'
    },
    {
      id: 2,
      name: 'Sara Alaoui',
      email: 'sara.alaoui@email.com',
      membership: 'Basic',
      joinDate: '2023-08-22',
      status: 'active',
      lastActive: '2024-01-14'
    },
    {
      id: 3,
      name: 'Mohamed Tazi',
      email: 'mohamed.tazi@email.com',
      membership: 'Premium',
      joinDate: '2023-05-10',
      status: 'inactive',
      lastActive: '2023-12-20'
    },
    {
      id: 4,
      name: 'Fatima Chraibi',
      email: 'fatima.chraibi@email.com',
      membership: 'Basic',
      joinDate: '2023-09-30',
      status: 'active',
      lastActive: '2024-01-15'
    },
    {
      id: 5,
      name: 'Youssef Amrani',
      email: 'youssef.amrani@email.com',
      membership: 'Premium',
      joinDate: '2023-07-12',
      status: 'active',
      lastActive: '2024-01-13'
    }
  ];

  const getMembershipBadge = (membership: string) => {
    const variants = {
      'Premium': 'bg-primary-red text-white',
      'Basic': 'bg-primary-green text-white'
    };
    return variants[membership as keyof typeof variants] || 'bg-muted';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-500 text-white',
      'inactive': 'bg-gray-500 text-white'
    };
    return variants[status as keyof typeof variants] || 'bg-muted';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'إدارة المستخدمين' : language === 'fr' ? 'Gestion des utilisateurs' : 'Users Management'}
          </h1>
          <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'إدارة وعرض جميع أعضاء جمعية RossoVerde' : language === 'fr' ? 'Gérer et voir tous les membres de l\'association RossoVerde' : 'Manage and view all RossoVerde association members'}
          </p>
        </div>
        <Button className="btn-morocco">
          <UserPlus className="h-4 w-4 mr-2" />
          <span className={language === 'ar' ? 'font-arabic' : ''}>
            {language === 'ar' ? 'إضافة مستخدم' : language === 'fr' ? 'Ajouter utilisateur' : 'Add User'}
          </span>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'ar' ? 'البحث عن المستخدمين...' : language === 'fr' ? 'Rechercher des utilisateurs...' : 'Search users...'}
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center justify-between ${language === 'ar' ? 'font-arabic' : ''}`}>
            <span>{language === 'ar' ? 'جميع المستخدمين' : language === 'fr' ? 'Tous les utilisateurs' : 'All Users'}</span>
            <Badge variant="outline">{users.length} {language === 'ar' ? 'مستخدم' : language === 'fr' ? 'utilisateurs' : 'users'}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'المستخدم' : language === 'fr' ? 'Utilisateur' : 'User'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'العضوية' : language === 'fr' ? 'Adhésion' : 'Membership'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'تاريخ الانضمام' : language === 'fr' ? 'Date d\'adhésion' : 'Join Date'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'الحالة' : language === 'fr' ? 'Statut' : 'Status'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'آخر نشاط' : language === 'fr' ? 'Dernière activité' : 'Last Active'}
                  </th>
                  <th className="text-center py-4 px-2 font-medium text-muted-foreground">
                    {language === 'ar' ? 'إجراءات' : language === 'fr' ? 'Actions' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-red to-primary-green rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <Badge className={getMembershipBadge(user.membership)}>
                        {user.membership}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(user.joinDate).toLocaleDateString(
                          language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US'
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <Badge className={getStatusBadge(user.status)}>
                        {language === 'ar' ? 
                          (user.status === 'active' ? 'نشط' : 'غير نشط') :
                          language === 'fr' ? 
                          (user.status === 'active' ? 'Actif' : 'Inactif') :
                          (user.status === 'active' ? 'Active' : 'Inactive')
                        }
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <p className="text-sm text-muted-foreground">
                        {new Date(user.lastActive).toLocaleDateString(
                          language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US'
                        )}
                      </p>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-lift">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-primary-green">
              {users.filter(u => u.status === 'active').length}
            </p>
            <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'أعضاء نشطون' : language === 'fr' ? 'Membres actifs' : 'Active Members'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold text-primary-red">
              {users.filter(u => u.membership === 'Premium').length}
            </p>
            <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'أعضاء مميزون' : language === 'fr' ? 'Membres premium' : 'Premium Members'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardContent className="p-6 text-center">
            <p className="text-2xl font-bold gradient-text">
              {users.filter(u => {
                const joinDate = new Date(u.joinDate);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return joinDate >= thirtyDaysAgo;
              }).length}
            </p>
            <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'أعضاء جدد (30 يوم)' : language === 'fr' ? 'Nouveaux membres (30j)' : 'New Members (30d)'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsersManagement;