import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import './css/index.css';
// import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import Edit from './components/Edit';
import Profile from './components/Profile';

const FourOhFour = () => (
	<div> doodoo &lt;!-- 404 --&gt; doodoo </div>
)

const detailsDiv = () => (
	<div> details </div>
)

const Router = () => (
	<BrowserRouter>
		<Grid fluid className="app">
			<Switch>
				<Route exact path="/" component={App} />
				<Route exact path="/edit/:id" component={Edit} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/details" component={detailsDiv} />

				<Route component={FourOhFour} />
			</Switch>
		</Grid>
	</BrowserRouter>
)


ReactDOM.render(<Router />, document.getElementById('root'));
// registerServiceWorker();
