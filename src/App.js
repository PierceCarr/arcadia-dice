import React, { Component } from 'react';

import HomeScreen from './HomeScreen.js';
import Options from './Options.js';

import attackCritical from './images/attack-critical.png';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScreen: 'home',
      dieSideLengthPx: 95
    }

    this.displayHomeScreen = this.displayHomeScreen.bind(this);
    this.displayOptions = this.displayOptions.bind(this);
    this.updateDieSideLength = this.updateDieSideLength.bind(this);
  }

  displayHomeScreen() {
    this.setState({
      currentScreen: 'home'
    });
  }

  displayOptions() {
    this.setState({
      currentScreen: 'options'
    });
  }

  updateDieSideLength(newLength) {
    this.setState({
      dieSideLengthPx: newLength
    });
  }

  render() {
    let display = 
      <HomeScreen
        dieSideLengthPx={this.state.dieSideLengthPx}
        displayOptions={this.displayOptions}
      />;
    if(this.state.currentScreen === 'options') {
      display = 
        <Options 
          dieSideLengthPx={this.state.dieSideLengthPx}
          displayHomeScreen={this.displayHomeScreen}
          sampleDieFace={attackCritical}
          updateDieSideLength={this.updateDieSideLength}
        />
    }

    return (
      display
    );
  }
}

export default App;