import React, {Component, PropTypes} from "react";
import RawToken from "./RawToken";
import TeamToken from "./TeamToken";
import PlayerToken from "./PlayerToken";
import MarketToken from "./MarketToken";
import DateToken from "./DateToken";
import ConnectorToken from "./ConnectorToken";
import {uuid} from "../../commons"


export function msgToToken(token, message, loadAction) {
    if (token.qualifiedProps.length == 0) {
        return <RawToken text={token.text} key={uuid()}/>
    } else {
        let qp = token.qualifiedProps.sort((x, y) => y.ratio - x.ratio)[0];
        switch (qp.type) {
            case "team":
                return <TeamToken text={token.text} prop={qp} load={loadAction} key={uuid()}/>;
            case "player":
                return <PlayerToken text={token.text} prop={qp} load={loadAction} key={uuid()}/>;
            case "result":
                return <MarketToken text={token.text} prop={qp} load={loadAction} key={uuid()}/>;
            case "date":
                return <DateToken text={token.text} prop={qp} load={loadAction} key={uuid()}/>;
            case "and":
                return <ConnectorToken text={token.text} prop={qp} key={uuid()}/>;
            default:
                console.log('undefined qualified token', qp, token.text);
                return <RawToken text={token.text} key={uuid()}/>
        }
    }
}