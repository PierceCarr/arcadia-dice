import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CARbutton = styled(Button)`
    border: 1px solid black !important;
    margin: 2px;
    width: 352px;

    @media (max-width: 360px) {
        width: 96vw
    }
`

class CritAndRerollButtons extends Component {
    constructor(props) {
        super(props);

        let initialCrits = 0;
        this.props.dicePool.forEach((valueFacePair) => {
            if(valueFacePair[0] === "critical") initialCrits++;
        });

        this.state = {
            critsToRoll: initialCrits,
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

        // const buttonBorder = {
        //     border: '1px solid black',
        //     margin: '2px',
        //     width: 352px;

        //     @media (max-width: 360px) {
        //         width: 96vw
        //     }
        // }

        const rollCritsButton =
            <CARbutton
                color='primary'
                disabled={thereAreUnrolledCrits === false}
                onClick={() => this.rollCrits()}
            >
                {rollCritsButtonText}
            </CARbutton>;

        const numberOfSelectedDice = this.props.selectedDiceArray.length;
        const rerollPlurality = 
            numberOfSelectedDice === 1 ?
            'die' : 'dice';

        const rerollButtonText = 
            thereAreUnrolledCrits ?
            `Roll crits before rerolling dice` :
            `Reroll ${numberOfSelectedDice} selected ${rerollPlurality}`;

        const rerollButton = 
            <CARbutton
                disabled={thereAreUnrolledCrits}
                onClick={() => this.rerollSelectedDice()}
            >
                {rerollButtonText}
            </CARbutton>;

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