import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import Header from './Header';
import Collections from './Collections';
import backend from './backend.js';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collections: []
		};

    this.updateCollections = this.updateCollections.bind(this);
    this.deleteCollection = this.deleteCollection.bind(this);
	}

	 updateCollections(newColl) {
    this.setState({
      collections: [...this.state.collections, newColl]
    });
  }

  deleteCollection(collId) {
    if (window.confirm('Are you sure you want to delete this collection?')) {
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
        throw(err);
      });
    }
  }

  componentDidMount(){
    fetch(`${backend.getCollections}`)
    .then((response)=>{
      response.json().then(data=>{
      	console.log(data);
        this.setState({collections:data});
      });
    })
    .catch(err=>{throw(err)});
  }

	render() {
		return (
			<div>
			  <Header collections={this.state.collections} updateCollections={this.updateCollections} />
        <Collections collections={this.state.collections} deleteCollection={this.deleteCollection} />
        <Grid />
			</div>
		)
	}
}

export default Dashboard