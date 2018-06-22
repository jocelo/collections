import React, { Component } from 'react';
import Header from './Header';
import AlertMsg from './AlertMsg';
import backend from './backend.js';

import DatePicker from 'react-date-picker';
import ReactAutocomplete from 'react-autocomplete';

import { Grid, Col, Button, Panel, Alert, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Edit extends Component {
  constructor(props) {
    super(props);
    
    this.closeAlertMsg = this.closeAlertMsg.bind(this);
    
    this.state = {
      originalTitle: '',
      items: [],
      data: {
        id: '',
        name: '',
        desc: '',
        category: ''
      },
      alertClass: 'error'
    }

    this.saveCollection = this.saveCollection.bind(this);
    this.saveField = this.saveField.bind(this);
  }

  componentDidMount() {
    if ('id' in this.props.match.params) {
      fetch(`${backend.getCollection}/${this.props.match.params.id}`)
      .then(response=>{
        response.json().then(data=>{
          console.log('details from the object');
          console.log(data);
          this.setState({
            searchedValue: '',
            originalTitle: data.name,
            data: {
              id: data.id,
              name: data.name,
              desc: data.desc,
              category: data.category_name
            }
          });
        });
      })
      .catch(err=>{
        console.log('ERROR');
      });
    }

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

  saveCollection(evt) {
    evt.preventDefault();
    const thatass = this.state.data;
    thatass['category'] = this.state.searchedValue;

    fetch(`${backend.updateCollection}/${this.props.match.params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(thatass)
    })
    .then(res=>{
      res.json().then(coll=>{
        console.log('coll saved!!');
        console.log(coll);
      });
    })
    .catch(err=>{
      console.log('THERE is an error', err);
    });
  }

  saveField(evt) {
    const datass = this.state.data;
    datass[evt.currentTarget.name] = evt.currentTarget.value;
    this.setState({data: datass});
  }

  closeAlertMsg() {
    this.setState({submitError: false});
  }

  render() {
    return (
      <div>
        <Header />
        <Grid className="mt-5">
          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title componentClass="h3">Edit {this.state.originalTitle}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}> Name: </Col>
                  <Col sm={9}> <FormControl type="text" name="name"  placeholder="Name of the collectible" onChange={this.saveField} value={this.state.data.name} /> </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}> Description: </Col>
                  <Col sm={9}> <FormControl componentClass="textarea" name="desc" placeholder="Description" onChange={this.saveField} value={this.state.data.desc} /> </Col>
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
                    <ReactAutocomplete name="category"
                      items = {this.state.items}
                      shouldItemRender = {(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1 }
                      getItemValue = {item => item.title}
                      renderItem = {(item, highlighted) => <div key={item.id} style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}} > {item.title} </div> }
                      renderMenu = {(items, value)=>{
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
                      value = {this.state.searchedValue}
                      onChange = {e => this.setState({ searchedValue: e.target.value })}
                      onSelect = {value => { this.setState({ searchedValue: value }) }}
                    />
                  </Col>
                </FormGroup>
              </Form>
              <AlertMsg showIt={this.state.submitError} useClass={this.state.alertClass} closeAlert={this.closeAlertMsg} />
            </Panel.Body>
            <Panel.Footer>
              <div className="pull-right" >
                <Button bsStyle="info" className="mr-3" onClick={this.saveCollection}>Save</Button>
              </div>
            </Panel.Footer>
          </Panel>
        </Grid>
      </div>
    );
  }
}

export default Edit;