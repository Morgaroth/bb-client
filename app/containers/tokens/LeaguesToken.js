import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import {ALL_LEAGUES_TOKEN_COLOR, MAIN_LEAGUES_TOKEN_COLOR} from "../../constants";

class LeaguesToken extends React.Component {
  render() {
    const {actions, prop} = this.props;
    let isMain = prop.name.startsWith("Main ");
    let title = prop.name + " (leagues block, " + prop.ratio + ")";
    let color = ALL_LEAGUES_TOKEN_COLOR;
    if (isMain) {
      color = MAIN_LEAGUES_TOKEN_COLOR
    }
    return <div
      className="label label-info"
      style={{backgroundColor: color}}
      title={title}
      onClick={() => actions.deepLinkToBetBrowser(prop)}
    >{prop.name}</div>
  }
}


LeaguesToken.propTypes = {
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
)(LeaguesToken);