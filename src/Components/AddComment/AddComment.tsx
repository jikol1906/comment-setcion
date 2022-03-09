import * as React from "react";
import data from "../../data.json";
import { useState } from "react";
import TextArea from "../TextArea/TextArea";
import CommentSkeleton from "../Comment/CommentSkeleton";
import { addComment } from "../../Firebase";

const currentUser = data.currentUser;

const AddComment: React.FunctionComponent<{

  replyingTo?:string;
  setReplyingTo?:React.Dispatch<React.SetStateAction<string>>;
  
}> = ({ replyingTo,setReplyingTo }) => {

  const [content, setContent] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(replyingTo) {
      addComment(content,replyingTo)
    } else {
      addComment(content,null)
    }

    if(setReplyingTo) {
      setReplyingTo("")
    }

    setContent("")
    
  };

  return (
    <CommentSkeleton>
      <form
        className="col-span-full"
        id={replyingTo ? "replycommentform":"sendcommentform"}
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
        form={replyingTo ? "replycommentform":"sendcommentform"}
      >
          {replyingTo ? "Reply" : "Send"}
      </button>
    </CommentSkeleton>
  );
};

export default AddComment;
