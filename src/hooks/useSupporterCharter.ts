import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SupporterCharter } from '@/types/database';

export const useSupporterCharter = () => {
  const [charter, setCharter] = useState<SupporterCharter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActiveCharter();
  }, []);

  const fetchActiveCharter = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('supporter_charter')
        .select('*')
        .eq('is_active', true)
        .order('effective_date', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      setCharter(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch charter');
    } finally {
      setLoading(false);
    }
  };

  const updateCharter = async (updates: Partial<SupporterCharter>) => {
    try {
      // Deactivate current charter
      await supabase
        .from('supporter_charter')
        .update({ is_active: false })
        .eq('is_active', true);

      // Create new charter version
      const { data, error } = await supabase
        .from('supporter_charter')
        .insert({
          ...updates,
          is_active: true,
          effective_date: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      setCharter(data);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update charter';
      return { data: null, error: errorMessage };
    }
  };

  return {
    charter,
    loading,
    error,
    updateCharter,
    refetch: fetchActiveCharter
  };
};