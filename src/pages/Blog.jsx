import React, { useEffect, useState } from 'react';
import './Blog.css';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

const Blog = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            supabase
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error connecting to Supabase:', error);
                    } else {
                        console.log('Connection to Supabase successful');
                        console.log('Blog Post: ', data[0].id);
                        setData(data);
                    }
                });
        }
    }, [id]);

    return (
        <main className='blog'>
            <h1>{data && data.length > 0 ? toTitleCase(data[0].post_title) : 'Loading...'}</h1>
            <p>{data && data[0].post_body}</p>
            <ul>
                {data && data[0].post_tags.map((tag, index) => (
                    <li key={index}>{toTitleCase(tag.trim())}</li>
                ))}
            </ul>
        </main>
    );
};

export default Blog;