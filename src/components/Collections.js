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

  deleteCollection(collId) {
    fetch(`${backend.deleteCollection}/${collId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response=>{
      if (response.status === 200) {
        response.json().then(res=>{
          this.setState({
            collections: this.state.collections.filter(coll=>{ console.log(coll); console.log(coll.id,' vs ',collId); return coll.id !== collId })
          });
        });
      }
    })
    .catch(err=>{
      console.log('THERE is an error', err);
    });
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
                      <FaIcon icon="trash-alt" size='2x' className="mr-2" onClick={e=>{ this.deleteCollection(collection.id) } } />
                      <Link to={`/edit/${collection.id}`} className="mr-2"> <FaIcon icon="edit" size='2x' /> </Link>
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