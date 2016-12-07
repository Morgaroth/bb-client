import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import TeamToken from "../tokens/TeamToken";
import {uuid} from "../../commons";

class TeamInfoPage extends Component {

    static mapElements(title, data, creator) {
        let elements = <div>{title}</div>;
        if (data != undefined && data.length > 0) {
            elements = [];
            for (let msg of data) {
                elements.push(
                    creator(msg)
                )
            }
        }
        return elements;
    }

    renderValid() {
        const {name, data} = this.props;
        if (data.results == undefined) data.results = {results: []};
        let results = TeamInfoPage.mapElements("No last results...", data.results.results, r =>
            <div key={'result-' + uuid()}><TeamToken prop={{name: r.team1}} text={r.team1}/> {r.result1} -- {r.result2}
                <TeamToken prop={{name: r.team2}} text={r.team2}/></div>);
        let nextEvents = TeamInfoPage.mapElements("No next event...", data.nextEvent, r =>
            <div>{r.startTime}: {r.name}</div>);
        let bets = TeamInfoPage.mapElements("No bets for next event...", data.betsForNextEvent,
            r => <div key={'bet-' + uuid()}>{r.marketName} {r.name}: {r.bestOddsFractional}</div>
        );
        return (<div className={this.props.cls}>
            <h2><b>{name}</b></h2>
            <br/>
            <img src={data.photoUrl}/>
            <br/>
            <h3>Results:</h3>
            {results}
            <h3>Next events:</h3>
            {nextEvents}
            <h3>Bets for next event:</h3>
            {bets}
        </div>)
    }

    renderInvalid() {
        return <h1>Invalid data, probably not found</h1>
    }

    render() {
        const {data} = this.props;
        if (data.results == undefined && data.nextEvent == undefined && (data.upcomingEvents == undefined || data.upcomingEvents.length == 0)) {
            return this.renderInvalid()
        }
        return this.renderValid()
    }
}

TeamInfoPage.propTypes = {
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    // url: PropTypes.string.isRequired,
    // history: PropTypes.array,
    // cls: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        name: state.infoPage.qprop.name,
        // room: state.rooms.selectedRoom,
        // history: state.rooms.history,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamInfoPage)
