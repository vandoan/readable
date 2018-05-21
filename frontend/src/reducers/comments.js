import { RECEIVE_COMMENT, RECEIVE_COMMENTS } from '../actions/constants'

const comments = (state = {}, action) => {
	const { comment, comments } = action
	switch (action.type) {
		case RECEIVE_COMMENTS:
			return comments
		case RECEIVE_COMMENT:
			return comment
		default:
			return state
	}
}

export default comments