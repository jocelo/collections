import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FaIcon from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Box = styled.div`
	height: 50px;
	background-color: CadetBlue;
`;

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};
	}

	render() {
		return (
			<Box className="row header">
				<div className="col d-flex flex-row align-items-center">
					<Link to='/'> <FaIcon icon="home" size="3x" className="mr-3 ml-3" /> </Link>
					<Link to='/'> <FaIcon icon="bars" size="3x" className="mr-3" /> </Link>
					<Link to='/add'> <FaIcon icon="plus-circle" size="3x" /> </Link>
				</div>
				<div className="col align-self-center">
					<div className="input-group">
						<input type="text" className="form-control" placeholder="Search" />
						<div className="input-group-append">
							<button className="btn btn-outline-secondary" >
								<FaIcon icon="search" />
							</button>
						</div>
					</div>
				</div>
				<div className="col d-flex justify-content-end align-items-center">
					<Link to='/notification'> <FaIcon icon="bell" size="3x" className="mr-3" /> </Link>
					<Link to='/profile'> <FaIcon icon="at" size="3x" className="mr-3" /> </Link>
				</div>
			</Box>
		)
	}
}

export default Header;