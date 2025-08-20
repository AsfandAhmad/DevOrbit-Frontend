import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from './types';
import api from '../utils/api'; // ✅ use centralized axios instance

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await api.get('/post');   // ✅ api auto-prefixes /api

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// Add like
export const addLike = postId => async dispatch => {
    try {
        const res = await api.put(`/post/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// Remove like
export const removeLike = postId => async dispatch => {
    try {
        const res = await api.put(`/post/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// Delete post
export const deletePost = postId => async dispatch => {
    try {
        await api.delete(`/post/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId
        });

        dispatch(setAlert('Post removed', 'danger'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// Add post
export const addPost = formData => async dispatch => {
    try {
        const res = await api.post('/post', formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// Get post by ID
export const getPost = postId => async dispatch => {
    try {
        const res = await api.get(`/post/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
    try {
        const res = await api.post(`/post/comment/${postId}`, formData);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};

// Remove comment
export const removeComment = (postId, commentId) => async dispatch => {
    try {
        await api.delete(`/post/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment removed', 'danger'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};
