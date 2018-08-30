import React, { Component } from 'react';

import backend from './backend';
import Header from './Header';

import { Grid, Panel, Row, Col } from 'react-bootstrap';

class AddImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalTitle: ''
    };
  }

  componentDidMount() {
    fetch(`${backend.getCollection}/${this.props.match.params.id}`)
    .then(response=>{
      response.json().then(data=>{
        this.setState({
          originalTitle: data.name
        });
      });
    })
    .catch(err=>{
      console.log('ERROR');
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Grid className="mt-5">
          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title componentClass="h3"><strong>{this.state.originalTitle}</strong> () </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Row>
                <Col md={8}>
                  Drag images here
                  <Row>
                    <Col mdOffset={4} md={2} style={{'background-color': 'red', 'height': '70px'}}> Up </Col>
                  </Row>
                  <Row>
                    <Col mdOffset={2} md={2} style={{'background-color': 'red', 'height': '280px'}}> Le </Col>
                    <Col md={2} style={{'background-color': 'red', 'height': '280px'}}> Fr </Col>
                    <Col md={2} style={{'background-color': 'red', 'height': '280px'}}> Ri </Col>
                  </Row>
                  <Row>
                    <Col mdOffset={4} md={2} style={{'background-color': 'red', 'height': '70px'}}> Do </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  All images
                </Col>
              </Row>
            </Panel.Body>
            <Panel.Footer>
            </Panel.Footer>
          </Panel>
        </Grid>
      </div>
    )
  }
}

export default AddImages;