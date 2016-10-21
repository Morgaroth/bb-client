import React, {Component, PropTypes} from "react";
import RawToken from "./RawToken";
import TeamToken from "./TeamToken";
import PlayerToken from "./PlayerToken";
import MarketToken from "./MarketToken";

export function msgToToken(msg) {
    if (msg.qualifiedProps.length == 0) {
        return <RawToken text={msg.text}/>
    } else {
        let qp = msg.qualifiedProps[0];
        switch (qp.type) {
            case 'team':
                return <TeamToken text={msg.text} prop={qp}/>;
            case 'player':
                return <PlayerToken text={msg.text} prop={qp}/>;
            case 'result':
                return <MarketToken text={msg.text} prop={qp}/>;
            default:
                console.log('undefined qualified token', qp, msg.text);
                return <RawToken text={msg.text}/>
        }
    }
}