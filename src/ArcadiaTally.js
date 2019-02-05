import React, {Component} from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const TallyContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 4px solid black;
    margin: 4px;
`

class ArcadiaTally extends Component {

    render() {
        let tally = null;
        const isAttack = this.props.faceArray[1][0] === "melee";

        if(isAttack) {
            let crits = 0;
            let melee = 0;
            let ranged = 0;
            this.props.dicePool.forEach(function(die){
                const valueSlot = 0;
                if(die[valueSlot] === "critical") {
                    crits++;
                } else if (die[valueSlot] === "melee") {
                    melee++;
                } else if (die[valueSlot] === "ranged") {
                    ranged++;
                }
            });

            const meleeTotal = melee + crits;
            const rangedTotal = ranged + crits;

            const critText = crits !== 1 ? 'crits' : 'crit';

            tally =
                <TallyContainer>
                    <b>Attack Results</b>
                    <b>{`Melee: ${meleeTotal} (${melee} melee + ${crits} ${critText})`}</b>
                    <b>{`Ranged: ${rangedTotal} (${ranged} ranged + ${crits} ${critText})`}</b>
                </TallyContainer>;
        } else {
            let crits = 0;
            let block = 0;
            this.props.dicePool.forEach(function(die){
                const valueSlot = 0;
                if(die[valueSlot] === "critical") {
                    crits++;
                } else if (die[valueSlot] === "block") {
                    block++;
                }
            });

            const totalBlocked = block + crits;
            const critText = crits !== 1 ? 'crits' : 'crit';
            const shieldText = block !== 1 ? 'shields' : 'shield';

            tally = 
            <TallyContainer>
                <b>Defense Results</b>
                <b>{`Blocked: ${totalBlocked} (${block} ${shieldText} + ${crits} ${critText})`}</b>
            </TallyContainer>
        }

        return(tally);
    }
}

ArcadiaTally.propTypes = {
    dicePool: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    faceArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

export default ArcadiaTally;