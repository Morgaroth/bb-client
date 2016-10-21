import React, {Component, PropTypes} from "react";

class PlayerToken extends React.Component {
    render() {
        const {text, prop} = this.props;
        return (
           <a style={{backgroundColor: '#aaa'}} >{text}</a>
        )
    }
}


PlayerToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
};
export default PlayerToken;