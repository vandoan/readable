import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, votePostList } from '../actions/posts'
import { voteComment } from '../actions/comments'
import { Link } from 'react-router-dom'

class PostsList extends Component {

	componentDidMount(){
		const { category } = this.props.match.params
		this.props.getPosts(category)
	}
	componentWillReceiveProps(nextProps) {
	    if (nextProps.match.params.category !== this.props.match.params.category) {
	      	const { category } = nextProps.match.params;
	      	this.props.getPosts(category);
	    }
	 }
	
	render() {
		const { posts } = this.props

	 	return (
	 		<div className="list-posts mt-30">
	 			<div className="flo-r lst-no plr-20">
					<Link className="" to={"/new-post"}>
						<button className='button-light op-5 op-8-h'>New Post</button>
					</Link>
				</div>

	 			{ posts.length > 0 ? 
		 			posts.map((post,key) => (
		 				<div className="post mlr-auto mt-25 mw-660" key={post.id}>
			 				<div className="" key={key}>
			 					<Link to={`/${post.category}/${post.id}`}>
			 						<h2>{ post.title }</h2>
			 					</Link>
							</div>
							<div className="fs-14">
								<div className="author dis-ib mr-5">by <span className="tt-c">{ post.author }</span></div>
								<div className="commentCount dis-ib mr-5">
									comments: { post.commentCount }
								</div>
								<div className="dis-ib">
									<button 
										className="br-4 bc-ini cur-poi op-3 op-7-h"
										onClick={()=>this.props.votePostList(post.id, 'upVote')}
									>
									&uarr;
									</button>
									<span className='ml-05 mr-05'>{post.voteScore} votes</span>
									<button 
										className="br-4 bc-ini cur-poi op-3 op-7-h"
										onClick={()=>this.props.votePostList(post.id, 'downVote')}
									>
									&darr;
									</button>
								</div>
							</div>
						</div>
		 			))
	 			: 
	 				(
	 				<div className="post mlr-auto mw-660">
	 					<h2>No Post</h2>
 					</div>
	 			)
	 		}
 			</div>
	 	)
	}
}

const mapStateToProps = ({ posts }) => ({
	posts
})

const mapDispatchToProps = dispatch => ({
	getPosts: (category) => dispatch(getPosts(category)),
	votePostList: (id, vote) => dispatch(votePostList(id, vote)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)