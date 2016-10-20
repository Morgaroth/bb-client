import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ServiceUrl from "../components/ServiceUrl";
import * as Actions from "../actions";

class App extends Component {
    render() {
        const {serviceUrl, actions} = this.props;
        return (
            <div>
                <ServiceUrl serviceUrl={serviceUrl} onChange={actions.changeServiceURL}/>
                <hr/>
                <p>Here is entire app state:</p>
                <pre>{JSON.stringify(this.props, null, 3)}</pre>
            </div>
        )
    }
}

App.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
    actions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
