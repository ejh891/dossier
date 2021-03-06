import * as Types from './actionTypes';
import * as appActions from './appActions';
import RecordService from 'services/RecordService';
import FirebaseUploadService from 'services/firebase/FirebaseUploadService';

export function addRecordSuccess(record) {
  return {
    type: Types.ADD_RECORD_SUCCESS,
    record
  }
}

export function addRecordFailure(error) {
  return {
    type: Types.ADD_RECORD_FAILURE,
    error
  }
}

export function editRecordSuccess(record) {
  return {
    type: Types.EDIT_RECORD_SUCCESS,
    record
  }
}

export function editRecordFailure(error) {
  return {
    type: Types.EDIT_RECORD_FAILURE,
    error
  }
}

export function deleteRecordSuccess(record) {
  return {
    type: Types.DELETE_RECORD_SUCCESS,
    record,
  }
}

export function deleteRecordFailure(error) {
  return {
    type: Types.DELETE_RECORD_FAILURE,
    error
  }
}

// asyn actions via Thunk

export function addRecord(record) {
  return async (dispatch, getState) => {
    try {
      dispatch(appActions.toggleSaving(true));
      const newRecord = await RecordService.add(record);

      dispatch(addRecordSuccess(newRecord));
    } catch (error) {
      dispatch(addRecordFailure(error));
    }
  }
}

export function editRecord(recordId, record) {
  return async (dispatch, getState) => {
    try {
      dispatch(appActions.toggleSaving(true));

      // if imageURL is undefined, update will treat it as if it was unchanged
      // this can be removed once the server handles it better
      if (record.imageURL === undefined) {
        record.imageURL = '';
      }

      const editedRecord = await RecordService.edit(recordId, record);

      dispatch(editRecordSuccess(editedRecord));
    } catch (error) {
      dispatch(editRecordFailure(error));
    }
  }
}

export function deleteRecord(recordId) {
  return async (dispatch, getState) => {
    try {
      dispatch(appActions.toggleDeleting(true));
      const deletedRecord = await RecordService.delete(recordId);
      dispatch(deleteRecordSuccess(deletedRecord));

      // when the record is deleted, attempt to free up storage by deleting uploads associated with the record
      // we don't wait for this to finish
      if (deletedRecord.imageURL) {
        FirebaseUploadService.deleteUpload(deletedRecord.imageURL);
      }
    } catch (error) {
      dispatch(deleteRecordFailure(error));
    }
  }
}
