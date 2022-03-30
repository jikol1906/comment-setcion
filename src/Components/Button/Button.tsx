import * as React from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?:boolean
}

const Button: React.FunctionComponent<IButtonProps> = ({loading,children,...rest}) => {
  return <button
  className="btn btn-hover-styles leading-none"
   {...rest}>
      {children}
  </button>;
};

export default Button;
