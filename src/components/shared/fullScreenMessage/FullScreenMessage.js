import React from 'react';

import Shell from 'components/shared/Shell';
import { appBarBufferHeight } from 'settings/magicNumbers';

const FullScreenMessage = (props) => {
  const {
    message,
    icon
  } = props;

  return (
    <Shell>
      <div style={{
        height: `calc(100vh - ${appBarBufferHeight}px)`,
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        {icon}
        <div>{message}</div>

      </div>
    </Shell>
  );
}

export default FullScreenMessage;
