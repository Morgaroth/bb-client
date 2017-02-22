import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import BetBlocksClient from "../containers/BetBlocksClient";
import ServiceUrl from "./ServiceUrl";
import * as Actions from "../actions";
import Switch from "react-toggle-switch";
class App extends Component {

    render() {
        const {serviceUrl, actions, state, appStateEnabled} = this.props;
        let stateTag = undefined;
        if (appStateEnabled) {
            stateTag = (<div className="col-md-12">
                <hr/>
                <p>Here is entire app state:</p>
                <pre>{JSON.stringify(state, null, 3)}</pre>
            </div>);
        }
        return (
            <div className='col-md-12'>
                <ServiceUrl serviceUrl={serviceUrl} onChange={actions.changeServiceURL}/>
                <hr/>
                <BetBlocksClient />
                <br/>
                <Switch on={appStateEnabled} onClick={() => this.props.actions.toggleShowingState()}/><br/>
                {stateTag}
            </div>
        )
    }
}

App.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    appStateEnabled: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        serviceUrl: state.auth.url,
        state: state,
        appStateEnabled: state.appState.enabled,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
