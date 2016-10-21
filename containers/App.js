import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import BetBlocksClient from "../containers/BetBlocksClient";
import ServiceUrl from "../components/ServiceUrl";
import * as Actions from "../actions";

class App extends Component {

    render() {
        const {serviceUrl, actions, state} = this.props;
        var stateTag = (<div><hr/><p>Here is entire app state:</p> <pre>{JSON.stringify(state, null, 3)}</pre></div>);
        // var stateTag = undefined;
        return (
            <div>
                <ServiceUrl serviceUrl={serviceUrl} onChange={actions.changeServiceURL}/>
                <hr/>
                <BetBlocksClient />
                {stateTag}
            </div>
        )
    }
}

App.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        serviceUrl: state.auth.url,
        state: state
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
