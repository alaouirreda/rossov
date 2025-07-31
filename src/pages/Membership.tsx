import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMembershipTiers } from '@/hooks/useMembershipTiers';
import { useProfile } from '@/hooks/useProfile';
import { Link } from 'react-router-dom';

const Membership: React.FC = () => {
  const { language, t } = useLanguage();
  const { tiers, loading } = useMembershipTiers();
  const { profile } = useProfile();


  const handleSubscribe = (planName: string, price: number) => {
    // This will be connected to Stripe later
    console.log(`Subscribing to ${planName} for ${price} MAD/month`);
  };

  const getIconForTier = (tierName: string) => {
    if (tierName.toLowerCase().includes('contributor') || tierName.toLowerCase().includes('contributeur') || tierName.toLowerCase().includes('داعم')) {
      return Crown;
    }
    if (tierName.toLowerCase().includes('solidarity') || tierName.toLowerCase().includes('solidaire') || tierName.toLowerCase().includes('تضامني')) {
      return Heart;
    }
    return Star;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className={`text-4xl md:text-6xl font-bold text-morocco-green ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t('membership.title')}
          </h1>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t('membership.subtitle')}
          </p>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'اختر الخطة التي تناسبك وانضم إلى عائلة RossoVerde. استمتع بامتيازات حصرية ولحظات لا تُنسى مع المنتخب المغربي.' :
              language === 'fr' ? 
              'Choisissez le plan qui vous convient et rejoignez la famille RossoVerde. Profitez de privilèges exclusifs et de moments inoubliables avec l\'équipe nationale marocaine.' :
              'Choose the plan that suits you and join the RossoVerde family. Enjoy exclusive privileges and unforgettable moments with the Moroccan national team.'
            }
          </p>
        </div>

        {/* Membership Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => {
            const Icon = getIconForTier(tier.name_en);
            const name = language === 'ar' ? tier.name_ar : language === 'fr' ? tier.name_fr : tier.name_en;
            const description = language === 'ar' ? tier.description_ar : language === 'fr' ? tier.description_fr : tier.description_en;
            const features = language === 'ar' ? tier.features_ar : language === 'fr' ? tier.features_fr : tier.features_en;
            const isPopular = tier.sort_order === 3; // Premium pack is popular
            
            return (
              <Card key={tier.id} className={`glass-effect hover-lift relative ${isPopular ? 'ring-2 ring-primary' : ''}`}>
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-red to-primary-green text-white">
                    {language === 'ar' ? 'الأكثر شعبية' : language === 'fr' ? 'Le Plus Populaire' : 'Most Popular'}
                  </Badge>
                )}
                
                <CardHeader className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-red to-primary-green rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className={`text-2xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {name}
                  </CardTitle>
                  
                  <div className="space-y-2">
                    <div className="text-4xl font-bold gradient-text">
                      {tier.price} {tier.currency}
                      <span className="text-lg text-muted-foreground font-normal">
                        /{language === 'ar' ? 'شهر' : language === 'fr' ? 'mois' : 'month'}
                      </span>
                    </div>
                    <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>{description}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {features?.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-primary-green flex-shrink-0" />
                        <span className={`text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {profile?.charter_accepted ? (
                    <Button 
                      className={`w-full ${isPopular ? 'btn-morocco' : ''} hover-lift ${language === 'ar' ? 'font-arabic' : ''}`}
                      variant={isPopular ? 'default' : 'outline'}
                      onClick={() => handleSubscribe(name, tier.price)}
                    >
                      {language === 'ar' ? 'اشترك الآن' : language === 'fr' ? 'S\'abonner maintenant' : 'Subscribe Now'}
                    </Button>
                  ) : (
                    <Link to="/auth">
                      <Button 
                        className={`w-full ${isPopular ? 'btn-morocco' : ''} hover-lift ${language === 'ar' ? 'font-arabic' : ''}`}
                        variant={isPopular ? 'default' : 'outline'}
                      >
                        {language === 'ar' ? 'سجل للاشتراك' : language === 'fr' ? 'S\'inscrire pour s\'abonner' : 'Sign up to Subscribe'}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 text-center space-y-8">
                      <h2 className={`text-3xl font-bold text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'لماذا تنضم إلينا؟' : language === 'fr' ? 'Pourquoi nous rejoindre?' : 'Why Join Us?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
                title: language === 'ar' ? 'مجتمع حقيقي' : language === 'fr' ? 'Vraie Communauté' : 'Real Community',
                description: language === 'ar' ? 'انضم إلى آلاف المشجعين المتحمسين من جميع أنحاء العالم' : language === 'fr' ? 'Rejoignez des milliers de supporters passionnés du monde entier' : 'Join thousands of passionate supporters from around the world'
              },
              {
                title: language === 'ar' ? 'تجارب حصرية' : language === 'fr' ? 'Expériences Exclusives' : 'Exclusive Experiences',
                description: language === 'ar' ? 'احصل على وصول مميز للفعاليات واللقاءات مع اللاعبين' : language === 'fr' ? 'Obtenez un accès privilégié aux événements et aux rencontres avec les joueurs' : 'Get privileged access to events and player meet & greets'
              },
              {
                title: language === 'ar' ? 'دعم المنتخب' : language === 'fr' ? 'Soutien à l\'Équipe' : 'Team Support',
                description: language === 'ar' ? 'ساهم مباشرة في دعم المنتخب المغربي في جميع المسابقات' : language === 'fr' ? 'Contribuez directement au soutien de l\'équipe nationale marocaine dans toutes les compétitions' : 'Contribute directly to supporting the Moroccan national team in all competitions'
              }
            ].map((benefit, index) => (
              <Card key={index} className="glass-effect">
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className={`text-xl font-semibold ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
                      <h2 className={`text-3xl font-bold text-center mb-8 text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'أسئلة شائعة' : language === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[{
                question: language === 'ar' ? 'كيف يمكنني إلغاء اشتراكي؟' : language === 'fr' ? 'Comment puis-je annuler mon abonnement?' : 'How can I cancel my subscription?',
                answer: language === 'ar' ? 'يمكنك إلغاء اشتراكك في أي وقت من خلال حسابك الشخصي أو التواصل مع فريق الدعم.' : language === 'fr' ? 'Vous pouvez annuler votre abonnement à tout moment via votre compte personnel ou en contactant l\'équipe de support.' : 'You can cancel your subscription at any time through your personal account or by contacting the support team.'
              },
              {
                question: language === 'ar' ? 'هل يمكنني تغيير خطتي لاحقاً؟' : language === 'fr' ? 'Puis-je changer mon plan plus tard?' : 'Can I change my plan later?',
                answer: language === 'ar' ? 'نعم، يمكنك الترقية أو التراجع بين الخطط في أي وقت.' : language === 'fr' ? 'Oui, vous pouvez passer d\'un plan à l\'autre à tout moment.' : 'Yes, you can upgrade or downgrade between plans at any time.'
              },
              {
                question: language === 'ar' ? 'ما هي طرق الدفع المقبولة؟' : language === 'fr' ? 'Quels sont les modes de paiement acceptés?' : 'What payment methods are accepted?',
                answer: language === 'ar' ? 'نقبل جميع البطاقات الائتمانية الرئيسية وPayPal.' : language === 'fr' ? 'Nous acceptons toutes les principales cartes de crédit et PayPal.' : 'We accept all major credit cards and PayPal.'
              }
            ].map((faq, index) => (
              <Card key={index} className="glass-effect">
                <CardContent className="p-6">
                  <h3 className={`font-semibold mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {faq.question}
                  </h3>
                  <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
