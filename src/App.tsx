import { Box, Flex, Grid } from "theme-ui";
import Comment from "./Components/Comment/Comment";
import CommentReplyThread from "./Layout/CommentReplyThread/CommentReplyThread";
/** @jsxImportSource theme-ui */

function App() {
  return (
    <Grid p="1" gap="1">
      <Comment />
      <Comment />
      <CommentReplyThread>
        <Comment />
        <Comment />
      </CommentReplyThread>

    </Grid>
  );
}

export default App;
