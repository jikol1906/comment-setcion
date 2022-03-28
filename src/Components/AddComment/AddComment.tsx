import * as React from "react";
import data from "../../data.json";
import { useState } from "react";
import TextArea from "../TextArea/TextArea";
import CommentSkeleton from "../Comment/CommentSkeleton";
import { addComment } from "../../Firebase";
import { getDoc } from "firebase/firestore";

const currentUser = data.currentUser;

const AddComment: React.FunctionComponent<{
  replyingTo?: string;
  setReplyingTo?: React.Dispatch<React.SetStateAction<string>>;
}> = ({ replyingTo, setReplyingTo }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true)

    if (replyingTo) {
      await addComment(content, replyingTo);
    } else {      
      await addComment(content, null);
    }

    setLoading(false)

    if (setReplyingTo) {
      setReplyingTo("");
    }

    setContent("");
  };

  return (
    <CommentSkeleton>
      <form
        className="col-span-full md:col-start-2 md:col-end-3"
        id={replyingTo ? "replycommentform" : "sendcommentform"}
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
        className="w-9 md:col-start-1 md:row-start-1"
        src={`${process.env.PUBLIC_URL}${
          currentUser.image.webp.split("./")[1]
        }`}
      />
      <button
        type="submit"
        className="btn col-start-3 self-start btn-hover-styles md:col-start-3 md:row-start-1"
        form={replyingTo ? "replycommentform" : "sendcommentform"}
      >
        {replyingTo ? "Reply" : "Send"}
      </button>
    </CommentSkeleton>
  );
};

export default AddComment;
