import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import { appBarBufferHeight } from 'settings/magicNumbers';
import SideDrawer from 'components/shared/SideDrawer';

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
          iconElementRight={<IconButton>{iconElementRight}</IconButton>}
          onRightIconButtonClick={onRightIconButtonClick}
          title={title}
          style={{
            position: 'fixed',
            top: 0,
            left: 'auto',
            right: 0,
          }}
        />
        <SideDrawer />
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
