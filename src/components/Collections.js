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
      <Row>
        <Col md={10} smOffset={1} className="mt-3">
          <Panel bsStyle="primary">
            <Panel.Heading>
              <Panel.Title componentClass="h3">Panel heading</Panel.Title>
            </Panel.Heading>
            <Panel.Body className="row">
              {this.state.collections.map(collection => (
                <Col sm={3} key={collection.id} className="mt-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{collection.name}</h5>
                      <p className="card-text">{collection.desc}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                      <Link to={`/edit/${collection.id}`}> <FaIcon icon="edit" size='2x' className="mr-2" /> </Link>
                      <FaIcon icon="star" size='2x' className={collection.favorited} onClick={this.markFavorite} />
                    </div>
                  </div>
                </Col>
              ))}
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    )
  }
}

export default Collections;