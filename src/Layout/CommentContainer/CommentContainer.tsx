import * as React from 'react';

interface ICommentContainerProps {
}

const CommentContainer: React.FunctionComponent<ICommentContainerProps> = ({children}) => {
  return <div className='rounded bg-white p-4'>
    {children}    
  </div>;
};

export default CommentContainer;
