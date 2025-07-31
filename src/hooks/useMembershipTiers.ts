import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MembershipTier } from '@/types/database';

export const useMembershipTiers = () => {
  const [tiers, setTiers] = useState<MembershipTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('membership_tiers')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setTiers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch membership tiers');
    } finally {
      setLoading(false);
    }
  };

  const createTier = async (tier: Omit<MembershipTier, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('membership_tiers')
        .insert(tier)
        .select()
        .single();

      if (error) throw error;
      await fetchTiers(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create tier';
      return { data: null, error: errorMessage };
    }
  };

  const updateTier = async (id: string, updates: Partial<MembershipTier>) => {
    try {
      const { data, error } = await supabase
        .from('membership_tiers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchTiers(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update tier';
      return { data: null, error: errorMessage };
    }
  };

  const deleteTier = async (id: string) => {
    try {
      const { error } = await supabase
        .from('membership_tiers')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      await fetchTiers(); // Refresh the list
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete tier';
      return { error: errorMessage };
    }
  };

  return {
    tiers,
    loading,
    error,
    createTier,
    updateTier,
    deleteTier,
    refetch: fetchTiers
  };
};