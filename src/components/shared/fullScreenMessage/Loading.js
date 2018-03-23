import React from 'react';
import LoadingSpinner from 'material-ui/svg-icons/action/autorenew';
import { blue300 } from 'material-ui/styles/colors';

import FullScreenMessage from "./FullScreenMessage";
import Shell from 'components/shared/Shell';

import './spinning.css';

const Loading = (props) => {
  return (
    <Shell>
      <FullScreenMessage
        message="Loading..."
        icon={<LoadingSpinner className="spinning" style={{ height: 60, width: 60 }} color={blue300} />}
      />
    </Shell>
  );
}

export default Loading;
