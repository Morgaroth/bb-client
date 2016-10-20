import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";


class ControlPanel extends Component {
    render() {
        const {actions, cpuId} = this.props;
        return (<div>
            <button onClick={() => actions.addAlgoSize(cpuId)}>Add alg</button>
            <button onClick={() => actions.movePrev(cpuId)} style={{marginLeft:'24px', fontSize: 18}}>⇦</button>
            <button onClick={() => actions.reset(cpuId)} style={{marginLeft:'24px'}}>Reset</button>
            <br/>
            <button onClick={() => actions.subAlgoSize(cpuId)}>Sub alg</button>
            <button onClick={() => actions.moveNext(cpuId)} style={{marginLeft:'24px', fontSize: 18}}>⇨</button>
        </div>)
    }
}

ControlPanel.propTypes = {
    cpuId: PropTypes.string.isRequired,
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
)(ControlPanel)
