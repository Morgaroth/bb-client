import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {uuid} from "../../commons/"
import dateFormat from 'dateformat'

class BetBrowser extends Component {
    render() {
        const {actions, data, status} = this.props;

        return (<div>
            <h3>Bet browser</h3>
        </div>)
    }
}

BetBrowser.propTypes = {
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
)(BetBrowser)
