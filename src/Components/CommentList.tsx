import * as React from "react";
import * as FirestoreService from '../Firebase';
import { addDoc, collection, deleteDoc, doc, orderBy, query, serverTimestamp, Timestamp, updateDoc, where, writeBatch } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useCollectionData, useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import { db, deleteComment, updateComment } from "../Firebase";
import { Comment as IComment, User } from "../interfaces";
import CurrentUserComment from "./Comment/CurrentUserComment";
import Comment from "./Comment/Comment";
import CommentReplyList from "./CommentReplyList/CommentReplyList";
import ReplyList from "./ReplyList/ReplyList";
import { useState } from "react";
import AddComment from "./AddComment/AddComment";
import { formatDistance} from 'date-fns'
import Loadingspinner from "./Loadingspinner/MessageLoadingSpinner/Loadingspinner";
const auth = getAuth(FirestoreService.firebaseApp);



const CommentList: React.FunctionComponent = () => {

  const [user] = useAuthState(auth);

  const coll = collection(db,"comments")
  const userColl = collection(db,"users")
  const [replyingTo, setReplyingTo] = useState("")
  const [value, loading, error] = useCollection(
    query(coll,where("parentComment","==",null),where("commentThreadOwner","==",user?.uid),orderBy("score","desc"))  
  )
  
   
  const onReplyButtonClicked = (commentId:string) => {    
    setReplyingTo(commentId);
  }

  const updateButtonClicked = (commentId:string) => {
    return (updatedContent:string) => {
      return updateComment(commentId,updatedContent)
    }
  }

  const comments : JSX.Element[] = [];


  if(value) {
    value.forEach(v => {
      const c = v.data() as IComment
      const userInfo = c.user
      
      c.createdAt = formatDistance(v.data().createdAt.toDate(),new Date(),{ addSuffix: true })
      
      const commentProps = {
        ...c,
        userInfo,
        onReplyButtonClicked:() => onReplyButtonClicked(v.id),
      }

      const currentUserCommentProps = {
        ...c,
        userInfo,
        onDeleteButtonClicked: () => deleteComment(v.id),
        onUpdateSubmitted:updateButtonClicked(v.id)
      }

      const replyListProps = {
        
        onReplyButtonClicked,
        onUpdateSubmitted:updateButtonClicked,
        setReplyingTo,
        replyingTo
      }
      
      const replyingToComponent = replyingTo === v.id ? <AddComment replyingTo={v.id} setReplyingTo={setReplyingTo}/> : null
      const replyList = c.hasReplies ? <ReplyList parentCommentId={v.id} {...replyListProps}/> : null
        comments.push(
          c.user.username === 'juliusomo' ?
          <React.Fragment key={v.id}>
          <CurrentUserComment {...currentUserCommentProps}/>
          {replyList}
          </React.Fragment>
          :
          <React.Fragment key={v.id}>
          <Comment {...commentProps}/>
          {replyingToComponent}
          {replyList}
          </React.Fragment>
        )
      

    })
  }

  comments.push(<AddComment key={"addcomment"}/>)
 

  return <>
  {loading ? <Loadingspinner/> : comments}
  
  </>  

}


export default CommentList;
