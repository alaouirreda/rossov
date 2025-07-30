import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Store: React.FC = () => {
  const { language } = useLanguage();

  // Mock products data
  const products = [
    {
      id: 1,
      name: language === 'ar' ? 'قميص RossoVerde الرسمي' : language === 'fr' ? 'Maillot Officiel RossoVerde' : 'Official RossoVerde Jersey',
      price: 65,
      originalPrice: 80,
      image: '/placeholder.svg',
      inStock: true
    },
    {
      id: 2,
      name: language === 'ar' ? 'وشاح المشجعين' : language === 'fr' ? 'Écharpe des Supporters' : 'Supporters Scarf',
      price: 25,
      originalPrice: null,
      image: '/placeholder.svg',
      inStock: true
    },
    {
      id: 3,
      name: language === 'ar' ? 'قبعة RossoVerde' : language === 'fr' ? 'Casquette RossoVerde' : 'RossoVerde Cap',
      price: 30,
      originalPrice: null,
      image: '/placeholder.svg',
      inStock: true
    },
    {
      id: 4,
      name: language === 'ar' ? 'كوب القهوة الحصري' : language === 'fr' ? 'Mug à Café Exclusif' : 'Exclusive Coffee Mug',
      price: 20,
      originalPrice: 25,
      image: '/placeholder.svg',
      inStock: false
    },
    {
      id: 5,
      name: language === 'ar' ? 'حقيبة الظهر الرياضية' : language === 'fr' ? 'Sac à Dos Sport' : 'Sports Backpack',
      price: 55,
      originalPrice: null,
      image: '/placeholder.svg',
      inStock: true
    },
    {
      id: 6,
      name: language === 'ar' ? 'علَم RossoVerde الكبير' : language === 'fr' ? 'Grand Drapeau RossoVerde' : 'Large RossoVerde Flag',
      price: 40,
      originalPrice: null,
      image: '/placeholder.svg',
      inStock: true
    }
  ];

  const handleAddToCart = (productId: number) => {
    console.log(`Adding product ${productId} to cart`);
    // Cart functionality will be implemented later
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className={`text-4xl md:text-6xl font-bold text-morocco-green ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'المتجر الرسمي' : language === 'fr' ? 'Boutique Officielle' : 'Official Store'}
          </h1>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'اكتشف مجموعتنا الحصرية من المنتجات الرسمية لجمعية RossoVerde. من الملابس إلى الإكسسوارات، كل ما تحتاجه لإظهار حبك للمنتخب المغربي.' :
              language === 'fr' ? 
              'Découvrez notre collection exclusive de produits officiels de l\'association RossoVerde. Des vêtements aux accessoires, tout ce dont vous avez besoin pour montrer votre amour pour l\'équipe nationale marocaine.' :
              'Discover our exclusive collection of official RossoVerde association products. From clothing to accessories, everything you need to show your love for the Moroccan national team.'
            }
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="glass-effect hover-lift group overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-3 left-3 bg-primary-red text-white">
                    {language === 'ar' ? 'خصم' : language === 'fr' ? 'Promo' : 'Sale'}
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge className="absolute top-3 right-3 bg-muted text-muted-foreground">
                    {language === 'ar' ? 'نفدت الكمية' : language === 'fr' ? 'Épuisé' : 'Out of Stock'}
                  </Badge>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className={`font-semibold text-lg line-clamp-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-x-2">
                    <span className="text-2xl font-bold gradient-text">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full btn-morocco hover-lift"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock 
                    ? (language === 'ar' ? 'أضف للسلة' : language === 'fr' ? 'Ajouter au panier' : 'Add to Cart')
                    : (language === 'ar' ? 'نفدت الكمية' : language === 'fr' ? 'Épuisé' : 'Out of Stock')
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary-red/10 to-primary-green/10 rounded-lg p-12">
          <h2 className={`text-3xl font-bold mb-4 text-white ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'كن أول من يعرف' : language === 'fr' ? 'Soyez le premier à savoir' : 'Be the First to Know'}
          </h2>
          <p className={`text-muted-foreground mb-6 max-w-2xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'اشترك في نشرتنا الإخبارية للحصول على إشعارات حول المنتجات الجديدة والعروض الحصرية.' :
              language === 'fr' ? 
              'Abonnez-vous à notre newsletter pour recevoir des notifications sur les nouveaux produits et les offres exclusives.' :
              'Subscribe to our newsletter to get notified about new products and exclusive offers.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder={language === 'ar' ? 'بريدك الإلكتروني' : language === 'fr' ? 'Votre email' : 'Your email'}
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className={`btn-morocco ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'اشترك' : language === 'fr' ? 'S\'abonner' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;