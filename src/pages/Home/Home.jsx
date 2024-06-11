import React, { useEffect, useState } from 'react'
import service from '../../appwrite/service';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Query } from 'appwrite';

const Home = () => {
  const user = useSelector(state => state.auth.userData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (user) {
      service.getPosts([Query.equal('status', 'active')])
        .then(res => setPosts(res.documents))
    }


  }, []);
  console.log("Posts:", posts);

  return (
    <div>

      {!user ? (
        <div>
          <h1 className='text-3xl text-white font-semibold mx-4 my-8'>Login To See Posts</h1>
        </div>
      ) : (
        <div className='flex  w-full flex-wrap justify-center'>
          {posts.map((post) => (

            <div key={post.$id} className='flex flex-col gap-2 bg-white w-fit p-4 rounded-lg m-4'>
              <Link to={`/post/${post.$id}`}>
                <div className=''>
                  <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className='object-cover rounded-lg h-48 w-96' />
                </div>
                <div className='text-xl font-semibold border-t-2 my-2'>{post.title}</div>
              </Link>
            </div>
          ))}

        </div>
      )}

    </div>


  )
}

export default Home