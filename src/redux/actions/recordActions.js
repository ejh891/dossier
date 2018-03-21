import * as Types from './actionTypes';
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

export function addRecord(record) {
    return async (dispatch, getState) => {
        try {
            const newRecord = await RecordService.add(record);

            dispatch(addRecordSuccess(newRecord));
        } catch (error) {
            dispatch(addRecordFailure(error));
        }
    }
}