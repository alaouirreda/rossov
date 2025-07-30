import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Image as ImageIcon, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Gallery: React.FC = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: language === 'ar' ? 'الكل' : language === 'fr' ? 'Tout' : 'All' },
    { id: 'world-cup', name: language === 'ar' ? 'مونديال قطر 2022' : language === 'fr' ? 'Coupe du Monde Qatar 2022' : 'World Cup Qatar 2022' },
    { id: 'afcon', name: language === 'ar' ? 'كأس أفريقيا 2023' : language === 'fr' ? 'CAN 2023' : 'AFCON 2023' },
    { id: 'olympics', name: language === 'ar' ? 'الألعاب الأولمبية 2024' : language === 'fr' ? 'JO 2024' : 'Olympics 2024' },
    { id: 'futsal-afcon', name: language === 'ar' ? 'كأس أفريقيا للصالات 2023' : language === 'fr' ? 'CAN Futsal 2023' : 'Futsal AFCON 2023' },
    { id: 'futsal-world', name: language === 'ar' ? 'مونديال الصالات أوزبكستان' : language === 'fr' ? 'Coupe du Monde Futsal Ouzbékistan' : 'Futsal World Cup Uzbekistan' },
    { id: 'community', name: language === 'ar' ? 'المجتمع' : language === 'fr' ? 'Communauté' : 'Community' }
  ];

  // Mock gallery data
  const galleryItems = [
    {
      id: 1,
      type: 'image',
      title: language === 'ar' ? 'احتفال الهدف التاريخي' : language === 'fr' ? 'Célébration du but historique' : 'Historic Goal Celebration',
      thumbnail: '/placeholder.svg',
      category: 'world-cup',
      date: '2022-12-14',
      description: language === 'ar' ? 'لحظة هدف المغرب في نصف النهائي' : language === 'fr' ? 'Moment du but du Maroc en demi-finale' : 'Morocco\'s goal moment in the semi-final'
    },
    {
      id: 2,
      type: 'video',
      title: language === 'ar' ? 'ملخص مباراة نصف النهائي' : language === 'fr' ? 'Résumé de la demi-finale' : 'Semi-Final Match Highlights',
      thumbnail: '/placeholder.svg',
      category: 'world-cup',
      date: '2022-12-14',
      description: language === 'ar' ? 'أهم لحظات المباراة التاريخية' : language === 'fr' ? 'Les meilleurs moments du match historique' : 'Best moments from the historic match',
      duration: '10:24'
    },
    {
      id: 3,
      type: 'image',
      title: language === 'ar' ? 'جماهير RossoVerde في الدوحة' : language === 'fr' ? 'Supporters RossoVerde à Doha' : 'RossoVerde Fans in Doha',
      thumbnail: '/placeholder.svg',
      category: 'world-cup',
      date: '2022-12-10',
      description: language === 'ar' ? 'الآلاف من المشجعين يدعمون المنتخب' : language === 'fr' ? 'Des milliers de supporters soutiennent l\'équipe' : 'Thousands of fans supporting the team'
    },
    {
      id: 4,
      type: 'video',
      title: language === 'ar' ? 'أجواء كأس أفريقيا 2023' : language === 'fr' ? 'Ambiance CAN 2023' : 'AFCON 2023 Atmosphere',
      thumbnail: '/placeholder.svg',
      category: 'afcon',
      date: '2023-02-15',
      description: language === 'ar' ? 'أجواء استثنائية في ساحل العاج' : language === 'fr' ? 'Atmosphère exceptionnelle en Côte d\'Ivoire' : 'Exceptional atmosphere in Ivory Coast',
      duration: '8:45'
    },
    {
      id: 5,
      type: 'image',
      title: language === 'ar' ? 'فعالية مجتمعية في الرباط' : language === 'fr' ? 'Événement communautaire à Rabat' : 'Community Event in Rabat',
      thumbnail: '/placeholder.svg',
      category: 'community',
      date: '2023-06-20',
      description: language === 'ar' ? 'لقاء أعضاء RossoVerde في المغرب' : language === 'fr' ? 'Rencontre des membres RossoVerde au Maroc' : 'RossoVerde members meetup in Morocco'
    },
    {
      id: 6,
      type: 'image',
      title: language === 'ar' ? 'البعثة الأولمبية 2024' : language === 'fr' ? 'Délégation Olympique 2024' : 'Olympic Delegation 2024',
      thumbnail: '/placeholder.svg',
      category: 'olympics',
      date: '2024-07-25',
      description: language === 'ar' ? 'انطلاق المنتخب المغربي لباريس' : language === 'fr' ? 'Départ de l\'équipe marocaine pour Paris' : 'Moroccan team departure to Paris'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handleItemClick = (item: any) => {
    console.log('Opening gallery item:', item);
    // Gallery modal will be implemented later
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className={`text-4xl md:text-6xl font-bold text-morocco-green ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'معرض الذكريات' : language === 'fr' ? 'Galerie des Souvenirs' : 'Gallery of Memories'}
          </h1>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'اكتشف أجمل اللحظات والذكريات مع المنتخب المغربي. من الانتصارات التاريخية إلى اللحظات المؤثرة مع المشجعين.' :
              language === 'fr' ? 
              'Découvrez les plus beaux moments et souvenirs avec l\'équipe nationale marocaine. Des victoires historiques aux moments émouvants avec les supporters.' :
              'Discover the most beautiful moments and memories with the Moroccan national team. From historic victories to touching moments with the fans.'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`${activeCategory === category.id ? "btn-morocco" : "hover-lift"} ${language === 'ar' ? 'font-arabic' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="glass-effect hover-lift group overflow-hidden cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Type Badge */}
                <Badge className={`absolute top-3 left-3 ${item.type === 'video' ? 'bg-primary-red' : 'bg-primary-green'} text-white`}>
                  {item.type === 'video' ? (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'فيديو' : language === 'fr' ? 'Vidéo' : 'Video'}
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-3 w-3 mr-1" />
                      {language === 'ar' ? 'صورة' : language === 'fr' ? 'Image' : 'Image'}
                    </>
                  )}
                </Badge>

                {/* Video Duration */}
                {item.type === 'video' && item.duration && (
                  <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">
                    {item.duration}
                  </Badge>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Play className="h-12 w-12 text-white" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-white" />
                  )}
                </div>
              </div>

              <CardContent className="p-6 space-y-3">
                <div className="space-y-2">
                  <h3 className={`font-semibold text-lg line-clamp-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {item.title}
                  </h3>
                  <p className={`text-muted-foreground text-sm line-clamp-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(item.date).toLocaleDateString(
                    language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { 
              number: '500+', 
              label: language === 'ar' ? 'صور' : language === 'fr' ? 'Photos' : 'Photos' 
            },
            { 
              number: '150+', 
              label: language === 'ar' ? 'فيديو' : language === 'fr' ? 'Vidéos' : 'Videos' 
            },
            { 
              number: '25+', 
              label: language === 'ar' ? 'بطولة' : language === 'fr' ? 'Tournois' : 'Tournaments' 
            },
            { 
              number: '6', 
              label: language === 'ar' ? 'سنوات' : language === 'fr' ? 'Années' : 'Years' 
            }
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stat.number}
              </div>
              <div className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary-red/10 to-primary-green/10 rounded-lg p-12">
                      <h2 className={`text-3xl font-bold mb-4 text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'شارك ذكرياتك معنا' : language === 'fr' ? 'Partagez vos souvenirs avec nous' : 'Share Your Memories With Us'}
          </h2>
          <p className={`text-muted-foreground mb-6 max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'هل لديك صور أو فيديوهات مميزة مع المنتخب المغربي؟ شاركها معنا لتصبح جزءاً من معرض ذكرياتنا.' :
              language === 'fr' ? 
              'Avez-vous des photos ou vidéos spéciales avec l\'équipe nationale marocaine ? Partagez-les avec nous pour qu\'elles fassent partie de notre galerie de souvenirs.' :
              'Do you have special photos or videos with the Moroccan national team? Share them with us to become part of our gallery of memories.'
            }
          </p>
          <Button className={`btn-morocco hover-lift ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'شارك المحتوى' : language === 'fr' ? 'Partager du contenu' : 'Share Content'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;