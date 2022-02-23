import AddComment from "./Components/AddComment/AddComment";
import Comment from "./Components/Comment/Comment";
import CommentReplyThread from "./Layout/CommentReplyThread/CommentReplyThread";
import useComments from "./useComment";
import data from "./data.json";
import React from "react";
import CurrentUserComment from "./Components/Comment/CurrentUserComment";
import CommentList from "./Components/CommentList";

const currentUser = data.currentUser;


function App() {
  const { comments, replyingTo, setReplyingTo,reply, addComment,deleteComment } = useComments();

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
