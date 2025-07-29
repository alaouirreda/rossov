import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingBag
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const StoreManagement: React.FC = () => {
  const { language } = useLanguage();

  // Mock products data
  const products = [
    {
      id: 1,
      name: language === 'ar' ? 'قميص RossoVerde الرسمي' : language === 'fr' ? 'Maillot Officiel RossoVerde' : 'Official RossoVerde Jersey',
      category: language === 'ar' ? 'ملابس' : language === 'fr' ? 'Vêtements' : 'Clothing',
      price: 65,
      originalPrice: 80,
      stock: 45,
      status: 'active',
      sales: 124,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: language === 'ar' ? 'وشاح المشجعين' : language === 'fr' ? 'Écharpe des Supporters' : 'Supporters Scarf',
      category: language === 'ar' ? 'إكسسوارات' : language === 'fr' ? 'Accessoires' : 'Accessories',
      price: 25,
      originalPrice: null,
      stock: 89,
      status: 'active',
      sales: 89,
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: language === 'ar' ? 'قبعة RossoVerde' : language === 'fr' ? 'Casquette RossoVerde' : 'RossoVerde Cap',
      category: language === 'ar' ? 'إكسسوارات' : language === 'fr' ? 'Accessoires' : 'Accessories',
      price: 30,
      originalPrice: null,
      stock: 67,
      status: 'active',
      sales: 67,
      image: '/placeholder.svg'
    },
    {
      id: 4,
      name: language === 'ar' ? 'كوب القهوة الحصري' : language === 'fr' ? 'Mug à Café Exclusif' : 'Exclusive Coffee Mug',
      category: language === 'ar' ? 'منزلية' : language === 'fr' ? 'Maison' : 'Home',
      price: 20,
      originalPrice: 25,
      stock: 0,
      status: 'out_of_stock',
      sales: 45,
      image: '/placeholder.svg'
    },
    {
      id: 5,
      name: language === 'ar' ? 'حقيبة الظهر الرياضية' : language === 'fr' ? 'Sac à Dos Sport' : 'Sports Backpack',
      category: language === 'ar' ? 'حقائب' : language === 'fr' ? 'Sacs' : 'Bags',
      price: 55,
      originalPrice: null,
      stock: 23,
      status: 'low_stock',
      sales: 78,
      image: '/placeholder.svg'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-500 text-white',
      'out_of_stock': 'bg-red-500 text-white',
      'low_stock': 'bg-yellow-500 text-white'
    };
    return variants[status as keyof typeof variants] || 'bg-muted';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'active': language === 'ar' ? 'متوفر' : language === 'fr' ? 'Disponible' : 'Available',
      'out_of_stock': language === 'ar' ? 'نفدت الكمية' : language === 'fr' ? 'Épuisé' : 'Out of Stock',
      'low_stock': language === 'ar' ? 'مخزون منخفض' : language === 'fr' ? 'Stock faible' : 'Low Stock'
    };
    return texts[status as keyof typeof texts] || status;
  };

  // Calculate stats
  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const outOfStock = products.filter(p => p.status === 'out_of_stock').length;
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-bold ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'إدارة المتجر' : language === 'fr' ? 'Gestion de la boutique' : 'Store Management'}
          </h1>
          <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'إدارة المنتجات والمخزون وتتبع المبيعات' : language === 'fr' ? 'Gérer les produits, l\'inventaire et suivre les ventes' : 'Manage products, inventory, and track sales'}
          </p>
        </div>
        <Button className="btn-morocco">
          <Plus className="h-4 w-4 mr-2" />
          <span className={language === 'ar' ? 'font-arabic' : ''}>
            {language === 'ar' ? 'إضافة منتج' : language === 'fr' ? 'Ajouter produit' : 'Add Product'}
          </span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'إجمالي المنتجات' : language === 'fr' ? 'Total des produits' : 'Total Products'}
                </p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'إجمالي الإيرادات' : language === 'fr' ? 'Revenus totaux' : 'Total Revenue'}
                </p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'إجمالي المبيعات' : language === 'fr' ? 'Total des ventes' : 'Total Sales'}
                </p>
                <p className="text-2xl font-bold">{totalSales}</p>
              </div>
              <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary-red" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'نفدت الكمية' : language === 'fr' ? 'En rupture' : 'Out of Stock'}
                </p>
                <p className="text-2xl font-bold">{outOfStock}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={language === 'ar' ? 'البحث عن المنتجات...' : language === 'fr' ? 'Rechercher des produits...' : 'Search products...'}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              <span className={language === 'ar' ? 'font-arabic' : ''}>
                {language === 'ar' ? 'تصفية' : language === 'fr' ? 'Filtrer' : 'Filter'}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center justify-between ${language === 'ar' ? 'font-arabic' : ''}`}>
            <span>{language === 'ar' ? 'جميع المنتجات' : language === 'fr' ? 'Tous les produits' : 'All Products'}</span>
            <Badge variant="outline">{products.length} {language === 'ar' ? 'منتج' : language === 'fr' ? 'produits' : 'products'}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'المنتج' : language === 'fr' ? 'Produit' : 'Product'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'السعر' : language === 'fr' ? 'Prix' : 'Price'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'المخزون' : language === 'fr' ? 'Stock' : 'Stock'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'الحالة' : language === 'fr' ? 'Statut' : 'Status'}
                  </th>
                  <th className={`text-left py-4 px-2 font-medium text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'المبيعات' : language === 'fr' ? 'Ventes' : 'Sales'}
                  </th>
                  <th className="text-center py-4 px-2 font-medium text-muted-foreground">
                    {language === 'ar' ? 'إجراءات' : language === 'fr' ? 'Actions' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                            {product.name}
                          </p>
                          <p className={`text-sm text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div>
                        <p className="font-medium">${product.price}</p>
                        {product.originalPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <p className={`font-medium ${product.stock <= 10 ? 'text-red-500' : ''}`}>
                        {product.stock}
                      </p>
                    </td>
                    <td className="py-4 px-2">
                      <Badge className={getStatusBadge(product.status)}>
                        {getStatusText(product.status)}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <p className="font-medium">{product.sales}</p>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
        <CardHeader>
          <CardTitle className={`text-yellow-800 dark:text-yellow-200 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'تنبيه المخزون المنخفض' : language === 'fr' ? 'Alerte stock faible' : 'Low Stock Alert'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-yellow-700 dark:text-yellow-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 
              'المنتجات التالية تحتاج إلى إعادة تخزين: حقيبة الظهر الرياضية (23 قطعة متبقية)' :
              language === 'fr' ? 
              'Les produits suivants ont besoin d\'être réapprovisionnés : Sac à Dos Sport (23 restants)' :
              'The following products need restocking: Sports Backpack (23 remaining)'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreManagement;