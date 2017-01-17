import React, {Component, PropTypes} from "react";
import {msgToToken} from "../tokens/commons";
import dateFormat from "dateformat";
import RawToken from "../tokens/RawToken";
import {uuid} from "../../commons";

class BetShared extends React.Component {
  render() {
    const {msg} = this.props;
    let dateFormatted = dateFormat(msg.date, 'dddd, dS mmm, yyyy, H:MM:ss');
    let tokens = [];
    if (msg.elements.length == 0) {
      tokens.push(<RawToken text={msg.rawText}/>)
    } else {
      for (let token of msg.elements) {
        tokens.push(msgToToken(token, msg));
        tokens.push(<a key={uuid()}> </a>);
      }
    }

    return (
      <div key={msg.id} className="well well-sm" style={{padding: 3, margin: 0}}>
        <div style={{fontSize: 11}}>({dateFormatted}) {msg.user.firstName} {msg.user.lastName}:</div>
        {tokens}<br/>
      </div>
    )
  }
}

BetShared.propTypes = {
  msg: PropTypes.object.isRequired,
};

export default BetShared;