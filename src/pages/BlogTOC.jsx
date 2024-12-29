import React, { useEffect, useState } from 'react';
import { supabase } from '../components/supabaseClient';
import { ThreeDots } from 'react-loader-spinner';
import { format } from 'date-fns';

const BlogTOC = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('post_id, post_title, post_tags, created_at')
          .gt('post_id', 1);

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
          <div key={post.post_id} className="blog-toc-item">
            <a href={`/blog/${post.post_id}`}>
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