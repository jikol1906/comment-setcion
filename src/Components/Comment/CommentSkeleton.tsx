import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";

//Component that is responsible for the layout of the comment
const CommentSkeleton: React.FunctionComponent = ({
  children,
}) => {
  return (
    <CommentContainer>
      <div className="grid gap-4 grid-cols-[auto__1fr__auto] md:gap-6">
        {children}
      </div>
    </CommentContainer>
  );
};

export default CommentSkeleton;
