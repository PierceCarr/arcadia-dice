import React, {Component} from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Die from './Die.js';

const ButtonText = styled.div`
    position: absolute;
    text-align: center;
    z-index: 10;
    color: white;

    text-shadow:
    -2px -2px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000,
    2px 2px 0 #000; 

    // font-size: 8vw;
    // @media (min-width: 820px) {
    //     font-size: 30px;
    // }

    font-size: 200%;
`


class SelfRollingButton extends Component {
    constructor(props) {
        super(props);

        const rand = Math.random();
        const initialImageIndex = 
            Math.floor((rand*100) % this.props.imageArray.length);

        const unusedImageIndexes = [];
        for(let i = 0; i < this.props.imageArray.length; i++) {
            if(i !== initialImageIndex) unusedImageIndexes.push(i);
        }

        this.state = {
            currentImage: initialImageIndex,
            unusedImageIndexes: unusedImageIndexes
        }

        this.setNewRandomImage = this.setNewRandomImage.bind(this);
    }

    componentDidMount() {
        this.props.imageArray.forEach((pic) => {
            const img = new Image();
            img.src = pic;
        })

        this.intervalID = setInterval(this.setNewRandomImage, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    async setNewRandomImage() {
        const rand = Math.random();
        const newIndexIndex = 
            Math.floor((rand*100) % this.state.unusedImageIndexes.length);
        const newImageIndex = this.state.unusedImageIndexes[newIndexIndex];

        const unusedImageIndexes = [];
        for(let i = 0; i < this.props.imageArray.length; i++) {
            if(i !== newImageIndex) unusedImageIndexes.push(i);
        }
        await this.setState({
            currentImage: newImageIndex,
            unusedImageIndexes: unusedImageIndexes
        });
    }

    render() {


        const positionDie = {
            position: 'absolute'
        }

        const containerPosition = {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }

        const display = 
        <div 
            style={containerPosition} 
            onClick={() => this.props.handleClick()}
        >
            
            <Die 
                assignedSideLength={this.props.assignedSideLength}
                borderColor={this.props.borderColor}
                faceImageURL={this.props.imageArray[this.state.currentImage]}
                onClick={null}
                style={positionDie}
            />

            <ButtonText>
                {this.props.text}
            </ButtonText>
        </div>;

        return(display);
    }
}

SelfRollingButton.propTypes = {
    assignedSideLength: PropTypes.number,
    borderColor: PropTypes.string,
    imageArray: PropTypes.arrayOf(PropTypes.string),
    handleClick: PropTypes.func,
    text: PropTypes.string
}

export default SelfRollingButton;