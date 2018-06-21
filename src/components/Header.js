import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FaIcon from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Modal, Button, ControlLabel, Form, FormGroup, FormControl, Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import ReactAutocomplete from 'react-autocomplete';
import backend from './backend.js';

const Box = styled.div`
  height: 50px;
  background-color: CadetBlue;
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
            <a onClick={this.showAddModal}><FaIcon icon="plus-circle" size="3x" className="mr-3" /></a>
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

class AddCollectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      col_name: '',
      col_desc: ''
    };
    this.submitAddForm = this.submitAddForm.bind(this);
    this.saveField = this.saveField.bind(this);
    this.saveFieldArea = this.saveFieldArea.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
  }

  componentDidMount() {
    fetch(`${backend.getAllCats}`)
    .then(res=>{
      res.json().then(items=>{
        this.setState({items:items});
      });
    })
    .catch(err=>{
      console.log('THERE is an error', err);
    });
  }

  submitAddForm(evt) {
    if (this.state.col_name.trim() === '') {
      this.setState({submitError: true, alertClass: 'error'});  
    }
    //this.setState({alertClass: 'error', showIt: true});
    fetch(`${backend.addCollection}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name: this.state.col_name,
        description: this.state.col_desc,
        release_date: this.state.col_release_date,
        category: this.state.searchedValue
      })
    })
    .then(res=>{
      res.json().then(dataSaved=>{
        console.log('Collection saved!!', res);
        this.props.updateCollections(dataSaved);
        this.props.hideAddModal();
      });
    })
    .catch(err=>{
      console.log('THERE is an error', err);
    });
  }

  saveField(evt) {
    this.setState({col_name: evt.target.value});
  }

  saveFieldArea(evt) {
    this.setState({col_desc: evt.target.value});
  }

  addNewCategory() {
    fetch(`${backend.addCategory}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: this.state.searchedValue })
    })
    .then(res=>{
      res.json().then(saveConfirmData=>{
        this.setState({
          items: this.state.items.concatenate({id: saveConfirmData._id, title: saveConfirmData.title}),
          searchedValue: saveConfirmData.title
        });
      });
    })
    .catch(err=>{
      console.log('THERE is an error', err);
    });
  }

  render() {
    return (
      <Modal show={this.props.showAddModal} className={this.props.showClassModal} onHide={this.props.hideAddModal} backdrop={true}>
        
        <Modal.Header>
          <Modal.Title>Adding new collection</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form horizontal onSubmit={this.saveCollection}>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}> Name: </Col>
              <Col sm={9}> <FormControl type="text" name="col_name"  placeholder="Name of the collectible" onChange={this.saveField} value={this.state.col_name} /> </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}> Description: </Col>
              <Col sm={9}> <FormControl componentClass="textarea" name="col_desc" placeholder="Description" onChange={this.saveFieldArea} value={this.state.col_desc} /> </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}> Release Date: </Col>
              <Col sm={9}> <DatePicker
                  onChange={date => this.setState({ col_release_date: date })}
                  value={this.state.col_release_date}
                /> 
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}> Category: </Col>
              <Col sm={9}>
                <ReactAutocomplete
                  items={this.state.items}
                  shouldItemRender={(item, value) => (
                    item.title.toLowerCase().indexOf(value.toLowerCase()) > -1
                  )}
                  getItemValue={item => item.title}
                  renderItem={(item, highlighted) =>
                    <div
                      key={item.id}
                      style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                    >
                      {item.title}
                    </div>
                  }
                  renderMenu={(items, value)=>{
                    return (
                      <div className="menu">
                        {value === '' ? (
                          <div className="item">Type in a category name</div>
                        ) : this.state.loading ? (
                          <div className="item">Loading...</div>
                        ) : items.length === 0 ? (
                          <div className="item">No matches for {value} <a className="add-category" onClick={this.addNewCategory}>add it</a> </div>
                        ) : items}
                      </div>
                    )
                  }}
                  value={this.state.searchedValue}
                  onChange={e => this.setState({ searchedValue: e.target.value })}
                  onSelect={value => {
                    this.setState({ searchedValue: value })
                  }}
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="info" className="mr-3" onClick={this.submitAddForm}>Save</Button>
          <Button bsStyle="danger" onClick={this.props.hideAddModal}>Close</Button>
        </Modal.Footer>
      </Modal>
     )
  }
}

export default Header;