import * as React from 'react';
import { useLayoutEffect, useRef } from 'react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?:boolean
}

const Button: React.FunctionComponent<IButtonProps> = ({loading,children,...rest}) => {

    const btnRef = useRef<HTMLButtonElement>(null)
    const btnWidth = useRef<number|null>(null)

    useLayoutEffect(() => {
        if(btnRef.current) {
            btnWidth.current = btnRef.current.getBoundingClientRect().width
        }
    },[])

    const loadingStyle = {
        width:btnWidth.current!
    }

  return <button
  className="btn btn-hover-styles leading-none"
  style={loading ? loadingStyle : {}}
  ref={btnRef}
   {...rest}>
    {loading ? <ButtonLoadingSpinner/> : children}
  </button>;
};

export default Button;
