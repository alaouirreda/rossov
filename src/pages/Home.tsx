import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Trophy, Heart, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Home: React.FC = () => {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: language === 'ar' ? 'مجتمع متحد' : language === 'fr' ? 'Communauté Unie' : 'United Community',
      description: language === 'ar' ? 'انضم إلى آلاف المشجعين المتحمسين' : language === 'fr' ? 'Rejoignez des milliers de supporters passionnés' : 'Join thousands of passionate supporters'
    },
    {
      icon: Trophy,
      title: language === 'ar' ? 'إنجازات تاريخية' : language === 'fr' ? 'Réalisations Historiques' : 'Historic Achievements',
      description: language === 'ar' ? 'احتفل بالانتصارات العظيمة للمنتخب' : language === 'fr' ? 'Célébrez les grandes victoires de l\'équipe' : 'Celebrate the great victories of our team'
    },
    {
      icon: Heart,
      title: language === 'ar' ? 'شغف أصيل' : language === 'fr' ? 'Passion Authentique' : 'Authentic Passion',
      description: language === 'ar' ? 'عيش كل لحظة مع المنتخب' : language === 'fr' ? 'Vivez chaque moment avec l\'équipe' : 'Live every moment with the team'
    },
    {
      icon: Star,
      title: language === 'ar' ? 'تجارب حصرية' : language === 'fr' ? 'Expériences Exclusives' : 'Exclusive Experiences',
      description: language === 'ar' ? 'احصل على امتيازات خاصة للأعضاء' : language === 'fr' ? 'Obtenez des privilèges spéciaux pour les membres' : 'Get special privileges for members'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden moroccan-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        
        <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
          <div className="space-y-4 animate-fade-in-up">
            <h1 className={`text-5xl md:text-7xl font-bold leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
              <span className="gradient-text">{t('home.hero.title')}</span>
            </h1>
            <p className={`text-xl md:text-2xl text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('home.hero.subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/membership">
              <Button size="lg" className="btn-morocco hover-lift animate-pulse-glow">
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="glass-effect hover-lift">
                {language === 'ar' ? 'شاهد المعرض' : language === 'fr' ? 'Voir la Galerie' : 'View Gallery'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Morocco Flag Colors */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary-red rounded-full animate-bounce delay-100" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-primary-green rounded-full animate-bounce delay-300" />
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary-red rounded-full animate-bounce delay-500" />
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-primary-green rounded-full animate-bounce delay-700" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-3xl md:text-4xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'لماذا RossoVerde؟' : language === 'fr' ? 'Pourquoi RossoVerde?' : 'Why RossoVerde?'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar' ? 
                'اكتشف ما يجعلنا الجمعية الأولى لمشجعي المنتخب المغربي' :
                language === 'fr' ? 
                'Découvrez ce qui fait de nous la première association de supporters de l\'équipe marocaine' :
                'Discover what makes us the premier supporters association for the Moroccan national team'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass-effect hover-lift group">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-red to-primary-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-semibold ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-red/10 to-primary-green/10">
        <div className="container mx-auto text-center space-y-8">
          <h2 className={`text-3xl md:text-4xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'ابدأ رحلتك معنا' : language === 'fr' ? 'Commencez votre voyage avec nous' : 'Start Your Journey With Us'}
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'انضم إلى آلاف المشجعين واحصل على تجربة فريدة مع المنتخب المغربي' :
              language === 'fr' ? 
              'Rejoignez des milliers de supporters et obtenez une expérience unique avec l\'équipe nationale marocaine' :
              'Join thousands of supporters and get a unique experience with the Moroccan national team'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership">
              <Button size="lg" className="btn-morocco hover-lift">
                {language === 'ar' ? 'اشترك الآن' : language === 'fr' ? 'S\'abonner maintenant' : 'Subscribe Now'}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="hover-lift">
                {language === 'ar' ? 'اعرف المزيد' : language === 'fr' ? 'En savoir plus' : 'Learn More'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;