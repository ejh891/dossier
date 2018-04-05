import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import ListItem from 'material-ui/List/ListItem'
import MenuItem from 'material-ui/MenuItem';
import * as appActions from 'redux/actions/appActions';
import * as authActions from 'redux/actions/authActions';
class SideDrawer extends Component {
  render() {
    const {
      appActions,
      authActions,
      sideDrawerOpen,
      history,
      user,
    } = this.props;

    if (!user) { return null; }

    return (
      <Drawer
        docked={false}
        width={200}
        open={sideDrawerOpen}
        onRequestChange={(open) => appActions.toggleSideDrawerOpen(open)}
        >
        <ListItem
          leftAvatar={
            <Avatar src={user.photoURL} />
          }
        >
          {user.name}
        </ListItem>
        <MenuItem onClick={authActions.logOutUser}>Log Out</MenuItem>
        <Divider />
        <MenuItem onClick={() => { history.push('/'); appActions.toggleSideDrawerOpen(false); }}>Home</MenuItem>
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    sideDrawerOpen: state.sideDrawerOpen,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideDrawer));
