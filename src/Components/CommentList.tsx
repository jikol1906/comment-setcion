import * as React from "react";
import * as FirestoreService from '../Firebase';
import { collection, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../Firebase";
import { Comment as IComment } from "../interfaces";
import CurrentUserComment from "./Comment/CurrentUserComment";
import Comment from "./Comment/Comment";
import CommentReplyList from "./CommentReplyList/CommentReplyList";
import ReplyList from "./ReplyList/ReplyList";
const auth = getAuth(FirestoreService.firebaseApp);



const CommentList: React.FunctionComponent = () => {

  const [user] = useAuthState(auth);

  const coll = collection(db,user!.uid)
  
  const [value, loading, error] = useCollection(query(coll,where("parentComment","==",null)))
  
  const onDeleteButtonClicked = () => {

  }
   
  const onReplyButtonClicked = () => {

  }

  const comments : JSX.Element[] = [];


  if(value) {
    value.forEach(v => {
      const c = v.data() as IComment

      if(c.hasReplies) {
        const replyList = <ReplyList parentCommentId={v.id} onDeleteButtonClicked={onDeleteButtonClicked} onReplyButtonClicked={onReplyButtonClicked}/>   
        comments.push(
          user?.uid === c.user.userId ?
          <>
          <CurrentUserComment {...c} onDeleteButtonClicked={onDeleteButtonClicked}/>
          {replyList}
          </>
          :
          <>
          <Comment {...c} onReplyButtonClicked={onReplyButtonClicked}/>
          {replyList}
          </>
        )

      } else {
        comments.push(
          user?.uid === c.user.userId ?
          <CurrentUserComment {...c} onDeleteButtonClicked={onDeleteButtonClicked}/>
          :
          <Comment {...c} onReplyButtonClicked={onReplyButtonClicked}/>
        )
      }

    })
  }
 

  return <>{comments}</>  

}


export default CommentList;
