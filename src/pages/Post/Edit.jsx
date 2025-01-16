import React, { useEffect, useState } from 'react'
import PostForm from '../../components/Form/PostForm'
import service from '../../appwrite/service';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const { slug } = useParams();
    console.log("EditPost:",post);
    useEffect(()=>{
        service.getPost(slug).then((post) => {
            if (post) setPost(post);
            else navigate("/");
        })
    },[]);
   

  return (
    <div>
      <h1 className='text-4xl font-semibold'>Edit Your Post</h1>
      {post && (
        <PostForm post={post} />
      )}
     
    </div>
  )
}

export default Edit