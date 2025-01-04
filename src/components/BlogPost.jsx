import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ThreeDots } from 'react-loader-spinner';
import { marked } from 'marked';
import { format } from 'date-fns';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BlogPost = ({ postId }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('post_id', postId);

        if (error) throw error;

        setData(data);
      } catch (error) {
        console.error('Error connecting to Supabase: ', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return (
      <div>
        <p>Loading...</p>
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#808080"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ textAlign: 'center', display: 'block' }}
          wrapperClass=""
        />
      </div>
    );
  }

  const post = data[0];

  return (
    <main className={post.class || 'blog'}>
      {post.post_title && (
        <div
          className={`${post.class}-title`}
          dangerouslySetInnerHTML={{ __html: marked(post.post_title) }}
        />
      )}
      {postId > 1 && post.created_at && (
        <div className="blog-date">
          {format(new Date(post.created_at), 'MMMM d, yyyy')}
        </div>
      )}
      {post.post_body && (
        <div
          className="blog-post"
          dangerouslySetInnerHTML={{ __html: marked(post.post_body) }}
        />
      )}
      {post.post_tags && post.post_tags.length > 0 && (
        <ul className="blog-tags">
          {post.post_tags.map((tag, index) => (
            <li key={index}>{tag.trim()}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default BlogPost;