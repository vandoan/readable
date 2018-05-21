import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addComment, editComment } from '../actions/comments'


class CommentForm extends Component {
	constructor(props) {
		super(props)
		let editMode = true
		let comment = {}
		const pathname = this.props.location.pathname
		
		if( pathname.split("/")[1] === "new-comment" ) {
			editMode = false
		}

		if( editMode && this.props.location.state ) {
			comment = this.props.location.state.comment
		}
		
		this.state = {
			author: editMode ? comment.author : '',
			body: editMode ? comment.body : '',
			category: this.props.match.params.category,
			editMode: editMode,
			id: editMode ? comment.id : '',
			parentId: editMode ? comment.parentId : `${this.props.location.state.id}`,
			redirect: false,
			timestamp: editMode ? comment.timestamp : Date.now(),
			voteScore: editMode ? comment.voteScore: 0,
		}
	}
	
	handleInput = (e, data) => {
		this.setState({
			[data]: e.target ? e.target.value : e
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const comment = {
			author: this.state.author,
			body: this.state.body,
			id: this.state.id,
			parentId: this.state.parentId,
			voteScore: this.state.voteScore,
		}

		if (this.state.editMode) {
			this.props.editComment(comment)
			.then(() => this.setState({
					redirect: !this.state.redirect,
				}))
		} else {
			this.props.addComment(comment)
				.then(() => this.setState({
					redirect: !this.state.redirect,
				}))
		}
		
	}

	render() {
		if( this.state.redirect ) {
			return <Redirect to={`/${ this.props.match.params.category }/${ this.state.parentId }` } />
		}

		return (
			<div className="view-form-post mt-30 mlr-auto mw-660">
				<h1>{ this.state.editMode ? 'Edit' :  'New' } Comment</h1>
				<form>
					<label className="dis-no" htmlFor="post-body">Body</label>
					<input 
						className="dis-b mt-30 bs-2 bc-lb br-4 bs-dot dis-b mt-30 p-05"
						name="time" id="post-form-author" 
						onChange={(e) => this.handleInput(e, "author")}
						placeholder="author"
						value={this.state.author} 
					/>

					<label className="dis-no" htmlFor="post-body">Body</label>
					<textarea 
						className="dis-b mt-30 bs-2 bc-lb br-4 bs-dot dis-b mt-30 p-05 mt-30 wid-50" 
						id="post-form-body" 
						name="post-body" 
						placeholder="Body" 
						onChange={(e) => this.handleInput(e, "body")}
						value={this.state.body}
					/>

					<button 
						onClick={this.handleSubmit}
						className="dis-ib mt-30 button-light fs-14 op-5 op-9-h"
					>
						{this.state.editMode ? 'Edit' : 'Add'} Post
					</button>
				</form>
			</div>

		)
	}
}


const mapDispatchToProps = dispatch => ({
	addComment: comment => dispatch( addComment(comment) ),
	editComment: comment => dispatch( editComment(comment) ),
})


export default connect(null, mapDispatchToProps)(CommentForm)


