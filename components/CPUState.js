import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import Algorithm from "../components/algorithm/Algorithm";
import ControlPanel from "./ControlPanel"

class CPUState extends Component {

    renderProb(ampl) {
        var {re, im} = ampl;
        return <a>prob: <b>{((re * re + im * im) * 100).toFixed(0)}%</b></a>
    }

    renderAmpl(ampl) {
        var {re, im} = ampl;
        if (im != 0) {
            if (re != 0) {
                return <a>amp: <b>{re.toFixed(2)} {im.toFixed(2)}i</b></a>
            } else {
                return <a>amp: <b>{im.toFixed(2)}i</b></a>
            }
        } else {
            return <a>amp: <b>{re.toFixed(2)}</b></a>
        }
    }

    renderStates() {
        var elements = [];
        var unsorted = [];
        const {states} = this.props;
        for (var key in states) {
            if (states.hasOwnProperty(key)) {
                unsorted.push(key)
            }
        }
        return unsorted.sort().map(key => {
            return <div style={{width: '100%'}}>
                <b>|</b>{key}<b>&gt;</b>: {this.renderAmpl(states[key])} {this.renderProb(states[key])}
            </div>
        })
    }

    render() {
        const {cpu, algorithms, enabled} = this.props;
        if (enabled) {
            return (
                <div>
                    <div>
                        <Algorithm registerSize={cpu.size} gates={algorithms[cpu.id] || []}/>
                        <ControlPanel/>
                    </div>
                    <br/>
                    <div style={{marginLeft: '100px'}}>
                        {this.renderStates()}
                    </div>
                    <br/>
                    <br/>

                </div>)
            // return (
            //     <div style={{width: '100%'}}>
            //         <div style={{float: 'left', width:'50%'}}>
            //             <Algorithm registerSize={cpu.size} gates={algorithms[cpu.id] || []}/>
            //             <ControlPanel/>
            //         </div>
            //         <div style={{float: 'right', width:'50%'}}>
            //             {this.renderStates()}
            //         </div>
            //     </div>)
        } else {
            return <div></div>
        }
    }
}

CPUState.propTypes = {
    cpuState: PropTypes.object.isRequired,
    algorithms: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

function mapStateToProps(state) {
    const selected = state.serverState.selected;
    return Object.assign({}, state, {
        enabled: selected != 'undefined' && selected != null,
        cpu: state.serverState.available[(state.serverState.available.map((x) => x.id).indexOf(selected))],
        states: state.cpuState
    });
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CPUState)
