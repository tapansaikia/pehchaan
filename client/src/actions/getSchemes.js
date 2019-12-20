import axios from 'axios';
import { GET_SCHEMES, SCHEME_LOADING } from './types';

// Get Schemes
export const getSchemes = () => dispatch => {
    dispatch(setSchemeLoading());
    axios
        .get('/api/admin/schemes')
        .then(res =>
            dispatch({
                type: GET_SCHEMES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_SCHEMES,
                payload: null
            })
        );
};

// Set loading state
export const setSchemeLoading = () => {
    return {
        type: SCHEME_LOADING
    };
};