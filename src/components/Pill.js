import React, { Component } from 'react';
import styled from 'styled-components';

const H4 = styled.h4`
  display: inline;
`;

class Pill extends component {
	render() {
		return (
		  <Col id="pills-section" smOffset={2}  md={8}>
        { this.props.pills.map(pill=> (
          <H4 key={pill.id}>
            <Label bsStyle="primary" className="mr-2">{pill.title}<FaIcon icon="times" size='2x' className="label-icon" /> </Label>
          </H4>
        ) )}
      </Col>
    )
	}
}