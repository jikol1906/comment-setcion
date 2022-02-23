import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";

interface CommentSkeletonProps {
  userInfo: React.ReactNode;
  text: React.ReactNode;
  buttons: React.ReactNode;
  score: number;
}

const CommentSkeleton: React.FunctionComponent<CommentSkeletonProps> = ({
  userInfo,
  text,
  buttons,
  score,
}) => {
  return (
    <CommentContainer>
      <div className="grid gap-4 grid-cols-[auto__1fr__auto]">
        <div className="col-span-full">{userInfo}</div>
        <div className="col-span-full">{text}</div>
        <div>
          <LikeDislikeButton score={score} />
        </div>
        <div className="flex col-start-3 space-x-2">
          {buttons}
        </div>
      </div>
    </CommentContainer>
  );
};

export default CommentSkeleton;
