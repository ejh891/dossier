import { toast } from 'react-toastify';

import * as ActionTypes from './actionTypes';
import * as appActions from './appActions';
import * as authErrorCodes from 'enums/authErrorCodes';

import { firebaseAuth, firebaseFacebookAuthProvider } from 'services/firebase/firebaseProvider';

export function setUserSuccess(user) {
    return {
        type: ActionTypes.SET_USER_SUCCESS,
        user,
    }
}

export function setUserFailure(error) {
  return {
      type: ActionTypes.SET_USER_FAILURE,
      error,
  }
}

export function createUserFailure(error) {
  return {
      type: ActionTypes.CREATE_USER_FAILURE,
      error,
  }
}

export function clearSetUserError() {
  return {
      type: ActionTypes.CLEAR_SET_USER_ERROR,
  }
}

export const observeAuthState = () => {
  return (dispatch) => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUserSuccess({id: user.uid, name: user.displayName, photoURL: user.photoURL}));
      } else {
        dispatch(setUserSuccess(null));
      }

      dispatch(appActions.toggleAuthenticating(false));
    });
  };
};

export const logInUserViaFacebook = () => {
  return async (dispatch) => {
    dispatch(appActions.toggleAuthenticating(true));

    await firebaseAuth.signInWithPopup(firebaseFacebookAuthProvider);
  };
};

export const logInUserViaEmail = (email, password) => {
  return async (dispatch) => {
    dispatch(appActions.toggleAuthenticating(true));

    try {
      await firebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = error.message;

      switch (errorCode) {
        case authErrorCodes.USER_NOT_FOUND:
          errorMessage = 'Hmm. We couldn\'t find that email.';
          break;
        case authErrorCodes.BAD_PASSWORD:
          errorMessage = 'Hmm. That password doesn\'t look quite right.';
          break;
        default:
          break;
      }

      dispatch(setUserFailure({ code: errorCode, message: errorMessage }));
    }
  };
};

export const createUserViaEmail = (email, password) => {
  return async (dispatch) => {
    dispatch(appActions.toggleAuthenticating(true));

    try {
      await firebaseAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      dispatch(createUserFailure({ code: errorCode, message: errorMessage }));
    }
  };
};

export const sendPasswordResetEmail = (email) => {
  return async (dispatch) => {
    try {
      await firebaseAuth.sendPasswordResetEmail(email);
      toast.success('Email sent!');
    } catch (error) {
      toast.error('Whoops! ' + error.message);
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
      dispatch(appActions.toggleAuthenticating(true));

      await firebaseAuth.signOut();
  };
};
