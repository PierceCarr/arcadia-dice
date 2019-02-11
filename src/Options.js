import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import PropTypes from 'prop-types';
import Slider from '@material-ui/lab/Slider';
// import {Slider} from "@blueprintjs/core";

import Die from './Die.js';



class Options extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    handleDieResize = (event, value) => {this.props.updateDieSideLength(value)}
    handleHomeClick = () => {this.props.displayHomeScreen()}

    render() {

        const dieResizingSlider = 
            <Slider 
                max={140}
                min={60}
                onChange={this.handleDieResize}
                step={1}
                value={this.props.dieSideLengthPx}
            />;

        const homebutton = 
            <Button onClick={this.handleHomeClick}>
                <Home/> Home
            </Button>;

        const optionsAlignment = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }

        const display = 
            <div style={optionsAlignment}>

                Resize Dice:
                <p/>
                {dieResizingSlider}
                <p/>
                <Die 
                    assignedSideLength={this.props.dieSideLengthPx}
                    borderColor='grey'
                    faceImageURL={this.props.sampleDieFace}
                    onClick={null}
                />

                
                {homebutton}
            </div>;

        return(display);
    }
}

Options.propTypes = {
    dieSideLengthPx: PropTypes.number,
    displayHomeScreen: PropTypes.func,
    sampleDieFace: PropTypes.string,
    updateDieSideLength: PropTypes.func
}

export default Options;

