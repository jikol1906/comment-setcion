import { Grid } from "theme-ui";
import AddComment from "./Components/AddComment/AddComment";
import Comment from "./Components/Comment/Comment";
import CommentReplyThread from "./Layout/CommentReplyThread/CommentReplyThread";
import useComments from "./useComment";
import data from "./data.json";
import React, { useEffect } from "react";

const currentUser = data.currentUser;
/** @jsxImportSource theme-ui */

    function App() {
        const { comments, replyingTo, setReplyingTo } = useComments();
      
  let commentsRendered: JSX.Element[] = [];

  const addComment = (content:string) => {
    console.log('adding', content);
    
  }

  comments.forEach((c) => {
    commentsRendered.push(
      <React.Fragment key={c.id}>
        <Comment
          isCurrentUser={c.user.username === currentUser.username}
          onReplyButtonClicked={() => setReplyingTo(c.id)}
          {...c}
        />
        {replyingTo === c.id && <AddComment add={addComment} replying/>}
      </React.Fragment>
    );

    if (c.replies.length > 0) {
      commentsRendered.push(
        <CommentReplyThread key={`r${c.id}`}>
          {c.replies.map((r) => (
            <React.Fragment key={r.id}>
              <Comment
                isCurrentUser={r.user.username === currentUser.username}
                {...r}
                replyingTo={r.replyingTo}
                onReplyButtonClicked={() => setReplyingTo(r.id)}
              />
              {replyingTo === r.id && <AddComment add={addComment} replying/>}
            </React.Fragment>
          ))}
        </CommentReplyThread>
      );
    }
  });
  



    return (
      <Grid p="1" gap="1">
        {commentsRendered}
        <AddComment add={addComment}/>
      </Grid>
    );
}

export default App;
