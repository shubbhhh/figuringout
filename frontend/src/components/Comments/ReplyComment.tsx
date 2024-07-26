import { Comment } from "@/types/comment";
import { SecondaryInputBox } from "./SecondaryInputBox";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar";

interface ReplyBoxProps {
    replyToComment: boolean;
    setReplyToComment: React.Dispatch<React.SetStateAction<boolean>>;
    comment: Comment;
    postComment: (commentId: string, parentId?: string) => Promise<any>;
    setEditComment: React.Dispatch<React.SetStateAction<boolean>>;
    editCommentHandler: (commentId: string, newMessage: string) => Promise<void>;
}


export function ReplyBox({ replyToComment, setReplyToComment, comment, postComment, setEditComment, editCommentHandler }: ReplyBoxProps) {
    
    return (
        replyToComment && (
            <div className="ml-8 my-2 pl-5 border-l">
                <SecondaryInputBox
                    label="Reply"
                    comment=""
                    commentId={comment.id}
                    postComment={postComment}
                    setEditComment={setEditComment}
                    editCommentHandler={editCommentHandler}
                    setReplyToComment={setReplyToComment}
                />
            </div>
        )
    );
}

interface RepliesSectionProps {
    showReplies: boolean;
    comment: Comment;
}

export function RepliesSection({ showReplies, comment }: RepliesSectionProps) {
    return (
        showReplies && (
            <div className="ml-8 my-2 pl-5 border-l">
                {comment.children.map((childComment, index) => (
                    <RepliedCommentCard key={index} comment={childComment} />
                ))}
            </div>
        )
    );
}

interface RepliedCommentCardProps {
    comment: Comment;
}

function RepliedCommentCard({ comment }: RepliedCommentCardProps) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex items-center">
                <Avatar
                    name={comment.user?.name || ""} 
                    imageSrc={comment.user?.profilePic || ""} 
                    size='small'
                    onClick={() => navigate(`/profile/${comment.userId}`)}
                />
                <div className="p-1">
                    {comment.user?.name}
                </div>
            </div>
            <div className="ml-3 pl-3 border-l">
                {comment.message}
            </div>
        </div>
    );
}