import * as Types from './actionTypes';
import * as appActions from './appActions';
import PersonService from 'services/PersonService';
import FirebaseUploadService from 'services/firebase/FirebaseUploadService';

export function addPersonSuccess(person) {
  return {
    type: Types.ADD_PERSON_SUCCESS,
    person
  }
}

export function addPersonFailure(error) {
  return {
    type: Types.ADD_PERSON_FAILURE,
    error
  }
}

export function editPersonSuccess(person) {
  return {
    type: Types.EDIT_PERSON_SUCCESS,
    person
  }
}

export function editPersonFailure(error) {
  return {
    type: Types.EDIT_PERSON_FAILURE,
    error
  }
}

export function fetchPersonsSuccess(persons) {
  return {
    type: Types.FETCH_PERSONS_SUCCESS,
    persons
  }
}

export function fetchPersonsFailure(error) {
  return {
    type: Types.FETCH_PERSONS_FAILURE,
    error
  }
}

export function fetchPersonSuccess(person) {
  return {
    type: Types.FETCH_PERSON_SUCCESS,
    person
  }
}

export function fetchPersonFailure(error) {
  return {
    type: Types.FETCH_PERSON_FAILURE,
    error
  }
}

export function deletePersonSuccess(personId) {
  return {
    type: Types.DELETE_PERSON_SUCCESS,
    personId
  }
}

export function deletePersonFailure(error) {
  return {
    type: Types.DELETE_PERSON_FAILURE,
    error
  }
}

export function fetchPersons() {
  return async (dispatch, getState) => {
    dispatch(appActions.toggleInitializing(true));

    const stateSnapshot = getState();
    const user = stateSnapshot.user;

    if (!user) {
      throw new Error('User must be logged in to fetch persons');
    }

    try {
      const persons = await PersonService.browse({ userId: user.id });

      dispatch(fetchPersonsSuccess(persons));
    } catch (error) {
      dispatch(fetchPersonsFailure(error));
    }
  }
}

export function addPerson(person) {
  return async (dispatch, getState) => {
    const stateSnapshot = getState();
    const user = stateSnapshot.user;

    if (!user) {
      throw new Error('User must be logged in to add a person');
    }

    try {
      dispatch(appActions.toggleSaving(true));

      const newPerson = await PersonService.add({
        ...person,
        userId: user.id,
      });

      dispatch(addPersonSuccess(newPerson));
    } catch (error) {
      dispatch(addPersonFailure(error));
    }
  }
}

export function editPerson(personId, person) {
  return async (dispatch, getState) => {
    try {
      dispatch(appActions.toggleSaving(true));

      // if profilePhotoURL is undefined, update will treat it as if it was unchanged
      // this can be removed once the server handles it better
      if (person.profilePhotoURL === undefined) {
        person.profilePhotoURL = '';
      }

      const editedPerson = await PersonService.edit(personId, person);

      dispatch(editPersonSuccess(editedPerson));
    } catch (error) {
      dispatch(editPersonFailure(error));
    }
  }
}

export function fetchPerson(personId) {
  return async (dispatch, getState) => {
    try {
      const person = await PersonService.read(personId);

      dispatch(fetchPersonSuccess(person));
    } catch (error) {
      dispatch(fetchPersonFailure(error));
    }
  }
}

export function deletePerson(personId) {
  return async (dispatch, getState) => {
    try {
      dispatch(appActions.toggleDeleting(true));
      const deletedPerson = await PersonService.delete(personId);
      dispatch(deletePersonSuccess(deletedPerson._id));

      // when the person is deleted, attempt to free up storage by deleting uploads associated with the person
      // we don't wait for this to finish
      if (deletedPerson.profilePhotoURL) {
        FirebaseUploadService.deleteUpload(deletedPerson.profilePhotoURL);
      }
      for (const record of deletedPerson.records) {
        if (record.imageURL) {
          FirebaseUploadService.deleteUpload(record.imageURL);
        }
      }
    } catch (error) {
      dispatch(deletePersonFailure(error));
    }
  }
}
