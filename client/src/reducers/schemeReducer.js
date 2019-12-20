import { GET_SCHEMES, SCHEME_LOADING } from '../actions/types'

const initialState = {
    schemes: [],
    scheme: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SCHEME_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_SCHEMES:
            return {
                ...state,
                schemes: action.payload,
                loading: false
            };
        default:
            return state;
    }
}