// filepath: /c:/Users/mohci/dev/new-mattmoh/src/components/BlogPost.jsx
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ThreeDots } from 'react-loader-spinner';
import { marked } from 'marked';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const BlogPost = ({ postId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div>
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
    <main className={data[0].class}>
      {data && data.length > 0 ? (
        <>
          {data[0].post_title && <h2 dangerouslySetInnerHTML={{ __html: marked(data[0].post_title) }}></h2>}
          {data[0].post_body && (
            <div dangerouslySetInnerHTML={{ __html: marked(data[0].post_body) }} />
          )}
          {data[0].post_tags && data[0].post_tags.length > 0 && (
            <ul>
              {data[0].post_tags.map((tag, index) => (
                <li key={index}>{toTitleCase(tag.trim())}</li>
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