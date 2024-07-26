import { useEffect, useRef, useState } from "react"
import AutogrowTextarea from "../AutogrowTextarea"

interface SecondaryInputBoxTypes {
    label: string
    comment: string
    commentId: string
    setEditComment: React.Dispatch<React.SetStateAction<boolean>>
    editCommentHandler: (commentId: string, newMessage: string) => Promise<void>
    setReplyToComment: React.Dispatch<React.SetStateAction<boolean>>
    postComment: (commentId: string, parentId?: string) => Promise<any>
}

export function SecondaryInputBox({ label, comment, commentId ,setEditComment, editCommentHandler, setReplyToComment, postComment }: SecondaryInputBoxTypes) {
    const [userComment, setUserComment] = useState(comment);
    const [postButton, setPostButton] = useState(false);
    const buttonRef = useRef(postButton);

    const handlePostEditcomment = async () => {
        if (label == "Edit") {
            await editCommentHandler(commentId, userComment);
            setEditComment(false);
        } else if (label == "Reply") {
            await postComment(userComment, commentId);
            setReplyToComment(false);
        }
    };

    useEffect(() => {
        if (userComment.trim() == "" || userComment.trim() == comment) {
            buttonRef.current = false
        } else {
            buttonRef.current = true
        } 
        setPostButton(buttonRef.current);
    }, [userComment]);

    return (<div>
        <AutogrowTextarea 
            className="resize-none placeholder:text-gray-400 tracking-wide placeholder:font-light text-black bg-gray-100 rounded-md outline-none block w-full my-2 py-2 px-2"
            placeholder={label=="Reply" ? "Reply To Comment" : ""}
            value={userComment}
            onChange={(e) => {
                setUserComment(e.target.value)
            }}
        />
        <div className='w-full flex justify-end px-2'> 
            <div className='flex gap-2 w-full sm:w-1/3 '>
                <button disabled={!postButton}
                        className={`w-1/2 border-2 py-1 rounded-full font-semibold border-green-500 text-green-700 ${postButton ? "hover:bg-green-500 hover:text-white" : "opacity-50"} `}
                        onClick={() => {
                            handlePostEditcomment();
                            setEditComment(false);
                        }}        
                >
                    {label}
                </button>
                <button className='w-1/2 border-2 py-1 rounded-full font-semibold hover:bg-black hover:text-white hover:border-black'
                        onClick={() => {
                            setUserComment(comment)
                            setEditComment(false)
                            setReplyToComment(false)
                        }}        
                >
                    Cancel
                </button>
            </div>
         </div>
    </div>
)};