import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class TeamInfoPage extends Component {

    static mapElements(title, data, creator) {
        var elements = <div>{title}</div>;
        if (data.length > 0) {
            elements = [];
            for (let msg of data) {
                elements.push(
                    creator(msg)
                )
            }
        }
        return elements;
    }

    render() {
        const {actions, name, data} = this.props;
        let results = TeamInfoPage.mapElements("No last results...", data.results.results, r =>
            <div>{r.team1} {r.result1} -- {r.result2} {r.team2}</div>);
        let nextEvents = TeamInfoPage.mapElements("No next event...", [data.nextEvent], r =>
            <div>{r.startTime}: {r.name}</div>);
        let bets = TeamInfoPage.mapElements("No bets for next event...", data.betsForNextEvent, r =>
            <div>{r.marketName}</div>);
        return (<div className={this.props.cls}>
            <h2><b>{name}</b></h2>
            <br/>
            <img src={data.photoUrl}/>
            <br/>
            <h3>Results:</h3>
            {results}
            <br/>
            <h3>Next events:</h3>
            {nextEvents}
            <h3>Bets for next event:</h3>
            {bets}
        </div>)
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
