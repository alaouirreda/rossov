import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSupporterCharter } from '@/hooks/useSupporterCharter';
import { useProfile } from '@/hooks/useProfile';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { FileText, Check } from 'lucide-react';

interface CharterAcceptanceProps {
  onAccepted: () => void;
}

const CharterAcceptance: React.FC<CharterAcceptanceProps> = ({ onAccepted }) => {
  const { charter, loading } = useSupporterCharter();
  const { acceptCharter } = useProfile();
  const { language } = useLanguage();
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAcceptCharter = async () => {
    if (!charter || !accepted) return;

    setIsSubmitting(true);
    
    const { error } = await acceptCharter(charter.id);
    
    if (error) {
      toast({
        title: language === 'ar' ? 'خطأ' : language === 'fr' ? 'Erreur' : 'Error',
        description: error,
        variant: 'destructive'
      });
    } else {
      toast({
        title: language === 'ar' ? 'تم قبول الميثاق' : language === 'fr' ? 'Charte acceptée' : 'Charter accepted',
        description: language === 'ar' ? 'يمكنك الآن المتابعة للعضوية' : language === 'fr' ? 'Vous pouvez maintenant procéder à l\'adhésion' : 'You can now proceed with membership'
      });
      onAccepted();
    }
    
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!charter) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'لا يوجد ميثاق متاح' : language === 'fr' ? 'Aucune charte disponible' : 'No charter available'}
          </p>
        </CardContent>
      </Card>
    );
  }

  const title = language === 'ar' ? charter.title_ar : language === 'fr' ? charter.title_fr : charter.title_en;
  const content = language === 'ar' ? charter.content_ar : language === 'fr' ? charter.content_fr : charter.content_en;

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
          <FileText className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ScrollArea className="h-64 w-full border rounded-md p-4">
          <div 
            className={`prose prose-sm max-w-none ${language === 'ar' ? 'font-arabic text-right' : ''}`}
            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
          />
        </ScrollArea>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="charter-acceptance"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked as boolean)}
          />
          <label
            htmlFor="charter-acceptance"
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${language === 'ar' ? 'font-arabic' : ''}`}
          >
            {language === 'ar' ? 
              'أوافق على شروط وأحكام ميثاق مشجعي RossoVerde' :
              language === 'fr' ? 
              'J\'accepte les termes et conditions de la charte des supporters RossoVerde' :
              'I agree to the terms and conditions of the RossoVerde supporters charter'
            }
          </label>
        </div>

        <Button
          onClick={handleAcceptCharter}
          disabled={!accepted || isSubmitting}
          className={`w-full btn-morocco ${language === 'ar' ? 'font-arabic' : ''}`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              {language === 'ar' ? 'جاري المعالجة...' : language === 'fr' ? 'Traitement...' : 'Processing...'}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              {language === 'ar' ? 'قبول الميثاق والمتابعة' : language === 'fr' ? 'Accepter la charte et continuer' : 'Accept Charter and Continue'}
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CharterAcceptance;