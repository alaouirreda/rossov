import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const News: React.FC = () => {
  const { language } = useLanguage();

  // Mock news data
  const newsArticles = [
    {
      id: 1,
      title: language === 'ar' ? 'إعلان رسمي: تحديد موعد الجمعية العمومية السنوية' : language === 'fr' ? 'Annonce officielle : Date de l\'Assemblée Générale Annuelle fixée' : 'Official Announcement: Annual General Assembly Date Set',
      excerpt: language === 'ar' ? 'تعلن جمعية RossoVerde عن موعد الجمعية العمومية السنوية التي ستعقد في شهر مارس القادم بحضور جميع الأعضاء.' : language === 'fr' ? 'L\'association RossoVerde annonce la date de l\'Assemblée Générale Annuelle qui se tiendra en mars prochain avec la présence de tous les membres.' : 'The RossoVerde association announces the date of the Annual General Assembly to be held next March with the attendance of all members.',
      date: '2024-01-15',
      readTime: 3,
      category: language === 'ar' ? 'إعلانات رسمية' : language === 'fr' ? 'Annonces officielles' : 'Official Announcements',
      image: '/placeholder.svg',
      featured: true
    },
    {
      id: 2,
      title: language === 'ar' ? 'شراكة جديدة مع الاتحاد المغربي لكرة القدم' : language === 'fr' ? 'Nouveau partenariat avec la Fédération Royale Marocaine de Football' : 'New Partnership with Royal Moroccan Football Federation',
      excerpt: language === 'ar' ? 'نفخر بالإعلان عن شراكة استراتيجية جديدة مع الاتحاد المغربي لكرة القدم لتعزيز دعم المنتخب الوطني.' : language === 'fr' ? 'Nous sommes fiers d\'annoncer un nouveau partenariat stratégique avec la Fédération Royale Marocaine de Football pour renforcer le soutien à l\'équipe nationale.' : 'We are proud to announce a new strategic partnership with the Royal Moroccan Football Federation to strengthen support for the national team.',
      date: '2024-01-10',
      readTime: 5,
      category: language === 'ar' ? 'شراكات' : language === 'fr' ? 'Partenariats' : 'Partnerships',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 3,
      title: language === 'ar' ? 'تحديث: إطلاق مجموعة المنتجات الجديدة' : language === 'fr' ? 'Mise à jour : Lancement de la nouvelle collection de produits' : 'Update: New Product Collection Launch',
      excerpt: language === 'ar' ? 'تتوفر الآن مجموعة جديدة من المنتجات الحصرية في متجرنا الرسمي، بما في ذلك قمصان وإكسسوارات بتصاميم مبتكرة.' : language === 'fr' ? 'Une nouvelle collection de produits exclusifs est maintenant disponible dans notre boutique officielle, incluant des maillots et accessoires avec des designs innovants.' : 'A new collection of exclusive products is now available in our official store, including jerseys and accessories with innovative designs.',
      date: '2024-01-08',
      readTime: 2,
      category: language === 'ar' ? 'منتجات' : language === 'fr' ? 'Produits' : 'Products',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 4,
      title: language === 'ar' ? 'تقرير: نشاط جمعية RossoVerde في عام 2023' : language === 'fr' ? 'Rapport : Activités de l\'association RossoVerde en 2023' : 'Report: RossoVerde Association Activities in 2023',
      excerpt: language === 'ar' ? 'نقدم لكم تقريراً شاملاً عن إنجازات وأنشطة جمعية RossoVerde خلال عام 2023، بما في ذلك الفعاليات والمبادرات المجتمعية.' : language === 'fr' ? 'Nous vous présentons un rapport complet sur les réalisations et activités de l\'association RossoVerde durant l\'année 2023, incluant les événements et initiatives communautaires.' : 'We present you with a comprehensive report on the achievements and activities of the RossoVerde association during 2023, including events and community initiatives.',
      date: '2024-01-05',
      readTime: 8,
      category: language === 'ar' ? 'تقارير' : language === 'fr' ? 'Rapports' : 'Reports',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 5,
      title: language === 'ar' ? 'دعوة للمشاركة في الحملة التضامنية الجديدة' : language === 'fr' ? 'Invitation à participer à la nouvelle campagne de solidarité' : 'Invitation to Participate in New Solidarity Campaign',
      excerpt: language === 'ar' ? 'ندعو جميع أعضاء RossoVerde للمشاركة في حملتنا التضامنية الجديدة لدعم الأطفال المحتاجين في المناطق النائية.' : language === 'fr' ? 'Nous invitons tous les membres de RossoVerde à participer à notre nouvelle campagne de solidarité pour soutenir les enfants dans le besoin dans les régions reculées.' : 'We invite all RossoVerde members to participate in our new solidarity campaign to support children in need in remote areas.',
      date: '2024-01-03',
      readTime: 4,
      category: language === 'ar' ? 'مبادرات اجتماعية' : language === 'fr' ? 'Initiatives sociales' : 'Social Initiatives',
      image: '/placeholder.svg',
      featured: false
    },
    {
      id: 6,
      title: language === 'ar' ? 'تحديثات العضوية: امتيازات جديدة للأعضاء' : language === 'fr' ? 'Mises à jour d\'adhésion : Nouveaux privilèges pour les membres' : 'Membership Updates: New Privileges for Members',
      excerpt: language === 'ar' ? 'نعلن عن امتيازات وخدمات جديدة لأعضاء جمعية RossoVerde، بما في ذلك خصومات إضافية ووصول مبكر للفعاليات.' : language === 'fr' ? 'Nous annonçons de nouveaux privilèges et services pour les membres de l\'association RossoVerde, incluant des réductions supplémentaires et un accès anticipé aux événements.' : 'We announce new privileges and services for RossoVerde association members, including additional discounts and early access to events.',
      date: '2024-01-01',
      readTime: 3,
      category: language === 'ar' ? 'عضوية' : language === 'fr' ? 'Adhésion' : 'Membership',
      image: '/placeholder.svg',
      featured: false
    }
  ];

  const categories = [
    language === 'ar' ? 'الكل' : language === 'fr' ? 'Tout' : 'All',
    language === 'ar' ? 'إعلانات رسمية' : language === 'fr' ? 'Annonces officielles' : 'Official Announcements',
    language === 'ar' ? 'شراكات' : language === 'fr' ? 'Partenariats' : 'Partnerships',
    language === 'ar' ? 'منتجات' : language === 'fr' ? 'Produits' : 'Products',
    language === 'ar' ? 'تقارير' : language === 'fr' ? 'Rapports' : 'Reports',
    language === 'ar' ? 'مبادرات اجتماعية' : language === 'fr' ? 'Initiatives sociales' : 'Social Initiatives',
    language === 'ar' ? 'عضوية' : language === 'fr' ? 'Adhésion' : 'Membership'
  ];

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className={`text-4xl md:text-6xl font-bold gradient-text ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'الأخبار والإعلانات' : language === 'fr' ? 'Actualités et Annonces' : 'News & Announcements'}
          </h1>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'ابق على اطلاع دائم بآخر أخبار وإعلانات جمعية RossoVerde. من الشراكات الجديدة إلى الفعاليات القادمة والمبادرات المجتمعية.' :
              language === 'fr' ? 
              'Restez toujours informé des dernières nouvelles et annonces de l\'association RossoVerde. Des nouveaux partenariats aux événements à venir et initiatives communautaires.' :
              'Stay always informed with the latest news and announcements from the RossoVerde association. From new partnerships to upcoming events and community initiatives.'
            }
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={`cursor-pointer hover-lift ${index === 0 ? 'bg-primary text-primary-foreground' : ''} ${language === 'ar' ? 'font-arabic' : ''}`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <Card className="glass-effect hover-lift overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary-red text-white">
                    {language === 'ar' ? 'مميز' : language === 'fr' ? 'En vedette' : 'Featured'}
                  </Badge>
                </div>
                
                <CardContent className="p-8 flex flex-col justify-center space-y-4">
                  <Badge variant="outline" className="w-fit">
                    {featuredArticle.category}
                  </Badge>
                  
                  <h2 className={`text-3xl font-bold line-clamp-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {featuredArticle.title}
                  </h2>
                  
                  <p className={`text-muted-foreground line-clamp-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(featuredArticle.date).toLocaleDateString(
                          language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {featuredArticle.readTime} {language === 'ar' ? 'دقائق' : language === 'fr' ? 'min' : 'min'}
                      </span>
                    </div>
                  </div>
                  
                  <Link to={`/news/${featuredArticle.id}`}>
                    <div className="flex items-center space-x-2 text-primary hover:text-primary-red transition-colors cursor-pointer">
                      <span className={language === 'ar' ? 'font-arabic' : ''}>
                        {language === 'ar' ? 'اقرأ المزيد' : language === 'fr' ? 'Lire la suite' : 'Read More'}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article) => (
            <Card key={article.id} className="glass-effect hover-lift overflow-hidden group">
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-6 space-y-4">
                <Badge variant="outline" className="w-fit">
                  {article.category}
                </Badge>
                
                <h3 className={`text-xl font-semibold line-clamp-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {article.title}
                </h3>
                
                <p className={`text-muted-foreground line-clamp-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(article.date).toLocaleDateString(
                        language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US',
                        { month: 'short', day: 'numeric' }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {article.readTime} {language === 'ar' ? 'دق' : language === 'fr' ? 'min' : 'min'}
                    </span>
                  </div>
                </div>
                
                <Link to={`/news/${article.id}`}>
                  <div className="flex items-center space-x-2 text-primary hover:text-primary-red transition-colors cursor-pointer">
                    <span className={language === 'ar' ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'اقرأ المزيد' : language === 'fr' ? 'Lire la suite' : 'Read More'}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="cursor-pointer hover-lift px-4 py-2">
              {language === 'ar' ? 'السابق' : language === 'fr' ? 'Précédent' : 'Previous'}
            </Badge>
            <Badge className="bg-primary text-primary-foreground px-4 py-2">1</Badge>
            <Badge variant="outline" className="cursor-pointer hover-lift px-4 py-2">2</Badge>
            <Badge variant="outline" className="cursor-pointer hover-lift px-4 py-2">3</Badge>
            <Badge variant="outline" className="cursor-pointer hover-lift px-4 py-2">
              {language === 'ar' ? 'التالي' : language === 'fr' ? 'Suivant' : 'Next'}
            </Badge>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary-red/10 to-primary-green/10 rounded-lg p-12">
          <h2 className={`text-3xl font-bold mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'لا تفوت أي خبر' : language === 'fr' ? 'Ne manquez aucune actualité' : 'Don\'t Miss Any News'}
          </h2>
          <p className={`text-muted-foreground mb-6 max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والإعلانات مباشرة في بريدك الإلكتروني.' :
              language === 'fr' ? 
              'Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles et annonces directement dans votre boîte e-mail.' :
              'Subscribe to our newsletter to receive the latest news and announcements directly in your email inbox.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={language === 'ar' ? 'بريدك الإلكتروني' : language === 'fr' ? 'Votre email' : 'Your email'}
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="btn-morocco px-6 py-2 rounded-lg hover-lift">
              {language === 'ar' ? 'اشترك' : language === 'fr' ? 'S\'abonner' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;