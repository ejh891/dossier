import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

class Shell extends Component {
  render() {
    const {
      title = 'Dossier',
      iconElementLeft,
      onLeftIconButtonClick,
    } = this.props;

    return (
      <div>
        <AppBar
          iconElementLeft={<IconButton>{iconElementLeft}</IconButton>}
          onLeftIconButtonClick={onLeftIconButtonClick}
          title={title}
          style={{
            position: 'fixed',
            top: 0,
            left: 'auto',
            right: 0,
          }}
        />
        <div style={{ marginTop: 70 }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Shell;
