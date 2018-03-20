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
    case ActionTypes.SET_PERSONS_SUCCESS:
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
    case ActionTypes.REFRESH_PERSON_SUCCESS:
        return {
            ...state,
            // modify person in list
            persons: editPerson(state.persons, action.person),
            // remove person from dirty list
            dirtyPersons: state.dirtyPersons.filter(personId => personId !== action.person._id)
        }
    case ActionTypes.ADD_RECORD_SUCCESS:
        const personToEdit = state.persons.find(person => person._id === action.record.personId);
        personToEdit.records = [...personToEdit.records, action.record];

        return {
            ...state,
            persons: editPerson(state.persons, personToEdit),
            dirtyPersons: [...state.dirtyPersons, action.record.personId]
        }
    case ActionTypes.SET_PERSONS_FAILURE:
    case ActionTypes.ADD_PERSON_FAILURE:
    case ActionTypes.ADD_RECORD_FAILURE:
    default:
      return state;
  }
}