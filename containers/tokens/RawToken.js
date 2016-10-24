import React, {Component, PropTypes} from "react";

class RawToken extends React.Component {
    render() {
        return <div style={{display: 'inline'}}>{this.props.text}</div>
    }
}

RawToken.propTypes = {
    text: PropTypes.string.isRequired
};
export default RawToken;