/** @jsxImportSource theme-ui */
import { Avatar, Box, Button, Flex, Grid, Heading, IconButton, Image, Text, Textarea } from "theme-ui";
import { buttonStyles, commentStyleEdit, commentStylePresent, youBadge } from "./CommentStyles";

import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
import CommentContainer from "../../Layout/CommentContainer/CommentContainer";
import { Comment as IComment } from "../../interfaces";

interface ICommentProps extends Omit<IComment,"id"|"replies"> {
  replyingTo?:string
  isCurrentUser?:boolean
  isEditing?:boolean
}




const Comment: React.FunctionComponent<ICommentProps> = ({isCurrentUser,isEditing,content,createdAt,score,user}) => {
  return (
    <CommentContainer>
      <Grid sx={isEditing ? commentStyleEdit : commentStylePresent}>
        <Flex sx={{ gridArea: "userinfo", alignItems: "center", gap: "8px" }}>
          <Avatar src={`${process.env.PUBLIC_URL}${user.image.webp.split("./")[1]}`} />
          <Heading as="h2">{user.username}</Heading>
          {isCurrentUser && <Text sx={youBadge}>you</Text>}
          <Text variant="muted">{createdAt}</Text>
        </Flex>
        {isEditing ? <EditCommentText text={content}/> : <PresentCommentText isCurrentUser={isCurrentUser} text={content}/>}
        <Flex sx={{ gridArea: "likedislike" }}>
          <LikeDislikeButton score={score}/>
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
    <Box as="form" id="editcommentform" sx={{gridArea:'textarea'}}>
      <Textarea defaultValue={text} rows={5}>
      
      </Textarea>
    </Box>
    <Button sx={{gridArea:'updatebtn'}} type="submit" form="editcommentform">Update</Button>
  </>
}

interface IPresentCommentText {
  text:string,
  isCurrentUser?:boolean
}
const PresentCommentText : React.FunctionComponent<IPresentCommentText> = ({text,isCurrentUser}) => {
  return <>
          <Text as="p" variant="muted" sx={{ gridArea: "content" }}>
          {text}
        </Text>
      <Flex sx={{gridArea:'actions', gap:1}}>
        { !isCurrentUser ? <Button variant="blank" sx={{...buttonStyles,color:'moderateblue'}}>
        
          <svg sx={{mr:'6px'}} width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" /></svg>
            Reply
        </Button> :
        <>
        <Button variant="blank" sx={{...buttonStyles,color:'softRed'}}>
        <svg sx={{mr:'6px'}} width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" /></svg>
            Delete
          </Button>
          <Button variant="blank" sx={{...buttonStyles,color:'moderateblue'}}>
          <svg sx={{mr:'6px'}} width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" /></svg>
            Edit
          </Button>
          </>
          
        }
      </Flex>
  </>
}