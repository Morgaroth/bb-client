import React, {Component, PropTypes} from "react";
import {msgToToken} from "../tokens/commons"
import dateFormat from 'dateformat'
import RawToken from "../tokens/RawToken"
import {uuid} from "../../commons"

class BetPlaced extends React.Component {
    render() {
        const {msg} = this.props;
        let dateFormatted = dateFormat(msg.date, 'dddd, dS mmm, yyyy, H:MM:ss');
        return (
            <div key={msg.id} className="well well-sm" style={{padding: 3, margin: 0}}>
                <div style={{fontSize: 11}}>({dateFormatted}) {msg.user.firstName} {msg.user.lastName}:</div>
                {msg.rawText}<br/>
            </div>
        )
    }
}

BetPlaced.propTypes = {
    msg: PropTypes.object.isRequired,
};

export default BetPlaced;