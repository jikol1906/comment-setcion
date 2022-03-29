import * as React from 'react';
import './ButtonLoadingSpinner.css'

interface IButtonLoadingSpinnerProps {
  white?:boolean
}

const ButtonLoadingSpinner: React.FunctionComponent<IButtonLoadingSpinnerProps> = ({white}) => {
  return <div className={`loader m-auto ${white && 'white'}`}></div>;
};

export default ButtonLoadingSpinner;
