import { Comment } from "@/types/comment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RepliesSection, ReplyBox } from "./ReplyComment";
import { CommentActions } from "./CommentActions";
import { CommentContent } from "./CommentContent";
import Avatar from "../Avatar";

interface SingleCommentInput {
    index: number
    comment: Comment
    postComment: (commentId: string, parentId?: string) => Promise<any>;
    deleteComment: (commentId: string) => Promise<any>;
    editComment: (commentId: string, newMessage: string) => Promise<any>;
    likeComment: (commentId: string) => Promise<any>;
};

export function SingleComment({ index, comment, postComment, deleteComment, editComment, likeComment }: SingleCommentInput) {
    const [editCommet, setEditComment] = useState(false);
    const [replyToComment, setReplyTocomment] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    return (
        <div key={`${index}`} className='flex-col gap-2 items-center p-2'>
            <div className="flex items-center w-full">
                <AvatarWithName name={comment.user?.name || ""} imageSrc={comment.user?.profilePic || ""} userId={comment.userId || ""} />
            </div>
            <CommentContent
                comment={comment}
                editCommet={editCommet}
                setEditComment={setEditComment}
                postComment={postComment}
                editComment={editComment}
                setReplyToComment={setReplyTocomment}
            />
            <CommentActions
                comment={comment}
                likeComment={likeComment}
                deleteComment={deleteComment}
                setReplyToComment={setReplyTocomment}
                setShowReplies={setShowReplies}
                showReplies={showReplies}
                setEditComment={setEditComment}
            />
            <ReplyBox
                replyToComment={replyToComment}
                setReplyToComment={setReplyTocomment}
                comment={comment}
                postComment={postComment}
                setEditComment={setEditComment}
                editCommentHandler={editComment}
            />
            <RepliesSection
                showReplies={showReplies}
                comment={comment}
            />
        </div>
    );
};

interface AvatarWithName {
    name: string
    imageSrc: string
    userId: string
};

function AvatarWithName({ name, imageSrc, userId }: AvatarWithName) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center">
            <Avatar 
                name={name || ""} 
                imageSrc={imageSrc || ""} 
                size='small'
                onClick={() => navigate(`/profile/${userId}`)}
            />
            <div className="p-1">
                {name}
            </div>
        </div>
    );
};