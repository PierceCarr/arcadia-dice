import React, {Component} from 'react';
import {Icon} from "@blueprintjs/core";
import styled from 'styled-components';

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

const RollButton = styled.button`
    border-radius: 15%;
    border: 10px solid;
    margin: 0 1em;
    padding: 0.25em 1em;
    width: 100%;
    min-width: 90px;
    // height: 25%;
    // max-height: 120px;
    // min-height: 120px;
    // height: width;
    background-color: white;

    font-size: 7vw;
    @media (min-width: 820px) {
        font-size: 57px;
    }
`

const Title = styled.h1`
    font-size: 10vw;
    @media (min-width: 1210px) {
        font-size: 120px;
    }
`

class HomeScreen extends Component {
    constructor() {
        super();

        this.state = {
            attack: 2,
            defense: 1
        }

        this.onIncreaseClick = this.onIncreaseClick.bind(this);
    }

    onDecreaseClick(property) {
        if(this.state[property] - 1 > 0) {
            this.setState((prevState, props) => ({
                [property]: prevState[property] - 1
            }));
        }
    }

    onIncreaseClick(property) {
        this.setState((prevState, props) => ({
            [property]: prevState[property] + 1
        }));
    }


    render() {
        const ICON_SIZE_PIXEL_GRID = 120;

        const DiceCounters =
            <CounterWrapper>

                <DiceCounter>
                    <RollButton>Attack</RollButton>
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
                    <RollButton>Defense</RollButton>
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

        return (
            <Home>
                <Title>Arcadia Dice</Title>
                <i> Quick Roll: </i>
                {DiceCounters}
            </Home>
        );
    }
}

export default HomeScreen;