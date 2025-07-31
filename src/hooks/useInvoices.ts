import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Invoice } from '@/types/database';

export const useInvoices = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchInvoices();
    }
  }, [user]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', user?.id)
        .order('issue_date', { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const generateInvoice = async (orderId: string) => {
    try {
      // Generate unique invoice number
      const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const { data, error } = await supabase
        .from('invoices')
        .insert({
          order_id: orderId,
          user_id: user?.id,
          invoice_number: invoiceNumber,
          total_amount: 0, // Will be calculated from order
          status: 'issued'
        })
        .select()
        .single();

      if (error) throw error;
      await fetchInvoices(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate invoice';
      return { data: null, error: errorMessage };
    }
  };

  const downloadInvoice = async (invoiceId: string) => {
    try {
      // This would generate and download a PDF invoice
      // For now, we'll just return a success message
      console.log(`Downloading invoice ${invoiceId}`);
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download invoice';
      return { error: errorMessage };
    }
  };

  return {
    invoices,
    loading,
    error,
    generateInvoice,
    downloadInvoice,
    refetch: fetchInvoices
  };
};