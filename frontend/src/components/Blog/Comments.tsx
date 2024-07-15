import { PostCommentBox } from '../PostCommentBox';
import { CommentList } from '../CommentList';

export function Comments(){

    return (
    <>
       <div className='px-2 border-b-2 text-2xl font-bold w-full'>
         Comments
       </div>
       <PostCommentBox />
       <CommentList />
    </>
)};