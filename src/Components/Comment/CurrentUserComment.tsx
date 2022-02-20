/** @jsxImportSource theme-ui */
import { Avatar, Box, Button, Flex, Grid } from "theme-ui";
import { CommentProps } from "../../interfaces";
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
import UserInfo from "../UserInfo";
import { buttonStyles } from "./CommentStyles";
import CommentText from "./CommentText";

interface ICurrentUserComment extends CommentProps {
  onDeleteButtonClicked: () => void;
}

const CurrentUserComment: React.FunctionComponent<ICurrentUserComment> = ({
  onDeleteButtonClicked,
  content,
  score,
  user,
}) => {
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
        <Box style={{ gridArea: "userinfo" }}>
          <UserInfo user={user} />
        </Box>
        <Box style={{ gridArea: "content" }}>
          <CommentText text={content} />
        </Box>
        <Flex style={{ gridArea: "likedislike" }}>
          <LikeDislikeButton score={0} />
        </Flex>
        <Box style={{ gridArea: "actions" }}>
          <Flex sx={{ gap: 1 }}>
            <Button
              onClick={onDeleteButtonClicked}
              variant="blank"
              sx={{ ...buttonStyles, color: "softRed" }}
            >
              <svg
                sx={{ mr: "6px" }}
                width="12"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
              </svg>
              Delete
            </Button>
            <Button
              variant="blank"
              sx={{ ...buttonStyles, color: "moderateblue" }}
            >
              <svg
                sx={{ mr: "6px" }}
                width="14"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
              </svg>
              Edit
            </Button>
          </Flex>
        </Box>
      </Grid>
    </CommentContainer>
  );
};

export default CurrentUserComment;
