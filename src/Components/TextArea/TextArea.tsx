import * as React from 'react';

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
}

const TextArea: React.FunctionComponent<ITextAreaProps> = ({...rest}) => {
  return <textarea
  className="w-full border-2 border-gray-200 resize-none rounded-lg p-3"
  {...rest}
//   required
//   placeholder="Add a comment..."
//   rows={3}
//   value={content}
//   onChange={(e) => setContent(e.target.value)}
></textarea>;
};

export default TextArea;
