import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const OrdersManagement: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إدارة الطلبات' : language === 'fr' ? 'Gestion des commandes' : 'Orders Management'}
        </h1>
        <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إدارة ومراقبة جميع طلبات المتجر' : language === 'fr' ? 'Gérer et surveiller toutes les commandes de la boutique' : 'Manage and monitor all store orders'}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'الطلبات' : language === 'fr' ? 'Commandes' : 'Orders'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Orders management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManagement;