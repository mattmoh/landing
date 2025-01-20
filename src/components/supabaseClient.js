import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchBlogPost = async (postId) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('post_id', postId);
  return { data, error };
};

export const fetchBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('post_id, post_title, post_tags, created_at')
  return { data, error };
};

export const fetchMaxPostId = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('post_id')
    .order('post_id', { ascending: false })
    .limit(1);
  return { data, error };
};

export { supabase };