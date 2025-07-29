import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const GalleryManagement: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إدارة المعرض' : language === 'fr' ? 'Gestion de la galerie' : 'Gallery Management'}
        </h1>
        <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إدارة الصور والفيديوهات في المعرض' : language === 'fr' ? 'Gérer les images et vidéos de la galerie' : 'Manage images and videos in the gallery'}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{language === 'ar' ? 'المعرض' : language === 'fr' ? 'Galerie' : 'Gallery'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Gallery management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryManagement;