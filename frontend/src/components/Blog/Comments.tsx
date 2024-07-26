import { PostCommentBox } from '../Comments/PostCommentBox';
import { CommentList } from '../Comments/CommentList';

export function Comments(){

    return (
    <div className='mt-3'>
       <div className='p-2 border-b-2 text-2xl font-bold w-full'>
         Comments
       </div>
       <PostCommentBox />
       <CommentList />
    </div>
)};