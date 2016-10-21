import React, {Component, PropTypes} from "react";

class RawToken extends React.Component {
    render() {
        return <a>{this.props.text}</a>
    }
}


RawToken.propTypes = {
    text: PropTypes.string.isRequired
};
export default RawToken;