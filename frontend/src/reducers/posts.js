import { RECEIVE_POST, RECEIVE_POSTS, RECEIVE_COMMENTS} from '../actions/constants'


const posts = (state = {}, action) => {
	const { post, posts } = action
	switch (action.type) {
		case RECEIVE_POSTS:
			return posts
		case RECEIVE_POST:
			return post
  		default:
			return state
	}
}


export default posts