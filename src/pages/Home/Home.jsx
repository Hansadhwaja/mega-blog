import React, { useEffect, useState } from 'react'
import service from '../../appwrite/service';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import SinglePost from '../../components/Post/SinglePost';

const Home = () => {
  const user = useSelector(state => state.auth.userData);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      service.getPosts([Query.equal('status', 'active')])
        .then(res => setPosts(res.documents))
    }
    else {
      navigate('/login');
    }
  }, []);
  if(posts.length==0) return <h1 className='text-2xl h-[300px]'>No Posts yet.Please add to see posts.</h1>

  return (
    <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 min-h-[300px]'>
      {posts.map((post) => (
        <div key={post.$id}>
          <SinglePost
            id={post.$id}
            img={post.featuredImage}
            title={post.title}
            userId={post.userId}
          />
        </div>
      ))}
    </div>
  )
}

export default Home