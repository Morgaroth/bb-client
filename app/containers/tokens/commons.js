import React, {Component, PropTypes} from "react";
import RawToken from "./RawToken";
import TeamToken from "./TeamToken";
import PlayerToken from "./PlayerToken";
import MarketToken from "./MarketToken";
import DateToken from "./DateToken";
import OCEventToken from "./OCEventToken";
import LeaguesToken from "./LeaguesToken";
import ConnectorToken from "./ConnectorToken";
import DateRangeToken from "./DateRangeToken";
import OCBetToken from "./OCBetToken";
import OddsToken from "./OddsToken";
import {uuid} from "../../commons";


export function msgToToken(token, message) {
    if (token.qualifiedProps.length == 0) {
        return <RawToken text={token.text} key={uuid()}/>
    } else {
        let qp = token.qualifiedProps.sort((x, y) => y.ratio - x.ratio)[0];
        switch (qp.type) {
            case "team":
                return <TeamToken text={token.text} prop={qp} key={uuid()}/>;
            case "oc-event":
                return <OCEventToken text={token.text} prop={qp} key={uuid()}/>;
            case "oc-bet":
                return <OCBetToken text={token.text} prop={qp} key={uuid()}/>;
            case "player":
                return <PlayerToken text={token.text} prop={qp} key={uuid()}/>;
            case "result":
            case "single-team-action":
            case "single-player-action":
            case "multi-teams-action":
            case "multi-players-action":
            case "match-action":
            case "score":
            case "over-under":
            case "oc-market":
                return <MarketToken text={token.text} prop={qp} key={uuid()}/>;
            case "odds-decimal":
                return <OddsToken text={token.text} prop={qp} key={uuid()} message={message}/>;
            case "date":
                return <DateToken text={token.text} prop={qp} key={uuid()}/>;
            case "all-leagues":
            case "main-leagues":
                return <LeaguesToken text={token.text} prop={qp} key={uuid()}/>;
            case "date-range":
                return <DateRangeToken text={token.text} prop={qp} key={uuid()}/>;
            case "and":
                return <ConnectorToken text={token.text} prop={qp} key={uuid()}/>;
            default:
                console.log('undefined qualified token', qp, token.text);
                return <RawToken text={token.text} key={uuid()}
                                 title={'Unknown ' + token.text + ' ' + JSON.stringify(qp)}/>
        }
    }
}