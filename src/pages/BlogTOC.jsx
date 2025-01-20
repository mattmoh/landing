import React, { useEffect, useState } from 'react';
import { fetchBlogPosts } from '../components/supabaseClient';
import { ThreeDots } from 'react-loader-spinner';
import { format } from 'date-fns';
import './GitHubRepos.css';

const BlogTOC = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchBlogPosts();

      if (error) {
        console.error('Error fetching posts: ', error);
        setError(error.message);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchData();
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
      <h1>Articles</h1>
      <div className="repo-cards">
        {posts.map((post) => (
          <div key={post.post_id} className="repo-card">
              <h2>{post.post_title}</h2>
              <p className="blog-toc-date">{format(new Date(post.created_at), 'MMMM d, yyyy')}</p>
            {post.post_tags && (
              <div className="blog-toc-tags">
                {post.post_tags.map((tag, index) => (
                  <span key={index} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <a 
              href={`/blog/${post.post_id}`}
              rel="noopener noreferrer"
            ><button>
              Read it!
          </button></a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogTOC;