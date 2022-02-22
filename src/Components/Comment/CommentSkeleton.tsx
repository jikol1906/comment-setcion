/** @jsxImportSource theme-ui */
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";

const CommentSkeleton: React.FunctionComponent= ({
  children
}) => {
  return (
    <CommentContainer>
      <div className='grid gap-4 grid-cols-[auto__1fr__auto]'>
        {children}
      </div>
    </CommentContainer>
  );
};

export default CommentSkeleton;
