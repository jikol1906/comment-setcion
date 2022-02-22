/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";

interface ICommentTextProps {
  text: string;
}

const CommentText: React.FunctionComponent<ICommentTextProps> = ({ text }) => {
  return (
    <p className="font-main text-sm text-grayishBlue whitespace-pre-line">
      {text}
    </p>
  );
};

export default CommentText;
