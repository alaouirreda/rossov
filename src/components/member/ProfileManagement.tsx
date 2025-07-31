import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { User, MapPin, Phone, Mail } from 'lucide-react';

const ProfileManagement: React.FC = () => {
  const { profile, loading, updateProfile } = useProfile();
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postal_code: ''
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        country: profile.country || '',
        postal_code: profile.postal_code || ''
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await updateProfile(formData);
    
    if (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : language === 'fr' ? 'Erreur' : 'Error',
        description: error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: language === 'ar' ? 'تم التحديث بنجاح' : language === 'fr' ? 'Mis à jour avec succès' : 'Successfully updated',
        description: language === 'ar' ? 'تم تحديث ملفك الشخصي' : language === 'fr' ? 'Votre profil a été mis à jour' : 'Your profile has been updated'
      });
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            <User className="h-5 w-5" />
            {language === 'ar' ? 'الملف الشخصي' : language === 'fr' ? 'Profil Personnel' : 'Personal Profile'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'الاسم الكامل' : language === 'fr' ? 'Nom complet' : 'Full Name'}
                </Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  disabled={!isEditing}
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : language === 'fr' ? 'Entrez votre nom complet' : 'Enter your full name'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'البريد الإلكتروني' : language === 'fr' ? 'Email' : 'Email'}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={profile?.email || ''}
                    disabled
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'رقم الهاتف' : language === 'fr' ? 'Téléphone' : 'Phone'}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : language === 'fr' ? 'Entrez votre téléphone' : 'Enter your phone'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'المدينة' : language === 'fr' ? 'Ville' : 'City'}
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                    placeholder={language === 'ar' ? 'أدخل مدينتك' : language === 'fr' ? 'Entrez votre ville' : 'Enter your city'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'البلد' : language === 'fr' ? 'Pays' : 'Country'}
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  disabled={!isEditing}
                  placeholder={language === 'ar' ? 'أدخل بلدك' : language === 'fr' ? 'Entrez votre pays' : 'Enter your country'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postal_code" className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'الرمز البريدي' : language === 'fr' ? 'Code postal' : 'Postal Code'}
                </Label>
                <Input
                  id="postal_code"
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  disabled={!isEditing}
                  placeholder={language === 'ar' ? 'أدخل الرمز البريدي' : language === 'fr' ? 'Entrez votre code postal' : 'Enter your postal code'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className={language === 'ar' ? 'font-arabic' : ''}>
                {language === 'ar' ? 'العنوان' : language === 'fr' ? 'Adresse' : 'Address'}
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                placeholder={language === 'ar' ? 'أدخل عنوانك الكامل' : language === 'fr' ? 'Entrez votre adresse complète' : 'Enter your full address'}
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              {!isEditing ? (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className={`btn-morocco ${language === 'ar' ? 'font-arabic' : ''}`}
                >
                  {language === 'ar' ? 'تعديل الملف' : language === 'fr' ? 'Modifier le profil' : 'Edit Profile'}
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    className={`btn-morocco ${language === 'ar' ? 'font-arabic' : ''}`}
                  >
                    {language === 'ar' ? 'حفظ التغييرات' : language === 'fr' ? 'Sauvegarder' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      // Reset form data
                      if (profile) {
                        setFormData({
                          full_name: profile.full_name || '',
                          phone: profile.phone || '',
                          address: profile.address || '',
                          city: profile.city || '',
                          country: profile.country || '',
                          postal_code: profile.postal_code || ''
                        });
                      }
                    }}
                    className={language === 'ar' ? 'font-arabic' : ''}
                  >
                    {language === 'ar' ? 'إلغاء' : language === 'fr' ? 'Annuler' : 'Cancel'}
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileManagement;