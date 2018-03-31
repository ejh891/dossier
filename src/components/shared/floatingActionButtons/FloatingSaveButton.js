import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import * as style from './floatingActionButtonStyles';

export default (props) => {
  return (
    <FloatingActionButton
      {...props}
      style={style.floatingActionButton}
    >
      <SaveIcon />
    </FloatingActionButton>
  );
}
