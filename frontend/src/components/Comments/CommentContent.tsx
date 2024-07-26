import { Comment } from "@/types/comment";
import { SecondaryInputBox } from "./SecondaryInputBox";

interface CommentContentProps {
    comment: Comment;
    editCommet: boolean;
    postComment: (commentId: string, parentId?: string) => Promise<any>;
    editComment: (commentId: string, newMessage: string) => Promise<any>;
    setEditComment: React.Dispatch<React.SetStateAction<boolean>>;
    setReplyToComment: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CommentContent({ comment, editCommet, setEditComment, postComment, editComment, setReplyToComment }: CommentContentProps) {
    return (
        <div className='border-l w-full mx-2 px-2 py-1 text-pretty break-words'>
            {editCommet ? (
                <SecondaryInputBox 
                    label="Edit"
                    comment={comment.message} 
                    commentId={comment.id}
                    postComment={postComment}
                    setEditComment={setEditComment} 
                    editCommentHandler={editComment}
                    setReplyToComment={setReplyToComment}
                />
            ) : (
                <div className="my-1">
                    {comment.message}
                </div>
            )}
        </div>
    );
}