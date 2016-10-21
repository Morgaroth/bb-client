import React, {Component, PropTypes} from "react";
import RawToken from "./RawToken";
import TeamToken from "./TeamToken";
import PlayerToken from "./PlayerToken";
import MarketToken from "./MarketToken";
import DateToken from "./DateToken";
import ConnectorToken from "./ConnectorToken";

export function msgToToken(msg) {
    if (msg.qualifiedProps.length == 0) {
        return <RawToken text={msg.text}/>
    } else {
        let qp = msg.qualifiedProps.sort((x, y) => y.ratio - x.ratio)[0];
        switch (qp.type) {
            case "team":
                return <TeamToken text={msg.text} prop={qp}/>;
            case "player":
                return <PlayerToken text={msg.text} prop={qp}/>;
            case "result":
                return <MarketToken text={msg.text} prop={qp}/>;
            case "date":
                return <DateToken text={msg.text} prop={qp}/>;
            case "and":
                return <ConnectorToken text={msg.text} prop={qp}/>;
            default:
                console.log('undefined qualified token', qp, msg.text);
                return <RawToken text={msg.text}/>
        }
    }
}