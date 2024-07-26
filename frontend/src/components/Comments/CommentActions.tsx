import { EditIcon, Ellipsis, ReplyIcon } from "lucide-react";
import RemoveIcon from "../icons/Remove";
import ClapButton from "../ClapButton";
import { Comment } from "@/types/comment";

interface CommentActionsProps {
    comment: Comment;
    likeComment: (commentId: string) => Promise<any>;
    deleteComment: (commentId: string) => Promise<any>;
    setEditComment: React.Dispatch<React.SetStateAction<boolean>>;
    setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
    setReplyToComment: React.Dispatch<React.SetStateAction<boolean>>;
    showReplies: boolean;
}

export function CommentActions({ comment, likeComment, deleteComment, setEditComment, setShowReplies, setReplyToComment, showReplies }: CommentActionsProps) {
    const user = JSON.parse(localStorage.getItem('user') || "{}" );

    const handleCommentLike = () => {
        likeComment(comment.id);
    }

    const handleEditComment = () => {
        setEditComment(true);
    }

    return (
        <div className='flex justify-between'>
            <div className='flex gap-2 font-semibold'>
                <div className='flex items-center hover:scale-105'>
                    <ClapButton clapCount={comment.claps?.length} handleClap={handleCommentLike} />
                </div>
                <div className="flex gap-1 hover:scale-105">
                    <button 
                        className="flex items-center"
                        onClick={() => {setReplyToComment(true)}}
                    >
                        <ReplyIcon /> 
                        Reply 
                    </button>
                </div>
                {comment.children?.length ? (
                    <div className="flex gap-1 hover:scale-105 text-sm">
                        <button
                            className="flex items-center"
                            onClick={() => {setShowReplies(!showReplies)}}
                        >
                            <Ellipsis className="flex items-baseline" /> 
                            {!showReplies ? "Show replies" : "Hide replies"}
                        </button>
                    </div>
                ) : (
                    <></>
                )}      
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
            ) : (
                <></>
            )}
        </div>
    );
};