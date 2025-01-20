import React, { useEffect, useState } from 'react';
import { fetchBlogPost } from './supabaseClient';
import { ThreeDots } from 'react-loader-spinner';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { marked } from 'marked';
import { format } from 'date-fns';
import '../pages/GitHubRepos.css';

const BlogPost = ({ postId, onNavigate, maxPostId }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchBlogPost(postId);

      if (error) {
        console.error('Error connecting to Supabase: ', error);
        setError(error.message);
      } else {
        setData(data);
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

  if (!post) {
    return <div>Error: Post not found</div>;
  }

  return (
    <main>
      <div className='blog-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {postId > 1 && (
              <FaArrowLeft onClick={() => onNavigate(postId - 1)} style={{ cursor: 'pointer', marginRight: '20px' }} />
            )}
            {post.post_title && (
              <h2 style={{ textAlign: 'center' }}>
                {post.post_title}
              </h2>
            )}
            {postId < maxPostId && (
              <FaArrowRight onClick={() => onNavigate(postId + 1)} style={{ cursor: 'pointer', marginLeft: '20px' }} />
            )}
          </div>
          {post.created_at && (
            <div className="blog-date">
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </div>
          )}
        </div>
      </div>
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