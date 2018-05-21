import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, votePostList } from '../actions/posts'
import { Link } from 'react-router-dom'

class PostsList extends Component {

	state = {
		sort: 'date',
	}

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

	onChangeSort = sort => {
		console.log(sort)
	 	this.setState({ sort })
	}

	sortByDate = posts => {
	 	return posts.sort( (a, b) => a.timestamp < b.timestamp )
	}

	sortByVotes = posts => {
		return posts.sort( (a,b) => a.voteScore < b.voteScore )
	}
	
	render() {
		let { posts } = this.props
		let { category } = this.props.match.params


		if( posts.length > 1 ) {
			if(this.state.sort === 'date') {
				posts = this.sortByDate(posts) 
			} else {	 
				posts = this.sortByVotes(posts)  
			}
		}

	 	return (
	 		<div className="list-posts mt-30">
	 			<div className="flo-r lst-no plr-20">
					<Link className="" to={"/new-post"}>
						<button className='button-light op-5 op-8-h'>New Post</button>
					</Link>
					<select
						className='button-light ml-15 op-5 op-8-h'
						style={{ 'height':'29px', 'width': '90px' }}
						onChange={ e => this.onChangeSort(e.target.value) }
					>
						<option value='date'>Latest</option>
						<option value='votes'>Votes</option>
					</select>
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
										onClick={()=>this.props.votePostList(post.id, 'upVote', category )}
									>
									&uarr;
									</button>
									<span className='ml-05 mr-05'>{post.voteScore} votes</span>
									<button 
										className="br-4 bc-ini cur-poi op-3 op-7-h"
										onClick={()=>this.props.votePostList(post.id, 'downVote', category )}
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
	votePostList: (id, vote, category) => dispatch(votePostList(id, vote, category)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)