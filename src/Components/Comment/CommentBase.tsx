/** @jsxImportSource theme-ui */
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import { Avatar, Flex } from "theme-ui";
import { User } from "../../interfaces";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
import CommentText from "./CommentText";

export interface ICommentBase {
  text: string;
  user: User;
  score: number;
}

const CommentBase: React.FunctionComponent<ICommentBase> = ({
  text,
  user,
  score,
  children,
}) => {
  return (
    <CommentContainer>
      <CommentText text={text} />
      <Avatar
        src={`${process.env.PUBLIC_URL}${user.image.webp.split("./")[1]}`}
      />
      {children}
      <Flex sx={{ gridArea: "likedislike" }}>
        <LikeDislikeButton score={score} />
      </Flex>
    </CommentContainer>
  );
};

export default CommentBase