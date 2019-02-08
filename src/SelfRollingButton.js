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

        const initialImage = this.props.imageArray[initialImageIndex];
        const unusedImageArray = [];
        this.props.imageArray.forEach((image) => {
            if(image !== initialImage) unusedImageArray.push(image);
        });

        this.state = {
            currentImage: initialImage,
            unusedImageArray: unusedImageArray
        }

        this.setNewRandomImage = this.setNewRandomImage.bind(this);
    }

    componentDidMount() {
        this.intervalID = setInterval(this.setNewRandomImage, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    async setNewRandomImage() {
        const rand = Math.random();
        const newImageIndex = 
            Math.floor((rand*100) % this.state.unusedImageArray.length);

        const newImage = this.state.unusedImageArray[newImageIndex];
        const unusedImageArray = [];
        this.props.imageArray.forEach((image) => {
            if(image !== newImage) unusedImageArray.push(image);
        });

        await this.setState({
            currentImage: newImage,
            unusedImageArray: unusedImageArray
        });


        // setTimeout(this.setNewRandomImage(), 1000);
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
        <div style={containerPosition} onClick={() => this.props.handleClick()}>
            
            <Die 
                assignedSideLength={this.props.assignedSideLength}
                borderColor={this.props.borderColor}
                faceImageURL={this.state.currentImage}
                location={null}
                onDieClick={null}
                style={positionDie}
            />

            <ButtonText>
                {this.props.text}
            </ButtonText>
        </div>


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