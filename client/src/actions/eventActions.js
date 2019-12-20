import axios from 'axios';
import { GET_EVENTS, EVENT_LOADING, CLEAR_ERRORS, GET_ERRORS } from './types';

// Get Events
export const getEvents = () => dispatch => {
    dispatch(setEventLoading());
    axios
        .get('/api/event')
        .then(res =>
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_EVENTS,
                payload: null
            })
        );
};

// Create Profile
export const addEvent = (eventData, history) => dispatch => {
    axios
        .post('/api/event', eventData)
        .then(res => history.push('/'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set loading state
export const setEventLoading = () => {
    return {
        type: EVENT_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};