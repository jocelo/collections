import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backend from './backend.js';
import FaIcon from '@fortawesome/react-fontawesome';

import { Panel, Col, Row } from 'react-bootstrap';

class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: []
    };
    this.markFavorite = this.markFavorite.bind(this);
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

  markFavorite(ev) {
    console.log(ev.currentTarget);
    console.log(ev.target);
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
          <Col sm={2} key={collection.id}>
            <Panel bsStyle="info">
              <Panel.Heading>
                <Panel.Title componentClass="h3">{collection.name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>Panel content</Panel.Body>
              <Panel.Footer className="col d-flex justify-content-end">
                <Link to={`/edit/${collection.id}`}> <FaIcon icon="edit" size='2x' className="mr-2" /> </Link>
                <FaIcon icon="star" size='2x' className={collection.favorited} onClick={this.markFavorite} />
              </Panel.Footer>
            </Panel>
          </Col>
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