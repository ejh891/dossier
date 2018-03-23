import * as Types from './actionTypes';
import * as appActions from './appActions';
import RecordService from 'services/RecordService';

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

export function deleteRecordSuccess(personId, recordId) {
  return {
    type: Types.DELETE_RECORD_SUCCESS,
    personId,
    recordId,
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

export function deleteRecord(recordId) {
  return async (dispatch, getState) => {
    try {
      dispatch(appActions.toggleDeleting(true));
      const deletedRecord = await RecordService.delete(recordId);

      dispatch(deleteRecordSuccess(deletedRecord.personId, deletedRecord._id));
    } catch (error) {
      dispatch(deleteRecordFailure(error));
    }
  }
}