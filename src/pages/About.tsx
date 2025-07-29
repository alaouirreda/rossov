import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Globe, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { language } = useLanguage();

  const values = [
    {
      icon: Target,
      title: language === 'ar' ? 'رؤيتنا' : language === 'fr' ? 'Notre Vision' : 'Our Vision',
      description: language === 'ar' ? 
        'أن نكون الصوت الأول والأقوى لمشجعي المنتخب المغربي حول العالم، وأن نساهم في خلق جو من الشغف والفخر الوطني.' :
        language === 'fr' ? 
        'Être la première et plus forte voix des supporters de l\'équipe nationale marocaine dans le monde, et contribuer à créer une atmosphère de passion et de fierté nationale.' :
        'To be the first and strongest voice of Moroccan national team supporters worldwide, and contribute to creating an atmosphere of passion and national pride.'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'مهمتنا' : language === 'fr' ? 'Notre Mission' : 'Our Mission',
      description: language === 'ar' ? 
        'نسعى لتوحيد جميع مشجعي المنتخب المغربي تحت راية واحدة، وتقديم تجربة استثنائية للأعضاء من خلال الفعاليات والأنشطة المميزة.' :
        language === 'fr' ? 
        'Nous cherchons à unir tous les supporters de l\'équipe nationale marocaine sous un même drapeau, et à offrir une expérience exceptionnelle aux membres à travers des événements et des activités distinctives.' :
        'We strive to unite all Moroccan national team supporters under one flag, and provide an exceptional experience for members through distinctive events and activities.'
    },
    {
      icon: Globe,
      title: language === 'ar' ? 'انتشارنا' : language === 'fr' ? 'Notre Portée' : 'Our Reach',
      description: language === 'ar' ? 
        'نحن جمعية عالمية تضم أعضاء من جميع القارات، نجمعهم حب واحد للمنتخب المغربي والرغبة في دعمه في كل المحافل.' :
        language === 'fr' ? 
        'Nous sommes une association mondiale qui réunit des membres de tous les continents, unis par un même amour pour l\'équipe nationale marocaine et le désir de la soutenir dans toutes les compétitions.' :
        'We are a global association that brings together members from all continents, united by the same love for the Moroccan national team and the desire to support it in all competitions.'
    },
    {
      icon: Award,
      title: language === 'ar' ? 'إنجازاتنا' : language === 'fr' ? 'Nos Réalisations' : 'Our Achievements',
      description: language === 'ar' ? 
        'منذ تأسيسنا، نفخر بتنظيم العديد من الفعاليات الناجحة ودعم المنتخب في مونديال قطر 2022 وكأس أفريقيا 2023.' :
        language === 'fr' ? 
        'Depuis notre fondation, nous sommes fiers d\'avoir organisé de nombreux événements réussis et soutenu l\'équipe lors de la Coupe du Monde Qatar 2022 et de la CAN 2023.' :
        'Since our founding, we are proud to have organized many successful events and supported the team during the Qatar 2022 World Cup and AFCON 2023.'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className={`text-4xl md:text-6xl font-bold gradient-text ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'من نحن' : language === 'fr' ? 'Qui Sommes-Nous' : 'About Us'}
          </h1>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'RossoVerde هي جمعية مشجعي المنتخب المغربي الرسمية، تأسست بهدف توحيد قلوب وأصوات عشاق الكرة المغربية حول العالم. نحن نؤمن بأن كرة القدم أكثر من مجرد لعبة - إنها هوية ووطن وانتماء.' :
              language === 'fr' ? 
              'RossoVerde est l\'association officielle des supporters de l\'équipe nationale marocaine, fondée dans le but d\'unir les cœurs et les voix des amoureux du football marocain à travers le monde. Nous croyons que le football est plus qu\'un simple jeu - c\'est une identité, une patrie et une appartenance.' :
              'RossoVerde is the official supporters association of the Moroccan national team, founded with the goal of uniting the hearts and voices of Moroccan football lovers around the world. We believe that football is more than just a game - it\'s identity, homeland, and belonging.'
            }
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <Card className="glass-effect">
            <CardContent className="p-8 md:p-12">
              <h2 className={`text-3xl font-bold mb-6 text-center ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'قصتنا' : language === 'fr' ? 'Notre Histoire' : 'Our Story'}
              </h2>
              <div className={`prose prose-lg max-w-none text-muted-foreground ${language === 'ar' ? 'font-arabic text-right' : ''}`}>
                <p className="mb-6">
                  {language === 'ar' ? 
                    'تأسست جمعية RossoVerde في عام 2018 من قبل مجموعة من المشجعين المتحمسين الذين آمنوا بضرورة وجود منصة موحدة لجميع عشاق المنتخب المغربي. بدأت الفكرة بسيطة: كيف يمكننا أن نجعل صوت المشجعين المغاربة أقوى وأكثر تأثيراً؟' :
                    language === 'fr' ? 
                    'L\'association RossoVerde a été fondée en 2018 par un groupe de supporters passionnés qui croyaient en la nécessité d\'avoir une plateforme unifiée pour tous les amoureux de l\'équipe nationale marocaine. L\'idée a commencé simplement : comment pouvons-nous rendre la voix des supporters marocains plus forte et plus influente ?' :
                    'The RossoVerde association was founded in 2018 by a group of passionate supporters who believed in the necessity of having a unified platform for all lovers of the Moroccan national team. The idea started simply: how can we make the voice of Moroccan supporters stronger and more influential?'
                  }
                </p>
                <p className="mb-6">
                  {language === 'ar' ? 
                    'منذ ذلك الحين، نمت الجمعية لتصبح واحدة من أقوى جمعيات المشجعين في شمال أفريقيا، بأعضاء من أكثر من 50 دولة حول العالم. شهدنا لحظات تاريخية مع المنتخب، من الوصول إلى نصف نهائي مونديال قطر 2022 إلى الفوز بالمركز الثالث في كأس أفريقيا.' :
                    language === 'fr' ? 
                    'Depuis lors, l\'association a grandi pour devenir l\'une des associations de supporters les plus fortes d\'Afrique du Nord, avec des membres de plus de 50 pays à travers le monde. Nous avons vécu des moments historiques avec l\'équipe, de l\'atteinte des demi-finales de la Coupe du Monde Qatar 2022 à la victoire de la troisième place en Coupe d\'Afrique.' :
                    'Since then, the association has grown to become one of the strongest supporter associations in North Africa, with members from over 50 countries around the world. We have witnessed historic moments with the team, from reaching the semi-finals of the Qatar 2022 World Cup to winning third place in the Africa Cup of Nations.'
                  }
                </p>
                <p>
                  {language === 'ar' ? 
                    'اليوم، نحن فخورون بكوننا الصوت الرسمي لمشجعي المنتخب المغربي، ونواصل العمل لخلق تجارب لا تُنسى لأعضائنا ودعم منتخبنا الحبيب في كل المحافل الدولية.' :
                    language === 'fr' ? 
                    'Aujourd\'hui, nous sommes fiers d\'être la voix officielle des supporters de l\'équipe nationale marocaine, et nous continuons à travailler pour créer des expériences inoubliables pour nos membres et soutenir notre équipe bien-aimée dans toutes les compétitions internationales.' :
                    'Today, we are proud to be the official voice of Moroccan national team supporters, and we continue to work to create unforgettable experiences for our members and support our beloved team in all international competitions.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="space-y-8">
          <h2 className={`text-3xl font-bold text-center ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'قيمنا ومبادئنا' : language === 'fr' ? 'Nos Valeurs et Principes' : 'Our Values and Principles'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="glass-effect hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-red to-primary-green rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className={`text-xl font-semibold ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {value.title}
                        </h3>
                        <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '10K+', label: language === 'ar' ? 'عضو' : language === 'fr' ? 'Membres' : 'Members' },
            { number: '50+', label: language === 'ar' ? 'دولة' : language === 'fr' ? 'Pays' : 'Countries' },
            { number: '100+', label: language === 'ar' ? 'فعالية' : language === 'fr' ? 'Événements' : 'Events' },
            { number: '6', label: language === 'ar' ? 'سنوات' : language === 'fr' ? 'Années' : 'Years' }
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold gradient-text">
                {stat.number}
              </div>
              <div className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;