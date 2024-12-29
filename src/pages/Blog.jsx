import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const Blog = () => {
  const { post_id } = useParams();
  console.log(post_id);
  return <BlogPost postId={parseInt(post_id, 10)} />;
};

export default Blog;