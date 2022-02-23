
interface ICommentTextProps {
  text: string;
}

const CommentText: React.FunctionComponent<ICommentTextProps> = ({ text }) => {
  return (
    <p className="font-main text-sm text-grayishBlue whitespace-pre-line md:text-base">
      {text}
    </p>
  );
};

export default CommentText;
