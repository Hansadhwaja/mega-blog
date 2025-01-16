import React, { useEffect, useState } from 'react'
import service from '../../appwrite/service'
import { Link } from 'react-router-dom';
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';
import MySinglePost from '../../components/Post/MySinglePost';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(state => state.auth.userData);

  useEffect(() => {
    function fetchPost() {
      service.getPosts([
        Query.equal('userId', user?.$id)
      ])
        .then(res => setPosts(res.documents))

    }
    fetchPost();

  }, []);



  return (
    <div>
      <h1 className='text-4xl font-semibold p-4'>My Posts</h1>
      <div className='border-t-2 border-zinc-400' />
      {posts.length > 0 ? (
        <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 mt-8'>
          {posts.map((post) => (
            <div key={post.$id}>
              <MySinglePost
                id={post.$id}
                img={post.featuredImage}
                title={post.title}
                status={post.status}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className='my-5 text-2xl font-semibold text-slate-500'>You have not posted yet.</h1>
        </div>
      )}


    </div>
  )
}

export default MyPosts