import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons/"
import dateFormat from 'dateformat'

class DataBaseMethods extends Component {
    render() {
        const {actions, data, status} = this.props;

        return (<div>
            <h3>Database functions</h3>
            <div>
                <h4>Data api</h4>
                <button onClick={() => actions.DataApi_update('events')}>Update Events</button><br/>
                <button onClick={() => actions.DataApi_update('subevents')}>Update SubEvents</button><br/>
                <button onClick={() => actions.DataApi_update('markets')}>Update Markets</button><br/>
                <button onClick={() => actions.DataApi_update('bets')}>Update Bets</button><br/>
                <br/>
                <div>Status ({status}): {data}</div>
            </div>
        </div>)
    }
}

DataBaseMethods.propTypes = {
    actions: PropTypes.object.isRequired,
    result: PropTypes.string,
    status: PropTypes.string,
    // cls: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        data: state.infoPage.data || "",
        status: state.infoPage.status || "",
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
)(DataBaseMethods)
