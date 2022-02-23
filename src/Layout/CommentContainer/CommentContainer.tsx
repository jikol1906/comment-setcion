import * as React from 'react';

interface ICommentContainerProps {
}

const CommentContainer: React.FunctionComponent<ICommentContainerProps> = ({children}) => {
  return <div className='rounded-lg bg-white p-4 md:p-6'>
    {children}    
  </div>;
};

export default CommentContainer;
