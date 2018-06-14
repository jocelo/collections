import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Header from './Header';
import AlertMsg from './AlertMsg';
import ReactAutocomplete from 'react-autocomplete';
import styled from 'styled-components';
import FaIcon from '@fortawesome/react-fontawesome';
import preload from '../assets/data.json';
import backend from './backend.js';
import DatePicker from 'react-date-picker';

import { Grid, FormGroup, ControlLabel, FormControl, Col, Form, Button, Row, Panel, Label, Alert} from 'react-bootstrap';

const H4 = styled.h4`
  display: inline;
`;

class Add extends Component {
  constructor(props) {
    super(props);
    
    this.addNewCategory = this.addNewCategory.bind(this);
    this.saveField = this.saveField.bind(this);
    this.saveFieldArea = this.saveFieldArea.bind(this);
    this.saveCollection = this.saveCollection.bind(this);
    this.closeAlertMsg = this.closeAlertMsg.bind(this);
    
    this.state = {
      panelHeader: 'id' in props.match.params ? 'Edit ' : 'Adding new item to collection',
      col_name: '',
      col_desc: '',
      col_release_date: new Date(),
      col_favorite: false,
      searchedValue: '',
      pills: preload.categories,
      selected_category: '',
      submitError: false,
      submitSuccess: false,
      alertClass: 'error'
    }
  }

  componentDidMount() {
    fetch(`${backend.getAllCats}`)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log('THERE is an error', err);
    });

    if ('id' in this.props.match.params) {
      fetch(`${backend.getCollection}/${this.props.match.params.id}`)
      .then(response=>{
        response.json().then(data=>{
          console.log('details from the object');
          console.log(data);
        });
      })
      .catch(err=>{
        console.log('ERROR');
      });
    }
  }

  saveField(evt) {
    this.setState({col_name: evt.target.value});
  }

  saveFieldArea(evt) {
    this.setState({col_desc: evt.target.value});
  }

  closeAlertMsg() {
    this.setState({submitError: false});
  }

  saveCollection(evt) {
    evt.preventDefault();
    console.log('saving these:', this.state);
    return;
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
        release_date: this.state.col_release_date,
        favorite: this.state.col_favorite
      })
    })
    .then(res=>{
      console.log('Collection saved!!', res);
      this.setState({
        col_name: '',
        col_desc: '',
        submitSuccess: true,
        submitError: true,
        alertClass: 'success'
      });
    })
    .catch(err=>{
      console.log('THERE is an error', err);
    });
  }

  addNewCategory() {
    console.log('addNewCategory');
    const newId = this.state.maxID;
    fetch(`${backend.addCategory}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: this.state.searchedValue })
    })
    .then(res=>{
      console.log('saved!!', res);
    })
    .catch(err=>{
      console.log('THERE is an error', err);
    });
     
    this.setState({pills:this.state.pills.concat({id:newId+1, title:this.state.searchedValue}), maxID:newId+1})
  }

  render() {
    return (
      <div>
      <Header />
      <Grid className="mt-5">
  <Panel bsStyle="info">
    <Panel.Heading>
      <Panel.Title componentClass="h3">{this.state.panelHeader}</Panel.Title>
    </Panel.Heading>
    <Panel.Body>
    <AlertMsg showIt={this.state.submitError} useClass={this.state.alertClass} closeAlert={this.closeAlertMsg} />
<Form horizontal onSubmit={this.saveCollection}>

  <FormGroup controlId="formHorizontalEmail">
    <Row>
      <Col componentClass={ControlLabel} sm={2}> Name: </Col>
      <Col sm={9}> <FormControl type="text" name="col_name"  placeholder="Name of the collectible" onChange={this.saveField} value={this.state.col_name} /> </Col>
    </Row>
  </FormGroup>
  <FormGroup controlId="formHorizontalEmail">
    <Row>
      <Col componentClass={ControlLabel} sm={2}> Description: </Col>
      <Col sm={9}> <FormControl componentClass="textarea" name="col_desc" placeholder="Description" onChange={this.saveFieldArea} value={this.state.col_desc} /> </Col>
    </Row>
  </FormGroup>
  <FormGroup controlId="formHorizontalEmail">
    <Row>
      <Col componentClass={ControlLabel} sm={2}> Release Date: </Col>
      <Col sm={9}> <DatePicker
          onChange={date => this.setState({ col_release_date: date })}
          value={this.state.col_release_date}
        /> </Col>
    </Row>
  </FormGroup>
  <FormGroup controlId="formHorizontalEmail">
    <Row>
      <Col componentClass={ControlLabel} sm={2}> Category: </Col>
      <Col sm={9}>
        <ReactAutocomplete
          items={this.state.pills}
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
          onSelect={value => this.setState({ selected_category: value })}
        />
      </Col>
      <Col id="pills-section" smOffset={2}  md={8}>
        { this.state.pills.map(pill=> (
          <H4 key={pill.id}>
            <Label bsStyle="primary" className="mr-2">{pill.title}<FaIcon icon="times" size='2x' className="label-icon" /> </Label>
          </H4>
        ) )}
      </Col>
    </Row>
  </FormGroup>

  <FormGroup bsSize='lg'>
  <Row>
    <Col smOffset={2} sm={10}>
      <Button type="submit" bsStyle="info">Save</Button>
    </Col>
    </Row>
  </FormGroup>
</Form>


    </Panel.Body>
  </Panel>

</Grid>
</div>

    );
  }
}

export default Add;