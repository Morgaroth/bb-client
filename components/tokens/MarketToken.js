import React, {Component, PropTypes} from "react";

class MarketToken extends React.Component {
    render() {
        const {text, prop} = this.props;
        let title = "Market: " + prop.name + " (" + prop.ratio + ")";
        return <div className="label label-primary" title={title}>{text}</div>
    }
}


MarketToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
};
export default MarketToken;