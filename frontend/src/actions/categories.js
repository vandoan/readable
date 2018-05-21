import * as API from '../api'
import { RECEIVE_CATEGORIES } from './constants'


export const recieveCategories = categories => {
	return {
		type: RECEIVE_CATEGORIES,
		categories
	}
}

export const getCategories = () => {
	return dispatch => {
		return API.getCategories()
		.then( data => dispatch(recieveCategories(data)) )
	}
}
