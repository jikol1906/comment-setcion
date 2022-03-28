import * as React from 'react';
import CommentSkeleton from '../../Comment/CommentSkeleton';
import './Loadingspinner.css'

interface ILoadingspinnerProps {
}

const Loadingspinner: React.FunctionComponent<ILoadingspinnerProps> = (props) => {
  return <CommentSkeleton>
      <div className="flex justify-center col-span-full text-moderateblue">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
  </CommentSkeleton>;
};

export default Loadingspinner;
