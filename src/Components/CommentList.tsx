import * as React from "react";
import * as FirestoreService from '../Firebase';
import CommentReplyThread from "../Layout/CommentReplyThread/CommentReplyThread";
import AddComment from "./AddComment/AddComment";
import Comment from "../Components/Comment/Comment";
import CurrentUserComment from "./Comment/CurrentUserComment";
import data from "../data.json";
import { Comment as IComment, ReplyInfo } from "../interfaces";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
const currentUser = data.currentUser;

interface ICommentListProps {
  comments: IComment[] | undefined;
  replyingTo: string;
  getReplies:(parentCommentId: string) => Promise<QuerySnapshot<DocumentData>>;
  deleteComment: (commentId: string) => void;
  setReplyingTo: (commentId: string) => void;
  reply: (commentId: string, replyInfo: ReplyInfo) => void;
}

const CommentList: React.FunctionComponent<ICommentListProps> = ({
  comments,
  replyingTo,
  deleteComment,
  setReplyingTo,
  reply,
}) => {
  let commentsRendered: JSX.Element[] = []; 
    
    const createComment = (c: IComment) => {
      const comment =
        c.user.username === currentUser.username ? (
          <CurrentUserComment
            {...c}
            onDeleteButtonClicked={() => deleteComment(c.id)}
          />
        ) : (
          <Comment onReplyButtonClicked={() => setReplyingTo(c.id)} {...c} />
        );

        if(c.hasReplies) {
          
        }
  
      return comment
      // replyingTo === c.id ? (
      //   <>
      //     <AddComment
      //       submit={() =>
      //         reply(c.id, {
      //           replyingToUsername: c.user.username,
      //           topLevelCommentId: c.id,
      //         })
      //       }
      //       replying
      //     />
      //   </>
      // ) : (
      //   comment
      // );
    };
  
    comments?.forEach((c) => {
      
      
      
      
      commentsRendered.push(
        <React.Fragment key={c.id}>{createComment(c)}</React.Fragment>
      );
    })
  
  
  

  
  //   if (c.replies.length > 0) {
  //     commentsRendered.push(
  //       <CommentReplyThread key={`r${c.id}`}>
  //         {c.replies.map((r) => {
  //           return (
  //             <React.Fragment key={r.id}>
  //                 {createComment(r)}
  //             </React.Fragment>
  //           );
  //         })}
  //       </CommentReplyThread>
  //     );
  //   }
  // });

 
  return <>{commentsRendered}</>  

}


export default CommentList;
