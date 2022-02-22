import { Grid } from "theme-ui";
import AddComment from "./Components/AddComment/AddComment";
import Comment from "./Components/Comment/Comment";
import CommentReplyThread from "./Layout/CommentReplyThread/CommentReplyThread";
import useComments from "./useComment";
import data from "./data.json";
import React from "react";
import CurrentUserComment from "./Components/Comment/CurrentUserComment";

const currentUser = data.currentUser;
/** @jsxImportSource theme-ui */

function App() {
  const { comments, replyingTo, setReplyingTo,reply, addComment,deleteComment } = useComments();

  let commentsRendered: JSX.Element[] = [];

  comments.forEach((c) => {
    
    commentsRendered.push(
      <React.Fragment key={c.id}>
        {c.user.username === currentUser.username ?
          <CurrentUserComment {...c} onDeleteButtonClicked={() => deleteComment(c.id)}/>:
          <Comment onReplyButtonClicked={() => setReplyingTo(c.id)} {...c} />
        }
        {replyingTo === c.id && <AddComment submit={reply(c.id,{replyingToUsername:c.user.username, topLevelCommentId:c.id})} replying />}
      </React.Fragment>
    );

    if (c.replies.length > 0) {
      commentsRendered.push(
        <CommentReplyThread key={`r${c.id}`}>
          {c.replies.map((r) => {
            return (
              <React.Fragment key={r.id}>
                {r.user.username === currentUser.username ? (
                  <CurrentUserComment
                    {...r}
                    onDeleteButtonClicked={() => deleteComment(r.id)}
                  />
                ) : (
                  <Comment
                    onReplyButtonClicked={() => setReplyingTo(r.id)}
                    {...r}
                  />
                )}
                {replyingTo === r.id && (
                  <AddComment
                    submit={reply(r.id, {
                      replyingToUsername: r.user.username,
                      topLevelCommentId: c.id,
                    })}
                    replying
                  />
                )}
              </React.Fragment>
            );
          })}
        </CommentReplyThread>
      );
    }
  });

  return (
    <div className="grid gap-2 p-4">
      {commentsRendered}
      <AddComment submit={addComment} />
    </div>
  );
}

export default App;
