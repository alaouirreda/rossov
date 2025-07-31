import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Shield } from 'lucide-react';

const AdminUserCreator: React.FC = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const promoteToAdmin = async (userEmail: string) => {
    try {
      const { error } = await supabase.rpc('promote_user_to_admin', {
        user_email: userEmail
      });

      if (error) throw error;
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to promote user' };
    }
  };

  const handlePromoteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await promoteToAdmin(email);

    if (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : language === 'fr' ? 'Erreur' : 'Error',
        description: error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: language === 'ar' ? 'تم بنجاح' : language === 'fr' ? 'Succès' : 'Success',
        description: language === 'ar' ? 
          'تم ترقية المستخدم إلى مدير' :
          language === 'fr' ? 
          'Utilisateur promu administrateur' :
          'User promoted to admin'
      });
      setEmail('');
    }

    setIsLoading(false);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
          <Shield className="h-5 w-5" />
          {language === 'ar' ? 'ترقية مستخدم إلى مدير' : language === 'fr' ? 'Promouvoir utilisateur admin' : 'Promote User to Admin'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription className={language === 'ar' ? 'font-arabic' : ''}>
            {language === 'ar' ? 
              'أدخل البريد الإلكتروني لمستخدم مسجل لترقيته إلى مدير' :
              language === 'fr' ? 
              'Entrez l\'email d\'un utilisateur enregistré pour le promouvoir administrateur' :
              'Enter the email of a registered user to promote them to admin'
            }
          </AlertDescription>
        </Alert>

        <form onSubmit={handlePromoteUser} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email" className={language === 'ar' ? 'font-arabic' : ''}>
              {language === 'ar' ? 'البريد الإلكتروني' : language === 'fr' ? 'Email' : 'Email'}
            </Label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'ar' ? 'أدخل البريد الإلكتروني' : language === 'fr' ? 'Entrez l\'email' : 'Enter email'}
              required
            />
          </div>

          <Button
            type="submit"
            className={`w-full btn-morocco ${language === 'ar' ? 'font-arabic' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                {language === 'ar' ? 'جاري المعالجة...' : language === 'fr' ? 'Traitement...' : 'Processing...'}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                {language === 'ar' ? 'ترقية إلى مدير' : language === 'fr' ? 'Promouvoir admin' : 'Promote to Admin'}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminUserCreator;