import * as React from 'react';

const Button: React.FunctionComponent = ({children,...rest}) => {
  return <button
  className="btn btn-hover-styles leading-none"
   {...rest}>
      {children}
  </button>;
};

export default Button;
