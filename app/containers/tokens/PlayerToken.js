import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class PlayerToken extends React.Component {
  render() {
    const {actions, text, prop} = this.props;
    let title = "Player: " + prop.name + " (" + prop.ratio + ")";
    return <div
      className="label label-info"
      title={title}
      onClick={() => actions.deepLinkToBetBrowser(prop)}
    >{text}</div>
  }
}


PlayerToken.propTypes = {
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
)(PlayerToken);