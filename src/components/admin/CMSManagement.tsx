import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCMSContent } from '@/hooks/useCMSContent';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { FileText, Save, Globe } from 'lucide-react';

const CMSManagement: React.FC = () => {
  const { content, updateContent, loading } = useCMSContent();
  const { language } = useLanguage();
  const [selectedPage, setSelectedPage] = useState('about_us');
  const [formData, setFormData] = useState({
    title_en: '',
    title_fr: '',
    title_ar: '',
    content_en: '',
    content_fr: '',
    content_ar: '',
    meta_description_en: '',
    meta_description_fr: '',
    meta_description_ar: ''
  });

  React.useEffect(() => {
    const pageContent = content.find(c => c.page_key === selectedPage);
    if (pageContent) {
      setFormData({
        title_en: pageContent.title_en || '',
        title_fr: pageContent.title_fr || '',
        title_ar: pageContent.title_ar || '',
        content_en: pageContent.content_en || '',
        content_fr: pageContent.content_fr || '',
        content_ar: pageContent.content_ar || '',
        meta_description_en: pageContent.meta_description_en || '',
        meta_description_fr: pageContent.meta_description_fr || '',
        meta_description_ar: pageContent.meta_description_ar || ''
      });
    }
  }, [selectedPage, content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await updateContent(selectedPage, {
      ...formData,
      is_published: true
    });
    
    if (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : language === 'fr' ? 'Erreur' : 'Error',
        description: error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: language === 'ar' ? 'تم الحفظ بنجاح' : language === 'fr' ? 'Sauvegardé avec succès' : 'Successfully saved',
        description: language === 'ar' ? 'تم تحديث المحتوى' : language === 'fr' ? 'Le contenu a été mis à jour' : 'Content has been updated'
      });
    }
  };

  const pages = [
    { key: 'about_us', name: language === 'ar' ? 'حول الجمعية' : language === 'fr' ? 'À propos' : 'About Us' },
    { key: 'privacy_policy', name: language === 'ar' ? 'سياسة الخصوصية' : language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy' },
    { key: 'terms_of_service', name: language === 'ar' ? 'شروط الخدمة' : language === 'fr' ? 'Conditions de service' : 'Terms of Service' },
    { key: 'contact_info', name: language === 'ar' ? 'معلومات الاتصال' : language === 'fr' ? 'Informations de contact' : 'Contact Info' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إدارة المحتوى' : language === 'fr' ? 'Gestion de contenu' : 'Content Management'}
        </h1>
        <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'إدارة وتحديث محتوى الموقع بثلاث لغات' : language === 'fr' ? 'Gérer et mettre à jour le contenu du site en trois langues' : 'Manage and update website content in three languages'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selection */}
        <Card>
          <CardHeader>
            <CardTitle className={`text-lg ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'الصفحات' : language === 'fr' ? 'Pages' : 'Pages'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pages.map((page) => (
              <Button
                key={page.key}
                variant={selectedPage === page.key ? "default" : "ghost"}
                className={`w-full justify-start ${language === 'ar' ? 'font-arabic' : ''}`}
                onClick={() => setSelectedPage(page.key)}
              >
                <FileText className="h-4 w-4 mr-2" />
                {page.name}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                <Globe className="h-5 w-5" />
                {language === 'ar' ? 'تحرير المحتوى' : language === 'fr' ? 'Éditeur de contenu' : 'Content Editor'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="en" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="fr">Français</TabsTrigger>
                    <TabsTrigger value="ar">العربية</TabsTrigger>
                  </TabsList>

                  <TabsContent value="en" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title_en">Title (English)</Label>
                      <Input
                        id="title_en"
                        value={formData.title_en}
                        onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                        placeholder="Enter title in English"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content_en">Content (English)</Label>
                      <Textarea
                        id="content_en"
                        value={formData.content_en}
                        onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                        placeholder="Enter content in English"
                        rows={10}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta_description_en">Meta Description (English)</Label>
                      <Textarea
                        id="meta_description_en"
                        value={formData.meta_description_en}
                        onChange={(e) => setFormData({ ...formData, meta_description_en: e.target.value })}
                        placeholder="Enter meta description in English"
                        rows={2}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="fr" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title_fr">Titre (Français)</Label>
                      <Input
                        id="title_fr"
                        value={formData.title_fr}
                        onChange={(e) => setFormData({ ...formData, title_fr: e.target.value })}
                        placeholder="Entrez le titre en français"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content_fr">Contenu (Français)</Label>
                      <Textarea
                        id="content_fr"
                        value={formData.content_fr}
                        onChange={(e) => setFormData({ ...formData, content_fr: e.target.value })}
                        placeholder="Entrez le contenu en français"
                        rows={10}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta_description_fr">Meta Description (Français)</Label>
                      <Textarea
                        id="meta_description_fr"
                        value={formData.meta_description_fr}
                        onChange={(e) => setFormData({ ...formData, meta_description_fr: e.target.value })}
                        placeholder="Entrez la meta description en français"
                        rows={2}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="ar" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title_ar" className="font-arabic">العنوان (العربية)</Label>
                      <Input
                        id="title_ar"
                        value={formData.title_ar}
                        onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                        placeholder="أدخل العنوان بالعربية"
                        className="font-arabic text-right"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="content_ar" className="font-arabic">المحتوى (العربية)</Label>
                      <Textarea
                        id="content_ar"
                        value={formData.content_ar}
                        onChange={(e) => setFormData({ ...formData, content_ar: e.target.value })}
                        placeholder="أدخل المحتوى بالعربية"
                        className="font-arabic text-right"
                        dir="rtl"
                        rows={10}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta_description_ar" className="font-arabic">وصف الميتا (العربية)</Label>
                      <Textarea
                        id="meta_description_ar"
                        value={formData.meta_description_ar}
                        onChange={(e) => setFormData({ ...formData, meta_description_ar: e.target.value })}
                        placeholder="أدخل وصف الميتا بالعربية"
                        className="font-arabic text-right"
                        dir="rtl"
                        rows={2}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className={`btn-morocco ${language === 'ar' ? 'font-arabic' : ''}`}>
                  <Save className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'حفظ التغييرات' : language === 'fr' ? 'Sauvegarder les modifications' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CMSManagement;