import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, SET_LOADING, GET_REPOS } from './types';
import { setAlert } from './alert';
import api from '../utils/api'; // ✅ centralized axios instance

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

// Get All Profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: SET_LOADING });
    try {
        const res = await api.get('/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

// Get profile by user ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await api.get(`/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

// Get GitHub repos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await api.get(`/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

// Create or update user profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    try {
        const res = await api.post('/profile', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            navigate('/dashboard');
        }
    } catch (err) {
        const errors = err.response?.data?.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

// Add experience
export const addExperience = (formData, navigate) => async dispatch => {
    try {
        const res = await api.put('/profile/experience', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));
        navigate('/dashboard');
    } catch (err) {
        const errors = err.response?.data?.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

// Add education
export const addEducation = (formData, navigate) => async dispatch => {
    try {
        const res = await api.put('/profile/education', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));
        navigate('/dashboard');
    } catch (err) {
        const errors = err.response?.data?.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await api.delete(`/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500
            }
        });
    }
};

// Delete account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await api.delete('/profile');

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your account has been permanently deleted', 'success'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response?.statusText || 'Server Error',
                    status: err.response?.status || 500
                }
            });
        }
    }
};
