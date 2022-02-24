import AddComment from "./Components/AddComment/AddComment";
import useComments from "./useComment";
import CommentList from "./Components/CommentList";
import * as FirestoreService from './Firebase';
import { useEffect } from "react";

function App() {
  const { comments, replyingTo, setReplyingTo,reply, addComment,deleteComment } = useComments();

  useEffect(() => {
    FirestoreService.authenticateAnonymously()
  },[])

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
