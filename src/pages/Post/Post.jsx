import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from '../../appwrite/service';
import parse from 'html-react-parser'

const Post = () => {

  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = (post && userData) ? post.userId === userData.$id : false;
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className='border-2 rounded-xl my-4 p-4 flex flex-wrap gap-5'>
      <div className='m-3 w-full flex justify-between'>
        <div className='my-5'>
          <h1 className='text-3xl font-bold capitalize'>{post.title}</h1>
          <span className='text-lg font-semibold mt-3 capitalize'>{parse(post.content)}</span>
        </div>

        {isAuthor && (
          <div className='flex gap-4 bottom-0 items-center justify-center'>
            <Link to={`/edit/${post.$id}`}>
              <button className='px-4 py-2 bg-sky-400 hover:bg-sky-600 rounded-lg text-white font-semibold'>Edit</button>
            </Link>
            <button className='px-4 py-2 bg-red-400 hover:bg-red-600 rounded-lg text-white font-semibold' onClick={deletePost}>Delete</button>
          </div>
        )}


      </div>
      <div className='flex justify-center w-fit'>
        <img
          src={service.getFilePreview(post.featuredImage)}
          alt={post.title}
          className='object-cover rounded-lg'
        />
      </div>
    </div>
  )
    : null;
}

export default Post