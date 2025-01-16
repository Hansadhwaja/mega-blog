import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import RTE from './RTE';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../../appwrite/service';
import Loader from '../Loader';

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
        <form className='w-full py-8 flex flex-col border px-4 rounded-xl mt-4 gradient-bg-2' onSubmit={handleSubmit(submit)}>
            <div className='w-full flex gap-2'>
                <div className='w-1/2'>
                    <div className='flex flex-col gap-2 text-left'>
                        <label className='text-lg font-semibold'>Title</label>
                        <input type='text' placeholder='Enter Your Title' className='p-2 rounded-lg border' {...register('title')} />
                    </div>
                    <div className='flex flex-col gap-2 text-left'>
                        <label className='text-lg font-semibold'>Slug</label>
                        <input type='text' placeholder='Your Unique Slug' className='p-2 rounded-lg border' {...register('slug')} />
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className='flex flex-col gap-2 text-left'>
                        <label className='text-lg font-semibold'>Featured Image</label>
                        <input
                            type='file'
                            className='p-2 rounded-lg border bg-white'
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}

                        />
                    </div>
                    <select
                        className='p-2 mt-8 rounded-lg border w-full'
                        {...register("status", { required: true })}
                    >
                        <option value='active'>Active</option>
                        <option value='inactive' >InActive</option>
                    </select>
                </div>
            </div>
            <div className='w-full mt-5 flex flex-col gap-3'>
                <div className='flex flex-col gap-2 text-left'>
                    <label className='text-lg font-semibold'>Content</label>
                    <RTE control={control} defaultValue={getValues("content")} />
                </div>
                <div className='flex text-left'>
                    <button
                        type='submit'
                        className={` px-10 py-2 mt-2 w-full rounded-full text-white font-semibold text-lg ${post ? 'bg-orange-500 hover:bg-orange-700' : 'bg-sky-400 hover:bg-sky-600'}`}
                    >
                        {post ?
                            (
                                loading ? (
                                    <>
                                        <Loader />
                                        <p>Updating...</p>
                                    </>
                                ) : ('Update')
                            )
                            : (
                                loading ? (
                                    <>
                                        <Loader />
                                        <p>Submitting...</p>
                                    </>
                                ) : ('Submit')
                            )}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PostForm