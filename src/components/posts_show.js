import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
	constructor() {
		super();
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	componentWillMount() {
		const { id } = this.props.params;

		this.props.fetchPost(id);
	}

	onDeleteClick() {
		const { id } = this.props.params;

		this.props.deletePost(id);
	}

	render() {
		const { post } = this.props;

		if (!post) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<button
				className='btn btn-danger pull-xs-right'
				onClick={this.onDeleteClick}>Delete Post</button>
				<h3>{ post.title }</h3>
				<h6>Categories: { post.categories }</h6>
				<p>{ post.content }</p>
				<Link to='/'>Back To Index</Link>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
