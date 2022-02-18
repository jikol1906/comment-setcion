import * as React from "react";
import { Avatar, Box, Button, Grid, Textarea } from "theme-ui";
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import img from "../../images/avatars/image-amyrobson.png";

interface IAddCommentProps {}

const AddComment: React.FunctionComponent<IAddCommentProps> = (props) => {
  return (
    <CommentContainer>
      <Grid
        gap={1}
        sx={{
          gridTemplateAreas: `
          "textarea textarea textarea"
          "avatar   .       sendbtn"
          `,
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "flex-start",
        }}
      >
        <Avatar style={{ gridArea: "avatar" }} src={img} />
        <Box as="form" id="sendcommentform" style={{ gridArea: "textarea" }}>
          <Textarea rows={6}></Textarea>
        </Box>
        <Button type="submit" form="sendcommentform" style={{ gridArea: "sendbtn" }}>Send</Button>
      </Grid>
    </CommentContainer>
  );
};

export default AddComment;
