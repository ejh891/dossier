import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import Shell from 'components/shared/Shell';
import * as authActions from 'redux/actions/authActions';
import { appBarBufferHeight } from 'settings/magicNumbers';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.logInViaFacebook= this.logInViaFacebook.bind(this);
  }

  logInViaFacebook() {
    const {
      authActions,
    } = this.props;

    authActions.logInUserViaFacebook();
  }

  render() {
    const {
      user
    } = this.props;

    if (user !== null) {
      return (<Redirect to={{pathname: '/'}}/>);
    }

    return (
      <Shell verticalAlign="center">
        <div
          style={{
            height: `calc(100vh - ${appBarBufferHeight}px)`,
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <RaisedButton
            backgroundColor="#3B5998"
            fullWidth={true}
            onClick={this.logInViaFacebook}
            label="Log in with Facebook"
            labelColor="#FFFFFF"
          />
        </div>
      </Shell>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    setUserError: state.setUserError,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      authActions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
