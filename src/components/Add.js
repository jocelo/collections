import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import ReactAutocomplete from 'react-autocomplete';
import styled from 'styled-components';
import FaIcon from '@fortawesome/react-fontawesome';
import preload from '../assets/data.json';

import { Grid, FormGroup, ControlLabel, FormControl, Col, Form, Checkbox, Button, Row, Panel, PanelHeading, PanelBody, Label, Badge} from 'react-bootstrap';

const H3 = styled.h3`
	display: inline;
`;

class Add extends Component {
	constructor(props) {
		super(props);
    
    //this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      value: ''
    };

	}

	render() {
		return (
			<div>
			<Header />
			<Grid className="mt-5">
  <Panel bsStyle="info">
    <Panel.Heading>
      <Panel.Title componentClass="h3">Adding new item to collection</Panel.Title>
    </Panel.Heading>
    <Panel.Body>
    	
<Form horizontal>
  <FormGroup controlId="formHorizontalEmail">
  	<Row>
	    <Col componentClass={ControlLabel} sm={2}> Name: </Col>
	    <Col sm={9}> <FormControl type="text" placeholder="Name of the collectible" /> </Col>
    </Row>
  </FormGroup>
  <FormGroup controlId="formHorizontalEmail">
  	<Row>
	    <Col componentClass={ControlLabel} sm={2}> Release Date: </Col>
	    <Col sm={9}> <FormControl type="text" placeholder="Name of the collectible" /> </Col>
    </Row>
  </FormGroup>
  <FormGroup controlId="formHorizontalEmail">
  	<Row>
	    <Col componentClass={ControlLabel} sm={2}> Category: </Col>
	    <Col sm={9}>
	      <ReactAutocomplete
	        items={preload.categories}
	        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
	        getItemValue={item => item.label}
	        renderItem={(item, highlighted) =>
	          <div
	            key={item.id}
	            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
	          >
	            {item.label}
	          </div>
	        }
	        value={this.state.value}
	        onChange={e => this.setState({ value: e.target.value })}
	        onSelect={value => this.setState({ value })}
	      />
	    </Col>
    <Col smOffset={2}  md={8}>
    	<H3>
  			<Label className="mr-2">Barbie<FaIcon icon="times" size='lg' className="label-icon" /> </Label>
  		</H3>
  		<H3>
  			<Label className="mr-2">Nes Games<FaIcon icon="times" size='lg' className="label-icon" /> </Label>
  		</H3>
  		<H3>
  			<Label className="mr-2">Funkos<FaIcon icon="times" size='lg' className="label-icon" /> </Label>
  		</H3>
  	</Col>
    </Row>
  </FormGroup>


  <FormGroup bsSize='lg'>
  <Row>
    <Col smOffset={2} sm={10}>
      <Button type="submit" bsStyle="info">Sign in</Button>
    </Col>
    </Row>
  </FormGroup>
</Form>


    </Panel.Body>
  </Panel>


</Grid>
</div>

		);
	}
}

export default Add;