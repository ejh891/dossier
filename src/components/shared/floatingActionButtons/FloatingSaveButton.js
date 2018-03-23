import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import Save from 'material-ui/svg-icons/content/save';
import * as style from './floatingActionButtonStyles';

export default (props) => {
  return (
    <FloatingActionButton
      style={style.floatingActionButton}
      onClick={props.onClick}>
      <Save />
    </FloatingActionButton>
  );
}
