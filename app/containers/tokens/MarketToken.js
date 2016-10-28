import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

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
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MarketToken);