import * as React from "react";
import { Avatar, Box, Button, Grid, Textarea } from "theme-ui";
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import data from "../../data.json";
import { useState } from "react";

const currentUser = data.currentUser;

const AddComment: React.FunctionComponent<{
  replying?: boolean;
  add: (content: string) => void;
}> = ({ replying, add }) => {

  const [content, setContent] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(content);

    add(content);
  };

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
        <Avatar
          style={{ gridArea: "avatar" }}
          src={`${process.env.PUBLIC_URL}${
            currentUser.image.webp.split("./")[1]
          }`}
        />
        <form
          id="sendcommentform"
          style={{ gridArea: "textarea" }}
          onSubmit={(e) => submitHandler(e)}
        >
          <Textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Textarea>
        </form>
        <Button
          type="submit"
          form="sendcommentform"
          style={{ gridArea: "sendbtn" }}
        >
          {replying ? "Reply" : "Send"}
        </Button>
      </Grid>
    </CommentContainer>
  );
};

export default AddComment;
