import React from 'react';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment-ind';
import { blue300 } from 'material-ui/styles/colors';

import FullScreenMessage from "./FullScreenMessage";
import Shell from 'components/shared/Shell';

import 'css/bouncing.css';

const Deleting = (props) => {
  return (
    <Shell>
      <FullScreenMessage
        message="Authenticating..."
        icon={<AssignmentIcon className="bouncing" style={{ height: 60, width: 60 }} color={blue300} />}
      />
    </Shell>
  );
}

export default Deleting;
