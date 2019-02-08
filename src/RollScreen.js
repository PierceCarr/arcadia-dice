import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import Home from '@material-ui/icons/Home';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import DiceBox from './DiceBox.js';
import Die from './Die.js';

// const DiceInteractionComponentArea = styled.div`
//     display: flex;
//     felx-direction: column;
//     background-color: blue;
// `

// const Screen = styled.div`
//     display: flex;
//     felx-direction: column;
// `

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
        this.replaceDiceInPool = this.replaceDiceInPool.bind(this);
        this.setSelectedDiceArray = this.setSelectedDiceArray.bind(this);
    }

    addDiceToPool(numberOfDice) {
        const newDice = [];

        for(let i = 0; i < numberOfDice; i++) {
            const newDie = this.roll(this.props.faceArray);
            newDice.push(newDie);
        }

        const updatedArray = this.state.displayedDice;
        newDice.forEach(function(die) {
            updatedArray.push(die);
        });

        this.setState({
            displayedDice: updatedArray
        });

        return newDice;
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

    //could easily add specific dice in as a second param if 
    //future app requires it
    replaceDiceInPool(diceLocationArray) {
        const newDice = [];
        for(let i = 0; i < diceLocationArray.length; i++) {
            const newDie = this.roll(this.props.faceArray);
            newDice.push(newDie);
        }

        const newDisplayedDiceArray = this.state.displayedDice;
        let diceLocationIndex = 0;
        for(let i = 0; i < newDisplayedDiceArray.length; i++) {
            if(diceLocationArray.includes(i)){
                newDisplayedDiceArray[i] = newDice[diceLocationIndex];
                diceLocationIndex++;
            }
        }

        this.setState({
            displayedDice: newDisplayedDiceArray
        })
    }

    setSelectedDiceArray(newArray) {
        this.setState({
            selectedDice: newArray
        })
    }

    render() {

        const homeButtonFixer = {
            position: 'fixed',
            bottom: '0',
            left: '50%',
            marginLeft: '-30.25px' //half the button's width

        }

        const homeButton = 
            <Fab 
                onClick={this.props.onHomeClick}
                style={homeButtonFixer}
                variant='round'
            >
                <Home/>
            </Fab>;

        const currentRoll = this.makeDice();

        const interactionCentering = {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
            
        }

        let diceInteractionComponents = '';
        if(this.props.diceInteractionComponents !== undefined){
            let componentKey = 0;
                
            diceInteractionComponents = 
            <div style={interactionCentering}>
                {
                    this.props.diceInteractionComponents.map(function(Component) {
                        componentKey++;
                        return <Component
                            addDiceToPool={this.addDiceToPool}
                            dicePool={this.state.displayedDice}
                            faceArray={this.props.faceArray}
                            key={componentKey}
                            removeDiceFromPool={this.removeDiceFromPool}
                            replaceDiceInPool={this.replaceDiceInPool}
                            selectedDiceArray={this.state.selectedDice}
                            setSelectedDiceArray={this.setSelectedDiceArray}
                        />
                }, this)
                }
            </div>;
        }

        const homeButtonSpaceHeight = {height: '56px'}
        const homeButtonSpace =<div style={homeButtonSpaceHeight}/>
        
        const display = 
        <div>
            <DiceBox diceToDisplay={currentRoll}/>
            {diceInteractionComponents}
            {homeButtonSpace}
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