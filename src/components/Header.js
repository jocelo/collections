import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FaIcon from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

const Box = styled.div`
	height: 50px;
	background-color: CadetBlue;
`;

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			showAddModal: false,
			showClassForModal: ''
		};

		this.showAddModal = this.showAddModal.bind(this);
		this.hideAddModal = this.hideAddModal.bind(this);
	}

	showAddModal() {
console.log('will show this stuff (showAddModal)', document.querySelector('div.modal-backdrop'));
		this.setState({
			showAddModal: true,
			showClassModal: 'show'
		});
		console.log( '========', document.querySelector('div.modal-backdrop') );
	}

	hideAddModal() {
		this.setState({
			showAddModal: false,
			showClassModal: ''
		});
	}

	render() {
		const modalClass='';
		return (
			<div>
			<Box className="row header">
				<div className="col d-flex flex-row align-items-center">
					<Link to='/'> <FaIcon icon="home" size="3x" className="mr-3 ml-3" /> </Link>
					<Link to='/'> <FaIcon icon="bars" size="3x" className="mr-3" /> </Link>
					<Link to='/add'> <FaIcon icon="plus-circle" size="3x" className="mr-3" /> </Link>
					<Button onClick={this.showAddModal}>Modal</Button>
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
			<AddModal showAddModal={this.state.showAddModal} hideAddModal={this.hideAddModal} showClassModal={this.state.showClassModal} />
       </div>
		)
	}
}

class AddModal extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Modal show={this.props.showAddModal} className={this.props.showClassModal} onHide={this.props.hideAddModal} backdrop={true}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Text in a modal</h4>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>

          <h4>Overflowing text to show scroll behavior</h4>
          <p>
here
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.hideAddModal}>Close</Button>
        </Modal.Footer>
      </Modal>
     )
	}
}

export default Header;