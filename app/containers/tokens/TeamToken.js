import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class TeamToken extends React.Component {
  render() {
    const {actions, text, prop} = this.props;
    let title = "Team: " + prop.name + " (" + prop.ratio + ")";
    return (
      <button
        className="label label-success"
        title={title}
        onClick={() => actions.deepLinkToBetBrowser(prop)}
      >{text}</button>
    )
  }
}


TeamToken.propTypes = {
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
)(TeamToken)
