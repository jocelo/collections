import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './Header';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value:''
		};
	}

	render() {
		return (
			<div>
				<Header />
				<Grid>
					<Row>
						<Col>
						This is my profile
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}

export default Profile;