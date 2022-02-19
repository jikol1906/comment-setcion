    import * as React from "react";
    import { Button, Grid, Textarea } from "theme-ui";
    import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
    import { useState } from "react";

    const AddComment: React.FunctionComponent<{
      add: (content: string) => void;
    }> = ({ add }) => {

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
              Send
            </Button>
          </Grid>
        </CommentContainer>
      );
    };

    export default AddComment;
