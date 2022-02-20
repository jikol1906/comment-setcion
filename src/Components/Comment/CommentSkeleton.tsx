/** @jsxImportSource theme-ui */
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import { Box, Flex, Grid } from "theme-ui";

export interface ICommentSkeleton {
  userInfo: React.ReactNode;
  content: React.ReactNode;
  buttons: React.ReactNode;
  likedislike: React.ReactNode;
}

const CommentSkeleton: React.FunctionComponent<ICommentSkeleton> = ({
  userInfo,
  content,
  buttons,
  likedislike,
}) => {
  console.log('here');
  return (
    <CommentContainer>
      <Grid
        sx={{
          gridTemplateAreas: `
        "userinfo userinfo"
        "content content"
        "likedislike actions"
    `,
          gridTemplateColumns: "1fr auto",
          gap: 1,
        }}
      >
        <Box style={{ gridArea: "userinfo" }}>{userInfo}</Box>
        <Box style={{ gridArea: "content" }}>{content}</Box>
        <Flex style={{ gridArea: "likedislike" }}>{likedislike}</Flex>
        <Box style={{ gridArea: "actions" }}>{buttons}</Box>
      </Grid>
    </CommentContainer>
  );
};

export default CommentSkeleton;
