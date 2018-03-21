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
    case ActionTypes.TOGGLE_EDITING:
      return {
        ...state,
        // if a bool was supplied, use it. Otherwise, just toggle the existing value
        editing: action.editing !== undefined ? action.editing : !state.editing,
      }
    case ActionTypes.FETCH_PERSONS_SUCCESS:
      return {
        ...state,
        persons: [...state.persons, ...action.persons],
        initializing: false,
      }
    case ActionTypes.ADD_PERSON_SUCCESS:
      return {
        ...state,
        persons: [...state.persons, action.person]
      }
    case ActionTypes.ADD_RECORD_SUCCESS:
      person = findPerson(state.persons, action.record.personId);
      person.records = [...person.records, action.record];

      return {
        ...state,
        persons: replacePerson(state.persons, person),
      }
    case ActionTypes.DELETE_RECORD_SUCCESS:
      person = findPerson(state.persons, action.personId);
      person.records = person.records.filter(record => record._id !== action.recordId);

      return {
        ...state,
        persons: replacePerson(state.persons, person),
      }
    case ActionTypes.FETCH_PERSONS_FAILURE:
    case ActionTypes.ADD_PERSON_FAILURE:
    case ActionTypes.ADD_RECORD_FAILURE:
    case ActionTypes.DELETE_RECORD_FAILURE:
      console.error(action.error);
      return state;
    default:
      return state;
  }
}