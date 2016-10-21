import React, {Component, PropTypes} from "react";

class OddsToken extends React.Component {
    render() {
        const {text, load, prop} = this.props;
        let title = "Odds: " + prop.name + " (" + prop.ratio + ")";
        return <div
            className="label"
            title={title}
            onClick={() => load('bet', prop)}
        >{text}</div>
    }
}


OddsToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
};
export default OddsToken;