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

export function fetchPersons() {
    return async (dispatch, getState) => {
        try {
            const persons = await PersonService.browse();

            dispatch(fetchPersonsSuccess(persons));
        } catch (error) {
            dispatch(fetchPersonsFailure(error));
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