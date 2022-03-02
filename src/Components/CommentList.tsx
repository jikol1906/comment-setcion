import * as React from "react";
import * as FirestoreService from '../Firebase';
import { addDoc, collection, deleteDoc, doc, query, serverTimestamp, Timestamp, updateDoc, where, writeBatch } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../Firebase";
import { Comment as IComment, User } from "../interfaces";
import CurrentUserComment from "./Comment/CurrentUserComment";
import Comment from "./Comment/Comment";
import CommentReplyList from "./CommentReplyList/CommentReplyList";
import ReplyList from "./ReplyList/ReplyList";
import { useState } from "react";
import Loadingspinner from "./Loadingspinner/Loadingspinner";
import AddComment from "./AddComment/AddComment";
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

  const addComment = async (content:string,replyingTo:string|null = null) => {

    const currentUser : User ={
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
      userId:user!.uid
    }

    const comment : Partial<IComment> = {
      content,
      createdAt:serverTimestamp(),
      user:currentUser,
      score:0,
      parentComment:replyingTo,
      hasReplies:false
    }

    await addDoc(coll,comment)

    if(replyingTo) {
      await updateDoc(doc(db,user!.uid,replyingTo),{
        hasReplies:true
      })
    }
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
      
      const replyingToComponent = replyingTo === v.id ? <AddComment replyingTo={v.id} addComment={addComment}/> : null
      if(c.hasReplies) {
        const replyList = <ReplyList parentCommentId={v.id} {...replyListProps}/>
        comments.push(
          user?.uid === c.user.userId ?
          <React.Fragment key={v.id}>
          <CurrentUserComment  {...currentUserCommentProps}/>
          {replyingToComponent}
          {replyList}
          </React.Fragment>
          :
          <React.Fragment key={v.id}>
          <Comment {...commentProps}/>
          {replyingToComponent}
          {replyList}
          </React.Fragment>
        )

      } else {
        comments.push(
          user?.uid === c.user.userId ?
          <>
          <CurrentUserComment key={v.id} {...currentUserCommentProps}/>
          {replyingToComponent}
          </>
          :
          <>
          <Comment key={v.id} {...commentProps}/>
          {replyingToComponent}
          </>
        )
      }

    })
  }

  comments.push(<AddComment addComment={addComment}/>)
 

  return <>
  {loading ? <Loadingspinner/> : comments}
  
  </>  

}


export default CommentList;
