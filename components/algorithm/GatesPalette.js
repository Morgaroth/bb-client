import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import GateOnPallette from "./GateOnPalette";
import {Links} from "../../constants/defaults";

class GatesPalette extends React.Component {
    render() {
        let {cpu, actions} = this.props;
        return <div style={{display: "flex", flexWrap: "wrap"}}>
            <GateOnPallette type="N" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <GateOnPallette href={Links.H.img} type="H" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <GateOnPallette href={Links.X.img} type="X" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <GateOnPallette href={Links.Y.img} type="Y" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <GateOnPallette href={Links.Z.img} type="Z" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <GateOnPallette href={Links.Control.img} type="C" cpuId={cpu} dis={actions.addGateToAlgo}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {cpu: state.serverState.selected}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GatesPalette)
