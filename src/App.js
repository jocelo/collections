import React, { Component } from 'react';

import fontawesome      from '@fortawesome/fontawesome'
import faCheckSquare    from '@fortawesome/fontawesome-free-solid/faCheckSquare';
import faCoffee         from '@fortawesome/fontawesome-free-solid/faCoffee';
import faHome           from '@fortawesome/fontawesome-free-solid/faHome';
import faSearch         from '@fortawesome/fontawesome-free-solid/faSearch';
import faBars           from '@fortawesome/fontawesome-free-solid/faBars';
import faPlusCircle     from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faMinusCircle    from '@fortawesome/fontawesome-free-solid/faMinusCircle';
import faAt             from '@fortawesome/fontawesome-free-solid/faAt';
import faBell           from '@fortawesome/fontawesome-free-solid/faBell';
import faTimes          from '@fortawesome/fontawesome-free-solid/faTimes';
import faStar           from '@fortawesome/fontawesome-free-solid/faStar';
import faEdit           from '@fortawesome/fontawesome-free-solid/faEdit';
import faTrashAlt       from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import faImages         from '@fortawesome/fontawesome-free-solid/faImages';
import faAdversal       from '@fortawesome/fontawesome-free-brands/faAdversal';
import faCodepen        from '@fortawesome/fontawesome-free-brands/faCodepen';
import faArrowLeft      from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import faCloudUploadAlt from '@fortawesome/fontawesome-free-solid/faCloudUploadAlt';
import faCaretDown      from '@fortawesome/fontawesome-free-solid/faCaretDown';

import Dashboard from './components/Dashboard';

import './css/App.scss';

fontawesome.library.add(faCheckSquare, faCoffee, faAdversal, faSearch, faBars, faPlusCircle, faMinusCircle, 
  faAt, faBell, faHome, faTimes, faStar, faEdit, faTrashAlt, faImages, faCodepen, faArrowLeft, faCloudUploadAlt, faCaretDown);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

  }

  render() {
    return (
      <Dashboard />
    );
  }
}

export default App;
