import React from 'react';
import Save from 'material-ui/svg-icons/content/save';
import { blue300 } from 'material-ui/styles/colors';

import FullScreenMessage from "./FullScreenMessage";
import Shell from 'components/shared/Shell';

import 'css/bouncing.css';

const Saving = (props) => {
  return (
    <Shell>
      <FullScreenMessage
        message="Saving..."
        icon={<Save className="bouncing" style={{ height: 60, width: 60 }} color={blue300} />}
      />
    </Shell>
  );
}

export default Saving;
