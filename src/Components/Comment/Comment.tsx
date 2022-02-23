import { CommentProps } from "../../interfaces";
import IconButton from "../Button/IconButton";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
import UserInfo from "../UserInfo";
import CommentSkeleton from "./CommentSkeleton";
import CommentText from "./CommentText";

interface ICommentProps extends CommentProps {
  onReplyButtonClicked: () => void;
}

const Comment: React.FunctionComponent<ICommentProps> = ({
  onReplyButtonClicked,
  content,
  score,
  user,
}) => {
  return (
    <CommentSkeleton>
      <div className="col-span-full md:col-start-2 md:col-end-3">
        <UserInfo user={user} />
      </div>
      <div className="col-span-full md:col-start-2 md:col-end-4">
      <CommentText text={content} />
      </div>
      <div className="md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-3">
        <LikeDislikeButton score={score} />
      </div>
      <div className="flex col-start-3 space-x-2 md:row-start-1 md:row-end-2">
        <IconButton
          variant="normal"
          onClick={onReplyButtonClicked}
          icon={
            <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.226725 5.31454L5.03972 1.15854C5.135 1.07673 5.25172 1.02395 5.37606 1.00643C5.50041 0.988906 5.62717 1.00739 5.74134 1.05968C5.8555 1.11198 5.95229 1.1959 6.02024 1.3015C6.08818 1.4071 6.12445 1.52997 6.12472 1.65554V3.84454C10.5167 3.89454 13.9997 4.77454 13.9997 8.93754C13.9997 10.6175 12.9177 12.2815 11.7207 13.1515C11.3477 13.4235 10.8157 13.0815 10.9537 12.6415C12.1937 8.67754 10.3657 7.62454 6.12472 7.56354V9.96754C6.12472 10.5335 5.46072 10.8275 5.03972 10.4635L0.226725 6.30854C0.155558 6.24686 0.0984811 6.17061 0.0593631 6.08495C0.0202451 5.99928 0 5.90621 0 5.81204C0 5.71787 0.0202451 5.62479 0.0593631 5.53913C0.0984811 5.45347 0.155558 5.37721 0.226725 5.31554V5.31454Z" />{" "}
            </svg>
          }
        >
          Reply
        </IconButton>
      </div>
    </CommentSkeleton>
  );
};

export default Comment;
