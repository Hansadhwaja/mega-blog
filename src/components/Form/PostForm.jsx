import React, { useCallback, useEffect, useState } from 'react'
import { CgSpinner } from "react-icons/cg";
import { useForm } from 'react-hook-form'
import RTE from './RTE';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../../appwrite/service';

const PostForm = ({ post }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, control, watch, reset, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (post) {

            reset({
                title: post.title || "",
                slug: post.$id || "",
                content: post.content || "",
                status: post.status || "active"
            });
        }
    }, [post, reset]);


    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    service.deleteFile(post.featuredImage);
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
            else {
                const file = await service.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId
                    const dbPost = await service.createPost({ ...data, userId: userData.$id });
                    if (dbPost) {
                        navigate(`/`)
                    }
                }
            }
        } finally {
            setLoading(false)
        }
        setLoading(true)

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d]+/g, '-')
    })

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);


    return (
        <form className='w-full py-8 flex flex-col sm:flex-row' onSubmit={handleSubmit(submit)}>
            <div className=' w-full sm:w-2/3 flex flex-col gap-2'>
                <div className='flex flex-col gap-2 text-left'>
                    <label className='text-lg font-semibold'>Title</label>
                    <input type='text' placeholder='Enter Your Title' className='p-2 rounded-lg' {...register('title')} />
                </div>
                <div className='flex flex-col gap-2 text-left'>
                    <label className='text-lg font-semibold'>Slug</label>
                    <input type='text' className='p-2 rounded-lg' {...register('slug')} />
                </div>
                <div className='flex flex-col gap-2 text-left'>
                    <label className='text-lg font-semibold'>Content</label>
                    <RTE control={control} defaultValue={getValues("content")} />
                </div>
            </div>
            <div className=' w-full mt-5 sm:w-1/3 ml-2 flex flex-col gap-3'>
                <div className='flex flex-col gap-2 text-left'>
                    <label className='text-lg font-semibold'>Featured Image</label>
                    <input
                        type='file'
                        className='p-2 rounded-lg bg-white'
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}

                    />
                </div>
                <div className='flex flex-col gap-2 text-left'>
                    <select
                        className='p-2 mt-3 rounded-lg'
                        {...register("status", { required: true })}
                    >
                        <option value='active'>Active</option>
                        <option value='inactive' >InActive</option>
                    </select>
                </div>
                <div className='flex text-left'>
                    <button
                        type='submit'
                        className={`p-2 mt-2 w-full rounded-lg text-white font-semibold text-lg ${post ? 'bg-orange-500 hover:bg-orange-700' : 'bg-sky-400 hover:bg-sky-600'}`}
                    >{loading && (
                        <CgSpinner size={20} className="animate-spin bg-white" />
                    )}
                        {post ? 'Update' : 'Submit'}
                    </button>
                </div>

            </div>
        </form>
    )
}

export default PostForm