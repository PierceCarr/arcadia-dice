import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

class DiceBox extends Component {

    render() {
        const box = 
        <Box>
          {this.props.diceToDisplay}
        </Box>;

        return(box);
    }
}

DiceBox.propTypes = {
    diceToDisplay: PropTypes.arrayOf(PropTypes.object),
}

export default DiceBox;