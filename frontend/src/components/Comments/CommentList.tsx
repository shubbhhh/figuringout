import { useComments } from "@/hooks";
import { useParams } from "react-router-dom";
import { SingleComment } from "./SingleComment";
import Spinner from "../Spinner";

export function CommentList() {
    const { id } = useParams();
    const { loading, allComments, page, totalPages, postComment, deleteComment, editComment, likeComment, handleLoadMoreComments, refresh } = useComments({ postId: id || '' });

    return (
    <div className="flex flex-col items-center w-full">
      <button onClick={refresh}>Refresh</button>
      <div className='flex flex-col gap-2 w-full justify-center p-2 border-x'>
          {allComments.length ? (
            <>
              {allComments.map((comment, index) => 
                <SingleComment
                    key={comment.id}
                    index={index} 
                    comment={comment}
                    postComment={postComment}
                    deleteComment={deleteComment}
                    editComment={editComment}
                    likeComment={likeComment}
                />
              )}
              {loading? (
                <div className="flex justify-center w-full items-center">
                    <Spinner />
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
