import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/database';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const acceptCharter = async (charterId: string) => {
    try {
      // Record charter acceptance
      const { error: acceptanceError } = await supabase
        .from('charter_acceptances')
        .insert({
          user_id: user?.id,
          charter_id: charterId,
          ip_address: '', // Would be populated from request
          user_agent: navigator.userAgent
        });

      if (acceptanceError) throw acceptanceError;

      // Update profile
      const { data, error } = await supabase
        .from('profiles')
        .update({
          charter_accepted: true,
          charter_accepted_at: new Date().toISOString()
        })
        .eq('id', user?.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to accept charter';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    acceptCharter,
    refetch: fetchProfile
  };
};