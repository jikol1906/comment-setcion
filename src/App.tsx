import AddComment from "./Components/AddComment/AddComment";
import useComments from "./useComment";
import CommentList from "./Components/CommentList";
import * as FirestoreService from "./Firebase";
import { useEffect, useState } from "react";
import { signInAnonymously, User } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseApp } from "./Firebase";

const auth = getAuth(firebaseApp);
function App() {

  const [user, loading, error] = useAuthState(auth);
  
  
  // const {
  //   comments,
  //   replyingTo,
  //   setReplyingTo,
  //   reply,
  //   getReplies,
  //   addComment,
  //   deleteComment,
  // } = useComments();
  
  useEffect(() => {
    signInAnonymously(auth)
  },[])

  useEffect(() => {
    if(user) {
      FirestoreService.seedDatabase(user.uid)
    }
  },[user])
 
  
  return (
    <div className="grid gap-2 p-2 max-w-4xl mx-auto py-20">
      {/* <CommentList
        comments={comments}
        getReplies={getReplies}
        deleteComment={deleteComment}
        reply={reply}
        setReplyingTo={setReplyingTo}
        replyingTo={""}
      /> */}
      {/* <AddComment submit={addComment} /> */}
    </div>
  );
}

export default App;
