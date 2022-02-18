/** @jsxImportSource theme-ui */
import { Flex } from "theme-ui";

interface ICommentReplyThreadProps {}

const CommentReplyThread: React.FunctionComponent<ICommentReplyThreadProps> = (
  {children}
) => {
  return (
    <Flex
      sx={{
        "&::before": {
          content: "''",
          display: "block",
          width: "3px",
          bg: "lightgrayishblue",
          marginRight: "1",
          flexShrink: 0,
        },
      }}
    >
      <Flex sx={{ flexDirection: "column", gap: 1, flex:1 }}>
        {children}
      </Flex>
    </Flex>
  );
};

export default CommentReplyThread;
