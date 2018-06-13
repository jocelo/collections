import React, { Component } from 'react';
import backend from './backend.js';

import { Panel, Col, Row } from 'react-bootstrap';

class Collections extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collections: []
		};
	}

	componentDidMount() {
		fetch(`${backend.getCollections}`)
		.then((response)=>{
			response.json().then(data=>{
				this.setState({collections:data});
			});
		})
		.catch(err=>{throw(err)});
	}

	render() {
		return (
			<div>
			<Row>
			<Col md={10} smOffset={1}>
			<Panel bsStyle="primary">
		    <Panel.Heading>
		      <Panel.Title componentClass="h3">Panel heading</Panel.Title>
		    </Panel.Heading>
		    <Panel.Body>
		    {this.state.collections.map(collection => (
					<div key={collection.id}>{collection.name}</div>
				))}
		    </Panel.Body>
		  </Panel>
		  </Col>
	  </Row>
			</div>
		)
	}
}

export default Collections;