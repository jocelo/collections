import React, { Component } from 'react';
import backend from './backend';
import Header from './Header';
import { Grid, Panel, Row, Col } from 'react-bootstrap';
import FaIcon from '@fortawesome/react-fontawesome';

import '../css/images.scss';

class AddImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalTitle: ''
    };
  }

  componentDidMount() {
    fetch(`${backend.getCollection}${this.props.match.params.id}`)
    .then(response=>{
      response.json().then(data=>{
        this.setState({
          originalTitle: data.name,
          category: data.category_name || 'No category'
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
              <Panel.Title componentClass="h3"><strong>{this.state.originalTitle}</strong> ({this.state.category}) </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Row>
                <Col md={8}>
                  Drag images here
                  <Row>
                    <Col mdOffset={4} md={2}  className="img-placeholder-top"> Top Image </Col>
                  </Row>
                  <Row>
                    <Col mdOffset={2} md={2} className="img-placeholder-left"> Left Image </Col>
                    <Col md={2} className="img-placeholder-front"> Front Image </Col>
                    <Col md={2} className="img-placeholder-right"> Right Image </Col>
                  </Row>
                  <Row>
                    <Col mdOffset={4} md={2} className="img-placeholder-bottom"> Bottom Image </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  All images
                </Col>
              </Row>
            </Panel.Body>
            <Panel.Footer>
              <FaIcon icon="codePen" /> 3D
            </Panel.Footer>
          </Panel>
        </Grid>
      </div>
    )
  }
}

export default AddImages;