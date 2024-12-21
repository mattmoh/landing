import React, { useEffect, useState } from 'react';
import './Blog.css';
import { useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Blog = () => {
    const location = useLocation();
    const [id, setId] = useState(null);
    const [blogPost, setBlogPost] = useState(null);

    useEffect(() => {
        const hash = location.hash.replace('#', '');
        setId(hash);
    }, [location]);

    useEffect(() => {
        if (id) {
            const fetchBlogPost = async () => {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching blog post:', error);
                } else {
                    setBlogPost(data);
                }
            };

            fetchBlogPost();
        }
    }, [id]);

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    if (!blogPost) {
        return <div>Loading...</div>;
    }

    return (
        <main className='blog'>
            <h1>{toTitleCase(blogPost.post_title)}</h1>
            <p>{blogPost.post_body}</p>
            <ul>
                {blogPost.post_tags.map((tag, index) => (
                    <li key={index}>{toTitleCase(tag)}</li>
                ))}
            </ul>
        </main>
    );
};

export default Blog;