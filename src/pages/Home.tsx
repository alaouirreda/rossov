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
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-morocco-red/20 to-transparent rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-morocco-green/20 to-transparent rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-morocco-red/10 via-morocco-green/10 to-transparent rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-6xl mx-auto">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className={`text-6xl md:text-8xl font-black leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
              <span className="gradient-text drop-shadow-2xl">{t('home.hero.title')}</span>
            </h1>
            <p className={`text-2xl md:text-3xl text-foreground/90 font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
              {t('home.hero.subtitle')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-morocco-red to-morocco-green mx-auto rounded-full" />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/membership">
              <Button size="lg" className="btn-morocco hover-lift animate-pulse-glow text-lg px-8 py-4 rounded-xl font-bold">
                {t('home.hero.cta')}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="glass-effect hover-lift text-lg px-8 py-4 rounded-xl font-semibold border-2 border-morocco-red/30 text-foreground hover:bg-morocco-red/10">
                {language === 'ar' ? 'شاهد المعرض' : language === 'fr' ? 'Voir la Galerie' : 'View Gallery'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Floating Morocco Flag Colors */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-morocco-red rounded-full animate-bounce delay-100 shadow-lg shadow-morocco-red/50" />
        <div className="absolute top-40 right-20 w-8 h-8 bg-morocco-green rounded-full animate-bounce delay-300 shadow-lg shadow-morocco-green/50" />
        <div className="absolute bottom-32 left-20 w-4 h-4 bg-morocco-red rounded-full animate-bounce delay-500 shadow-lg shadow-morocco-red/50" />
        <div className="absolute bottom-20 right-10 w-7 h-7 bg-morocco-green rounded-full animate-bounce delay-700 shadow-lg shadow-morocco-green/50" />
        <div className="absolute top-1/2 left-10 w-5 h-5 bg-morocco-red rounded-full animate-bounce delay-900 shadow-lg shadow-morocco-red/50" />
        <div className="absolute top-1/3 right-10 w-6 h-6 bg-morocco-green rounded-full animate-bounce delay-1100 shadow-lg shadow-morocco-green/50" />
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
                <Card key={index} className="glass-effect hover-lift group border-2 border-morocco-red/20 hover:border-morocco-red/40 transition-all duration-300">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-morocco-red to-morocco-green rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-morocco-red/30">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className={`text-2xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-muted-foreground leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
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
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-morocco-red/20 via-background to-morocco-green/20" />
        <div className="absolute inset-0 moroccan-pattern opacity-30" />
        
        <div className="container mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className={`text-4xl md:text-6xl font-black gradient-text ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'ابدأ رحلتك معنا' : language === 'fr' ? 'Commencez votre voyage avec nous' : 'Start Your Journey With Us'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-morocco-red to-morocco-green mx-auto rounded-full" />
            <p className={`text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 
                'انضم إلى آلاف المشجعين واحصل على تجربة فريدة مع المنتخب المغربي' :
                language === 'fr' ? 
                'Rejoignez des milliers de supporters et obtenez une expérience unique avec l\'équipe nationale marocaine' :
                'Join thousands of supporters and get a unique experience with the Moroccan national team'
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/membership">
              <Button size="lg" className="btn-morocco hover-lift text-xl px-10 py-5 rounded-xl font-bold shadow-2xl">
                {language === 'ar' ? 'اشترك الآن' : language === 'fr' ? 'S\'abonner maintenant' : 'Subscribe Now'}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="hover-lift text-xl px-10 py-5 rounded-xl font-semibold border-2 border-morocco-green/50 text-foreground hover:bg-morocco-green/10">
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