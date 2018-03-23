import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import { appBarBufferHeight } from 'settings/magicNumbers';

class Shell extends Component {
  render() {
    const {
      title = 'Dossier',
      iconElementLeft,
      onLeftIconButtonClick,
      iconElementRight,
      onRightIconButtonClick,
    } = this.props;

    return (
      <div>
        <AppBar
          iconElementLeft={<IconButton>{iconElementLeft}</IconButton>}
          onLeftIconButtonClick={onLeftIconButtonClick}
          iconElementRight={iconElementRight}
          onRightIconButtonClick={onRightIconButtonClick}
          title={title}
          style={{
            position: 'fixed',
            top: 0,
            left: 'auto',
            right: 0,
          }}
        />
        <div style={{
          paddingTop: appBarBufferHeight,
          overflowY: 'scroll',
          overflowX: 'hidden'
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Shell;
