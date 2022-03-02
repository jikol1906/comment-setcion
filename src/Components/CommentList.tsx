import * as React from "react";
import * as FirestoreService from '../Firebase';
import { collection, deleteDoc, doc, query, updateDoc, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../Firebase";
import { Comment as IComment } from "../interfaces";
import CurrentUserComment from "./Comment/CurrentUserComment";
import Comment from "./Comment/Comment";
import CommentReplyList from "./CommentReplyList/CommentReplyList";
import ReplyList from "./ReplyList/ReplyList";
import { useState } from "react";
import Loadingspinner from "./Loadingspinner/Loadingspinner";
const auth = getAuth(FirestoreService.firebaseApp);



const CommentList: React.FunctionComponent = () => {

  const [user] = useAuthState(auth);

  const coll = collection(db,user!.uid)
  const [replyingTo, setReplyingTo] = useState("")
  const [value, loading, error] = useCollection(query(coll,where("parentComment","==",null)))
  
  const onDeleteButtonClicked = async (commentId:string) => {
    await deleteDoc(doc(db, user!.uid,commentId));
  }
   
  const onReplyButtonClicked = (commentId:string) => {    
    setReplyingTo(commentId);
  }

  const updateButtonClicked = (commentId:string) => {
    return async (updatedContent:string) => {
      await updateDoc(doc(db, user!.uid,commentId),{
        content:updatedContent
      });
    }
  }

  const comments : JSX.Element[] = [];


  if(value) {
    value.forEach(v => {
      const c = v.data() as IComment

      const commentProps = {
        ...c,
        onReplyButtonClicked:() => onReplyButtonClicked(v.id),
      }

      const currentUserCommentProps = {
        ...c,
        onDeleteButtonClicked: () => onDeleteButtonClicked(v.id),
        onUpdateSubmitted:updateButtonClicked(v.id)
      }

      const replyListProps = {
        onReplyButtonClicked,
        onDeleteButtonClicked,
        onUpdateSubmitted:updateButtonClicked,
        replyingTo
      }

      if(c.hasReplies) {
        const replyList = <ReplyList parentCommentId={v.id} {...replyListProps}/>   
        comments.push(
          user?.uid === c.user.userId ?
          <React.Fragment key={v.id}>
          <CurrentUserComment  {...currentUserCommentProps}/>
          {replyList}
          </React.Fragment>
          :
          <React.Fragment key={v.id}>
          <Comment {...commentProps}/>
          {replyList}
          </React.Fragment>
        )

      } else {
        comments.push(
          user?.uid === c.user.userId ?
          <CurrentUserComment key={v.id} {...currentUserCommentProps}/>
          :
          <Comment key={v.id} {...commentProps}/>
        )
      }

    })
  }
 

  return <>
  {loading ? <Loadingspinner/> : comments}
  
  </>  

}


export default CommentList;
