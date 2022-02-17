import * as React from 'react';
import { Box } from 'theme-ui';

interface ICommentContainerProps {
}

const CommentContainer: React.FunctionComponent<ICommentContainerProps> = ({children}) => {
  return <Box sx={{
    bg:"white",
    p:1,
    borderRadius:10,
  }}>
    {children}    
  </Box>;
};

export default CommentContainer;
