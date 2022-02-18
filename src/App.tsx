import { Grid } from "theme-ui";
import AddComment from "./Components/AddComment/AddComment";
import CommentReplyThread from "./Layout/CommentReplyThread/CommentReplyThread";
import useComments from "./useComment";



/** @jsxImportSource theme-ui */

function App() {

  const comments = useComments();  

  
  
  

  return (
    <Grid p="1" gap="1">
      {/* <Comment isCurrentUser />
      <Comment isEditing /> */}
      <CommentReplyThread>
        {/* <Comment />
        <Comment /> */}
      </CommentReplyThread>
      <AddComment/>

    </Grid>
  );
}

export default App;
