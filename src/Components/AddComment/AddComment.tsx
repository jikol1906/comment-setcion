import * as React from 'react';
import { Avatar, Grid, Textarea } from 'theme-ui';
import CommentContainer from '../../Layout/CommentContainer/CommentContainer';
import img from "../../images/avatars/image-amyrobson.png";

interface IAddCommentProps {
}

const AddComment: React.FunctionComponent<IAddCommentProps> = (props) => {
  return <CommentContainer>
      <Grid gap={1} sx={{
          gridTemplateColumns:"auto 1fr auto"
      }}>
          <Avatar src={img}/>
          <Textarea sx={{resize:'none',fontSize:"2rem"}} rows={10}></Textarea>
      </Grid>
  </CommentContainer>;
};

export default AddComment;
