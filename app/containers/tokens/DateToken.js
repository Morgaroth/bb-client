import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class DateToken extends React.Component {
    render() {
        const {actions, text, prop} = this.props;
        let title = "Date: " + prop.name;
        return (
            <button
                className="label label-danger"
                title={title}
                onClick={() => actions.deepLinkToCoupon(prop)}
            >{text}</button>
        )
    }
}


DateToken.propTypes = {
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
)(DateToken);