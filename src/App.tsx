import AddComment from "./Components/AddComment/AddComment";
import useComments from "./useComment";
import CommentList from "./Components/CommentList";
import * as FirestoreService from './Firebase';
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

function App() {
  const { comments, replyingTo, setReplyingTo,reply, addComment,deleteComment } = useComments();
  const [user,setUser] = useState<User>()

  useEffect(() => {
    FirestoreService.authenticateAnonymously().then(user => {
      setUser(user.user)
    })
  },[])
  
  useEffect(() => {

    if(user) {
      FirestoreService.seedDatabase(user.uid)
    }
  },[user])

  return (
    <div className="grid gap-2 p-2 max-w-4xl mx-auto py-20">
      <CommentList
        comments={comments}
        deleteComment={deleteComment}
        reply={reply}
        setReplyingTo={setReplyingTo}
        replyingTo={replyingTo}
      />
      <AddComment submit={addComment} />
    </div>
  );
}

export default App;
