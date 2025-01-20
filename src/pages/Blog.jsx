import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import './Blog.css';

const Home = ({ defaultPostId }) => {
  const { post_id } = useParams();
  const postId = post_id ? parseInt(post_id, 10) : defaultPostId;

  return <BlogPost postId={postId} />;
};

export default Home;