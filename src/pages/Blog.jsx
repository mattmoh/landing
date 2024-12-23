import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const Blog = () => {
  const { id } = useParams();
  return <BlogPost postId={id ? parseInt(id, 10) : 1} />;
};

export default Blog;