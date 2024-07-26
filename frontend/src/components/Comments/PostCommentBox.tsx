import { useEffect, useRef, useState } from "react";
import AutogrowTextarea from "../AutogrowTextarea"
import Avatar from "../Avatar"
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useComments } from "@/hooks";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.bubble.css';
// import "react-quill/dist/quill.snow.css"

export function PostCommentBox() {
    // const modules = {
    //     toolbar: {
    //         container: [
    //             ['bold', 'italic', 'underline'],
    //             [{ header: '1' }, { header: '2' }],
    //             [{ color: [] }, { background: [] }],
    //         ],
    //     }
    // }

    const { id } = useParams();
    const { postComment } = useComments({ postId: id || "" });
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [comment, setComment] = useState("");
    const [postButton, setPostButton] = useState(false);
    const buttonRef = useRef(postButton);

    useEffect(() => {
        if (comment.trim() == "") {
            buttonRef.current = false
        } else {
            buttonRef.current = true
        } 
        setPostButton(buttonRef.current)
    }, [comment]);
    
    const handlePostComment = async () => {
        try {
            await postComment(comment);
            setComment("");
        } catch(error) {
            toast.error("");
        }
    };

    return (<>
        <div className='w-full py-2 items-center'>
          <div className='p-2 border shadow-md rounded-md'>
            <div className="flex px-2 gap-2 w-full">
              <div className='py-5 w-10'>
                  <Avatar name={user.name} imageSrc={user.profilePic} />
              </div>
              <div className='flex-col px-2 items-center gap-2 w-full'>
                <AutogrowTextarea
                    id="Comment"
                    className="resize-none placeholder:text-gray-400 tracking-wide placeholder:font-light text-black bg-gray-100 rounded-md outline-none block w-full my-2 py-2 px-2"
                    placeholder="Add comment"
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value)
                    }}
                    >
                </AutogrowTextarea>
                {/* <ReactQuill
                    theme='snow'
                    placeholder="Add comment"
                    className="tracking-wide text-main bg-main font-light custom-quill w-full m-2"
                    modules={modules}
                ></ReactQuill> */}
                <div className='w-full flex justify-end px-2'>
                  {postButton ?  (
                    <div className='flex gap-2 w-full sm:w-1/3'>
                      <button disabled={!postButton}
                              className='w-1/2 border-2 py-1 rounded-full font-semibold border-green-500 text-green-700 hover:bg-green-500 hover:text-white'
                              onClick={handlePostComment}        
                      >
                          Post
                      </button>
                      <button className='w-1/2 border-2 py-1 rounded-full font-semibold hover:bg-black hover:text-white hover:border-black'
                              onClick={() => setComment('')}        
                      >
                          Cancel
                      </button>
                    </div>
                  ) : (
                      <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>)
};