import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class CritAndRerollButtons extends Component {
    constructor(props) {
        super(props);

        let initialCrits = 0;
        this.props.dicePool.forEach((valueFacePair) => {
            if(valueFacePair[0] === "critical") initialCrits++;
        })

        this.state = {
            critsToRoll: initialCrits,
            critsRolledUpTo: -1
        };
    }

    render() {


        return('');
    }
}

CritAndRerollButtons.propTypes = {
    addDiceTopPool: PropTypes.func,
    dicePool: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    faceArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    removeDiceFromPool: PropTypes.func
}

export default CritAndRerollButtons;