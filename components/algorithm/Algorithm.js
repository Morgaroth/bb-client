import React, {Component, PropTypes} from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import AlgorithmField from "./AlgorithmField";
import Gate from "../Gate";
import GatesPalette from "./GatesPalette";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {DefaultAlgoSize, Links} from "../../constants/defaults";
import Algorithms from "../Algorithms"

class Algorithm extends Component {


    renderField(qbit, position, isNext) {
        var g = this.props.gates.find((g) => g.position === position && g.qbit === qbit);
        let divKey = "q" + qbit + "p" + position;
        var href = Links.Noop.img;
        if (g !== undefined) {
            href = Links[g.gate.type][g.gate.isToUp || false][g.gate.isToDown || false];
            g = <Gate href={href} isNextStep={isNext}/>
        }
        return (
            <td key={divKey}>
                <div key={divKey}>
                    <AlgorithmField qbit={qbit} position={position}>
                        {g || <Gate isNextStep={isNext}/>}
                    </AlgorithmField>
                </div>
            </td>
        );
    }


    renderRow(qbit, registerSize, execData) {
        var squares = [];
        var qbitNumber = registerSize - qbit - 1;
        var name = "Q" + qbitNumber;
        squares.push(<td key={'fq'+qbit+'ph'}>{name}</td>);
        for (let p = 0; p < execData.length; p++) {
            squares.push(this.renderField(qbitNumber, p, p === execData.position));
        }
        return <tr key={'q'+qbitNumber}>{squares}</tr>;
    }

    renderTable(registerSize, execData) {
        var squares = [];
        for (let q = 0; q < registerSize; q++) {
            squares.push(this.renderRow(q, registerSize, execData))
        }
        return (<table style={{borderSpacing:0}}>
            <tbody key="rendertable">{squares}</tbody>
        </table>)
    }


    render() {
        const {registerSize, execData} = this.props;
        return (
            <div>
                <Algorithms />
                <GatesPalette />
                <hr/>
                {this.renderTable(registerSize, execData)}
            </div>
        );
    }
}

Algorithm.propTypes = {
    registerSize: PropTypes.number.isRequired,
    gates: PropTypes.arrayOf(PropTypes.object).isRequired,
    execData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        serviceUrl: state.serviceUrl,
        available: state.serverState.available,
        selected: state.serverState.selected,
        execData: (state.execution[state.serverState.selected] || {position: 0, length: DefaultAlgoSize})
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
)(DragDropContext(HTML5Backend)(Algorithm))
