import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/categories'
import { Link } from 'react-router-dom'

class Header extends Component {

	componentDidMount() {
		this.props.getCategories()
	}


	render() {
		const { categories } = this.props

		return (
			<header className="bg-mid fs-28 ta-cen">
				<li className="dis-ib lst-no plr-20">
					<a className="col-clo" href="/">Readable</a>
				</li>
				{ categories.length > 0 && categories.map((category, key) => (
					<li className="dis-ib lst-no plr-20" key={key}>
						<Link to={`/${category.path}`} className="col-clo">{category.name}</Link> 
					</li>
				))}
			</header>
		)
	}
}

const mapStateToProps = ({ categories }) => ({
	categories
})

const mapDispatchToProps = dispatch => ({
	getCategories: () => dispatch(getCategories())
})



export default connect(mapStateToProps, mapDispatchToProps)(Header)