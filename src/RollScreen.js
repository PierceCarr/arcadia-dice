import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import Home from '@material-ui/icons/Home';
import PropTypes from 'prop-types';

import DiceBox from './DiceBox.js';
import Die from './Die.js';

// import styled from 'styled-components';

class RollScreen extends Component {
    constructor(props) {
        super(props);

        const initialDiceArray = [];
        for(let i = 0; i < this.props.numberOfDice; i++){
            const valueImagePair = this.roll(this.props.faceArray);
            initialDiceArray.push(valueImagePair);
        }

        this.state = {
            displayedDice: initialDiceArray, //[...['value', facePNG]]
            selectedDice: []
        }

        this.addDiceToPool = this.addDiceToPool.bind(this);
        this.onDieClick = this.onDieClick.bind(this);
        this.removeDiceFromPool = this.removeDiceFromPool.bind(this);
    }

    makeDice() {
        const dieArray = [];
        for(let i = 0; i < this.state.displayedDice.length; i++){

            const valueImagePair = this.state.displayedDice[i];
            const FACE_URL_SLOT = 1;
            const borderColor = this.state.selectedDice.includes(i) ?
                this.props.dieSelectBorderColor :
                this.props.dieDefaultBorderColor;

            const die = 
                <Die 
                    assignedSideLength={this.props.dieSideLength}
                    borderColor={borderColor}
                    faceImageURL={valueImagePair[FACE_URL_SLOT]}
                    location={i}
                    onDieClick={this.onDieClick}
                    key={i}
                />
            dieArray.push(die);
        }

        return dieArray;
    }

    addDiceToPool(dieArray) {
        const updatedArray = this.state.displayedDice;
        dieArray.forEach(function(die) {
            updatedArray.push(die);
        });

        return updatedArray;
    }

    onDieClick(location) {//This works, but I should use hash mapping
        if(this.state.selectedDice.includes(location)) {
            const updatedArray = [];
            this.state.selectedDice.forEach((die) =>{
                if(die !== location) updatedArray.push(die);
            });
            this.setState({
                selectedDice: updatedArray
            });
        } else {
            const updatedArray = this.state.selectedDice;
            updatedArray.push(location);
            this.setState({
                selectedDice: updatedArray
            });
        }
    }

    removeDiceFromPool(diePositionArray) {
        const arrayWithBlanks = this.state.displayedDice;

        diePositionArray.forEach(function(position) {
            arrayWithBlanks[position] = "blank";
        });

        const updatedArray = [];
        arrayWithBlanks.forEach(function(entry) {
            if(entry !== "blank") updatedArray.push(entry);
        })

        this.setState({
            displayedDice: updatedArray
        });
    }

    roll(imageValuePairs){

        if(imageValuePairs.length === 1){
            
            return imageValuePairs[0];

        } else if(imageValuePairs.length > 1) {
            const rand = Math.random();

            const newFaceLocation = 
                Math.floor((rand*100) % imageValuePairs.length);

            return imageValuePairs[newFaceLocation];
        }

    }

    render() {

        const homeButton = 
            <Fab 
                onClick={this.props.onHomeClick}
                variant='round'
            >
                <Home/>
            </Fab>;

        const currentRoll = this.makeDice();

        let diceInteractionComponents = '';
        if(this.props.diceInteractionComponents !== undefined){
            let componentKey = 0;
                
            diceInteractionComponents = 
            <div>
                {
                    this.props.diceInteractionComponents.map(function(Component) {
                        componentKey++;
                        return <Component
                            addDiceToPool={this.addDiceToPool}
                            dicePool={this.state.displayedDice}
                            faceArray={this.props.faceArray}
                            key={componentKey}
                            removeDiceFromPool={this.removeDiceFromPool}

                        />
                }, this)
                }
            </div>;
        }
        
        const display = 
        <div>
            <DiceBox diceToDisplay={currentRoll}/>
            {diceInteractionComponents}
            {homeButton}
        </div>

        return(display);
    }
}

RollScreen.propTypes = {
    numberOfDice: PropTypes.number,
    diceInteractionComponents: PropTypes.arrayOf(PropTypes.func),
    dieDefaultBorderColor: PropTypes.string,
    dieSelectBorderColor: PropTypes.string,
    dieSideLength: PropTypes.number,
    faceArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    onDecreaseClick: PropTypes.func,
    onHomeClick: PropTypes.func,
    onIncreaseClick: PropTypes.func,
}

export default RollScreen;