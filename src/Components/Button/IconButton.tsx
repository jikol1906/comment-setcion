import * as React from 'react';

interface IIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    icon:React.ReactNode
    variant:'normal' | 'danger',
}

const IconButton: React.FunctionComponent<IIconButtonProps> = ({children,icon,variant,...rest}) => {

   

  return <button
    className={`flex items-center btn-hover-styles font-semibold text-sm ${variant === 'normal' ? 'text-moderateblue' : 'text-softRed'}`}
    {...rest}
  >
      {icon}
      {children}
  </button>;
};

export default IconButton;
