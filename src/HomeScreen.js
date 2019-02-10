import React, {Component} from 'react';

import {Icon} from "@blueprintjs/core";
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

const DICE_SIDE_LENGTH = 64;

const CounterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    // background-color: red;
    // max-height: 650px;
`

const DiceCounter = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    // background-color: teal;
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
    // background-color: pink;

    touch-action: none;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
`
// const diceBorderWidth = DICE_SIDE_LENGTH * (1/16);
// const ImageShiftingButton = styled.img`
//     border: ${diceBorderWidth}px solid grey;
//     border-radius: 20%
// `

const QuickNumber = styled.strong`
    font-size: 10vh;
    margin-top: -20px;
    margin-bottom: -20px;

    @media (min-height: 640px) {
        font-size: 60px;
    }
`

// const RollButton = styled.button`
//     border-radius: 15%;
//     border: 10px solid black;
//     margin: 0 1em;
//     padding: 0.25em 1em;
//     width: 100%;
//     min-width: 90px;
//     // height: 25%;
//     // max-height: 120px;
//     // min-height: 120px;
//     // height: width;
//     background-color: white;
//     color: black;

//     font-size: 7vw;
//     @media (min-width: 820px) {
//         font-size: 57px;
//     }
// `

const Title = styled.h1`
    font-size: 10vw;
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

    onDecreaseClick(property) {
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

    onIncreaseClick(property) {
        this.setState((prevState, props) => ({
            [property]: prevState[property] + 1
        }));
    }


    render() {
        const ICON_SIZE_PIXEL_GRID = 120;

        const attackButtonImageArray =
            [attackCritical, attackMelee, attackRanged];
        const attackDieButton =
            <SelfRollingButton 
                assignedSideLength={DICE_SIDE_LENGTH}
                borderColor='grey'
                imageArray={attackButtonImageArray}
                handleClick={this.triggerAttackRoll}
                text={"Roll"}
            />;

        const defenseButtonImageArray =
            [defenseCritical, defenseBlock, defenseBlank];
        const defenseDieButton =
            <SelfRollingButton 
                assignedSideLength={DICE_SIDE_LENGTH}
                borderColor='grey'
                imageArray={defenseButtonImageArray}
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
                        onClick={() => this.onIncreaseClick("attack")} />
                    <QuickNumber>{this.state.attack}</QuickNumber>
                    <Icon 
                        icon="caret-down" 
                        iconSize={ICON_SIZE_PIXEL_GRID} 
                        onClick={() => this.onDecreaseClick("attack")} />
                </DiceCounter>

                <DiceCounter>
                    {defenseDieButton}
                    <Icon 
                        icon="caret-up" 
                        iconSize={ICON_SIZE_PIXEL_GRID} 
                        onClick={() => this.onIncreaseClick("defense")} />
                    <QuickNumber>{this.state.defense}</QuickNumber>
                    <Icon 
                        icon="caret-down"
                        iconSize={ICON_SIZE_PIXEL_GRID} 
                        onClick={() => this.onDecreaseClick("defense")} />
                </DiceCounter>

            </CounterWrapper>;

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
                    dieSideLength={DICE_SIDE_LENGTH}
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
                </Home>
            }

        return display;
    }
}

export default HomeScreen;