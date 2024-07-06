// import { modules } from '../../util/videoHandler';
import { useEffect, useRef, useState } from 'react';
import AutogrowTextarea from '../AutogrowTextarea';
// import SendIcon from '../icons/SendIcon';
// import AddTopicIcon from '../icons/AddTopicIcon';
import ProfileBox from '../ProfileBox';
import PostIcon from '../icons/PostIcon';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Comments(){
    const [comment, setComment] = useState("");
    const [postButton, setPostButton ] = useState(false);
    const buttonRef = useRef(postButton);

    useEffect(() => {
        if (comment.trim() == "") {
            buttonRef.current = false
        } else {
            buttonRef.current = true
        }
        setPostButton(buttonRef.current)
    }, [comment])
    
    const postComment = async () => {
        try {
            await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                    comment
                },
                {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
        } catch(error) {
            toast.error("Failed to fetch comments.");
    
        }
    };

    return <>
        <div className='py-4'>
          <div className='my-2 px-2 border-b text-xl font-semibold'>
            Comments
          </div>
          <div className='flex gap-2 items-center h-[20vh]'>
            <div className='w-10'>
                <ProfileBox />
            </div>
            <AutogrowTextarea
                id="Comment"
                className="resize-none placeholder:text-gray-400 tracking-wide placeholder:font-light text-black bg-gray-100 rounded-md outline-none block w-full my-2 py-2 px-2"
                placeholder="Add comment"
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value)
                    console.log(comment)
                }}
                >
            </AutogrowTextarea>
            <button disabled={!postButton} onClick={postComment}>
                <PostIcon className={`p-2 justify-center hover:scale-105 ${buttonRef.current? "" : "text-gray-50/10 opacity-40"}`} height="60" width="60"/>
            </button>
          </div>
        </div>
    </>
}