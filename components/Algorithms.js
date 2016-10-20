import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions/algorithms";


class Algorithms extends Component {
    render() {
        const {actions, cpuId} = this.props;
        return (<div>
            <button onClick={() => actions.loadGroverAlgo(cpuId, 3)}>Load Grover 3qbits</button>
            <button onClick={() => actions.loadGroverAlgoConcurrent(cpuId, 3)}>Load Grover 3qbits concurrent</button>
            <button onClick={() => actions.loadGroverAlgoConcurrent(cpuId, 2)}>Load Grover 2qbits concurrent</button>
        </div>)
    }
}

Algorithms.propTypes = {
    cpuId: PropTypes.string,
    actions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        cpuId: state.serverState.selected
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Algorithms)
