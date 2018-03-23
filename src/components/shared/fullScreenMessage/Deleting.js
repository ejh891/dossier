import React from 'react';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { red300 } from 'material-ui/styles/colors';

import FullScreenMessage from "./FullScreenMessage";
import Shell from 'components/shared/Shell';

import './bouncing.css';

const Deleting = (props) => {
  return (
    <Shell>
      <FullScreenMessage
        message="Deleting..."
        icon={<DeleteIcon className="bouncing" style={{ height: 60, width: 60, translate: 'rotate(90deg)' }} color={red300} />}
      />
    </Shell>
  );
}

export default Deleting;
