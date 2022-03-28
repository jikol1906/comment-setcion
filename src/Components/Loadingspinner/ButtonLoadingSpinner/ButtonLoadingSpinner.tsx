import * as React from 'react';
import './ButtonLoadingSpinner.css'

interface IButtonLoadingSpinnerProps {
}

const ButtonLoadingSpinner: React.FunctionComponent<IButtonLoadingSpinnerProps> = (props) => {
  return <div className="loader"></div>;
};

export default ButtonLoadingSpinner;
