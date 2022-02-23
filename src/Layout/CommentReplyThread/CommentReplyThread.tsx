interface ICommentReplyThreadProps {}

const CommentReplyThread: React.FunctionComponent<ICommentReplyThreadProps> = (
  {children}
) => {
  return (
    <div className="flex">
      <span className="mr-4 h-full bg-gray-200 w-[2px]"></span>
      <div className="grid gap-2 flex-1">
        {children}
      </div>
    </div>
  );
};

export default CommentReplyThread;
