import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCategories } from '../actions/categories'
import { addPost, fetchCategories } from '../actions/posts'


class PostForm extends Component {
	constructor( props ) {
		super(props)
		let post = { }
		let editMode = this.props.location.state ? true : false

		if( editMode ) {
			post = this.props.location.state
		}
		console.log(editMode)

		this.state = {
			editMode,
			author: editMode ? post.author : '',
			body: editMode ? post.body : '',
			category: editMode ? post.category : 'react',
			id: editMode ? post.id : Date.now(),
			redirect: false,
			title: editMode ? post.title : '',
		}
	}
	componentWillUnmount() {
		this.setState({
			editMode: false
		})
	}
	
	// Update state
	handleInput = ( e, data ) => {
		this.setState({
			[data]: e.target ? e.target.value : e
		})
	}

	handleSubmit = ( e ) => {
		e.preventDefault()
		const post = {
			author: this.state.author,
			body: this.state.body,
			category: this.state.category,
			id: this.state.id,
			title: this.state.title,
			voteScore: 0,
		}

		this.props.addPost( post ) // Set state
			.then(() => this.setState({
				redirect: !this.state.redirect,
			}))
		
	}


	render() {
		const { categories } = this.props
		const { editMode } = this.state

		if( this.state.redirect ) {
			return <Redirect to={"/"} />
		}

		return (
			<div className="view-form-post mt-30 mlr-auto mw-660">
				<h1>{ editMode ? 'Edit' : 'New' } Post</h1>

				<form>
					<label className="dis-no" htmlFor="post-title">Title</label>
					<input 
						className="bs-2 bc-lb br-4 bs-dot dis-b mt-30 p-05"
						name="time" id="post-form-title" 
						onChange={(e) => this.handleInput(e, "title")}
						placeholder="title"
						value={this.state.title} 
					/>
					<input 
						className="dis-b mt-30 bs-2 bc-lb br-4 bs-dot dis-b mt-30 p-05"
						name="time" id="post-form-title" 
						onChange={(e) => this.handleInput(e, "author")}
						placeholder="author"
						value={this.state.author} 
					/>

					<label className="dis-no" htmlFor="post-category">Category</label>
					<select 
						placeholder="Category" 
						name="post-category" 
						id="post-form-category"
						value={this.state.category}
						onChange={(e) => this.handleInput(e, "category")}
						className="dis-b mt-30" 
					>
						{ categories.map( category => (
							<option value={category.name} key={category.name}>
								{category.name}
							</option>
						))}
					</select>

					<label className="dis-no" htmlFor="post-body">Body</label>
					<textarea 
						className="mt-30 wid-50 bs-2 bc-lb br-4 bs-dot dis-b mt-30 p-05" 
						placeholder="Body" 
						name="post-body" 
						id="post-form-body" 
						onChange={(e) => this.handleInput(e, "body")}
						value={ this.state.body }
					/>

					<button 
						onClick={this.handleSubmit}
						className="dis-ib"
					>
						{ editMode ? "Edit" : "Add" } Post
					</button>
				</form>
			</div>
		)
	}
}


const mapStateToProps = ({ categories }) => ({
	categories
})

const mapDispatchToProps = dispatch => ({
	addPost: post => dispatch(addPost(post)),
	getCategories: () => dispatch(getCategories())
})


export default connect(mapStateToProps, mapDispatchToProps)(PostForm)