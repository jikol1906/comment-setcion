/** @jsxImportSource theme-ui */
import { Text } from "theme-ui";

interface ICommentTextProps {
  text: string;
}

const CommentText: React.FunctionComponent<ICommentTextProps> = ({ text }) => {
  return (
    <Text
      as="p"
      variant="muted"
      sx={{ gridArea: "content", whiteSpace: "pre-line" }}
    >
      {text}
    </Text>
  );
};

export default CommentText;
