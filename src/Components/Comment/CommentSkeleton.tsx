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
      {/* <div className="grid gap-4 grid-cols-[auto__1fr__auto] md:gap-6">
        <div className="col-span-full md:col-start-2 md:col-end-3">{userInfo}</div>
        <div className="col-span-full md:col-start-2 md:col-end-4">{content}</div>
        <div className="md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3">
          <LikeDislikeButton score={score} />
        </div>
        <div className="flex col-start-3 space-x-2 md:row-start-1 md:row-end-2">
          {buttons}
        </div>
      </div> */}
    </CommentContainer>
  );
};

export default CommentSkeleton;
