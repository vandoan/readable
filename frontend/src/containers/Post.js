import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost, getPost, votePost } from '../actions/posts'
import { deleteComment, getComments, voteComment } from '../actions/comments'



class Post extends Component {
	state = {
		redirect: false,
	}

	componentDidMount() {
		this.props.getComments(this.props.match.params.id)
		this.props.getPost(this.props.match.params.id)
	}
	handleDelete = id => {
		this.props.deletePost(id)
		.then( () => this.setState({
			redirect: !this.state.redirect,
		}))
	}
	handleDeleteComment = comment => {
		this.props.deleteComment(comment)
	}


	render() {

		const { comments, post } = this.props

		if( this.state.redirect ) {
			return <Redirect to={`/`} />
		}
		if( post.deleted == null ) {
			return (
				<h1 className="mt-30 ta-cen">Apologies, this post no longer exist.</h1>
			)
		}

		return (
			<div className="view-post mt-30">

				<h1 className='tt-c'>{post.title}</h1>
				<h4><span className='fs-14 op-5'><i className='mr-05'>by</i></span> <span className='tt-c'>{post.category}</span></h4>
				<div>{post.body}</div>

				<div className='block-details mt-30'>
					<div className="dis-ib fs-14">
						<button 
							className="br-4 bc-ini cur-poi op-3 op-9-h"
							onClick={()=>this.props.votePost(post.id, 'upVote')}
						>
						&uarr;
						</button>
						<span className='ml-05 mr-05 op-7'>{post.voteScore} votes</span>
						<button 
							className="br-4 bc-ini cur-poi op-3 op-9-h"
							onClick={()=>this.props.votePost(post.id, 'downVote')}
						>
						&darr;
						</button>
					</div>
					<div className="add-comment button dis-ib ml-15">
						<Link to={{ pathname:`/edit-post/${post.category}`, state: post, edit: true }} >
							<button className='button-light fs-14 op-5 op-9-h'>
								edit post
							</button>
						</Link>
						<Link to={{ pathname:`/new-comment/${post.category}`, state: post, edit: true }} >
							<button className='button-light fs-14 ml-15 op-5 op-9-h'>
								new comment
							</button>
						</Link>
					</div>
					<button 
						className='button-light fs-14 ml-15 op-5 op-9-h' 
						onClick={() => this.handleDelete(post.id) }>
							delete
					</button>
				</div>

				<div className="comments mt-30">
					<h2 className="op-9 mt-50"> Comments</h2>
					{ comments.length > 0 && 
						comments.map( comment => (
							<div className="mt-25" key='post-{index}-{key}'>
								<div className='line-dotted-blue mb-05 pb-05 wid-30p'></div>
								<div className=''>{comment.body}</div>
								<div className='fs-14'>- { comment.author }</div>
								<div className='dis-ib fs-14'>
									<button 
									className="br-4 bc-ini cur-poi op-3 op-9-h"
									onClick={ () => this.props.voteComment(comment.id, 'upVote')}>
										&uarr;
									</button>
									<span className='ml-05 mr-05 op-7'>{comment.voteScore} votes</span>
									<button 
										className='br-4 bc-ini cur-poi op-3 op-9-h'
										onClick={ () => this.props.voteComment(comment.id, 'downVote')}
										>&darr;</button>
									<Link to={{
											pathname:`/edit-comment/${post.category}`,
											state:{ comment } 
										}} 
									>
										<button
											className='button-light fs-14 ml-15 op-5 op-9-h'>
											edit
										</button>
									</Link>
									<button 
											className='button-light fs-14 ml-15 op-5 op-9-h' 
											onClick={() => this.handleDeleteComment(comment) }>
												delete
									</button>
								</div>
							</div>
						)
					)}
				</div>

			</div>

		)
	}
}


const mapStateToProps = ({ comments, posts }) => ({
	comments,
	post: posts,
})

const mapDispatchToProps = dispatch => ({
	deletePost: id => dispatch( deletePost(id) ),
	deleteComment: comment => dispatch( deleteComment(comment) ),
	getComments: id => dispatch( getComments(id) ),
	getPost: id => dispatch( getPost(id) ),
	voteComment: (id, vote) => dispatch( voteComment(id, vote) ),
	votePost: (id, vote) => dispatch( votePost(id, vote) ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)