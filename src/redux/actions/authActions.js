import * as ActionTypes from './actionTypes';
import * as appActions from './appActions';

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

export const logOutUser = () => {
  return async (dispatch) => {
      dispatch(appActions.toggleAuthenticating(true));

      await firebaseAuth.signOut();
  };
};
