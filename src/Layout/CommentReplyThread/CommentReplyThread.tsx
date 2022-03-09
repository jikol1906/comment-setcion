interface ICommentReplyThreadProps {}

const CommentReplyThread: React.FunctionComponent<ICommentReplyThreadProps> = (
  {children}
) => {
  return (
    <div className="flex">
      <span className="mr-4 h-full bg-gray-200 w-[2px] md:mx-10"></span>
      <div className="grid gap-4 md:gap-6 flex-1">
        {children}
      </div>
    </div>
  );
};

export default CommentReplyThread;
