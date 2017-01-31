import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class OCEventToken extends React.Component {
  render() {
    const {actions, text, prop} = this.props;
    let title = "Event: " + prop.name + " (" + prop.ratio + ")";
    /*onClick={() => actions.loadInfoPage('team', prop)}*/
    return (
      <button
        className="label label-success"
        title={title}
        onClick={() => actions.deepLinkToCoupon(prop)}
      >{text}</button>
    )
  }
}


OCEventToken.propTypes = {
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
)(OCEventToken)
