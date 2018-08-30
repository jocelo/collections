import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import FaIcon from '@fortawesome/react-fontawesome';

class EmptyCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Row>
      <Col md={10} smOffset={1} className="mt-3">
        You don't have any collections yet... you can do one of two things:
      </Col>
      <Col md={5} smOffset={1}> Start adding to my collections using the <FaIcon icon="plus-circle" /> in toolbar above OR </Col>
      <Col md={5}> Start following someone </Col>
    </Row>
  }
}

export default EmptyCollection;