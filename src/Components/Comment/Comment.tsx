/** @jsxImportSource theme-ui */

import { Avatar, Button, Heading, Text,Flex } from "theme-ui";
import { CommentProps } from "../../interfaces";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
import UserInfo from "../UserInfo";
import CommentSkeleton from "./CommentSkeleton";
import { buttonStyles } from "./CommentStyles";
import CommentText from "./CommentText";

interface ICommentProps extends CommentProps {
  onReplyButtonClicked : () => void
}

const Comment: React.FunctionComponent<ICommentProps> = ({onReplyButtonClicked, content,score,user}) => {
  return (
    <CommentSkeleton
      content={<CommentText text={content} />}
      likedislike={<LikeDislikeButton score={score} />}
      buttons={
        <>
          <Button
            variant="blank"
            sx={{ ...buttonStyles, color: "moderateblue" }}
            onClick={onReplyButtonClicked}
          >
            <svg
              sx={{ mr: "6px" }}
              width="14"
              height="13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
            </svg>
            Reply
          </Button>
        </>
      }
      userInfo={<UserInfo user={user}/>}
    />
  );
};

export default Comment;
