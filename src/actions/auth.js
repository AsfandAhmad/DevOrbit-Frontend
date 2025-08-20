import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import api from '../utils/api';  // ✅ use our configured axios instance

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await api.get('/auth');   // ✅ api handles /api prefix
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await api.post('/users', body);  // ✅ no need /api/users

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response?.data?.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: REGISTER_FAIL });
    }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
    const body = JSON.stringify({ email, password });

    try {
        const res = await api.post('/auth', body);   // ✅ same fix

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response?.data?.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: LOGIN_FAIL });
    }
};

// Logout / Clear profile
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
    localStorage.removeItem('token');
    setAuthToken(null);
};

// Clear errors
export const clearErrors = () => dispatch => {
    dispatch({ type: 'CLEAR_ERRORS' });
};
