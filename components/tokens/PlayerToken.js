import React, {Component, PropTypes} from "react";

class PlayerToken extends React.Component {
    render() {
        const {text, prop, load} = this.props;
        let title = "Player: " + prop.name + " (" + prop.ratio + ")";
        return <div
            className="label label-info"
            title={title}
            onClick={() => load('player', prop.name)}
        >{text}</div>
    }
}


PlayerToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
};
export default PlayerToken;