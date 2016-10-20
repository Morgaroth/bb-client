import React, {Component, PropTypes} from "react";
import {ItemTypes} from "../algorithm/Constants";
import {DragSource} from "react-dnd";
import {DefaultGateSize, Links} from "../../constants/defaults";

const gateSource = {
    beginDrag(props) {
        return {
            gate: {type: props.type},
            cpuId: props.cpuId,
            publish: props.dis
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class GateOnPalette extends React.Component {
    render() {
        const {size, connectDragSource, href} = this.props;
        return connectDragSource(
            <div style={{cursor: 'move'}}>
                <img height={size} width={size*1.475} src={href || Links.Noop.img}/>
            </div>)
    }
}

GateOnPalette.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    href: PropTypes.string,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool
};

GateOnPalette.defaultProps = {
    size: DefaultGateSize
};

export default DragSource(ItemTypes.GATE, gateSource, collect)(GateOnPalette);