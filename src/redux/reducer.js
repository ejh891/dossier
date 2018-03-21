import initialState from 'redux/initialState';
import * as ActionTypes from 'redux/actions/actionTypes';

function editPerson(originalPersons, updatedPerson) {
    return originalPersons.map(person => {
        if (person._id === updatedPerson._id) {
            return updatedPerson;
        } else {
            return person;
        }
    });
}

export default (state = initialState, action) => {
  switch (action.type) {
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
        const personToEdit = state.persons.find(person => person._id === action.record.personId);
        personToEdit.records = [...personToEdit.records, action.record];

        return {
            ...state,
            persons: editPerson(state.persons, personToEdit),
        }
    case ActionTypes.FETCH_PERSONS_FAILURE:
    case ActionTypes.ADD_PERSON_FAILURE:
    case ActionTypes.ADD_RECORD_FAILURE:
    default:
      return state;
  }
}