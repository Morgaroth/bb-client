import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import List from "react-list-select";

class AdditionalView extends Component {

    render() {
        return (<div className={this.props.cls}>
            <div>here is sth additional to view</div>
        </div>)
    }
}

AdditionalView.propTypes = {
    actions: PropTypes.object.isRequired,
    cls: PropTypes.string,
};


function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdditionalView)
