import * as ActionTypes from './actionTypes';

export function toggleInitializing(initializing) {
  return {
      type: ActionTypes.TOGGLE_INITIALIZING,
      initializing,
  }
}

export function toggleEditing(editing) {
    return {
        type: ActionTypes.TOGGLE_EDITING,
        editing,
    }
}

export function toggleSaving(saving) {
    return {
        type: ActionTypes.TOGGLE_SAVING,
        saving,
    }
}

export function toggleDeleting(deleting) {
    return {
        type: ActionTypes.TOGGLE_DELETING,
        deleting,
    }
}

export function toggleUploading(uploading) {
  return {
      type: ActionTypes.TOGGLE_UPLOADING,
      uploading,
  }
}

export function toggleAuthenticating(authenticating) {
  return {
      type: ActionTypes.TOGGLE_AUTHENTICATING,
      authenticating,
  }
}
