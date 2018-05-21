import * as API from '../api'
import { RECEIVE_POST, RECEIVE_POSTS } from './constants'


export const addPost = (post) => {
	post = {
		...post,
		timestamp: Date.now(),
	}
	console.log(post.timestamp)

	return dispatch => {
		return API.addPost( post )
			.then( post => API.getPosts( post.category )
				.then( posts => dispatch({
					type: RECEIVE_POSTS,
					posts
				}))
			)
	}
}

export const deletePost = id => {
	console.log(id)
	return dispatch => {
		return API.deletePost( id )
			.then( posts => API.getPosts() )
			.then( posts => dispatch({
				type: RECEIVE_POSTS,
				posts
			}))
	}
}

export const getPost = id => {
	return dispatch => {
		return API.getPost( id )
		.then( post => dispatch({
			type: RECEIVE_POST,
			post
		}))
	}
}

export const getPosts = category => {
	return dispatch => {
		return API.getPosts( category )
		.then( posts => dispatch({
			type: RECEIVE_POSTS,
			posts: posts
		}))
	}
}

export const getPostsByCategory = category => {
	return dispatch => {
		return API.getPosts( category )
		.then( posts => dispatch({
			type: RECEIVE_POSTS,
			posts
		}))
	}
}

export const votePost = ( id, vote ) => {
	return dispatch => {
		return API.votePost( id, vote )
		.then( post => API.getPost( post.id )
			.then( post => dispatch({
				type: RECEIVE_POST,
				post
			})))
	}
}

export const votePostList = ( id, vote ) => {
	return dispatch => {
		return API.votePost( id, vote )
		.then( posts => API.getPosts()
			.then( posts => dispatch({
				type: RECEIVE_POSTS,
				posts
			})))
	}
}

