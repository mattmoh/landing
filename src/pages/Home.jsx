import React from 'react';
import BlogPost from '../components/BlogPost';
import './Home.css';

const Home = ({ postId }) => {
  return <BlogPost postId={postId} />;
};

export default Home;