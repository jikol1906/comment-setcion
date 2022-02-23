import * as React from "react";
import CommentReplyThread from "../Layout/CommentReplyThread/CommentReplyThread";
import AddComment from "./AddComment/AddComment";
import Comment from "../Components/Comment/Comment";
import CurrentUserComment from "./Comment/CurrentUserComment";
import data from "../data.json";
import { Comment as IComment, Reply, ReplyInfo } from "../interfaces";
const currentUser = data.currentUser;

interface ICommentListProps {
  comments: IComment[];
  replyingTo: number;
  deleteComment: (commentId: number) => void;
  setReplyingTo: (commentId: number) => void;
  reply: (commentId: number, replyInfo: ReplyInfo) => void;
}

const CommentList: React.FunctionComponent<ICommentListProps> = ({
  comments,
  replyingTo,
  deleteComment,
  setReplyingTo,
  reply,
}) => {
  let commentsRendered: JSX.Element[] = [];

  const createComment = (c: IComment | Reply) => {
    const comment =
      c.user.username === currentUser.username ? (
        <CurrentUserComment
          {...c}
          onDeleteButtonClicked={() => deleteComment(c.id)}
        />
      ) : (
        <Comment onReplyButtonClicked={() => setReplyingTo(c.id)} {...c} />
      );

    return replyingTo === c.id ? (
      <>
        <AddComment
          submit={() =>
            reply(c.id, {
              replyingToUsername: c.user.username,
              topLevelCommentId: c.id,
            })
          }
          replying
        />
      </>
    ) : (
      comment
    );
  };

  comments.forEach((c) => {
    commentsRendered.push(
      <React.Fragment key={c.id}>{createComment(c)}</React.Fragment>
    );

    if (c.replies.length > 0) {
      commentsRendered.push(
        <CommentReplyThread key={`r${c.id}`}>
          {c.replies.map((r) => {
            return (
              <React.Fragment key={r.id}>
                  {createComment(r)}
              </React.Fragment>
            );
          })}
        </CommentReplyThread>
      );
    }
  });

  return <>{commentsRendered}</>;
};

export default CommentList;
