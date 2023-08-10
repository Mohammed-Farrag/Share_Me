import React, { useState } from 'react'
import { client, urlFor } from '../client'
import { Link, Navigate, json, useNavigate } from 'react-router-dom'
import { MdDownloadForOffline } from 'react-icons/md'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import { AiTwotoneDelete } from 'react-icons/ai'
import { fetchUser } from '../utils/fetchUser'
import { v4 as uuidv4 } from 'uuid';

const Pin = ({ pin: { image, destination, postedBy, _id, save } }) => {

    const [PostHovered, setPostHovered] = useState(false)
    const [savingPost, setsavingPost] = useState(false)
    const navigate = useNavigate()

    const user = fetchUser();
    const alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.sub))?.length;
    const savePin = (id) => {
        if (!alreadySaved) {
            setsavingPost(true);

            client.patch(id).setIfMissing({ save: [] }).insert('after', 'save[-1]', [{
                _key: uuidv4(),
                userId: user?.sub,
                postedBy: {
                    _type: postedBy,
                    _ref: user?.sub
                }
            }]).commit().then(() => {
                window.location.reload();
                setsavingPost(false)
            })
        }
    }
    const deletePin = (id) => {
        client.delete(id).then(() => {
            window.location.reload();
        })
    }

    return (
        <div className='m-2'>

            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-details/${_id}`)}
                className='relative cursor-zoom-in hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
            >
                <img className="rounded-lg w-full" src={urlFor(image).width(250).url()} alt="user-post" />

                {PostHovered && (
                    <div
                        className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pb-2 z-50'
                        style={{ height: '100%' }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-white w-9 h-9 rounded-full flex items-center 
                                justify-center text-dark text-xl opacity-75  hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                    {save?.length} Saved
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => { e.stopPropagation(); savePin(_id); }}
                                    type='button'
                                    className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                    Save
                                </button>
                            )}
                        </div>
                        <div className='flex justify-between items-center gap-2 w-full'>
                            {destination && (
                                <a
                                    href={destination}
                                    target='_blank'
                                    className="bg-white flex items-center gap-2 text-black
                                        font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                                    rel='noreferrer'
                                >
                                    <BsArrowUpRightCircleFill />
                                    {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8)}
                                </a>
                            )}
                            {postedBy?._id === user?.sub && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); deletePin(_id); }}
                                    type='button'
                                    className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none'>
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
                <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={postedBy?.image}
                    alt="user-profile"
                />
                <p className="font-semibold capitalize">{postedBy?.userName}</p>
            </Link>
        </div>
    )

}

export default Pin