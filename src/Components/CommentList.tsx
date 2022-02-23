import * as React from "react";
import CommentReplyThread from "../Layout/CommentReplyThread/CommentReplyThread";
import AddComment from "./AddComment/AddComment";
import Comment from "../Components/Comment/Comment";
import CurrentUserComment from "./Comment/CurrentUserComment";
import data from "../data.json";
import { Comment as IComment, ReplyInfo } from '../interfaces'
const currentUser = data.currentUser;

interface ICommentListProps {
  comments: IComment[];
  replyingTo: number;
  deleteComment: (commentId:number) => void;
  setReplyingTo: (commentId:number) => void;
  reply:(commentId: number, replyInfo: ReplyInfo) => void
}

const CommentList: React.FunctionComponent<ICommentListProps> = ({
  comments,
  replyingTo,
  deleteComment,
  setReplyingTo,
  reply
}) => {
  let commentsRendered: JSX.Element[] = [];

  comments.forEach((c) => {
    commentsRendered.push(
      <React.Fragment key={c.id}>
        {c.user.username === currentUser.username ? (
          <CurrentUserComment
            {...c}
            onDeleteButtonClicked={() => deleteComment(c.id)}
          />
        ) : (
          <Comment onReplyButtonClicked={() => setReplyingTo(c.id)} {...c} />
        )}
        {replyingTo === c.id && (
          <AddComment
            submit={() => reply(c.id, {
              replyingToUsername: c.user.username,
              topLevelCommentId: c.id,
            })}
            replying
          />
        )}
      </React.Fragment>
    );

    if (c.replies.length > 0) {
      commentsRendered.push(
        <CommentReplyThread key={`r${c.id}`}>
          {c.replies.map((r) => {
            return (
              <React.Fragment key={r.id}>
                {r.user.username === currentUser.username ? (
                  <CurrentUserComment
                    {...r}
                    onDeleteButtonClicked={() => deleteComment(r.id)}
                  />
                ) : (
                  <Comment
                    onReplyButtonClicked={() => setReplyingTo(r.id)}
                    {...r}
                  />
                )}
                {replyingTo === r.id && (
                  <AddComment
                    submit={() => reply(r.id, {
                      replyingToUsername: r.user.username,
                      topLevelCommentId: c.id,
                    })}
                    replying
                  />
                )}
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
