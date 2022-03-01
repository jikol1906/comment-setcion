import * as React from "react";
import data from "../../data.json";
import { useState } from "react";
import TextArea from "../TextArea/TextArea";
import CommentSkeleton from "../Comment/CommentSkeleton";

const currentUser = data.currentUser;

const AddComment: React.FunctionComponent<{
  replying?: boolean;
  
}> = ({ replying }) => {

  const [content, setContent] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    
    
  };

  return (
    <CommentSkeleton>
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
    </CommentSkeleton>
  );
};

export default AddComment;
