import React, { useEffect, useState } from 'react'
import service from '../../appwrite/service'
import { Link } from 'react-router-dom';
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(state => state.auth.userData)
  useEffect(() => {
    function fetchPost() {
      service.getPosts([
        Query.equal('userId', user.$id)
      ])
        .then(res => setPosts(res.documents))

    }
    fetchPost();

  }, []);

  return (
    <div>
      <h1 className='text-white text-4xl font-semibold p-4'>My Posts</h1>
      {posts.length > 0 ? (
        <div className='flex flex-wrap'>
          {posts.map((post) => (

            <div key={post.$id} className='flex flex-col gap-2 bg-white w-fit p-4 rounded-lg m-4'>
              <Link to={`/post/${post.$id}`}>
                <div className=''>
                  <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className='object-cover rounded-lg h-48 w-96' />
                </div>
                <div className='text-xl font-semibold border-t-2 my-2 flex justify-between'>
                  <p>{post.title}</p>
                  <p className='text-lg font-semibold'>Status:<span className='text-red-500 text-md ml-2'>{post.status}</span></p>
                </div>
              </Link>
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

export default AllPosts