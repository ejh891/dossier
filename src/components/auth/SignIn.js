import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Shell from 'components/shared/Shell';
import * as authActions from 'redux/actions/authActions';
import { appBarBufferHeight } from 'settings/magicNumbers';
import * as authErrorCodes from 'enums/authErrorCodes';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.logInViaEmail = this.logInViaEmail.bind(this);
    this.logInViaFacebook= this.logInViaFacebook.bind(this);
    this.getEmailSignUpValidationState = this.getEmailSignUpValidationState.bind(this);
    this.getHelpSuggestion = this.getHelpSuggestion.bind(this);
    this.onTextFieldChange = this.onTextFieldChange.bind(this);
  }

  logInViaEmail() {
    const {
      authActions,
    } = this.props;

    const {
      email,
      password,
    } = this.state;

    authActions.logInUserViaEmail(email, password);
  }

  logInViaFacebook() {
    const {
      authActions,
    } = this.props;

    authActions.logInUserViaFacebook();
  }

  getEmailSignUpValidationState() {
    if (this.props.setUserError !== null) {
      return 'error';
    }

    return undefined;
  }

  getHelpSuggestion() {
    const {
      setUserError,
      authActions
    } = this.props;

    const {
      email
    } = this.state;

    if (setUserError === null) { return null; }

    switch (setUserError.code) {
      case authErrorCodes.USER_NOT_FOUND:
        return(<div>Do you need to <Link to="sign-up">Create an account</Link>?</div>);
      case authErrorCodes.BAD_PASSWORD:
        return (
          <a onClick={() => {authActions.sendPasswordResetEmail(email); }}>Reset your password?</a>
        );
      default:
        return null;
    }
  }

  onTextFieldChange(field, event) {
    const {
      setUserError,
      authActions,
    } = this.props;

    if (setUserError !== null) {
      authActions.clearSetUserError();
    }

    this.setState({
      [field]: event.target.value
    });
  }

  render() {
    const {
      user
    } = this.props;

    const {
      email,
      password,
    } = this.state;

    // if (user !== null) {
    //   return (<Redirect to={{pathname: '/'}}/>);
    // }

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
          <div style={{ fontSize: 20 }}>Welcome back!</div>
          <TextField
            onChange={(event) => { this.onTextFieldChange('email', event); }}
            floatingLabelText="Email"
            fullWidth={true}
            value={email}
          />
          <TextField
            type="password"
            onChange={(event) => { this.onTextFieldChange('password', event); }}
            floatingLabelText="Password"
            fullWidth={true}
            value={password}
          />
          <RaisedButton
            fullWidth={true}
            label="Log in"
            onClick={this.logInViaEmail}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          <div style={{ marginTop: 20, marginBottom: 20 }}>OR</div>
          <RaisedButton
            backgroundColor="#3B5998"
            fullWidth={true}
            onClick={this.logInViaFacebook}
            label="Log in with Facebook"
            labelColor="#FFFFFF"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          {this.props.setUserError &&
            <div>
              <div>{this.props.setUserError.message}</div>
              {this.getHelpSuggestion()}
            </div>
          }
          <div style={{ marginTop: 20, width: '100vw', textAlign: 'left' }}>New here? <Link to="sign-up">Create an account</Link></div>
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
