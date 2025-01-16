
import { Link } from 'react-router-dom'
import service from '../../appwrite/service'

const SinglePost = ({ id, img, title, userId }) => {

  return (
    <div className='break-inside-avoid mb-4 border shadow-xl rounded-xl'>
      <Link to={`/post/${id}`}>
        <img
          src={service.getFilePreview(img)}
          alt={title}
          className='object-cover rounded-t-xl w-full' />
        <div className='mt-2 p-2 text-left'>
          <p className='text-slate-500 font-medium capitalize text-sm md:text-lg'>{title}</p>
        </div>
      </Link>
    </div>
  )
}

export default SinglePost