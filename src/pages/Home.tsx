import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Trophy, Heart, Star, Calendar, Camera, ShoppingBag, FileText, MapPin, Clock, Crown, Flame, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import backsect1 from '@/assets/backsect1.jpg';
import backsect3 from '@/assets/backsect3.jpg';
import logo from '@/assets/logo.png';
import backsect4 from '@/assets/backsect4.jpg';
import backsect6 from '@/assets/backsect6.jpg';
import backsect12 from '@/assets/backsect12.jpg';
import boutique from '@/assets/boutique.jpg';

const Home: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Atlas Lions Passion */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url(${backsect1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95" />
        
        {/* Stadium Energy Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-morocco-red/30 to-transparent rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-morocco-green/30 to-transparent rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-morocco-red/10 via-morocco-green/10 to-transparent rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-6xl mx-auto">
          <div className="space-y-8 animate-fade-in-up">
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <img src={logo} alt="RossoVerde Logo" className="h-24 w-24 md:h-32 md:w-32 object-contain mb-4" />
              <div className="flex items-center justify-center gap-4">
                <h1 className={`text-6xl md:text-8xl font-black leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
                  <span className="drop-shadow-2xl">
                    {language === 'ar' ? (
                      <>
                        <span className="text-morocco-red">روسو</span>
                        <span className="text-morocco-green">فيردي</span>
                      </>
                    ) : (
                      <>
                        <span className="text-morocco-red">Rosso</span>
                        <span className="text-morocco-green">Verde</span>
                      </>
                    )}
                  </span>
                </h1>
              </div>
            </div>
            <p className={`text-3xl md:text-4xl text-foreground font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'جمعية مشجعي المنتخب المغربي' : language === 'fr' ? 'Association des Supporters de l\'Équipe Nationale Marocaine' : 'Moroccan National Team Supporters Association'}
            </p>
            <p className={`text-xl md:text-2xl text-foreground/80 font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'كن اللاعب الثاني عشر - عش شغف أسود الأطلس' : language === 'fr' ? 'Soyez le 12ème joueur - Vivez la passion des Lions de l\'Atlas' : 'Be the 12th Player - Live the Atlas Lions Passion'}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-1 bg-morocco-red rounded-full" />
              <Flame className="h-8 w-8 text-morocco-red animate-pulse" />
              <div className="w-16 h-1 bg-morocco-green rounded-full" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/membership">
              <Button size="lg" className={`btn-morocco hover-lift animate-pulse-glow text-xl px-12 py-6 rounded-xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'انضم للعائلة' : language === 'fr' ? 'Rejoindre la Famille' : 'Join the Family'}
                <Crown className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Smoke Effect Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-morocco-red/20 to-transparent smoke-anim opacity-60 animate-pulse" style={{ animation: 'smoke-float 8s ease-in-out infinite' }} />
        <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-morocco-green/20 to-transparent smoke-anim opacity-50 animate-pulse" style={{ animation: 'smoke-float-alt 10s ease-in-out infinite 2s' }} />
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-morocco-red/15 to-transparent smoke-anim opacity-40 animate-pulse" style={{ animation: 'smoke-float 12s ease-in-out infinite 4s' }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-morocco-green/15 to-transparent smoke-anim opacity-45 animate-pulse" style={{ animation: 'smoke-float-alt 9s ease-in-out infinite 6s' }} />
        <div className="absolute top-1/3 left-1/3 w-14 h-14 bg-gradient-to-br from-morocco-red/10 to-transparent smoke-anim opacity-35 animate-pulse" style={{ animation: 'smoke-float 11s ease-in-out infinite 1s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-morocco-green/10 to-transparent smoke-anim opacity-30 animate-pulse" style={{ animation: 'smoke-float-alt 13s ease-in-out infinite 3s' }} />
        <div className="absolute top-1/4 left-1/2 w-10 h-10 bg-gradient-to-br from-morocco-red/20 to-transparent smoke-anim opacity-25 animate-pulse" style={{ animation: 'smoke-float 14s ease-in-out infinite 5s' }} />
        <div className="absolute bottom-1/4 right-1/2 w-20 h-20 bg-gradient-to-br from-morocco-green/20 to-transparent smoke-anim opacity-20 animate-pulse" style={{ animation: 'smoke-float-alt 15s ease-in-out infinite 7s' }} />
      </section>

      {/* About the Association */}
      <section className="py-24 px-4 relative" style={{ backgroundImage: `url(${backsect3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Gaussian Blur Overlay */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm z-0" />
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" key="about-section-grid">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className={`text-4xl md:text-5xl font-black text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'قصة RossoVerde' : language === 'fr' ? 'L\'Histoire de RossoVerde' : 'The RossoVerde Story'}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-morocco-red to-morocco-green rounded-full" />
              </div>
              <p className={`text-lg text-muted-foreground leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 
                  'تأسست جمعية RossoVerde لتكون البيت الروحي لجميع مشجعي المنتخب المغربي. نحن أكثر من مجرد جمعية - نحن عائلة متحدة بحب المغرب وشغف كرة القدم.' :
                  language === 'fr' ? 
                  'L\'association RossoVerde a été fondée pour être la maison spirituelle de tous les supporters de l\'équipe nationale marocaine. Nous sommes plus qu\'une association - nous sommes une famille unie par l\'amour du Maroc et la passion du football.' :
                  'RossoVerde Association was founded to be the spiritual home for all Moroccan national team supporters. We are more than just an association - we are a family united by love for Morocco and passion for football.'
                }
              </p>
              <div className="grid grid-cols-2 gap-6">
                <Card className="glass-effect border-morocco-red/20" style={{ opacity: 0.8 }}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-morocco-red to-morocco-green rounded-xl flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">10,000+</p>
                    <p className="text-sm text-muted-foreground">{language === 'ar' ? 'عضو' : language === 'fr' ? 'Membres' : 'Members'}</p>
                  </CardContent>
                </Card>
                <Card className="glass-effect border-morocco-green/20" style={{ opacity: 0.8 }}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-morocco-green to-morocco-red rounded-xl flex items-center justify-center mb-4">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">50+</p>
                    <p className="text-sm text-muted-foreground">{language === 'ar' ? 'مدينة' : language === 'fr' ? 'Villes' : 'Cities'}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative">
              <Card className="glass-effect p-8 border-2 border-morocco-red/20" style={{ opacity: 0.8 }}>
                <CardHeader>
                  <CardTitle className={`text-2xl font-bold text-center text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'مهمتنا' : language === 'fr' ? 'Notre Mission' : 'Our Mission'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-morocco-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                    <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'نشر ثقافة التشجيع الإيجابية والإبداعية' : language === 'fr' ? 'Promouvoir une culture de soutien positive et créative' : 'Promote positive and creative fan culture'}
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-morocco-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'دعم المنتخب في جميع البطولات والمباريات' : language === 'fr' ? 'Soutenir l\'équipe dans tous les tournois et matchs' : 'Support the team in all tournaments and matches'}
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-morocco-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'تنظيم الفعاليات والرحلات للمباريات' : language === 'fr' ? 'Organiser des événements et des voyages pour les matchs' : 'Organize events and trips for matches'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us - 12th Player */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ backgroundImage: `url(${backsect4})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-morocco-red/20 via-background to-morocco-green/20" />
        <div className="absolute inset-0 moroccan-pattern opacity-20" />
        
        <div className="container mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className={`text-5xl md:text-7xl font-black text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'كن اللاعب الثاني عشر' : language === 'fr' ? 'Soyez le 12ème Joueur' : 'Be the 12th Player'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-morocco-red to-morocco-green mx-auto rounded-full" />
            <p className={`text-xl text-foreground/90 max-w-4xl mx-auto leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 
                'انضم إلى آلاف المشجعين المتحمسين في الملاعب والساحات. عيش التيفو، الهتافات، والسفر مع أسود الأطلس في رحلة لا تُنسى.' :
                language === 'fr' ? 
                'Rejoignez des milliers de supporters passionnés dans les stades et les places. Vivez les tifos, les chants et voyagez avec les Lions de l\'Atlas dans un voyage inoubliable.' :
                'Join thousands of passionate supporters in stadiums and squares. Experience tifos, chants, and travel with the Atlas Lions on an unforgettable journey.'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="glass-effect hover-lift border-2 border-morocco-red/30" style={{ opacity: 0.8 }}>
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-morocco-red to-morocco-green rounded-2xl flex items-center justify-center">
                  <Flame className="h-10 w-10 text-white" />
                </div>
                <h3 className={`text-xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'التيفو والهتافات' : language === 'fr' ? 'Tifos & Chants' : 'Tifos & Chants'}
                </h3>
                <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'شارك في إبداع أجمل التيفو والهتافات' : language === 'fr' ? 'Participez à la création des plus beaux tifos et chants' : 'Participate in creating the most beautiful tifos and chants'}
                </p>
              </CardContent>
            </Card>
            <Card className="glass-effect hover-lift border-2 border-morocco-green/30" style={{ opacity: 0.8 }}>
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-morocco-green to-morocco-red rounded-2xl flex items-center justify-center">
                  <MapPin className="h-10 w-10 text-white" />
                </div>
                <h3 className={`text-xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'قوافل المشجعين' : language === 'fr' ? 'Caravanes de Supporters' : 'Fan Caravans'}
                </h3>
                <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'سافر مع القافلة إلى المباريات الخارجية' : language === 'fr' ? 'Voyagez avec la caravane vers les matchs à l\'extérieur' : 'Travel with the caravan to away matches'}
                </p>
              </CardContent>
            </Card>
            <Card className="glass-effect hover-lift border-2 border-morocco-red/30" style={{ opacity: 0.8 }}>
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-morocco-red to-morocco-green rounded-2xl flex items-center justify-center">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className={`text-xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'تنسيق الملاعب' : language === 'fr' ? 'Coordination Stades' : 'Stadium Coordination'}
                </h3>
                <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'كن جزءاً من تنسيق الجماهير في الملاعب' : language === 'fr' ? 'Faites partie de la coordination des supporters dans les stades' : 'Be part of fan coordination in stadiums'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Link to="/membership">
            <Button size="lg" className={`btn-morocco hover-lift text-2xl px-16 py-8 rounded-xl font-bold shadow-2xl mt-12 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'انضم الآن' : language === 'fr' ? 'Rejoindre Maintenant' : 'Join Now'}
              <ArrowRight className="ml-4 h-8 w-8" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Upcoming Matches & Countdown */}
      <section className="py-20 px-4 relative" style={{ backgroundImage: `url(${backsect6})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-4xl md:text-5xl font-black text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'المباريات القادمة' : language === 'fr' ? 'Prochains Matchs' : 'Upcoming Matches'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-morocco-red to-morocco-green mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="glass-effect border-2 border-morocco-red/30 hover-lift matches-opacity">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Calendar className="h-8 w-8 text-morocco-red" />
                  <CardTitle className={`text-2xl font-bold text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'المباراة القادمة' : language === 'fr' ? 'Prochain Match' : 'Next Match'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold text-foreground">Morocco vs Tunisia</p>
                  <p className="text-lg text-muted-foreground">AFCON Qualifiers</p>
                  <div className="flex items-center justify-center gap-2 text-morocco-red font-semibold">
                    <Clock className="h-5 w-5" />
                    <span>15 March 2024 - 20:00</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-morocco-red/10 to-morocco-green/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-foreground mb-2">15 Days</p>
                  <p className="text-muted-foreground">{language === 'ar' ? 'حتى المباراة' : language === 'fr' ? 'Jusqu\'au match' : 'Until the match'}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-2 border-morocco-green/30 hover-lift matches-opacity">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Trophy className="h-8 w-8 text-morocco-green" />
                  <CardTitle className={`text-2xl font-bold text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'البطولات القادمة' : language === 'fr' ? 'Prochains Tournois' : 'Upcoming Tournaments'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-morocco-red/10 rounded-lg">
                    <span className="font-semibold">AFCON 2025</span>
                    <span className="text-sm text-muted-foreground">Morocco</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-morocco-green/10 rounded-lg">
                    <span className="font-semibold">World Cup 2026</span>
                    <span className="text-sm text-muted-foreground">USA/Canada/Mexico</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-morocco-red/10 rounded-lg">
                    <span className="font-semibold">Nations League</span>
                    <span className="text-sm text-muted-foreground">Europe</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News & Highlights */}
      <section className="py-20 px-4 relative" style={{ backgroundImage: `url(${backsect12})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Light Blur Overlay */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-0" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-4xl md:text-5xl font-black text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'أخبار وأحداث' : language === 'fr' ? 'Actualités & Événements' : 'News & Highlights'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-morocco-red to-morocco-green mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-effect hover-lift border-2 border-morocco-red/20" style={{ opacity: 0.8 }}>
              <CardContent className="p-6 space-y-4">
                <div className="h-48 bg-gradient-to-br from-morocco-red/20 to-morocco-green/20 rounded-xl flex items-center justify-center">
                  <Camera className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-xl font-bold text-foreground${language === 'ar' ? ' font-samir' : ''}`}>
                    {language === 'ar' ? 'تيفو رائع في مباراة البرتغال' : language === 'fr' ? 'Tifo spectaculaire contre le Portugal' : 'Spectacular Tifo vs Portugal'}
                  </h3>
                  <p className={`text-muted-foreground text-sm${language === 'ar' ? ' font-janna' : ''}`}>
                    {language === 'ar' ? 'شاهد أجمل التيفو التي أبدعها مشجعو RossoVerde' : language === 'fr' ? 'Découvrez les plus beaux tifos créés par les supporters RossoVerde' : 'See the beautiful tifos created by RossoVerde supporters'}
                  </p>
                </div>
                <Link to="/news">
                  <Button variant="outline" className={`w-full border-morocco-red/30 hover:bg-morocco-red/10 news-read-more-btn ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'اقرأ المزيد' : language === 'fr' ? 'Lire Plus' : 'Read More'}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift border-2 border-morocco-green/20" style={{ opacity: 0.8 }}>
              <CardContent className="p-6 space-y-4">
                <div className="h-48 bg-gradient-to-br from-morocco-green/20 to-morocco-red/20 rounded-xl flex items-center justify-center">
                  <Users className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-xl font-bold text-foreground${language === 'ar' ? ' font-samir' : ''}`}>
                    {language === 'ar' ? 'قافلة إلى كأس أمم أفريقيا' : language === 'fr' ? 'Caravane vers la CAN' : 'Caravan to AFCON'}
                  </h3>
                  <p className={`text-muted-foreground text-sm${language === 'ar' ? ' font-janna' : ''}`}>
                    {language === 'ar' ? 'انضم إلى القافلة الرسمية لمشجعي RossoVerde' : language === 'fr' ? 'Rejoignez la caravane officielle des supporters RossoVerde' : 'Join the official RossoVerde supporters caravan'}
                  </p>
                </div>
                <Link to="/news">
                  <Button variant="outline" className={`w-full border-morocco-green/30 hover:bg-morocco-green/10 news-read-more-btn${language === 'ar' ? ' font-arabic' : ''}`}>
                    {language === 'ar' ? 'اقرأ المزيد' : language === 'fr' ? 'Lire Plus' : 'Read More'}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift border-2 border-morocco-red/20" style={{ opacity: 0.8 }}>
              <CardContent className="p-6 space-y-4">
                <div className="h-48 bg-gradient-to-br from-morocco-red/20 to-morocco-green/20 rounded-xl flex items-center justify-center">
                  <Trophy className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className={`text-xl font-bold text-foreground${language === 'ar' ? ' font-samir' : ''}`}>
                    {language === 'ar' ? 'المغرب يتأهل للمونديال' : language === 'fr' ? 'Le Maroc se qualifie pour la Coupe du Monde' : 'Morocco Qualifies for World Cup'}
                  </h3>
                  <p className={`text-muted-foreground text-sm${language === 'ar' ? ' font-janna' : ''}`}>
                    {language === 'ar' ? 'احتفال تاريخي بتأهل أسود الأطلس' : language === 'fr' ? 'Célébration historique de la qualification des Lions de l\'Atlas' : 'Historic celebration of Atlas Lions qualification'}
                  </p>
                </div>
                <Link to="/news">
                  <Button variant="outline" className={`w-full border-morocco-red/30 hover:bg-morocco-red/10 news-read-more-btn${language === 'ar' ? ' font-arabic' : ''}`}>
                    {language === 'ar' ? 'اقرأ المزيد' : language === 'fr' ? 'Lire Plus' : 'Read More'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/news">
              <Button size="lg" variant="outline" className={`btn-morocco-outline hover-lift text-lg px-8 py-4 rounded-xl font-semibold ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'جميع الأخبار' : language === 'fr' ? 'Toutes les Actualités' : 'All News'}
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Photo & Video Gallery */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-morocco-red/5 to-morocco-green/5">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-4xl md:text-5xl font-black text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'معرض الصور والفيديو' : language === 'fr' ? 'Galerie Photos & Vidéos' : 'Photo & Video Gallery'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-morocco-red to-morocco-green mx-auto rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar' ? 
                'اكتشف أجمل اللحظات مع أسود الأطلس، التيفو الرائع، والرحلات التي لا تُنسى' :
                language === 'fr' ? 
                'Découvrez les plus beaux moments avec les Lions de l\'Atlas, les tifos spectaculaires et les voyages inoubliables' :
                'Discover the most beautiful moments with the Atlas Lions, spectacular tifos, and unforgettable trips'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Card key={item} className="glass-effect hover-lift border-2 border-morocco-red/20 group overflow-hidden" style={{ opacity: 0.8 }}>
                <div className="h-48 bg-gradient-to-br from-morocco-red/20 to-morocco-green/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button size="lg" className={`btn-morocco hover-lift text-lg px-8 py-4 rounded-xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'شاهد المعرض الكامل' : language === 'fr' ? 'Voir la Galerie Complète' : 'View Full Gallery'}
                <Camera className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Official Store */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${backsect6})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh',
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-4xl md:text-5xl font-black text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'المتجر الرسمي' : language === 'fr' ? 'Boutique Officielle' : 'Official Store'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-morocco-red to-morocco-green mx-auto rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar' ? 
                'احصل على الأوشحة والقمصان والقبعات الرسمية للمشجعين المخلصين' :
                language === 'fr' ? 
                'Obtenez les écharpes, t-shirts et casquettes officiels pour les supporters fidèles' :
                'Get official scarves, t-shirts, and caps for loyal supporters'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-effect hover-lift border-2 border-morocco-red/30" style={{ opacity: 0.8 }}>
              <CardContent className="p-6 space-y-4">
                <div className="h-48 bg-gradient-to-br from-morocco-red/20 to-morocco-green/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {language === 'ar' ? 'أوشحة RossoVerde' : language === 'fr' ? 'Écharpes RossoVerde' : 'RossoVerde Scarves'}
                  </h3>
                  <p className="text-2xl font-bold text-morocco-red">250 MAD</p>
                  <p className="text-muted-foreground text-sm">
                    {language === 'ar' ? 'أوشحة حصرية بتصميم مغربي أصيل' : language === 'fr' ? 'Écharpes exclusives avec design marocain authentique' : 'Exclusive scarves with authentic Moroccan design'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift border-2 border-morocco-green/30" style={{ opacity: 0.8 }}>
              <CardContent className="p-6 space-y-4">
                <div className="h-48 bg-gradient-to-br from-morocco-green/20 to-morocco-red/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {language === 'ar' ? 'قمصان المشجعين' : language === 'fr' ? 'T-shirts Supporters' : 'Supporters T-shirts'}
                  </h3>
                  <p className="text-2xl font-bold text-morocco-green">180 MAD</p>
                  <p className="text-muted-foreground text-sm">
                    {language === 'ar' ? 'قمصان عالية الجودة بشعار الجمعية' : language === 'fr' ? 'T-shirts de haute qualité avec logo de l\'association' : 'High-quality t-shirts with association logo'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift border-2 border-morocco-red/30" style={{ opacity: 0.8 }}>
              <CardContent className="p-6 space-y-4">
                <div className="h-48 bg-gradient-to-br from-morocco-red/20 to-morocco-green/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {language === 'ar' ? 'قبعات الأطلس' : language === 'fr' ? 'Casquettes Atlas' : 'Atlas Caps'}
                  </h3>
                  <p className="text-2xl font-bold text-morocco-red">120 MAD</p>
                  <p className="text-muted-foreground text-sm">
                    {language === 'ar' ? 'قبعات أنيقة بألوان العلم المغربي' : language === 'fr' ? 'Casquettes élégantes aux couleurs du drapeau marocain' : 'Elegant caps in Moroccan flag colors'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/store">
              <Button size="lg" className={`btn-morocco hover-lift text-lg px-8 py-4 rounded-xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'تسوق الآن' : language === 'fr' ? 'Magasiner Maintenant' : 'Shop Now'}
                <ShoppingBag className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Official Charter */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${boutique})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '60vh',
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <Card className="glass-effect border-2 border-morocco-red/30" style={{ opacity: 0.8 }}>
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <FileText className="h-12 w-12 text-morocco-red" />
                <CardTitle className={`text-3xl md:text-4xl font-black text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'الميثاق الرسمي' : language === 'fr' ? 'Charte Officielle' : 'Official Charter'}
                </CardTitle>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-morocco-red to-morocco-green mx-auto rounded-full" />
            </CardHeader>
            <CardContent className="space-y-8">
              <p className={`text-lg text-center text-muted-foreground leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 
                  'اطلع على الميثاق الرسمي لجمعية RossoVerde واللوائح الداخلية التي تحكم أنشطتنا وقيمنا' :
                  language === 'fr' ? 
                  'Consultez la charte officielle de l\'association RossoVerde et les règlements internes qui régissent nos activités et nos valeurs' :
                  'View the official charter of RossoVerde Association and the internal regulations that govern our activities and values'
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className={`text-xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'قيمنا الأساسية:' : language === 'fr' ? 'Nos Valeurs Fondamentales:' : 'Our Core Values:'}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-morocco-red rounded-full" />
                      <span className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? 'الاحترام والروح الرياضية' : language === 'fr' ? 'Respect et Fair-play' : 'Respect and Fair Play'}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-morocco-green rounded-full" />
                      <span className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? 'الوحدة والتضامن' : language === 'fr' ? 'Unité et Solidarité' : 'Unity and Solidarity'}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-morocco-red rounded-full" />
                      <span className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                        {language === 'ar' ? 'الشغف والإبداع' : language === 'fr' ? 'Passion et Créativité' : 'Passion and Creativity'}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className={`text-xl font-bold text-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'الوثائق المتاحة:' : language === 'fr' ? 'Documents Disponibles:' : 'Available Documents:'}
                  </h3>
                  <div className="space-y-3 flex flex-col items-center justify-center">
                    <Button variant="outline" className={`w-full max-w-xs justify-center border-morocco-red/30 hover:bg-morocco-red/10 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      <Download className="mr-3 h-4 w-4" />
                      {language === 'ar' ? 'تحميل الميثاق الرسمي' : language === 'fr' ? 'Télécharger la Charte Officielle' : 'Download Official Charter'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-morocco-red/30 via-background to-morocco-green/30" />
        <div className="absolute inset-0 moroccan-pattern opacity-20" />
        
        <div className="container mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-16 h-1 bg-morocco-red rounded-full" />
              <Crown className="h-16 w-16 text-morocco-red animate-pulse" />
              <div className="w-16 h-1 bg-morocco-green rounded-full" />
            </div>
            <h2 className={`text-5xl md:text-7xl font-black text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'عيش الشغف، كن الفخر' : language === 'fr' ? 'Vivez la Passion, Soyez la Fierté' : 'Live the Passion, Be the Pride'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-morocco-red to-morocco-green mx-auto rounded-full" />
            <p className={`text-2xl text-foreground/90 max-w-4xl mx-auto leading-relaxed font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 
                'انضم إلى عائلة RossoVerde واجعل صوتك يدوي في كل ملعب. معاً نحن أقوى، معاً نحن أسود الأطلس.' :
                language === 'fr' ? 
                'Rejoignez la famille RossoVerde et faites entendre votre voix dans chaque stade. Ensemble nous sommes plus forts, ensemble nous sommes les Lions de l\'Atlas.' :
                'Join the RossoVerde family and make your voice heard in every stadium. Together we are stronger, together we are the Atlas Lions.'
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/membership">
                          <Button size="lg" className={`btn-morocco hover-lift text-2xl px-16 py-8 rounded-xl font-bold shadow-2xl ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'ابدأ رحلتك' : language === 'fr' ? 'Commencer Votre Voyage' : 'Start Your Journey'}
              <Crown className="ml-4 h-8 w-8" />
            </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className={`hover-lift text-2xl px-16 py-8 rounded-xl font-bold border-2 border-morocco-green/50 text-foreground hover:bg-morocco-green/10 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'تعرف علينا' : language === 'fr' ? 'Découvrez-nous' : 'Discover Us'}
                <Heart className="ml-4 h-8 w-8" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;