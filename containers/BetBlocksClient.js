import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LoginPanel from "../components/LoginPanel"
import * as Actions from "../actions";
import RoomsList from "./RoomsList"

class BetBlocksClient extends Component {

    render() {
        const {actions, needsLogin, serviceUrl} = this.props;
        if (needsLogin) {
            return <LoginPanel serviceUrl={serviceUrl} onChange={(phone) => {actions.tryLogin(phone)}}/>
        } else {
            return <RoomsList/>;
            // return <a>Test</a>
        }
    }
}

BetBlocksClient.propTypes = {
    actions: PropTypes.object,
    needsLogin: PropTypes.bool,
    serviceUrl: PropTypes.string
};


function mapStateToProps(state) {
    return {
        serviceUrl: state.auth.url,
        needsLogin: state.auth.needsLogin
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
)(BetBlocksClient)
