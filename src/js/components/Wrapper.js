import React, { Component} from "react";
import ReactDom from 'react-dom';
import Input from './Input';

class Wrapper extends Component {
	constructor() {
		super();

		this.state = {
			"seo_title": "this is the title"
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.id]: event.target.value
		});
	}

	render() {
		return (
			<form id="article-form">
				<Input 
					text="SEO Title"
					label="seo_title"
					type="text"
					id="seo_title"
					value={this.state.seo_title}
					handleChange={this.handleChange}
				/>

			</form>
		)
	}
}

export default Wrapper;

const container = document.getElementById('create-article-form');
container ? ReactDom.render(<Wrapper />, container) : false;