import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderItem } from '@/types/database';

export const useOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(
            *,
            product:products(*),
            membership_tier:membership_tiers(*)
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: {
    items: Array<{
      product_id?: string;
      membership_tier_id?: string;
      quantity: number;
      unit_price: number;
    }>;
    shipping_address?: string;
    billing_address?: string;
    payment_method?: string;
  }) => {
    try {
      const total_amount = orderData.items.reduce(
        (sum, item) => sum + (item.unit_price * item.quantity), 
        0
      );

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          total_amount,
          shipping_address: orderData.shipping_address,
          billing_address: orderData.billing_address,
          payment_method: orderData.payment_method,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        membership_tier_id: item.membership_tier_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.unit_price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await fetchOrders(); // Refresh the list
      return { data: order, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create order';
      return { data: null, error: errorMessage };
    }
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    refetch: fetchOrders
  };
};