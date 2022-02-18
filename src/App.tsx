import { Grid } from "theme-ui";
import AddComment from "./Components/AddComment/AddComment";
import Comment from "./Components/Comment/Comment";
import CommentReplyThread from "./Layout/CommentReplyThread/CommentReplyThread";
import useComments from "./useComment";
import data from "./data.json";
import { useEffect } from "react";

const currentUser = data.currentUser;
/** @jsxImportSource theme-ui */

function App() {
  const { comments, replyingTo } = useComments();

  let commentsRendered: JSX.Element[] = [];

  comments.forEach((c) => {
    commentsRendered.push(
      <>
        <Comment
          isCurrentUser={c.user.username === currentUser.username}
          key={c.id}
          {...c}
        />
        {replyingTo === c.id && <AddComment/>}
      </>
    );

    if (c.replies.length > 0) {
      commentsRendered.push(
        <CommentReplyThread key={`r${c.id}`}>
          {c.replies.map((r) => (
            <>
              <Comment
                isCurrentUser={r.user.username === currentUser.username}
                key={r.id}
                {...r}
                replyingTo={r.replyingTo}
              />
              {replyingTo === r.id && <AddComment/>}
            </>
          ))}
        </CommentReplyThread>
      );
    }
  });

  return (
    <Grid p="1" gap="1">
      {commentsRendered}
    </Grid>
  );
}

export default App;
