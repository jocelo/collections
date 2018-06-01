import React, { Component} from "react";
import ReactDom from 'react-dom';
import Input from './Input';
import Header from './Header';

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import faAdversal from '@fortawesome/fontawesome-free-brands/faAdversal';
import faSearch from '@fortawesome/fontawesome-free-solid/faCoffee';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';

fontawesome.library.add(brands, faCheckSquare, faCoffee, faAdversal, faSearch, faBars, faPlusCircle);

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
			<div>
				<Header />
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
			</div>
		)
	}
}

export default Wrapper;

const container = document.getElementById('create-article-form');
container ? ReactDom.render(<Wrapper />, container) : false;