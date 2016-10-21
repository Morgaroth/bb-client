import React, {Component, PropTypes} from "react";

class ConnectorToken extends React.Component {
    render() {
        const {text, prop} = this.props;
        return (
            <div className="label label-warning">{text}</div>
        )
    }
}


ConnectorToken.propTypes = {
    text: PropTypes.string.isRequired,
    prop: PropTypes.object.isRequired,
};
export default ConnectorToken;