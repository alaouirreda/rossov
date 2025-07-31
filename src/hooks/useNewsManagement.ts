import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { NewsPost } from '@/types/database';

export const useNewsManagement = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post: Omit<NewsPost, 'id' | 'created_at' | 'updated_at' | 'published_at'>) => {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .insert({
          ...post,
          published_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      await fetchPosts(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
      return { data: null, error: errorMessage };
    }
  };

  const updatePost = async (id: string, updates: Partial<NewsPost>) => {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchPosts(); // Refresh the list
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
      return { data: null, error: errorMessage };
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPosts(); // Refresh the list
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      return { error: errorMessage };
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
};