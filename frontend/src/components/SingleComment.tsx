import AutogrowTextarea from "./AutogrowTextarea";
import { EditIcon, ReplyIcon } from "lucide-react";
import Avatar from "./Avatar";
import ClapButton from "./ClapButton";
import RemoveIcon from "./icons/Remove";
import { Comment } from "@/types/comment";
import { useEffect, useRef, useState } from "react";


interface SingleCommentInput {
    index: number
    comment: Comment
    deleteComment: (commentId: string) => Promise<any>;
    editComment: (commentId: string, newMessage: string) => Promise<any>;
    likeComment: (commentId: string) => Promise<any>;
};

export function SingleComment({ index, comment, deleteComment, editComment, likeComment }: SingleCommentInput ) {
    const user = JSON.parse(localStorage.getItem('user') || "{}" );
    const [editCommet, setEditComment] = useState(false);

    const handleCommentLike = () => {
        likeComment(comment.id);
    }
    const handleEditComment = () => {
        setEditComment(true)
    }

    return <>
        <div key={`${index}`} className='flex-col gap-2 items-center p-2'>
            <div className="flex  items-center w-full">
                <Avatar name={comment.user?.name || ""} imageSrc={comment.user?.profilePic || ""} size='small' />
                <div className="p-1 hover:underline hover:font-semibold">
                    {comment.user?.name}
                </div>
            </div>
            <div className='border-l w-full mx-2 px-2 py-1 text-pretty break-words'>
                {editCommet ? (
                    <>
                      <EditBox 
                        comment={comment.message} 
                        commentId={comment.id} 
                        setEditComment={setEditComment} 
                        editCommentHandler={editComment} />
                    </>
                ) : (
                    <div className="py-2">
                        {comment.message}
                    </div>
                )}
            </div>
            <div className='flex justify-between'>
              <div className='flex gap-2 font-semibold'>
                  <div className='flex items-center hover:scale-105'>
                      <ClapButton clapCount={comment.claps?.length} handleClap={handleCommentLike} />
                  </div>
                  <div className='flex items-center gap-1 hover:scale-105 '>
                      <ReplyIcon /> Reply
                  </div>
              </div>
              {comment.user?.id == user.id ? ( 
                  <div className='flex gap-2 items-center'>
                      <div title='Edit' className='hover:scale-105'>
                          <button 
                            className="flex items-center"
                            onClick={handleEditComment} 
                          >
                            <EditIcon />
                          </button>
                      </div>
                      <div title='Delete' className='hover:scale-105'>
                        <button
                          className="flex items-center"
                          onClick={() => {deleteComment(comment.id)}} 
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                  </div>
              ):(
                  <></>
              )}
            </div>
        </div>
    </>
};

interface EditBoxInput {
    comment: string
    commentId: string
    setEditComment: React.Dispatch<React.SetStateAction<boolean>>
    editCommentHandler: (commentId: string, newMessage: string) => Promise<void>
}

function EditBox({ comment, commentId ,setEditComment, editCommentHandler }: EditBoxInput) {
    const [userComment, setUserComment] = useState(comment);
    const [postButton, setPostButton] = useState(false);
    const buttonRef = useRef(postButton);

    const handlePostEditcomment = async () => {
        await editCommentHandler(commentId, userComment)
    }

    useEffect(() => {
        if (userComment.trim() == "" || userComment.trim() == comment) {
            buttonRef.current = false
        } else {
            buttonRef.current = true
        } 
        setPostButton(buttonRef.current)
    }, [userComment]);

    return (<div>
        <AutogrowTextarea 
            className="resize-none placeholder:text-gray-400 tracking-wide placeholder:font-light text-black bg-gray-100 rounded-md outline-none block w-full my-2 py-2 px-2"
            placeholder="Edit comment"
            value={userComment}
            onChange={(e) => {
                setUserComment(e.target.value)
            }}
        />
        <div className='w-full flex justify-end px-2'> 
            <div className='flex gap-2 w-1/3'>
                <button disabled={!postButton}
                        className={`w-1/2 border-2 py-1 rounded-full font-semibold border-green-500 text-green-700 ${postButton ? "hover:bg-green-500 hover:text-white" : "opacity-50"} `}
                        onClick={() => {
                            handlePostEditcomment();
                            setEditComment(false);
                        }}        
                >
                    Edit
                </button>
                <button className='w-1/2 border-2 py-1 rounded-full font-semibold hover:bg-black hover:text-white hover:border-black'
                        onClick={() => {
                            setUserComment(comment)
                            setEditComment(false)
                        }}        
                >
                    Cancel
                </button>
            </div>
         </div>
    </div>
)};