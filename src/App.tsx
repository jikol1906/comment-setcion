import { Box, Grid } from "theme-ui";
import Comment from "./Components/Comment/Comment";
/** @jsxImportSource theme-ui */

function App() {
  return (
    <Grid p="1" gap="1">
      <Comment/>
      <Comment/>
    </Grid>
  );
}

export default App;
