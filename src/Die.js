import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Die extends Component {

    render() {
        const BORDER_WIDTH = 
        this.props.borderColor !== null ?
        this.props.assignedSideLength * (1/16) : 0;

        const IMAGE_SIDE_LENGTH = this.props.assignedSideLength;

        const StyledDie = styled.img`
            alt: "";
            border: ${BORDER_WIDTH}px solid ${this.props.borderColor};
            border-radius: 20%;
            draggable: false;
            height: ${IMAGE_SIDE_LENGTH}px;
            margin: 2px;
            width: ${IMAGE_SIDE_LENGTH}px;
        `

        const result = 
        <StyledDie 
            src={this.props.faceImageURL}
            onClick={() => this.props.onDieClick(this.props.location)}
        />;

        return(result);
    }
}

Die.propTypes = {
    assignedSideLength: PropTypes.number,
    borderColor: PropTypes.string,
    location: PropTypes.number,
    onDieClick: PropTypes.func,
    faceImageURL: PropTypes.string,
}

export default Die;