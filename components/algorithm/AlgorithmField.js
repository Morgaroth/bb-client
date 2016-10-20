import React, {Component, PropTypes} from "react";
import {ItemTypes} from "./Constants";
import {DropTarget} from "react-dnd";

const gateTarget = {
    drop(props, monitor) {
        console.log("dropping monitorItem:", JSON.stringify(monitor.getItem()), "props:", props.qbit, props.position);
        monitor.getItem().publish(monitor.getItem().gate, monitor.getItem().cpuId, props.qbit, props.position)
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}


class AlgorithmField extends Component {
    render() {
        const {connectDropTarget, isOver, children, qbit, position} = this.props;
        const styles = {position: 'relative', border: '1px solid white'};
        if (isOver) {
            styles['border'] = '1px solid green';
        }
        return connectDropTarget(
            <div style={styles} key={'q'+qbit+'p'+position+'af'}>
                {children}
            </div>
        );
    }
}

AlgorithmField.propTypes = {
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.node,
    qbit: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired
};

export default DropTarget(ItemTypes.GATE, gateTarget, collect)(AlgorithmField);