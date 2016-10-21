import React, {Component, PropTypes} from "react";

class PlayerToken extends React.Component {
    render() {
        const {text, prop} = this.props;
        let title = "Player: " + prop.name + " (" + prop.ratio + ")";
        return <div className="label label-info" title={title}>{text}</div>
    }
}


PlayerToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
};
export default PlayerToken;