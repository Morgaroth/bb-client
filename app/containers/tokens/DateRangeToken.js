import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class DateRangeToken extends React.Component {
    render() {
        const {actions, text, prop} = this.props;
        let title = "Date range: " + prop.name;
        let dates = prop.name.split('/');
        prop.dateStart = dates[0];
        prop.dateEnd = dates[1];
        return (
            <button
                className="label label-danger"
                title={title}
                onClick={() => actions.deepLinkToCoupon(prop)}
            >{text}</button>
        )
    }
}


DateRangeToken.propTypes = {
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
)(DateRangeToken);