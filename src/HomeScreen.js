import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import {Icon} from "@blueprintjs/core";
import PropTypes from 'prop-types';
import Settings from '@material-ui/icons/Settings';
import styled from 'styled-components';

import ArcadiaTally from './ArcadiaTally.js';
import CritAndRerollButtons from './CritAndRerollButtons.js';
import RollScreen from './RollScreen.js';
import SelfRollingButton from './SelfRollingButton.js';

import attackCritical from './images/attack-critical.png';
import attackMelee from './images/attack-melee.png';
import attackRanged from './images/attack-ranged.png'; 
import defenseCritical from './images/defense-critical.png';
import defenseBlank from './images/defense-blank.png';
import defenseBlock from  './images/defense-block.png';

const CounterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const DiceCounter = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-right: 1px;

    width: 45vw;
    min-width: 90px;
    max-width: 350px;
    height: 60vh;

    min-height: 412px;
    
`

const Home = styled.div`
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    min-height: 640px;

    max-width: 1210px;
    min-width: 200px;

    touch-action: none;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
`

const QuickNumber = styled.strong`
    font-size: 10vh;
    margin-top: -20px;
    margin-bottom: -20px;

    @media (min-height: 640px) {
        font-size: 60px;
    }
`

const Title = styled.h1`
    font-size: 12vw;
    @media (min-width: 1210px) {
        font-size: 120px;
    }
`


const ATTACK_DICE = [
    ["critical", attackCritical],
    ["melee", attackMelee],
    ["melee", attackMelee],
    ["melee", attackMelee],
    ["ranged", attackRanged],
    ["ranged", attackRanged],
];
const DEFENSE_DICE = [
    ["critical", defenseCritical],
    ["block", defenseBlock],
    ["blank", defenseBlank],
    ["blank", defenseBlank],
    ["blank", defenseBlank],
    ["blank", defenseBlank],
];

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attack: 5,
            defense: 5,
            diceTypeIsAttack: false,
            isDisplayingRollScreen: false,
        }

        this.onDecreaseClick = this.onDecreaseClick.bind(this);
        this.onHomeClick = this.onHomeClick.bind(this);
        this.onIncreaseClick = this.onIncreaseClick.bind(this);
        this.triggerAttackRoll = this.triggerAttackRoll.bind(this);
        this.triggerDefenseRoll = this.triggerDefenseRoll.bind(this);

    }

    triggerRoll(diceTypeIsAttack) {
        this.setState({
            diceTypeIsAttack: diceTypeIsAttack,
            isDisplayingRollScreen: true
        });
        
    }

    triggerAttackRoll() {
        this.setState({
            diceTypeIsAttack: true,
            isDisplayingRollScreen: true
        });
    }

    triggerDefenseRoll() {
        this.setState({
            diceTypeIsAttack: false,
            isDisplayingRollScreen: true
        });
    }

    onDecreaseClick(property){
        if(this.state[property] - 1 > 0) {
            this.setState((prevState, props) => ({
                [property]: prevState[property] - 1
            }));
        }
    }

    onHomeClick() {
        this.setState({
            isDisplayingRollScreen: false
        });
    }

    onIncreaseClick(property){
        this.setState((prevState, props) => ({
            [property]: prevState[property] + 1
        }));
    }

    onOptionsClick = () => {this.props.displayOptions()}
    
    increaseAttack = () => {this.onIncreaseClick('attack')};
    decreaseAttack = () => {this.onDecreaseClick('attack')};

    increaseDefense = () => {this.onIncreaseClick('defense')};
    decreaseDefense = () => {this.onDecreaseClick('defense')};

    render() {
        const ICON_SIZE_PIXEL_GRID = 120;

        const attackDieButton =
            <SelfRollingButton 
                assignedSideLength={this.props.dieSideLengthPx}
                borderColor='grey'
                imageArray={[attackCritical, attackMelee, attackRanged]}
                handleClick={this.triggerAttackRoll}
                text={"Roll"}
            />;

        const defenseDieButton =
            <SelfRollingButton 
                assignedSideLength={this.props.dieSideLengthPx}
                borderColor='grey'
                imageArray={[defenseCritical, defenseBlock, defenseBlank]}
                handleClick={this.triggerDefenseRoll}
                text={"Roll"}
            />

        const DiceCounters =
            <CounterWrapper>

                <DiceCounter>
                     {attackDieButton}
                    <Icon 
                        icon="caret-up" 
                        iconSize={ICON_SIZE_PIXEL_GRID} 
                        onClick={this.increaseAttack} />
                    <QuickNumber>{this.state.attack}</QuickNumber>
                    <Icon 
                        icon="caret-down" 
                        iconSize={ICON_SIZE_PIXEL_GRID} 
                        onClick={this.decreaseAttack} />
                </DiceCounter>

                <DiceCounter>
                    {defenseDieButton}
                    <Icon 
                        icon="caret-up" 
                        iconSize={ICON_SIZE_PIXEL_GRID} 
                        onClick={this.increaseDefense} />
                    <QuickNumber>{this.state.defense}</QuickNumber>
                    <Icon 
                        icon="caret-down"
                        iconSize={ICON_SIZE_PIXEL_GRID} 
                        onClick={this.decreaseDefense} />
                </DiceCounter>

            </CounterWrapper>;

            const displayOptionsButton =
                <Button onClick={this.onOptionsClick}>
                    <Settings/> Options
                </Button>;

            const numberOfDice =
                this.state.diceTypeIsAttack === true ? 
                this.state.attack : this.state.defense;

            const dieToRoll = 
                this.state.diceTypeIsAttack === true ?
                ATTACK_DICE : DEFENSE_DICE;

            let display = null;
            if(this.state.isDisplayingRollScreen) {
                display = 
                <RollScreen
                    numberOfDice={numberOfDice}
                    diceInteractionComponents=
                        {[
                            ArcadiaTally, 
                            CritAndRerollButtons
                        ]}
                    dieDefaultBorderColor="grey"
                    dieSelectBorderColor="green"
                    dieSideLength={this.props.dieSideLengthPx}
                    faceArray={dieToRoll}
                    onDecreaseClick={this.onDecreaseClick}
                    onHomeClick={this.onHomeClick}
                    onIncreaseClick={this.onIncreaseClick}
                />
            } else {
                display =  
                <Home>
                    <Title>Arcadia Dice</Title>
                    {DiceCounters}
                    {displayOptionsButton}
                </Home>
            }

        return display;
    }
}

HomeScreen.propTypes = {
    dieSideLengthPx: PropTypes.number,
    displayOptions: PropTypes.func
}

export default HomeScreen;