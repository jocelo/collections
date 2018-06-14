import React, { Component } from 'react';
import { Alert, Button } from 'react-bootstrap';

class AlertMsg extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
    const label = this.props.useClass === 'danger' ? 'Error' : 'Success';
		if (this.props.showIt) {
			return (
			<Alert bsStyle={this.props.alertClass}>
	      <h4>{label}</h4>
	      <p>
	        This is the generic error of the form.
	      </p>
	      <p>
	        <Button onClick={this.props.closeAlert}>Accept</Button>
	      </p>
	    </Alert>
	    )			
		} else {
			return '';
		}
	}
}

export default AlertMsg;