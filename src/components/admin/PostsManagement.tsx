import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const PostsManagement: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إدارة المقالات' : language === 'fr' ? 'Gestion des articles' : 'Posts Management'}
        </h1>
        <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إنشاء وإدارة الأخبار والإعلانات' : language === 'fr' ? 'Créer et gérer les actualités et annonces' : 'Create and manage news and announcements'}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'المقالات' : language === 'fr' ? 'Articles' : 'Posts'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Posts management CMS will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostsManagement;