import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const Blog = () => {
  const { id } = useParams();
  console.log(id);
  return <BlogPost postId={parseInt(id, 10)} />;
};

export default Blog;