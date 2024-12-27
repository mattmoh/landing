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
          .eq('id', postId);

        if (error) throw error;

        setData(data);
      } catch (error) {
        console.error('Error connecting to Supabase: ', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className={data && data.length > 0 && data[0].class ? data[0].class : 'blog'}>
      {data && data.length > 0 ? (
        <>
          {data[0].post_title && (
            <div 
              className={data[0].class + "-title"}
              dangerouslySetInnerHTML={{
                __html: marked(data[0].post_title)
              }}
            />
          )}
          {postId > 1 && data[0].created_at && (
            <div 
              className="blog-date">
              {format(new Date(data[0].created_at), 'MMMM d, yyyy')}
            </div>
          )}
          {data[0].post_body && (
            <div
              className="blog-post"
              dangerouslySetInnerHTML={{
                __html: marked(data[0].post_body)
              }}
            />
          )}
          {data[0].post_tags && data[0].post_tags.length > 0 && (
            <ul className="blog-tags">
              {data[0].post_tags.map((tag, index) => (
                <li key={index}>{tag.trim()}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div>
          <p>No blog post found.</p>
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
      )}
    </main>
  );
};

export default BlogPost;