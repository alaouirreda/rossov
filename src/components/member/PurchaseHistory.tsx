import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOrders } from '@/hooks/useOrders';
import { useInvoices } from '@/hooks/useInvoices';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Download, Package, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PurchaseHistory: React.FC = () => {
  const { orders, loading: ordersLoading } = useOrders();
  const { invoices, downloadInvoice, generateInvoice } = useInvoices();
  const { language } = useLanguage();

  const getStatusBadge = (status: string) => {
    const variants = {
      'pending': 'bg-yellow-500 text-white',
      'completed': 'bg-green-500 text-white',
      'cancelled': 'bg-red-500 text-white',
      'refunded': 'bg-gray-500 text-white'
    };
    return variants[status as keyof typeof variants] || 'bg-muted';
  };

  const getStatusText = (status: string) => {
    const texts = {
      'pending': language === 'ar' ? 'قيد الانتظار' : language === 'fr' ? 'En attente' : 'Pending',
      'completed': language === 'ar' ? 'مكتمل' : language === 'fr' ? 'Terminé' : 'Completed',
      'cancelled': language === 'ar' ? 'ملغي' : language === 'fr' ? 'Annulé' : 'Cancelled',
      'refunded': language === 'ar' ? 'مسترد' : language === 'fr' ? 'Remboursé' : 'Refunded'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const handleDownloadInvoice = async (orderId: string) => {
    const invoice = invoices.find(inv => inv.order_id === orderId);
    
    if (invoice) {
      const { error } = await downloadInvoice(invoice.id);
      if (error) {
        toast({
          title: language === 'ar' ? 'خطأ' : language === 'fr' ? 'Erreur' : 'Error',
          description: error,
          variant: 'destructive'
        });
      }
    } else {
      // Generate invoice if it doesn't exist
      const { error } = await generateInvoice(orderId);
      if (error) {
        toast({
          title: language === 'ar' ? 'خطأ' : language === 'fr' ? 'Erreur' : 'Error',
          description: error,
          variant: 'destructive'
        });
      } else {
        toast({
          title: language === 'ar' ? 'تم إنشاء الفاتورة' : language === 'fr' ? 'Facture générée' : 'Invoice generated',
          description: language === 'ar' ? 'يمكنك الآن تحميل الفاتورة' : language === 'fr' ? 'Vous pouvez maintenant télécharger la facture' : 'You can now download the invoice'
        });
      }
    }
  };

  if (ordersLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            <Package className="h-5 w-5" />
            {language === 'ar' ? 'سجل المشتريات' : language === 'fr' ? 'Historique des achats' : 'Purchase History'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className={`text-muted-foreground ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'لا توجد مشتريات بعد' : language === 'fr' ? 'Aucun achat pour le moment' : 'No purchases yet'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {language === 'ar' ? 'طلب رقم' : language === 'fr' ? 'Commande n°' : 'Order #'} 
                            {order.id.slice(0, 8)}
                          </h3>
                          <Badge className={getStatusBadge(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(order.created_at).toLocaleDateString(
                              language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US'
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4" />
                            {order.payment_method || 'N/A'}
                          </div>
                        </div>

                        <div className="space-y-1">
                          {order.items?.map((item) => (
                            <div key={item.id} className="text-sm">
                              {item.product ? (
                                <span>
                                  {language === 'ar' ? item.product.name_ar : 
                                   language === 'fr' ? item.product.name_fr : 
                                   item.product.name_en} 
                                  × {item.quantity}
                                </span>
                              ) : item.membership_tier ? (
                                <span>
                                  {language === 'ar' ? item.membership_tier.name_ar : 
                                   language === 'fr' ? item.membership_tier.name_fr : 
                                   item.membership_tier.name_en}
                                </span>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-2xl font-bold">
                          {order.total_amount} {order.currency}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadInvoice(order.id)}
                          className={`hover-lift ${language === 'ar' ? 'font-arabic' : ''}`}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {language === 'ar' ? 'تحميل الفاتورة' : language === 'fr' ? 'Télécharger facture' : 'Download Invoice'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseHistory;