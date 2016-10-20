import React, {Component, PropTypes} from "react";
import {Links} from "../constants/defaults";
import {DefaultGateSize} from "../constants/defaults";

class Gate extends React.Component {
    render() {
        const {size, href, isNextStep} = this.props;
        const styles = {textAlign: 'center'};
        if (isNextStep) {
            styles['borderLeft'] = '2px solid red'
        }
        return (
            <div style={styles}>
                <img height={size} width={size*1.475} src={href || Links.Noop.img}/>
            </div>)
    }
}

Gate.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    href: PropTypes.string,
    isDragging: PropTypes.bool,
    isNextStep: PropTypes.bool.isRequired
};

Gate.defaultProps = {
    size: DefaultGateSize,
    isNextStep: false
};

export default Gate;