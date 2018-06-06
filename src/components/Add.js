import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import ReactAutocomplete from 'react-autocomplete';
import preload from '../assets/data.json';
import FaIcon from '@fortawesome/react-fontawesome';

import { Grid, FormGroup, ControlLabel, FormControl, Col, Form, Checkbox, Button, Row, Panel, PanelHeading, PanelBody, Label, Badge} from 'react-bootstrap';

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
	    <Col sm={8}> <FormControl type="text" placeholder="Name of the collectible" /> </Col>
    </Row>
  </FormGroup>
  <FormGroup controlId="formHorizontalEmail">
  	<Row>
	    <Col componentClass={ControlLabel} sm={2}> : </Col>
	    <Col sm={8}> <FormControl type="text" placeholder="Name of the collectible" /> </Col>
    </Row>
  </FormGroup>
  <FormGroup controlId="formHorizontalEmail">
  	<Row>
	    <Col componentClass={ControlLabel} sm={2}> Category: </Col>
	    <Col sm={8}>
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
    </Row>
    <Row>
    <Col>  
    	<h1>
  			<Label className="mr-2">42<FaIcon icon="times" size='lg' className="label-icon" /> </Label>
  		</h1>
  		<Badge>42</Badge>
  		<Badge>42</Badge>
  	 </Col>
    </Row>
  </FormGroup>
  <FormGroup controlId="formHorizontalEmail">
  	<Row>
	    <Col componentClass={ControlLabel} sm={2}> Name: </Col>
	    <Col sm={8}> <FormControl type="text" placeholder="Name of the collectible" /> </Col>
    </Row>
  </FormGroup>


  <FormGroup bsSize='lg' controlId="formHorizontalPassword">
  <Row>
    <Col componentClass={ControlLabel} sm={2}>
      Password
    </Col>
    <Col sm={10}>

    </Col>
    </Row>
  </FormGroup>

  <FormGroup bsSize='lg'>
  <Row>
    <Col smOffset={2} sm={10}>
      <Checkbox>Remember me</Checkbox>
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