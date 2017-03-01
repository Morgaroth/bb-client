import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";

class AppActions extends Component {

    render() {
        const {actions, cls}= this.props;
        return (<div className={cls}>
            <button onClick={()=>actions.loadTextLivePrompt()}>Load live prompt</button>
            <button onClick={()=>actions.loadServerHealth()}>Server Health</button>
            <button onClick={()=>actions.loadDatabaseActions()}>DB Actions</button>
            <button onClick={()=>actions.loadBetBrowser()}>Bet Browser</button>
            <button onClick={()=>actions.fetchShortcuts()}>Shortcuts!</button>
            <button onClick={()=>actions.loadVersionsMatrix()}>Matrix</button>
        </div>)
    }
}

AppActions.propTypes = {
    actions: PropTypes.object.isRequired,
    state: PropTypes.object,
    cls: PropTypes.string,
};


function mapStateToProps(state) {
    return {
        state: state,
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
)(AppActions)
