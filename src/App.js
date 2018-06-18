import React, { Component } from 'react';
import Header from './components/Header';
import Collections from './components/Collections';
import backend from './components/backend.js';
import './css/App.css';

import fontawesome      from '@fortawesome/fontawesome'
import brands           from '@fortawesome/fontawesome-free-brands';
import faCheckSquare    from '@fortawesome/fontawesome-free-solid/faCheckSquare';
import faCoffee     from '@fortawesome/fontawesome-free-solid/faCoffee';
import faHome    		from '@fortawesome/fontawesome-free-solid/faHome';
import faAdversal   from '@fortawesome/fontawesome-free-brands/faAdversal';
import faSearch     from '@fortawesome/fontawesome-free-solid/faSearch';
import faBars       from '@fortawesome/fontawesome-free-solid/faBars';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faAt         from '@fortawesome/fontawesome-free-solid/faAt';
import faBell       from '@fortawesome/fontawesome-free-solid/faBell';
import faTimes      from '@fortawesome/fontawesome-free-solid/faTimes';
import faStar      	from '@fortawesome/fontawesome-free-solid/faStar';
import faEdit      	from '@fortawesome/fontawesome-free-solid/faEdit';
import faTrashAlt   from '@fortawesome/fontawesome-free-solid/faTrashAlt';

import { Grid } from 'react-bootstrap';

fontawesome.library.add(brands, faCheckSquare, faCoffee, faAdversal, faSearch, faBars, faPlusCircle, faAt, faBell, faHome, faTimes, faStar, faEdit, faTrashAlt);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collections: []
		};

		this.updateCollections = this.updateCollections.bind(this);
	}

	updateCollections(newColl) {
		console.log('updateCollections');
		console.log(this.state.collections);
		console.log(newColl);
		//const allNew = this.state.collections.concatenate(newColl);
		console.log('all new');
		this.setState({
			collections: [...this.state.collections, newColl]
		});
	}

	componentDidMount(){
		fetch(`${backend.getCollections}`)
    .then((response)=>{
      response.json().then(data=>{
        this.setState({collections:data});
      });
    })
    .catch(err=>{throw(err)});
	}

  render() {
    return (
    	<div>
    		<Header collections={this.state.collections} updateCollections={this.updateCollections} />
    		<Collections collections={this.state.collections} />
	      <Grid />
    	</div>
    );
  }
}

export default App;
