import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useMembershipTiers } from '@/hooks/useMembershipTiers';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { MembershipTier } from '@/types/database';

const MembershipTiersManagement: React.FC = () => {
  const { tiers, createTier, updateTier, deleteTier, loading } = useMembershipTiers();
  const { language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<MembershipTier | null>(null);
  const [formData, setFormData] = useState({
    name_en: '',
    name_fr: '',
    name_ar: '',
    description_en: '',
    description_fr: '',
    description_ar: '',
    price: 0,
    currency: 'MAD',
    features_en: [''],
    features_fr: [''],
    features_ar: [''],
    sort_order: 0
  });

  const resetForm = () => {
    setFormData({
      name_en: '',
      name_fr: '',
      name_ar: '',
      description_en: '',
      description_fr: '',
      description_ar: '',
      price: 0,
      currency: 'MAD',
      features_en: [''],
      features_fr: [''],
      features_ar: [''],
      sort_order: 0
    });
    setEditingTier(null);
  };

  const handleEdit = (tier: MembershipTier) => {
    setFormData({
      name_en: tier.name_en,
      name_fr: tier.name_fr,
      name_ar: tier.name_ar,
      description_en: tier.description_en || '',
      description_fr: tier.description_fr || '',
      description_ar: tier.description_ar || '',
      price: tier.price,
      currency: tier.currency,
      features_en: tier.features_en || [''],
      features_fr: tier.features_fr || [''],
      features_ar: tier.features_ar || [''],
      sort_order: tier.sort_order
    });
    setEditingTier(tier);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tierData = {
      ...formData,
      features_en: formData.features_en.filter(f => f.trim() !== ''),
      features_fr: formData.features_fr.filter(f => f.trim() !== ''),
      features_ar: formData.features_ar.filter(f => f.trim() !== ''),
      is_active: true
    };

    let result;
    if (editingTier) {
      result = await updateTier(editingTier.id, tierData);
    } else {
      result = await createTier(tierData);
    }
    
    if (result.error) {
      toast({
        title: language === 'ar' ? 'خطأ' : language === 'fr' ? 'Erreur' : 'Error',
        description: result.error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: language === 'ar' ? 'تم الحفظ بنجاح' : language === 'fr' ? 'Sauvegardé avec succès' : 'Successfully saved',
        description: editingTier ? 
          (language === 'ar' ? 'تم تحديث الباقة' : language === 'fr' ? 'Niveau mis à jour' : 'Tier updated') :
          (language === 'ar' ? 'تم إنشاء الباقة' : language === 'fr' ? 'Niveau créé' : 'Tier created')
      });
      setIsDialogOpen(false);
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteTier(id);
    
    if (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : language === 'fr' ? 'Erreur' : 'Error',
        description: error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: language === 'ar' ? 'تم الحذف' : language === 'fr' ? 'Supprimé' : 'Deleted',
        description: language === 'ar' ? 'تم حذف الباقة' : language === 'fr' ? 'Niveau supprimé' : 'Tier deleted'
      });
    }
  };

  const addFeature = (lang: 'en' | 'fr' | 'ar') => {
    const key = `features_${lang}` as keyof typeof formData;
    setFormData({
      ...formData,
      [key]: [...(formData[key] as string[]), '']
    });
  };

  const updateFeature = (lang: 'en' | 'fr' | 'ar', index: number, value: string) => {
    const key = `features_${lang}` as keyof typeof formData;
    const features = [...(formData[key] as string[])];
    features[index] = value;
    setFormData({
      ...formData,
      [key]: features
    });
  };

  const removeFeature = (lang: 'en' | 'fr' | 'ar', index: number) => {
    const key = `features_${lang}` as keyof typeof formData;
    const features = (formData[key] as string[]).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [key]: features
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'إدارة باقات العضوية' : language === 'fr' ? 'Gestion des niveaux d\'adhésion' : 'Membership Tiers Management'}
          </h1>
          <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'إنشاء وتعديل باقات العضوية المختلفة' : language === 'fr' ? 'Créer et modifier les différents niveaux d\'adhésion' : 'Create and modify different membership tiers'}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className={`btn-morocco ${language === 'ar' ? 'font-arabic' : ''}`} onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إضافة باقة' : language === 'fr' ? 'Ajouter niveau' : 'Add Tier'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className={language === 'ar' ? 'font-arabic' : ''}>
                {editingTier ? 
                  (language === 'ar' ? 'تعديل الباقة' : language === 'fr' ? 'Modifier le niveau' : 'Edit Tier') :
                  (language === 'ar' ? 'إضافة باقة جديدة' : language === 'fr' ? 'Ajouter un nouveau niveau' : 'Add New Tier')
                }
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">
                    {language === 'ar' ? 'السعر' : language === 'fr' ? 'Prix' : 'Price'}
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sort_order">
                    {language === 'ar' ? 'ترتيب العرض' : language === 'fr' ? 'Ordre d\'affichage' : 'Display Order'}
                  </Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <Tabs defaultValue="en" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                  <TabsTrigger value="ar">العربية</TabsTrigger>
                </TabsList>

                <TabsContent value="en" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name_en">Name (English)</Label>
                    <Input
                      id="name_en"
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_en">Description (English)</Label>
                    <Textarea
                      id="description_en"
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Features (English)</Label>
                    {formData.features_en.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature('en', index, e.target.value)}
                          placeholder="Enter feature"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature('en', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addFeature('en')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="fr" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name_fr">Nom (Français)</Label>
                    <Input
                      id="name_fr"
                      value={formData.name_fr}
                      onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_fr">Description (Français)</Label>
                    <Textarea
                      id="description_fr"
                      value={formData.description_fr}
                      onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fonctionnalités (Français)</Label>
                    {formData.features_fr.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature('fr', index, e.target.value)}
                          placeholder="Entrez la fonctionnalité"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature('fr', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addFeature('fr')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter fonctionnalité
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="ar" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name_ar" className="font-arabic">الاسم (العربية)</Label>
                    <Input
                      id="name_ar"
                      value={formData.name_ar}
                      onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                      className="font-arabic text-right"
                      dir="rtl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_ar" className="font-arabic">الوصف (العربية)</Label>
                    <Textarea
                      id="description_ar"
                      value={formData.description_ar}
                      onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                      className="font-arabic text-right"
                      dir="rtl"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-arabic">الميزات (العربية)</Label>
                    {formData.features_ar.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => updateFeature('ar', index, e.target.value)}
                          placeholder="أدخل الميزة"
                          className="font-arabic text-right"
                          dir="rtl"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFeature('ar', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addFeature('ar')}
                      className="font-arabic"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      إضافة ميزة
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-4">
                <Button type="submit" className={`btn-morocco ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {editingTier ? 
                    (language === 'ar' ? 'تحديث الباقة' : language === 'fr' ? 'Mettre à jour' : 'Update Tier') :
                    (language === 'ar' ? 'إنشاء الباقة' : language === 'fr' ? 'Créer niveau' : 'Create Tier')
                  }
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  className={language === 'ar' ? 'font-arabic' : ''}
                >
                  {language === 'ar' ? 'إلغاء' : language === 'fr' ? 'Annuler' : 'Cancel'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tiers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const name = language === 'ar' ? tier.name_ar : language === 'fr' ? tier.name_fr : tier.name_en;
          const description = language === 'ar' ? tier.description_ar : language === 'fr' ? tier.description_fr : tier.description_en;
          const features = language === 'ar' ? tier.features_ar : language === 'fr' ? tier.features_fr : tier.features_en;

          return (
            <Card key={tier.id} className="hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-lg ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(tier)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(tier.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary-green" />
                  <span className="text-2xl font-bold">{tier.price} {tier.currency}</span>
                </div>
                
                {description && (
                  <p className={`text-muted-foreground text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {description}
                  </p>
                )}

                {features && features.length > 0 && (
                  <div className="space-y-2">
                    <h4 className={`font-semibold text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'الميزات:' : language === 'fr' ? 'Fonctionnalités:' : 'Features:'}
                    </h4>
                    <ul className="space-y-1">
                      {features.map((feature, index) => (
                        <li key={index} className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Badge variant="outline">
                  {language === 'ar' ? 'ترتيب:' : language === 'fr' ? 'Ordre:' : 'Order:'} {tier.sort_order}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MembershipTiersManagement;