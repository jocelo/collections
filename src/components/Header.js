import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FaIcon from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AddCollectionModal from './AddCollectionModal';

const Box = styled.div`
  height: 50px;
  background-color: salmon;
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showAddModal: false,
      showClassForModal: '',
      pills: []
    };

    this.showAddModal = this.showAddModal.bind(this);
    this.hideAddModal = this.hideAddModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  showAddModal() {
    this.setState({
      showAddModal: true,
      showClassModal: 'show'
    });
  }

  hideAddModal() {
    this.setState({
      showAddModal: false,
      showClassModal: ''
    });
  }

  showDeleteModal() {
    this.setState({
      showDeleteModal: true,
      showClassModal: 'show'
    });
  }

  hideDeleteModal() {
    this.setState({
      showDeleteModal: false,
      showClassModal: ''
    });
  }

  render() {
    return (
      <div>
        <Box className="row header">
          <div className="col d-flex flex-row align-items-center">
            <Link to='/'> <FaIcon icon="home" size="3x" className="mr-3 ml-3" /> </Link>
            <Link to='/'> <FaIcon icon="bars" size="3x" className="mr-3" /> </Link>
            <a onClick={this.showAddModal}><FaIcon icon="plus-circle" size="3x" className="mr-3 cWhite" /></a>
          </div>
          <div className="col align-self-center">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" >
                  <FaIcon icon="search" />
                </button>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <Link to='/notification'> <FaIcon icon="bell" size="3x" className="mr-3" /> </Link>
            <Link to='/profile'> <FaIcon icon="at" size="3x" className="mr-3" /> </Link>
          </div>
        </Box>
        <AddCollectionModal updateCollections={this.props.updateCollections} showAddModal={this.state.showAddModal} hideAddModal={this.hideAddModal} showClassModal={this.state.showClassModal} />
      </div>
    )
  }
}

export default Header;