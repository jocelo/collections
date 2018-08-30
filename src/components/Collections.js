import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FaIcon from '@fortawesome/react-fontawesome';

import { Panel, Col, Row } from 'react-bootstrap';

class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.markFavorite = this.markFavorite.bind(this);
  }

  componentDidMount() {
    console.log(this.props.collections);
  }

  markFavorite(ev) {
    console.log(ev.currentTarget);
    console.log(ev.target);
  }

  render() {
    return (
      <Row>
        <Col md={10} smOffset={1} className="mt-3">
        {this.props.collections.map((category, id) => (
          <Panel key={id} bsStyle="primary">
            <Panel.Heading>
              <Panel.Title componentClass="h3">
                {category.category_name || 'No categories'} <span className="badge badge-secondary pull-right">0 Items</span> 
              </Panel.Title>

            </Panel.Heading>
            <Panel.Body className="row">
              {category.data.map(collection => (
                <Col sm={3} key={collection.id} className="mt-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{collection.name}</h5>
                      <p className="card-text">{collection.desc} - {collection.category_name}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                      <Link to={`/add-images/${collection.id}`} className="mr-3"> <FaIcon icon="images" size='2x' /> </Link>
                      <FaIcon icon="trash-alt" size='2x' className="mr-3" onClick={e=>{ this.props.deleteCollection(collection.id) } } />
                      <Link to={`/edit/${collection.id}`} className="mr-3"> <FaIcon icon="edit" size='2x' /> </Link>
                      <FaIcon icon="star" size='2x' className={collection.favorited} onClick={this.markFavorite} />
                    </div>
                  </div>
                </Col>
              ))}
            </Panel.Body>
          </Panel>
        ))}
        </Col>
      </Row>
    )
  }
}

export default Collections;