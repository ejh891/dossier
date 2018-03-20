import * as Types from './actionTypes';
import PersonService from 'services/PersonService';

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

export function setPersonsSuccess(persons) {
    return {
        type: Types.SET_PERSONS_SUCCESS,
        persons
    }
}

export function setPersonsFailure(error) {
    return {
        type: Types.SET_PERSONS_FAILURE,
        error
    }
}

export function refreshPersonSuccess(person) {
    return {
        type: Types.REFRESH_PERSON_SUCCESS,
        person
    }
}

export function refreshPersonFailure(error) {
    return {
        type: Types.REFRESH_PERSON_FAILURE,
        error
    }
}

export function fetchAllPersons() {
    return async (dispatch, getState) => {
        try {
            const persons = await PersonService.browse();

            dispatch(setPersonsSuccess(persons));
        } catch (error) {
            dispatch(setPersonsFailure(error));
        }
    }
}

export function addPerson(person) {
    return async (dispatch, getState) => {
        try {
            const newPerson = await PersonService.add(person);

            dispatch(addPersonSuccess(newPerson));
        } catch (error) {
            dispatch(addPersonFailure(error));
        }
    }
}

export function refreshPerson(personId) {
    return async (dispatch, getState) => {
        try {
            const person = await PersonService.read(personId);

            dispatch(refreshPersonSuccess(person));
        } catch (error) {
            dispatch(refreshPersonFailure(error));
        }
    }
}