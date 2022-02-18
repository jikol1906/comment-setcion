import { Box, Flex, Grid } from "theme-ui";
import AddComment from "./Components/AddComment/AddComment";
import Comment from "./Components/Comment/Comment";
import CommentReplyThread from "./Layout/CommentReplyThread/CommentReplyThread";
/** @jsxImportSource theme-ui */

function App() {
  return (
    <Grid p="1" gap="1">
      <Comment isCurrentUser />
      <Comment isEditing />
      <CommentReplyThread>
        <Comment />
        <Comment />
      </CommentReplyThread>
      <AddComment/>

    </Grid>
  );
}

export default App;
