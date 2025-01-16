import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import service from '../../appwrite/service'

const MySinglePost = ({ id, img, title, status }) => {
    const [sts, setsts] = useState(status);
    const handleStatus = async (e) => {
        const newStatus = e.target.value;
        setsts(newStatus);
        try {
            await service.updateStatus(id, { status: newStatus });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className='break-inside-avoid mb-4 border shadow-xl rounded-xl'>
            <Link to={`/post/${id}`}>
                <img
                    src={service.getFilePreview(img)}
                    alt={title}
                    className='object-cover rounded-t-lg' />
            </Link>
            <div className='text-xl font-semibold p-2 my-2 flex justify-between'>
                <p>{title}</p>
                <div className='flex gap-2'>
                    <label htmlFor='status'>Status:</label>
                    <select
                        id='status'
                        className='rounded-lg border w-full p-1 text-red-400'
                        onChange={(e) => handleStatus(e)}
                        value={sts}
                    >
                        <option value='active'>Active</option>
                        <option value='inactive' >InActive</option>
                    </select>
                </div>

            </div>

        </div>
    )
}

export default MySinglePost