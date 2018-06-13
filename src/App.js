import React, { Component } from 'react';
// import logo from './assets/logo.svg';
import Header from './components/Header';
import Collections from './components/Collections';
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

import { Grid } from 'react-bootstrap';

fontawesome.library.add(brands, faCheckSquare, faCoffee, faAdversal, faSearch, faBars, faPlusCircle, faAt, faBell, faHome, faTimes);

class App extends Component {
  render() {
    return (
    	<div>
    		<Header />
    		<Collections />
	      <Grid />
    	</div>
    );
  }
}

export default App;
