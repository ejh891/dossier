import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as style from './floatingActionButton.css';

export default (props) => {
  return (
    <FloatingActionButton
      style={style.floatingActionButton}
      onClick={props.onClick}>
      <ContentAdd />
    </FloatingActionButton>
  );
}
