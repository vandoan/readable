import * as API from '../api'
import { RECEIVE_COMMENT, RECEIVE_COMMENTS, RECEIVE_POSTS } from './constants'
// Alpha order

export const addComment = (comment) => {
	comment = {
		...comment,
		id: Date.now(),
	}

	return dispatch => {
		return API.addComment( comment )
			.then( comment => API.getPosts( comment.parentId )
				.then( posts => dispatch({
					type: RECEIVE_POSTS,
					posts
				}))
			)
	}
}

export const editComment = post => {
	return dispatch => {
		return API.editComment( post )
		.then( comment => dispatch({
			type: RECEIVE_COMMENT,
			comment: comment
		}))
	}
}


export const deleteComment = comment => {
	return dispatch => {
		return API.deleteComment( comment.id )
		.then( comment => API.getComments(comment.parentId) )
		.then( comments => dispatch({
			type: RECEIVE_COMMENTS,
			comments: comments
		}))
	}
}

// Get a specific comment
export const getComment = id => {
	return dispatch => {
		return API.getComment( id )
		.then( comment => dispatch({
			type: RECEIVE_COMMENT,
			comment: comment
		}))
	}
}

// Get all comments for an article
export const getComments = id => {
	return dispatch => {
		return API.getComments( id )
		.then( comments => dispatch({
			type: RECEIVE_COMMENTS,
			comments,
		}))
	}
}

export const voteComment = ( id, vote ) => {
	return dispatch => {
		return API.voteComment( id, vote )
		.then( comment => API.getComments( comment.parentId ) )
			.then( comments => dispatch({
				type: RECEIVE_COMMENTS,
				comments: comments,
			}))
	}
}

