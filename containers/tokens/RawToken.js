import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class RawToken extends React.Component {
    render() {
        let font = 'normal';
        if (this.props.title != null && this.props.title != undefined && this.props.title.length > 0) {
            font = 'bold';
        }
        return <div style={{display: 'inline', fontWeight: font}}
                    title={this.props.title}>{this.props.text}</div>
    }
}

RawToken.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string,
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
)(RawToken);