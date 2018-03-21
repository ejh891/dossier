import * as ActionTypes from './actionTypes';

export function toggleEditing(editing) {
    return {
        type: ActionTypes.TOGGLE_EDITING,
        editing,
    }
}
