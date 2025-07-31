import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CMSContent } from '@/types/database';

export const useCMSContent = (pageKey?: string) => {
  const [content, setContent] = useState<CMSContent[]>([]);
  const [singleContent, setSingleContent] = useState<CMSContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pageKey) {
      fetchSingleContent(pageKey);
    } else {
      fetchAllContent();
    }
  }, [pageKey]);

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .eq('is_published', true)
        .order('page_key');

      if (error) throw error;
      setContent(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleContent = async (key: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .eq('page_key', key)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setSingleContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (pageKey: string, updates: Partial<CMSContent>) => {
    try {
      const { data, error } = await supabase
        .from('cms_content')
        .upsert({
          page_key: pageKey,
          ...updates
        })
        .select()
        .single();

      if (error) throw error;
      
      if (pageKey) {
        setSingleContent(data);
      } else {
        await fetchAllContent();
      }
      
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update content';
      return { data: null, error: errorMessage };
    }
  };

  return {
    content,
    singleContent,
    loading,
    error,
    updateContent,
    refetch: pageKey ? () => fetchSingleContent(pageKey) : fetchAllContent
  };
};