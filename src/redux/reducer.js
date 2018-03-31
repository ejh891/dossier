import initialState from 'redux/initialState';
import * as ActionTypes from 'redux/actions/actionTypes';

function findPerson(persons, personId) {
  const person = persons.find(person => person._id === personId);

  if (!person) {
    throw new Error(`Could not find person: ${personId}`);
  }

  return person;
}

function replacePerson(originalPersons, updatedPerson) {
  return originalPersons.map(person => {
    if (person._id === updatedPerson._id) {
      return updatedPerson;
    } else {
      return person;
    }
  });
}

export default (state = initialState, action) => {
  let person;
  switch (action.type) {
    /*
     * App Reducer
     */
    case ActionTypes.TOGGLE_EDITING:
      return {
        ...state,
        // if a bool was supplied, use it. Otherwise, just toggle the existing value
        editing: action.editing !== undefined ? action.editing : !state.editing,
      }
    case ActionTypes.TOGGLE_SAVING:
      return {
        ...state,
        // if a bool was supplied, use it. Otherwise, just toggle the existing value
        saving: action.saving !== undefined ? action.saving : !state.saving,
      }
    case ActionTypes.TOGGLE_DELETING:
      return {
        ...state,
        // if a bool was supplied, use it. Otherwise, just toggle the existing value
        deleting: action.deleting !== undefined ? action.deleting : !state.deleting,
      }

    /*
     * Person Reducer
     */
    case ActionTypes.FETCH_PERSONS_SUCCESS:
      return {
        ...state,
        persons: [...state.persons, ...action.persons],
        initializing: false,
      }
    case ActionTypes.ADD_PERSON_SUCCESS:
      return {
        ...state,
        persons: [...state.persons, action.person],
        saving: false,
      }
    case ActionTypes.EDIT_PERSON_SUCCESS:
      return {
        ...state,
        persons: replacePerson(state.persons, action.person),
        saving: false,
      }
    case ActionTypes.DELETE_PERSON_SUCCESS:
      return {
        ...state,
        persons: state.persons.filter(person => person._id !== action.personId),
        deleting: false,
      }
    case ActionTypes.ADD_PERSON_FAILURE:
      console.error('Error saving person', action.error);

      return {
        ...state,
        saving: false,
      }
    case ActionTypes.EDIT_PERSON_FAILURE:
      console.error('Error saving person', action.error);

      return {
        ...state,
        saving: false,
      }
    case ActionTypes.DELETE_PERSON_FAILURE:
      console.error('Error deleting person', action.error);

      return {
        ...state,
        deleting: false,
      }
    case ActionTypes.FETCH_PERSONS_FAILURE:
      console.error('Error deleting person', action.error);

      return {
        ...state,
        initializing: false,
      }

    /*
     * Record Reducer
     */
    case ActionTypes.ADD_RECORD_SUCCESS:
      person = findPerson(state.persons, action.record.personId);
      person.records = [...person.records, action.record];

      return {
        ...state,
        persons: replacePerson(state.persons, person),
        saving: false,
      }
    case ActionTypes.EDIT_RECORD_SUCCESS:
      person = findPerson(state.persons, action.record.personId);
      person.records = person.records.map(record => {
        if (record._id === action.record._id) {
          return action.record;
        } else {
          return record;
        }
      });

      return {
        ...state,
        persons: replacePerson(state.persons, person),
        saving: false,
      }
    case ActionTypes.DELETE_RECORD_SUCCESS:
      person = findPerson(state.persons, action.personId);
      person.records = person.records.filter(record => record._id !== action.recordId);

      return {
        ...state,
        persons: replacePerson(state.persons, person),
        deleting: false,
      }
    case ActionTypes.ADD_RECORD_FAILURE:
      console.error('Error saving record', action.error);

      return {
        ...state,
        saving: false,
      }
    case ActionTypes.EDIT_RECORD_FAILURE:
      console.error('Error saving record', action.error);

      return {
        ...state,
        saving: false,
      }
    case ActionTypes.DELETE_RECORD_FAILURE:
      console.error('Error deleting record', action.error);

      return {
        ...state,
        deleting: false,
      }

    default:
      return state;
  }
}
