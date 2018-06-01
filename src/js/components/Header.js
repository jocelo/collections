import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Box = styled.div`
	height: 50px;
`;

class Header extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<Box className="row">
				<div className="col align-self-start align-self-center">
					<FontAwesomeIcon icon="plus-circle" className="mr-2" size="2x" />
					<FontAwesomeIcon icon="plusCircle" size="2x" />
				</div>
				<div className="col align-self-center">
					<div className="input-group">
						<input type="text" className="form-control" placeholder="Search" />
						<div className="input-group-append">
							<button className="btn btn-outline-secondary">
								<FontAwesomeIcon icon="search" />
							</button>
						</div>
					</div>
				</div>
				<div className="col align-self-center">
					<FontAwesomeIcon icon="search" />
					<FontAwesomeIcon icon="search" />
					<FontAwesomeIcon icon="search" />
				</div>
			</Box>
		)
	}
}

export default Header;