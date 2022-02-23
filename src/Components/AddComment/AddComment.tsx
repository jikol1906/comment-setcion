import * as React from "react";
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import data from "../../data.json";
import { useState } from "react";
import TextArea from "../TextArea/TextArea";

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
          <TextArea
            required
            placeholder="Add a comment..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></TextArea>
        </form>
        <img
          className="w-9"
          src={`${process.env.PUBLIC_URL}${
            currentUser.image.webp.split("./")[1]
          }`}
        />
        <button
          type="submit"
          className="btn col-start-3 self-center btn-hover-styles"
          form={replying ? "replycommentform":"sendcommentform"}
        >
            {replying ? "Reply" : "Send"}
        </button>
      </div>
    </CommentContainer>
  );
};

export default AddComment;
