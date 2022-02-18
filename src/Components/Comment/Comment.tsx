/** @jsxImportSource theme-ui */
import { Avatar, Box, Button, Flex, Grid, Heading, IconButton, Image, Text, Textarea } from "theme-ui";
import { buttonStyles, commentStyle } from "./CommentStyles";
import img from "../../images/avatars/image-amyrobson.png";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";

interface ICommentProps {
  // id:number
  // content:string
  // createdAt:Date
  // score:number
  // user :
  // likeClicked:(commentId:number) => void
  // dislikeClicked:(commentId:number) => void
  // user:string,
  // replyTo?:string,
  isCurrentUser?:boolean
}

const Comment: React.FunctionComponent<ICommentProps> = ({isCurrentUser}) => {
  return (
    <CommentContainer>
      <Grid sx={commentStyle}>
        <Flex sx={{ gridArea: "userinfo", alignItems: "center", gap: "8px" }}>
          <Avatar src={img} />
          <Heading as="h2">amyrobson</Heading>
          {isCurrentUser && <Text sx={{}}>you</Text>}
          <Text variant="muted">1 month ago</Text>
        </Flex>
        <PresentCommentText text={`Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible. You've nailed the design and the
          responsiveness at various breakpoints works really well.`}/>
        <Flex sx={{ gridArea: "likedislike" }}>
          <LikeDislikeButton/>
        </Flex>

      </Grid>
    </CommentContainer>
  );
};

export default Comment;

interface IEditCommentText {
  text:string
}

const EditCommentText : React.FunctionComponent<IEditCommentText> = ({text}) => {
  return <>
    <Box as="form" id="editcommentform">
      <Textarea defaultValue={text}>
      
      </Textarea>
    </Box>
    <Button type="submit" form="editcommentform">Update</Button>
  </>
}

interface IPresentCommentText {
  text:string
}
const PresentCommentText : React.FunctionComponent<IPresentCommentText> = ({text}) => {
  return <>
          <Text as="p" variant="muted" sx={{ gridArea: "content" }}>
          {text}
        </Text>
      <Button variant="blank" sx={{...buttonStyles,color:'moderateblue',gridArea: "actions"}}>
        <svg sx={{mr:'6px'}} width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" /></svg>
          Reply
      </Button>
  </>
}