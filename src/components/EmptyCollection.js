import React, { Component } from 'react';
import { Col, Row, Panel } from 'react-bootstrap';
import styled from 'styled-components';
import FaIcon from '@fortawesome/react-fontawesome';
import backend from './backend';

const Col2 = ({className, children}) => (
  <Col md={12} className={className}></Col>
)

const Decorator = styled(Col2)`
  border-left: 2px solid gray;
  margin-left: 30%;
  height: 150px;
`

function HasMoreCollections(props) {
  if (props.noCol > 0) {
    return <div className="clearfix"><div className="pull-right"> {props.noCol} more collections!</div></div>;
  } else {
    return '';
  }
}

class EmptyCollection extends Component {

  addFollower(whoToFollow) {
    fetch(`${backend.addFollower}`, {
      method: 'POST',
      body: JSON.stringify({ 
        userId: this.state.userId,
        followingUserId: whoToFollow
      })
    })
    .then(_=>{
      return _.json();
    })
    .then(data=>{
      console.log('final data', data);
    });
  }

  componentDidMount() {
    fetch(`${backend.getDefaultUsersToFollow}`)
    .then(_=>{
      return _.json();
    }).
    then(data=>{
      this.setState({topUsers: data.topUsers});
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      topUsers: [],
      userId: 1
    };

    this.addFollower = this.addFollower.bind(this);
  }

  render() {
    return <Row>
      <Col md={10} smOffset={1} className="mt-3 mb-5">
        <h3>You don't have any collections yet... you can do one of two things:</h3>
      </Col>
      <Col md={3} smOffset={1}> <h3>Start adding to my collections using the <FaIcon icon="plus-circle" /> in toolbar above</h3> </Col>
      <Col> <Row>
        <Decorator></Decorator>
        <Col md={12} className="divider">OR</Col>
        <Decorator></Decorator>
      </Row> </Col>
      <Col md={6}> <h3>Start following someone:</h3>
        <Row className="mt-5">
          { this.state.topUsers.map(item=>(
            <Col md={3} key={item.id}>
              <Panel>
                <Panel.Body className="text-center">
                  <FaIcon icon="plus-circle" size="3x" onClick={this.addFollower.bind(this, item.id)} className="follow-icon" />
                  <img src={require('./img/'+item.img)} height="100px" /> 
                </Panel.Body>
                <Panel.Footer>
                  { item.collections.slice(0,3).map(col=>(
                    <div key={col.catid}>
                      {col.category} <span className="pull-right">{col.ammount}</span>
                    </div>
                  ))}
                  <HasMoreCollections noCol={item.collections.length-3}></HasMoreCollections>
                </Panel.Footer>
              </Panel>
            </Col>  
          ))}
        </Row>
      </Col>
    </Row>
  }
}

export default EmptyCollection;