//Component that is responsible for the layout of the comment
const CommentSkeleton: React.FunctionComponent = ({
  children,
}) => {
  return (
    
      <div className="rounded-lg bg-white p-4 md:p-6 grid gap-4 grid-cols-[auto__1fr__auto] md:gap-6">
        {children}
      </div>
    
  );
};

export default CommentSkeleton;
