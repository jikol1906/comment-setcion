import * as React from "react";
import { Avatar, Box, Button, Grid, Textarea } from "theme-ui";
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import data from '../../data.json'

const currentUser = data.currentUser;

const AddComment: React.FunctionComponent<{replying?:boolean}> = ({replying}) => {
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
        <Avatar style={{ gridArea: "avatar" }} src={`${process.env.PUBLIC_URL}${currentUser.image.webp.split("./")[1]}`} />
        <Box as="form" id="sendcommentform" style={{ gridArea: "textarea" }}>
          <Textarea rows={6}></Textarea>
        </Box>
        <Button type="submit" form="sendcommentform" style={{ gridArea: "sendbtn" }}>{replying ? "Reply" : "Send"}</Button>
      </Grid>
    </CommentContainer>
  );
};

export default AddComment;
