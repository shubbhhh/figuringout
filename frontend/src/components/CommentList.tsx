import { useComments } from "@/hooks";
import { useParams } from "react-router-dom";
import { SingleComment } from "./SingleComment";
// import { useEffect } from "react"; 

export function CommentList() {
    const { id } = useParams();
    const { loading, allComments, page, totalPages, deleteComment, editComment, likeComment, handleLoadMoreComments } = useComments({ postId: id || '' });

    return (
    <div className="flex flex-col items-center w-full">
      <div className='flex flex-col gap-2 w-full justify-center p-2 border-x'>
          {allComments.length ? (
            <>
              {allComments.map((comment, index) => 
                <SingleComment
                    key={comment.id}
                    index={index} 
                    comment={comment} 
                    deleteComment={deleteComment}
                    editComment={editComment}
                    likeComment={likeComment}
                />
              )}
              {loading? (
                <div className="w-full items-center">
                    Loading...
                </div>
            ) : ( 
              <>
                {page < totalPages ? (
                    <button
                        className='w-full font-semibold hover:underline'
                        onClick={handleLoadMoreComments}
                    >
                        Read more
                    </button>
                ) : (
                <></>
                )}
              </>)}
            </>
            ) : (
              <div className="flex justify-center items-center">
                  No comments yet.
              </div>
            )
          }
      </div>
    </div>)
};
