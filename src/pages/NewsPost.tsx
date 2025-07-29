import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const NewsPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();

  // Mock article data (would be fetched based on id)
  const article = {
    id: 1,
    title: language === 'ar' ? 'إعلان رسمي: تحديد موعد الجمعية العمومية السنوية' : language === 'fr' ? 'Annonce officielle : Date de l\'Assemblée Générale Annuelle fixée' : 'Official Announcement: Annual General Assembly Date Set',
    content: language === 'ar' ? `
      <p>نتشرف في جمعية RossoVerde بإعلان موعد الجمعية العمومية السنوية التي ستعقد في <strong>15 مارس 2024</strong> في قاعة المؤتمرات الكبرى بالرباط.</p>
      
      <h2>جدول أعمال الجمعية العمومية</h2>
      <p>ستشمل الجمعية العمومية النقاط التالية:</p>
      <ul>
        <li>تقديم التقرير السنوي لأنشطة الجمعية</li>
        <li>مناقشة الميزانية المالية وخطة العام القادم</li>
        <li>انتخاب أعضاء المكتب التنفيذي الجدد</li>
        <li>مناقشة المشاريع والمبادرات الجديدة</li>
        <li>جلسة أسئلة وأجوبة مع الأعضاء</li>
      </ul>
      
      <h2>شروط الحضور</h2>
      <p>للمشاركة في الجمعية العمومية، يجب أن تكون:</p>
      <ul>
        <li>عضواً مسجلاً في جمعية RossoVerde</li>
        <li>منتظماً في دفع رسوم العضوية</li>
        <li>مسجلاً مسبقاً للحضور عبر الموقع الإلكتروني</li>
      </ul>
      
      <p>ندعو جميع الأعضاء للمشاركة الفعّالة في هذا الحدث المهم لمستقبل جمعيتنا ودعم المنتخب المغربي.</p>
    ` : language === 'fr' ? `
      <p>Nous avons l'honneur d'annoncer dans l'association RossoVerde la date de l'Assemblée Générale Annuelle qui se tiendra le <strong>15 mars 2024</strong> dans la Grande Salle de Conférences à Rabat.</p>
      
      <h2>Ordre du jour de l'Assemblée Générale</h2>
      <p>L'Assemblée Générale comprendra les points suivants :</p>
      <ul>
        <li>Présentation du rapport annuel des activités de l'association</li>
        <li>Discussion du budget financier et du plan de l'année prochaine</li>
        <li>Élection des nouveaux membres du bureau exécutif</li>
        <li>Discussion des nouveaux projets et initiatives</li>
        <li>Session de questions-réponses avec les membres</li>
      </ul>
      
      <h2>Conditions de participation</h2>
      <p>Pour participer à l'Assemblée Générale, vous devez être :</p>
      <ul>
        <li>Membre enregistré de l'association RossoVerde</li>
        <li>À jour dans le paiement des cotisations</li>
        <li>Préalablement inscrit pour la participation via le site web</li>
      </ul>
      
      <p>Nous invitons tous les membres à participer activement à cet événement important pour l'avenir de notre association et le soutien à l'équipe nationale marocaine.</p>
    ` : `
      <p>We are honored to announce in the RossoVerde association the date of the Annual General Assembly to be held on <strong>March 15, 2024</strong> in the Grand Conference Hall in Rabat.</p>
      
      <h2>General Assembly Agenda</h2>
      <p>The General Assembly will include the following points:</p>
      <ul>
        <li>Presentation of the annual report of association activities</li>
        <li>Discussion of the financial budget and next year's plan</li>
        <li>Election of new executive board members</li>
        <li>Discussion of new projects and initiatives</li>
        <li>Q&A session with members</li>
      </ul>
      
      <h2>Attendance Requirements</h2>
      <p>To participate in the General Assembly, you must be:</p>
      <ul>
        <li>A registered member of the RossoVerde association</li>
        <li>Current on membership fee payments</li>
        <li>Pre-registered for attendance via the website</li>
      </ul>
      
      <p>We invite all members to actively participate in this important event for the future of our association and support for the Moroccan national team.</p>
    `,
    date: '2024-01-15',
    readTime: 3,
    category: language === 'ar' ? 'إعلانات رسمية' : language === 'fr' ? 'Annonces officielles' : 'Official Announcements',
    image: '/placeholder.svg',
    author: language === 'ar' ? 'إدارة RossoVerde' : language === 'fr' ? 'Administration RossoVerde' : 'RossoVerde Administration'
  };

  // Related articles
  const relatedArticles = [
    {
      id: 2,
      title: language === 'ar' ? 'شراكة جديدة مع الاتحاد المغربي' : language === 'fr' ? 'Nouveau partenariat avec la FRMF' : 'New Partnership with FRMF',
      date: '2024-01-10',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: language === 'ar' ? 'إطلاق مجموعة المنتجات الجديدة' : language === 'fr' ? 'Lancement nouvelle collection' : 'New Collection Launch',
      date: '2024-01-08',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link to="/news" className="inline-flex items-center space-x-2 text-primary hover:text-primary-red transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span className={language === 'ar' ? 'font-arabic' : ''}>
            {language === 'ar' ? 'العودة للأخبار' : language === 'fr' ? 'Retour aux actualités' : 'Back to News'}
          </span>
        </Link>

        <article>
          {/* Hero Image */}
          <div className="relative mb-8 rounded-lg overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge className="absolute top-4 left-4 bg-primary-red text-white">
              {article.category}
            </Badge>
          </div>

          {/* Article Header */}
          <header className="mb-8 space-y-4">
            <h1 className={`text-3xl md:text-5xl font-bold leading-tight ${language === 'ar' ? 'font-arabic' : ''}`}>
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(article.date).toLocaleDateString(
                    language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>
                  {article.readTime} {language === 'ar' ? 'دقائق قراءة' : language === 'fr' ? 'min de lecture' : 'min read'}
                </span>
              </div>
              
              <div className={language === 'ar' ? 'font-arabic' : ''}>
                {language === 'ar' ? 'بواسطة' : language === 'fr' ? 'Par' : 'By'} {article.author}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4">
              <Button variant="outline" size="sm" className="hover-lift">
                <Share2 className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'شارك' : language === 'fr' ? 'Partager' : 'Share'}
              </Button>
              <Button variant="outline" size="sm" className="hover-lift">
                <Bookmark className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'احفظ' : language === 'fr' ? 'Sauvegarder' : 'Save'}
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <Card className="glass-effect mb-12">
            <CardContent className="p-8">
              <div 
                className={`prose prose-lg max-w-none ${language === 'ar' ? 'font-arabic text-right' : ''} prose-headings:gradient-text prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground`}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>

          {/* Related Articles */}
          <section>
            <h2 className={`text-2xl font-bold mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'مقالات ذات صلة' : language === 'fr' ? 'Articles connexes' : 'Related Articles'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle.id} to={`/news/${relatedArticle.id}`}>
                  <Card className="glass-effect hover-lift group overflow-hidden">
                    <div className="flex">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-24 h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <CardContent className="p-4 flex-1">
                        <h3 className={`font-semibold line-clamp-2 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {relatedArticle.title}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          {new Date(relatedArticle.date).toLocaleDateString(
                            language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US',
                            { month: 'short', day: 'numeric', year: 'numeric' }
                          )}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Newsletter CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary-red/10 to-primary-green/10 rounded-lg p-8">
            <h3 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'ابق على اطلاع' : language === 'fr' ? 'Restez informé' : 'Stay Informed'}
            </h3>
            <p className={`text-muted-foreground mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 
                'اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والإعلانات.' :
                language === 'fr' ? 
                'Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles et annonces.' :
                'Subscribe to our newsletter to receive the latest news and announcements.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : language === 'fr' ? 'Votre email' : 'Your email'}
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="btn-morocco">
                {language === 'ar' ? 'اشترك' : language === 'fr' ? 'S\'abonner' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsPost;