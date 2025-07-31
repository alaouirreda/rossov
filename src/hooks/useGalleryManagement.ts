import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { GalleryItem } from '@/types/database';

export const useGalleryManagement = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .insert(item)
        .select()
        .single();

      if (error) throw error;
      await fetchItems(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create gallery item';
      return { data: null, error: errorMessage };
    }
  };

  const updateItem = async (id: string, updates: Partial<GalleryItem>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchItems(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update gallery item';
      return { data: null, error: errorMessage };
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchItems(); // Refresh the list
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete gallery item';
      return { error: errorMessage };
    }
  };

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchItems
  };
};