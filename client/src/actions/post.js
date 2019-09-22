import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_POSTS,
	GET_POST,
	ADD_POST,
	DELETE_POST,
	POST_ERROR,
	UPDATE_LIKES,
	ADD_COMMENT,
	REMOVE_COMMENT
} from './types';

// Get Posts
export const getPosts = () => async dispatch => {
	try {
		const response = await axios.get('/api/posts');

		dispatch({
			type: GET_POSTS,
			payload: response.data
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};

// Get Post
export const getPost = postId => async dispatch => {
	try {
		const response = await axios.get(`/api/posts/${postId}`);

		dispatch({
			type: GET_POST,
			payload: response.data
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};

// Add Like
export const addLike = postId => async dispatch => {
	try {
		const response = await axios.put(`/api/posts/like/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: response.data }
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};

// Remove Like
export const removeLike = postId => async dispatch => {
	try {
		const response = await axios.put(`/api/posts/unlike/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: response.data }
		});
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};

// Delete Post
export const deletePost = postId => async dispatch => {
	try {
		await axios.delete(`/api/posts/${postId}`);

		dispatch({
			type: DELETE_POST,
			payload: postId
		});

		dispatch(setAlert('Post Removed', 'success'));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};

// Add Post
export const addPost = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const response = await axios.post(`/api/posts`, formData, config);

		dispatch({
			type: ADD_POST,
			payload: response.data
		});

		dispatch(setAlert('Post Created', 'success'));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};

// Add Comment
export const addComment = (postId, formData) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const response = await axios.post(
			`/api/posts/comment/${postId}`,
			formData,
			config
		);

		dispatch({
			type: ADD_COMMENT,
			payload: response.data
		});

		dispatch(setAlert('Comment Added', 'success'));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
	try {
		await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId
		});

		dispatch(setAlert('Comment Removed', 'success'));
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status
			}
		});
	}
};
