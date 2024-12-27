import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ThreeDots } from 'react-loader-spinner';
import { format } from 'date-fns';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BlogTOC = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, post_title, post_tags, created_at')
          .gt('id', 1);

        if (error) throw error;

        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts: ', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <div className="blog-toc">
        {posts.map((post) => (
          <div key={post.id} className="blog-toc-item">
            <a href={`/blog/${post.id}`}>
              <h2>{post.post_title}</h2>
              <p className="blog-toc-date">{format(new Date(post.created_at), 'MMMM d, yyyy')}</p>
            </a>
            {post.post_tags && (
              <div className="blog-toc-tags">
                {post.post_tags.map((tag, index) => (
                  <span key={index} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogTOC;