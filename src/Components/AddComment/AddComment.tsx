import * as React from "react";
import { Avatar, Box, Button, Grid, Textarea } from "theme-ui";
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import data from "../../data.json";
import { useState } from "react";

const currentUser = data.currentUser;

const AddComment: React.FunctionComponent<{
  replying?: boolean;
  submit: (content: string) => void;
}> = ({ replying, submit }) => {

  const [content, setContent] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(content);
    
    submit(content);
  };

  return (
    <CommentContainer>
      <div className="grid gap-2 grid-cols-[auto__1fr__auto]">
        <form
          className="col-span-full"
          id={replying ? "replycommentform":"sendcommentform"}
          onSubmit={(e) => submitHandler(e)}
        >
          <textarea
            required
            placeholder="Add a comment..."
            className="w-full border-2 border-gray-200 resize-none rounded-lg p-4"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </form>
        <img
          className="w-9"
          src={`${process.env.PUBLIC_URL}${
            currentUser.image.webp.split("./")[1]
          }`}
        />
        <button
          type="submit"
          className="btn col-start-3 self-center"
          form={replying ? "replycommentform":"sendcommentform"}
        >
          {replying ? "Reply" : "Send"}
        </button>
      </div>
    </CommentContainer>
  );
};

export default AddComment;
