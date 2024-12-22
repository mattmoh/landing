import React, { useEffect, useState } from 'react';
import './Blog.css';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

const Blog = () => {
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            supabase
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error connecting to Supabase: ', error);
                    } else {
                        console.log('Connection to Supabase successful');
                        console.log('Blog Post: ', data[0].id);
                        setData(data);
                    }
                });
        }
        else if (id === '0') {
            console.log('No blog post selected.');
        }
    }, [id]);

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
                <div>  render(<ProgressBar
                    visible={true}
                    height="80"
                    width="80"
                    color= "#000000"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />)</div>
            )}
        </main>
    );
};

export default Blog;