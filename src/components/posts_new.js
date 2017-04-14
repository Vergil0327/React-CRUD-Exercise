import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
	// check that there is a router object available in the context and ask for 'router'
	// https://github.com/reactjs/react-router-tutorial/tree/master/lessons/12-navigating
	static contextTypes = {
		router: React.PropTypes.object
	}

	onSubmit(formValues) {
		this.props.createPost(formValues)
			.then(() => {
				// console.log(this.context);
				// blog post has been created, navigate the user to the index
				// we navigate by calling this.context.router.push
				// with the new path to navigate to
				this.context.router.push('/');
			});
	}

	render() {
		const { fields: { title, categories, content }, handleSubmit, resetForm } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>
				<div className={ `form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input type='text' className='form-control' {...title} />
					<div className='text-help'>
						{title.touched ? <span>{title.error}</span> : ''}
					</div>
				</div>

				<div className={ `form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type='text' className='form-control' {...categories} />
					<div className='text-help'>
						{categories.touched ? <span>{categories.error}</span> : ''}
					</div>
				</div>

				<div className={ `form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<textarea className='form-control' {...content} value={content.value || ''} />
					<div className='text-help'>
						{content.touched ? <span>{content.error}</span> : ''}
					</div>
				</div>

				<button type='submit' className='btn btn-primary'>Submit</button>
				<button type='button' className='btn btn-default' onClick={resetForm} >Undo</button>
				<Link to='/' className='btn btn-danger'>Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Title is required!';
	}

	if (!values.categories) {
		errors.categories = 'Category is required!';
	}

	if (!values.content) {
		errors.content = 'Content is required!';
	}

	return errors;
}

// connect(mapStateToProps, mapDispatchToProps)
// reduxForm(form config, mapStateToProps, mapDispatchToProps) <older version>
// redux Form v6 need to use connect() of react-redux

export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'],
	validate
}, null, { createPost })(PostsNew);
