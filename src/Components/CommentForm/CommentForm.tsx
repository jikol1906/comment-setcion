import * as React from 'react';

interface ICommentFormProps {
    action:'reply'|'send'|'update'
}

const CommentForm: React.FunctionComponent<ICommentFormProps> = ({action}) => {
  return <form>

  </form>;
};

export default CommentForm;
