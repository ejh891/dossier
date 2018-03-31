import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import * as style from './floatingActionButtonStyles';

export default (props) => {
  return (
    <FloatingActionButton
      {...props}
      style={style.floatingActionButton}
    >
      <AddIcon />
    </FloatingActionButton>
  );
}
