import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class CritAndRerollButtons extends Component {
    constructor(props) {
        super(props);

        let initialCrits = 0;
        this.props.dicePool.forEach((valueFacePair) => {
            if(valueFacePair[0] === "critical") initialCrits++;
        });

        this.state = {
            critsToRoll: initialCrits,
            // critsRolledUpToIndex: -1
        };
    }

    async rerollSelectedDice() {
        await this.props.replaceDiceInPool(this.props.selectedDiceArray);

        let newCrits = 0;
        this.props.selectedDiceArray.forEach((dieLocation) => {
            if(this.props.dicePool[dieLocation][0] === 'critical'){
                newCrits++;
            }
        })

        //critsToRoll will be 0 as reroll can only occur when that is the case
        this.setState({
            critsToRoll: newCrits
        })

        this.props.setSelectedDiceArray([]);
    }

    async rollCrits() {
        // const newCritsRolledUpToIndex = this.props.dicePool.length;
        const newDice = await this.props.addDiceToPool(this.state.critsToRoll);
        
        let numberOfNewCrits = 0;
        newDice.forEach((die) => {
            if(die[0] === 'critical') numberOfNewCrits++;
        });

        this.setState({
            critsToRoll: numberOfNewCrits
        });
    }

    render() {
        const thereAreUnrolledCrits = this.state.critsToRoll > 0;

        const critPlurality =
            this.state.critsToRoll === 1 ? 
            'die' : 'dice';
        const rollCritsButtonText = 
            thereAreUnrolledCrits ?
            `Roll your ${this.state.critsToRoll} bonus critical ${critPlurality}` :
            "No critical dice to roll.";


        const rollCritsButton =
            <Button
                color='primary'
                disabled={thereAreUnrolledCrits === false}
                onClick={() => this.rollCrits()}
            >
                {rollCritsButtonText}
            </Button>;

        const numberOfSelectedDice = this.props.selectedDiceArray.length;
        const rerollPlurality = 
            numberOfSelectedDice === 1 ?
            'die' : 'dice';

        const rerollButtonText = 
            thereAreUnrolledCrits ?
            `Roll crits before rerolling dice` :
            `Reroll ${numberOfSelectedDice} ${rerollPlurality}`;

        const rerollButton = 
            <Button
                disabled={thereAreUnrolledCrits}
                onClick={() => this.rerollSelectedDice()}
            >
                {rerollButtonText}
            </Button>;

        const displayFlex = {
            display: 'flex',
            flexDirection: 'column'
        }

        const display =
            <div style={displayFlex}>
                {rollCritsButton}
                {rerollButton}
            </div>

        return(display);
    }
}

CritAndRerollButtons.propTypes = {
    addDiceToPool: PropTypes.func,
    dicePool: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    faceArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    replaceDiceinPool: PropTypes.func,
    selectedDiceArray: PropTypes.arrayOf(PropTypes.number),
    setSelectedDiceArray: PropTypes.func
}

export default CritAndRerollButtons;