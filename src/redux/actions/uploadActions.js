import * as Types from './actionTypes';
import * as appActions from './appActions';

import FirebaseUploadService from 'services/firebase/FirebaseUploadService';

export function uploadSuccess(url) {
  return {
    type: Types.UPLOAD_SUCCESS,
    url
  }
}

export function uploadFailure(error) {
  return {
    type: Types.UPLOAD_FAILURE,
    error,
  }
}

export function upload(file) {
  return async (dispatch, getState) => {
      try {
          dispatch(appActions.toggleUploading(true));

          const url = await FirebaseUploadService.upload(file);

          dispatch(uploadSuccess(url));

          return url;
      } catch (error) {
          dispatch(uploadFailure(error));
      }
  }
}
