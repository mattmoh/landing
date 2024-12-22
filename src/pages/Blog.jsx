import React, { useEffect, useState } from 'react';
import './Blog.css';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const Blog = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id);

          if (error) throw error;

          setData(data);
        } else if (id === '0') {
          console.log('No blog post selected.');
        }
      } catch (error) {
        console.error('Error connecting to Supabase: ', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className='blog'>
      {data && data.length > 0 ? (
        <>
          <h1>{toTitleCase(data[0].post_title)}</h1>
          <p>{data[0].post_body}</p>
          <ul>
            {data[0].post_tags.map((tag, index) => (
              <li key={index}>{toTitleCase(tag.trim())}</li>
            ))}
          </ul>
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
                wrapperStyle={{ display: 'block' }}
                wrapperClass=""
            />
        </div>
      )}
    </main>
  );
};

export default Blog;