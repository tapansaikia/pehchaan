import { GET_EVENT, GET_EVENTS, ADD_EVENT, EVENT_LOADING } from '../actions/types'

const initialState = {
    events: [],
    event: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case EVENT_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_EVENT:
            return {
                ...state,
                event: action.payload,
                loading: false
            };
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false
            };
        case ADD_EVENT:
            return {
                ...state,
                events: action.payload,
                loading: false
            };
        default:
            return state;
    }
}